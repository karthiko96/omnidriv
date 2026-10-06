import React, { useRef, useState, useSyncExternalStore } from 'react';
import { UploadCloud, Pause, Play, X, WifiOff, ShieldCheck, CheckCircle2, Layers, Gauge, RefreshCw, Boxes, Zap, Moon } from 'lucide-react';
import { manager as m, Upload, sent, fmt, eta, fileSource, virtualSource, SAMPLES } from '../lib/multipart';

const useManager = () => useSyncExternalStore(m.subscribe, m.getVersion);

const CAPS = [
  { i: Layers, t: 'Multipart uploads', d: 'Files are split into parts sent independently and assembled on the server. A 20 GB file is never one request.' },
  { i: RefreshCw, t: 'Resumable uploads', d: 'The server remembers finished parts. After a drop or restart, only the missing parts are sent.' },
  { i: Zap, t: 'Parallel uploads', d: 'Up to 16 parts in flight at once to fill fast connections. Change it live.' },
  { i: Boxes, t: 'Chunking', d: '8 to 128 MB parts, chosen per transfer to balance retry cost against overhead.' },
  { i: ShieldCheck, t: 'Integrity checks', d: 'SHA-256 per part and a combined checksum for the whole file. Corrupt parts re-send automatically.' },
  { i: Moon, t: 'Background transfers', d: 'Transfers keep running while you browse, with a progress tray that follows you.' },
  { i: Pause, t: 'Pause and resume', d: 'Stop any time and continue later from the exact part you left off.' },
  { i: Gauge, t: 'Bandwidth controls', d: 'Cap upload speed so calls and teammates keep working.' },
];
const LABEL: Record<string, string> = { uploading: 'Uploading', paused: 'Paused', verifying: 'Verifying integrity', complete: 'Complete', error: 'Failed' };

function ChunkMap({ u }: { u: Upload }) {
  const n = u.parts.length, segs = Math.min(n, 96);
  return (
    <div className="mt-3 flex gap-px" aria-hidden="true">
      {Array.from({ length: segs }, (_, s) => {
        const lo = Math.floor((s * n) / segs), hi = Math.max(lo + 1, Math.floor(((s + 1) * n) / segs));
        const sl = u.parts.slice(lo, hi), d = sl.filter(p => p === 'done').length, up = sl.some(p => p === 'uploading');
        const c = d === sl.length ? 'bg-emerald-500' : up ? 'bg-amber-400 animate-pulse' : d ? 'bg-emerald-300' : 'bg-neutral-200';
        return <div key={s} className={`h-3 flex-1 rounded-[2px] ${c}`} />;
      })}
    </div>
  );
}

