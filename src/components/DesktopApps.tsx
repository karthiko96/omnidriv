import React, { useState } from 'react';
import { Monitor, Laptop, Terminal, Cloud, CheckCircle2, RefreshCw, Folder, FileText, HardDrive, History, UploadCloud, Copy, Check, Pause, Play } from 'lucide-react';

type St = 'online' | 'offline' | 'syncing';
interface F { n: string; s: string; st: St; dir?: boolean }
const INIT: F[] = [
  { n: 'Brand Assets', s: '860 MB', st: 'offline', dir: true },
  { n: 'Q4 Plan.docx', s: '2.1 MB', st: 'online' },
  { n: 'Launch-edit.mov', s: '4.2 GB', st: 'online' },
  { n: 'Budget.xlsx', s: '640 KB', st: 'offline' },
  { n: 'Dataset-v3.tar', s: '38 GB', st: 'syncing' },
  { n: 'Contract.pdf', s: '1.4 MB', st: 'online' },
];
const WIN_NAV = [
  { id: 'drive', l: 'Virtual Drive', i: HardDrive }, { id: 'sync', l: 'Sync', i: RefreshCw }, { id: 'offline', l: 'Offline Files', i: CheckCircle2 },
  { id: 'selective', l: 'Selective Sync', i: Folder }, { id: 'queue', l: 'Upload Queue', i: UploadCloud }, { id: 'history', l: 'File History', i: History },
];
const MAC_NAV = [{ id: 'all', l: 'Cloud Files' }, { id: 'offline', l: 'Available Offline' }, { id: 'syncing', l: 'Syncing' }, { id: 'online', l: 'Online Only' }];
const TABS = [
  { id: 'win', l: 'Windows', i: Monitor, h: 'OmniDrive appears as a drive in Explorer.', p: 'Open O:\\OmniDrive like any local disk. Files show up instantly and download only when you open them, so a 38 GB dataset costs no disk space until you need it.', b: ['Virtual drive at O:\\OmniDrive', 'Offline files you pin stay available without a connection', 'Selective sync per folder', 'Upload queue with pause and retry', 'File history with one-click restore'], t: 'Built on the Windows Cloud Files API.' },
  { id: 'mac', l: 'macOS', i: Laptop, h: 'Native in Finder, with live status.', p: 'OmniDrive sits in the Finder sidebar. Every file shows whether it is online only, syncing, or available offline, and a right-click changes it.', b: ['Cloud Files in the Finder sidebar', 'Available Offline, Syncing and Online Only views', 'Status badges on every file', 'Apple silicon and Intel'], t: 'Built on the macOS File Provider framework.' },
  { id: 'linux', l: 'Linux', i: Terminal, h: 'A desktop sync client and a full CLI.', p: 'Run the tray app on your desktop or drive everything from the terminal and CI. Packages for the major distributions.', b: ['Ubuntu, Debian and Fedora packages', 'Desktop sync client with tray icon', 'omnidrive CLI for scripts and servers', 'Mount your workspace at ~/OmniDrive'], t: 'Mounts through FUSE.' },
];
const DISTROS: Record<string, string> = { Ubuntu: 'sudo apt install omnidrive', Debian: 'sudo apt install omnidrive', Fedora: 'sudo dnf install omnidrive' };

const Icon = ({ st }: { st: St }) => st === 'offline' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-label="Available offline" /> : st === 'syncing' ? <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" aria-label="Syncing" /> : <Cloud className="w-4 h-4 text-sky-500" aria-label="Online only" />;

