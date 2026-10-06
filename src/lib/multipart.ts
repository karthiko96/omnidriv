// Multipart upload engine: chunking, parallel parts, resume, SHA-256 integrity,
// pause/resume, bandwidth cap. Framework-free; the UI subscribes to `manager`.
// SimulatedTransport stands in for a server. Swap it for presigned S3/GCS multipart calls.
export const MB = 1024 * 1024;
export type PartState = 'pending' | 'uploading' | 'done';
export type Status = 'uploading' | 'paused' | 'verifying' | 'complete' | 'error';
export interface Settings { chunkMB: number; streams: number; limitMBps: number; verify: boolean }
export interface Source { name: string; size: number; key: string; read(s: number, e: number): Promise<Uint8Array> }
export interface IO { throttle(n: number): Promise<void>; progress(n: number): void; offline(): boolean }
export interface Transport {
  init(key: string, size: number, chunk: number): Promise<{ uploadId: string; done: Record<number, string> }>;
  putPart(p: { key: string; i: number; data: Uint8Array; sha: string; size: number; sig: AbortSignal; verify: boolean }, io: IO): Promise<void>;
  complete(key: string, composite: string): Promise<boolean>;
}
export interface Upload {
  id: string; src: Source; status: Status; chunk: number; parts: PartState[]; hashes: string[]; partBytes: number[];
  speed: number; retries: number; mismatches: number; resumedParts: number; error?: string; note?: string;
  ctl: AbortController | null; samples: [number, number][];
}

export const sha256 = async (d: Uint8Array) =>
  [...new Uint8Array(await crypto.subtle.digest('SHA-256', d as unknown as BufferSource))].map(b => b.toString(16).padStart(2, '0')).join('');
const composite = async (h: string[]) => (await sha256(new TextEncoder().encode(h.join('')))).slice(0, 16) + '-' + h.length;
const sleep = (ms: number, sig?: AbortSignal) => new Promise<void>(r => {
  const t = setTimeout(r, Math.max(0, ms)); sig?.addEventListener('abort', () => { clearTimeout(t); r(); }, { once: true });
});
export const sent = (u: Upload) => u.partBytes.reduce((a, b) => a + b, 0);
export const fmt = (b: number) => b >= 1024 ** 3 ? (b / 1024 ** 3).toFixed(b >= 10 * 1024 ** 3 ? 0 : 1) + ' GB' : b >= MB ? (b / MB).toFixed(0) + ' MB' : (b / 1024).toFixed(0) + ' KB';
export const eta = (s: number) => !isFinite(s) || s <= 0 ? '—' : s >= 3600 ? `${Math.floor(s / 3600)}h ${Math.floor(s % 3600 / 60)}m` : s >= 60 ? `${Math.floor(s / 60)}m ${Math.round(s % 60)}s` : Math.round(s) + 's';

export const fileSource = (f: File): Source => ({ name: f.name, size: f.size, key: `file:${f.name}:${f.size}:${f.lastModified}`, read: async (s, e) => new Uint8Array(await f.slice(s, e).arrayBuffer()) });
export const virtualSource = (name: string, gb: number): Source => ({ name, size: gb * 1024 * MB, key: `sample:${name}:${gb}`, read: async s => new TextEncoder().encode(name + ':' + s) });
export const SAMPLES = [
  { label: 'Video footage', name: 'ProRes-RAW-day3.mov', gb: 20 }, { label: '3D project', name: 'Scene-final.blend', gb: 12 },
  { label: 'CAD assembly', name: 'Turbine-assembly.step', gb: 4 }, { label: 'Photoshop file', name: 'Billboard-master.psb', gb: 6 },
  { label: 'Dataset', name: 'telemetry-2026.parquet', gb: 48 }, { label: 'AI training data', name: 'tokens-shard-0001.bin', gb: 120 },
  { label: 'Game assets', name: 'Level-pack-textures.pak', gb: 35 },
];

// Server-side session state is persisted so resume survives a page reload.
const LS = 'omnidrive.multipart.sessions';
const load = (): Record<string, any> => { try { return JSON.parse(localStorage.getItem(LS) || '{}'); } catch { return {}; } };
const save = (s: object) => { try { localStorage.setItem(LS, JSON.stringify(s)); } catch { /* ignore */ } };