function Row({ u }: { u: Upload }) {
  const b = sent(u), pct = (b / u.src.size) * 100, done = u.parts.filter(p => p === 'done').length, live = u.status === 'uploading';
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-medium text-neutral-900 truncate">{u.src.name}</div>
          <div className="text-xs font-mono text-neutral-500 mt-0.5">{fmt(b)} of {fmt(u.src.size)} · {done}/{u.parts.length} parts · {fmt(u.chunk)} chunks</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {live && <button onClick={() => m.pause(u.id)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Pause"><Pause className="w-4 h-4" /></button>}
          {(u.status === 'paused' || u.status === 'error') && <button onClick={() => m.resume(u.id)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Resume"><Play className="w-4 h-4" /></button>}
          {u.status !== 'complete' && <button onClick={() => m.cancel(u.id)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Cancel"><X className="w-4 h-4" /></button>}
        </div>
      </div>
      <ChunkMap u={u} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className={u.status === 'complete' ? 'text-emerald-700 flex items-center gap-1' : u.status === 'error' ? 'text-red-600' : 'text-neutral-700'}>
          {u.status === 'complete' && <CheckCircle2 className="w-3.5 h-3.5" />}
          {LABEL[u.status]} · {pct.toFixed(1)}%{u.error ? ` · ${u.error}` : ''}
        </span>
        <span className="text-neutral-500">{live ? `${(u.speed / 1048576).toFixed(0)} MB/s · ETA ${eta((u.src.size - b) / u.speed)}` : u.resumedParts > 0 && u.status !== 'complete' ? `Resumed from part ${u.resumedParts}` : ''}</span>
      </div>
      {(u.note || u.retries > 0) && (
        <div className="mt-2 text-xs text-neutral-500">{u.note ? <span className="text-amber-700">{u.note} · </span> : null}{u.retries} retried · {u.mismatches} checksum mismatches fixed · resumed {u.resumedParts} parts from server</div>
      )}
    </div>
  );
}

export const LargeFileTransfer: React.FC = () => {
  useManager();
  const s = m.settings, inp = useRef<HTMLInputElement>(null), [drag, setDrag] = useState(false);
  const online = performance.now() >= m.offlineUntil;
  const sel = 'rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-sm';
  const add = (fs: FileList | null) => fs && Array.from(fs).forEach(f => m.add(fileSource(f)));
  return (
    <div className="mt-20">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3"><UploadCloud className="w-4 h-4 text-neutral-900" /><span>Huge-file infrastructure</span></div>
        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display text-balance">A 20 GB upload never restarts from zero</h3>
        <p className="mt-3 text-neutral-600">Built for footage, 3D projects, CAD models, Photoshop files, datasets, AI training data and game assets.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAPS.map(c => (
          <div key={c.t} className="rounded-2xl border border-neutral-200/90 bg-white p-5">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center"><c.i className="w-4 h-4 text-neutral-900" /></div>
            <div className="mt-3 font-semibold text-neutral-950">{c.t}</div>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <div id="transfers" className="mt-8 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-7 shadow-xs scroll-mt-24">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="font-semibold text-neutral-950">Try it: transfer console</div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />{online ? 'Connected' : 'Connection lost'}
            <button onClick={() => m.dropConnection()} className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50"><WifiOff className="w-3.5 h-3.5" />Simulate connection drop</button>
          </div>
        </div>

        <div onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
          className={`mt-5 rounded-xl border-2 border-dashed p-5 text-center ${drag ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
          <div className="text-sm text-neutral-600">Drop real files here, or <button className="underline font-medium text-neutral-900" onClick={() => inp.current?.click()}>choose files</button>, or add a sample:</div>
          <input ref={inp} type="file" multiple className="hidden" onChange={e => { add(e.target.files); e.target.value = ''; }} />
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SAMPLES.map(x => <button key={x.name} onClick={() => m.add(virtualSource(x.name, x.gb))} className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-mono hover:bg-neutral-900 hover:text-white transition-colors">{x.label} · {x.gb} GB</button>)}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-neutral-600">
          <label className="grid gap-1">Parallel streams<select className={sel} value={s.streams} onChange={e => m.set({ streams: +e.target.value })}>{[1, 2, 4, 8, 16].map(n => <option key={n} value={n}>{n}</option>)}</select></label>
          <label className="grid gap-1">Chunk size (new transfers)<select className={sel} value={s.chunkMB} onChange={e => m.set({ chunkMB: +e.target.value })}>{[8, 16, 64, 128].map(n => <option key={n} value={n}>{n} MB</option>)}</select></label>
          <label className="grid gap-1">Bandwidth limit<select className={sel} value={s.limitMBps} onChange={e => m.set({ limitMBps: +e.target.value })}><option value={0}>Unlimited</option>{[10, 50, 200].map(n => <option key={n} value={n}>{n} MB/s</option>)}</select></label>
          <label className="flex items-end gap-2 pb-1.5"><input type="checkbox" checked={s.verify} onChange={e => m.set({ verify: e.target.checked })} />SHA-256 integrity checks</label>
        </div>

        <div className="mt-6 grid gap-3">
          {m.uploads.length ? m.uploads.map(u => <Row key={u.id} u={u} />) : <div className="text-sm text-neutral-500 text-center py-6">No transfers yet. Add a sample above, then try pausing it or dropping the connection.</div>}
        </div>
        {m.uploads.some(u => u.status === 'complete') && <button onClick={() => m.clearDone()} className="mt-3 text-xs font-mono text-neutral-500 underline">Clear completed</button>}
        <p className="mt-5 text-xs text-neutral-500 leading-relaxed">The server here is simulated in your browser. Chunking, hashing, retries, parallelism and resume state are real logic, and sessions persist across reloads: add the same file again and it continues. To go live, replace <code className="font-mono">SimulatedTransport</code> in <code className="font-mono">src/lib/multipart.ts</code> with presigned S3/GCS multipart calls.</p>
      </div>
    </div>
  );
};

export const TransferTray: React.FC = () => {
  useManager();
  const act = m.active(); if (!act.length) return null;
  const total = act.reduce((a, u) => a + u.src.size, 0), got = act.reduce((a, u) => a + sent(u), 0), sp = act.reduce((a, u) => a + u.speed, 0);
  return (
    <button onClick={() => document.getElementById('transfers')?.scrollIntoView({ behavior: 'smooth' })} className="fixed bottom-4 right-4 z-50 w-64 rounded-xl border border-neutral-200 bg-white p-3 text-left shadow-lg">
      <div className="flex justify-between text-xs font-mono text-neutral-600"><span>{act.length} transfer{act.length > 1 ? 's' : ''} running</span><span>{(sp / 1048576).toFixed(0)} MB/s</span></div>
      <div className="mt-2 h-1.5 rounded-full bg-neutral-100 overflow-hidden"><div className="h-full bg-neutral-900" style={{ width: `${(got / total) * 100}%` }} /></div>
    </button>
  );
};