export const DesktopApps: React.FC = () => {
  const [tab, setTab] = useState('win'), [files, setFiles] = useState(INIT), [wn, setWn] = useState('drive'), [mn, setMn] = useState('all');
  const [distro, setDistro] = useState('Ubuntu'), [copied, setCopied] = useState(false), [paused, setPaused] = useState(false);
  const [sel, setSel] = useState<Record<string, boolean>>({ Marketing: true, Design: true, Engineering: false, Archive: false });
  const cur = TABS.find(t => t.id === tab)!;
  const toggle = (n: string) => {
    const f = files.find(x => x.n === n)!;
    if (f.st === 'syncing') return;
    if (f.st === 'offline') return setFiles(fs => fs.map(x => x.n === n ? { ...x, st: 'online' } : x));
    setFiles(fs => fs.map(x => x.n === n ? { ...x, st: 'syncing' } : x));
    setTimeout(() => setFiles(fs => fs.map(x => x.n === n ? { ...x, st: 'offline' } : x)), 1400);
  };
  const list = (a: F[]) => a.length ? a.map(f => (
    <div key={f.n} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 text-sm">
      {f.dir ? <Folder className="w-4 h-4 text-neutral-500" /> : <FileText className="w-4 h-4 text-neutral-500" />}
      <span className="flex-1 truncate text-neutral-900">{f.n}</span><span className="text-xs font-mono text-neutral-500">{f.s}</span>
      <button onClick={() => toggle(f.n)} className="p-1 rounded hover:bg-neutral-100" aria-label={`${f.n}: ${f.st === 'offline' ? 'free up space' : 'keep on this device'}`} title={f.st === 'offline' ? 'Click to free up space' : f.st === 'online' ? 'Click to keep on this device' : 'Syncing…'}><Icon st={f.st} /></button>
    </div>)) : <div className="p-6 text-sm text-neutral-500 text-center">Nothing here.</div>;
  const winPanel = () => {
    if (wn === 'drive') return list(files);
    if (wn === 'offline') { const o = files.filter(f => f.st === 'offline'); return <>{list(o)}<div className="px-3 pt-2 text-xs font-mono text-neutral-500">{o.length} items kept on this device</div></>; }
    if (wn === 'sync') return <div className="p-4 text-sm"><div className="flex items-center gap-2 font-medium">{paused ? <Pause className="w-4 h-4 text-neutral-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}{paused ? 'Sync paused' : 'Up to date'}</div><p className="text-neutral-500 mt-1">{paused ? 'Changes will sync when you resume.' : 'Last synced 2 minutes ago.'}</p><button onClick={() => setPaused(!paused)} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-mono hover:bg-neutral-50">{paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}{paused ? 'Resume sync' : 'Pause sync'}</button></div>;
    if (wn === 'selective') return <div className="p-3 grid gap-1">{Object.keys(sel).map(k => <label key={k} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 text-sm"><input type="checkbox" checked={sel[k]} onChange={() => setSel({ ...sel, [k]: !sel[k] })} />{k}<span className="ml-auto text-xs font-mono text-neutral-500">{sel[k] ? 'Syncing to this PC' : 'Cloud only'}</span></label>)}</div>;
    if (wn === 'queue') return <div className="p-3 grid gap-3 text-sm">{[['Launch-edit.mov', 72], ['Dataset-v3.tar', 31], ['Q4 Plan.docx', 100]].map(([n, p]) => <div key={n as string}><div className="flex justify-between"><span>{n}</span><span className="text-xs font-mono text-neutral-500">{p === 100 ? 'Done' : p + '%'}</span></div><div className="mt-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden"><div className="h-full bg-neutral-900" style={{ width: p + '%' }} /></div></div>)}</div>;
    return <div className="p-3 grid gap-1 text-sm">{[['Budget.xlsx · v12', 'Today, 14:02', 'Current'], ['Budget.xlsx · v11', 'Yesterday', 'Restore'], ['Budget.xlsx · v10', 'Mon', 'Restore']].map(r => <div key={r[0]} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50"><History className="w-4 h-4 text-neutral-500" /><span className="flex-1">{r[0]}<span className="block text-xs text-neutral-500">{r[1]}</span></span><span className="text-xs font-mono text-neutral-600">{r[2]}</span></div>)}</div>;
  };
  const macFiles = mn === 'all' ? files : files.filter(f => f.st === mn);
  const copy = () => { navigator.clipboard?.writeText(DISTROS[distro]).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const dots = <div className="flex gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-red-400" /><i className="w-2.5 h-2.5 rounded-full bg-amber-400" /><i className="w-2.5 h-2.5 rounded-full bg-emerald-400" /></div>;
  return (
    <section id="desktop-apps" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3"><Monitor className="w-4 h-4 text-neutral-900" /><span>Desktop applications</span></div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">Your cloud, right inside your file manager</h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">No new window to learn. OmniDrive lives in Explorer, Finder and your Linux desktop.</p>
        </div>
        <div role="tablist" className="mt-10 flex justify-center gap-2">
          {TABS.map(t => <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 hover:bg-neutral-50'}`}><t.i className="w-4 h-4" />{t.l}</button>)}
        </div>
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-neutral-950 leading-snug">{cur.h}</h3>
            <p className="mt-3 text-neutral-600 leading-relaxed">{cur.p}</p>
            <ul className="mt-5 grid gap-2 text-sm text-neutral-800">{cur.b.map(x => <li key={x} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />{x}</li>)}</ul>
            <p className="mt-5 text-xs font-mono text-neutral-500">{cur.t}</p>
          </div>
          <div role="tabpanel" className="rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
            {tab === 'win' && <>
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50">{dots}<span className="text-xs font-mono text-neutral-600">O:\OmniDrive</span></div>
              <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[180px_1fr] min-h-[300px]">
                <div className="border-r border-neutral-200 p-2 text-sm"><div className="px-2 py-1.5 text-xs font-mono text-neutral-500">OmniDrive</div>{WIN_NAV.map(n => <button key={n.id} onClick={() => setWn(n.id)} aria-current={wn === n.id} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left ${wn === n.id ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}><n.i className="w-3.5 h-3.5 shrink-0" />{n.l}</button>)}</div>
                <div className="p-2">{winPanel()}</div>
              </div>
              <div className="px-4 py-2 border-t border-neutral-200 text-xs text-neutral-500">Click a status icon to keep a file on this PC or free up space.</div></>}
            {tab === 'mac' && <>
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50">{dots}<span className="text-xs font-semibold text-neutral-700 mx-auto pr-10">OmniDrive</span></div>
              <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[180px_1fr] min-h-[300px]">
                <div className="border-r border-neutral-200 bg-neutral-50/70 p-2 text-sm"><div className="px-2 py-1.5 text-xs font-semibold text-neutral-400">Locations</div>{MAC_NAV.map(n => <button key={n.id} onClick={() => setMn(n.id)} aria-current={mn === n.id} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left ${mn === n.id ? 'bg-sky-100 text-neutral-950' : 'text-neutral-700 hover:bg-neutral-100'}`}><Cloud className="w-3.5 h-3.5 text-sky-500 shrink-0" />{n.l}</button>)}</div>
                <div className="p-2">{list(macFiles)}</div>
              </div>
              <div className="px-4 py-2 border-t border-neutral-200 text-xs text-neutral-500">Click a status icon to download a file or remove its download.</div></>}
            {tab === 'linux' && <>
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-800 bg-neutral-900">{dots}<span className="text-xs font-mono text-neutral-400">user@host: ~</span></div>
              <div className="bg-neutral-950 text-neutral-100 p-5 font-mono text-[13px] leading-relaxed min-h-[300px] overflow-x-auto">
                <div className="flex gap-2 mb-4 font-sans">{Object.keys(DISTROS).map(d => <button key={d} onClick={() => setDistro(d)} aria-pressed={distro === d} className={`px-3 py-1 rounded-full text-xs ${distro === d ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>{d}</button>)}</div>
                <div className="flex items-center justify-between gap-3"><span><span className="text-emerald-400">$</span> {DISTROS[distro]}</span><button onClick={copy} className="shrink-0 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700" aria-label="Copy install command">{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}</button></div>
                <div className="mt-3"><span className="text-emerald-400">$</span> omnidrive login</div>
                <div><span className="text-emerald-400">$</span> omnidrive mount ~/OmniDrive</div>
                <div><span className="text-emerald-400">$</span> omnidrive status</div>
                <div className="text-neutral-400">Synced · 3 uploading · 1 paused · 38 GB cloud only</div>
                <div className="mt-2"><span className="text-emerald-400">$</span> omnidrive pin Reports/ --offline</div>
                <div><span className="text-emerald-400">$</span> omnidrive sync --select Marketing Design</div>
                <div><span className="text-emerald-400">$</span> omnidrive history Budget.xlsx</div>
              </div></>}
          </div>
        </div>
      </div>
    </section>
  );
};