export class SimulatedTransport implements Transport {
  async init(key: string, _size: number, chunk: number) {
    const s = load(); let x = s[key];
    if (!x || x.chunk !== chunk) { x = { uploadId: 'up_' + Math.random().toString(36).slice(2, 10), chunk, parts: {} }; s[key] = x; save(s); }
    return { uploadId: x.uploadId as string, done: { ...x.parts } as Record<number, string> };
  }
  async putPart(p: { key: string; i: number; sha: string; size: number; sig: AbortSignal; verify: boolean }, io: IO) {
    let n = 0;
    while (n < p.size) {
      if (p.sig.aborted) throw new Error('aborted');
      if (io.offline()) throw new Error('connection lost');
      const s = Math.min(4 * MB, p.size - n);
      await io.throttle(s);
      await sleep(s / (60 * MB * (0.8 + Math.random() * 0.4)) * 1000, p.sig); // ~60 MB/s per stream
      if (p.sig.aborted) throw new Error('aborted');
      io.progress(s); n += s;
    }
    if (p.verify && Math.random() < 0.03) throw new Error('INTEGRITY: checksum mismatch on part ' + p.i); // simulated bit-flip
    const all = load(); if (all[p.key]) { all[p.key].parts[p.i] = p.sha; save(all); }
  }
  async complete(key: string, c: string) {
    const all = load(); const x = all[key]; if (!x) return false;
    const h = Object.keys(x.parts).map(Number).sort((a, b) => a - b).map(i => x.parts[i]);
    const ok = (await composite(h)) === c; if (ok) { delete all[key]; save(all); } return ok;
  }
}

class Manager {
  settings: Settings = { chunkMB: 64, streams: 4, limitMBps: 0, verify: true };
  uploads: Upload[] = []; v = 0; offlineUntil = 0; private nextFree = 0; private timer: any = null;
  private ls = new Set<() => void>(); private T: Transport = new SimulatedTransport();
  subscribe = (f: () => void) => { this.ls.add(f); return () => { this.ls.delete(f); }; };
  getVersion = () => this.v;
  emit() { this.v++; this.ls.forEach(f => f()); }
  set(p: Partial<Settings>) { this.settings = { ...this.settings, ...p }; this.emit(); }
  active() { return this.uploads.filter(u => u.status === 'uploading' || u.status === 'verifying'); }
  add(src: Source) {
    let u = this.uploads.find(x => x.src.key === src.key && x.status !== 'complete');
    if (!u) {
      const chunk = this.settings.chunkMB * MB, n = Math.ceil(src.size / chunk);
      u = { id: Math.random().toString(36).slice(2), src, status: 'paused', chunk, parts: Array(n).fill('pending'), hashes: [], partBytes: Array(n).fill(0), speed: 0, retries: 0, mismatches: 0, resumedParts: 0, ctl: null, samples: [] };
      this.uploads.unshift(u);
    }
    this.resume(u.id);
  }
  resume(id: string) { const u = this.uploads.find(x => x.id === id); if (u && (u.status === 'paused' || u.status === 'error')) this.run(u); }
  pause(id: string) {
    const u = this.uploads.find(x => x.id === id); if (!u || u.status !== 'uploading') return;
    u.ctl?.abort(); u.status = 'paused'; u.speed = 0; u.note = undefined;
    u.parts.forEach((p, i) => { if (p === 'uploading') { u.parts[i] = 'pending'; u.partBytes[i] = 0; } }); this.emit();
  }
  cancel(id: string) {
    const u = this.uploads.find(x => x.id === id); if (!u) return;
    u.ctl?.abort(); const s = load(); delete s[u.src.key]; save(s);
    this.uploads = this.uploads.filter(x => x !== u); this.emit();
  }
  clearDone() { this.uploads = this.uploads.filter(u => u.status !== 'complete'); this.emit(); }
  dropConnection() { this.offlineUntil = performance.now() + 2500; this.emit(); }
  private psize(u: Upload, i: number) { return i < u.parts.length - 1 ? u.chunk : u.src.size - u.chunk * (u.parts.length - 1); }
  private async throttle(n: number, sig: AbortSignal) {
    const lim = this.settings.limitMBps * MB; if (!lim) return;
    const now = performance.now(), start = Math.max(now, this.nextFree); this.nextFree = start + n / lim * 1000; await sleep(start - now, sig);
  }
  private ensureTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      const now = performance.now(), act = this.active();
      act.forEach(u => {
        const b = sent(u); u.samples.push([now, b]); while (u.samples.length > 2 && now - u.samples[0][0] > 4000) u.samples.shift();
        const f = u.samples[0]; u.speed = now > f[0] ? (b - f[1]) / ((now - f[0]) / 1000) : 0;
      });
      if (typeof window !== 'undefined') window.onbeforeunload = act.length ? () => 'Transfers are in progress. You can resume them later.' : null;
      this.emit(); if (!act.length) { clearInterval(this.timer); this.timer = null; }
    }, 250);
  }
  private async sendPart(u: Upload, i: number, sig: AbortSignal): Promise<boolean> {
    const size = this.psize(u, i), start = i * u.chunk;
    const io: IO = { throttle: n => this.throttle(n, sig), progress: n => { u.partBytes[i] += n; }, offline: () => performance.now() < this.offlineUntil };
    for (let a = 0; a < 8; a++) {
      if (sig.aborted) return false;
      try {
        u.parts[i] = 'uploading'; u.partBytes[i] = 0;
        const data = await u.src.read(start, start + size);
        const sha = this.settings.verify ? await sha256(data) : '-';
        await this.T.putPart({ key: u.src.key, i, data, sha, size, sig, verify: this.settings.verify }, io);
        u.parts[i] = 'done'; u.hashes[i] = sha; u.partBytes[i] = size; u.note = undefined; return true;
      } catch (e) {
        if (u.ctl?.signal === sig) { u.partBytes[i] = 0; u.parts[i] = 'pending'; }
        if (sig.aborted) return false;
        const msg = String((e as Error).message || e);
        if (msg.startsWith('INTEGRITY')) { u.mismatches++; u.note = 'Checksum mismatch, re-sending part ' + (i + 1); } else u.note = 'Connection lost, retrying…';
        u.retries++; await sleep(Math.min(400 * 2 ** a, 3000), sig);
      }
    }
    u.status = 'error'; u.error = `Part ${i + 1} failed after 8 attempts`; u.ctl?.abort(); return false;
  }
  private async run(u: Upload) {
    const ctl = (u.ctl = new AbortController()), sig = ctl.signal;
    u.status = 'uploading'; u.error = undefined; u.note = undefined; u.samples = []; this.emit(); this.ensureTimer();
    try {
      const r = await this.T.init(u.src.key, u.src.size, u.chunk);
      Object.keys(r.done).forEach(k => { const i = +k; u.parts[i] = 'done'; u.hashes[i] = r.done[i]; u.partBytes[i] = this.psize(u, i); });
      u.resumedParts = Object.keys(r.done).length;
      const queue = u.parts.map((p, i) => (p === 'done' ? -1 : i)).filter(i => i >= 0);
      const worker = async (k: number) => {
        while (!sig.aborted) {
          if (k >= this.settings.streams) { if (!queue.length) return; await sleep(300, sig); continue; }
          const i = queue.shift(); if (i === undefined || !(await this.sendPart(u, i, sig))) return;
        }
      };
      await Promise.all(Array.from({ length: 16 }, (_, k) => worker(k)));
      if (sig.aborted) return;
      u.status = 'verifying'; u.note = undefined; this.emit(); await sleep(700);
      const ok = await this.T.complete(u.src.key, await composite(u.hashes));
      u.status = ok ? 'complete' : 'error'; if (!ok) u.error = 'Final checksum mismatch'; else u.note = 'Verified ' + (await composite(u.hashes));
    } catch (e) { u.status = 'error'; u.error = String(e); } finally { this.emit(); }
  }
}
export const manager = new Manager();
