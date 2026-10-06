import React, { useState } from 'react';
import { Cloud, HardDrive, Download, Check, Sparkles, ArrowDownToLine } from 'lucide-react';

interface SmartFile { name: string; size: number; kind: string; removable: boolean; onlineOnly: boolean }

const initialFiles: SmartFile[] = [
  { name: 'ProjectVideo.mp4', size: 20, kind: 'Video', removable: true, onlineOnly: false },
  { name: 'Design cache and previews', size: 36, kind: 'Design files', removable: true, onlineOnly: false },
  { name: 'Archived project assets', size: 36, kind: 'Project files', removable: true, onlineOnly: false },
  { name: 'Active work files', size: 55, kind: 'Mixed files', removable: false, onlineOnly: false },
];

export const SmartStorage: React.FC = () => {
  const [files, setFiles] = useState(initialFiles);
  const [opening, setOpening] = useState<string | null>(null);
  const [ready, setReady] = useState<string | null>(null);
  const [freed, setFreed] = useState(false);
  const localUsed = files.reduce((sum, file) => sum + (file.onlineOnly ? 0 : file.size), 0);
  const potential = files.reduce((sum, file) => sum + (file.removable && !file.onlineOnly ? file.size : 0), 0);

  const freeSpace = () => {
    setFiles(current => current.map(file => file.removable ? { ...file, onlineOnly: true } : file));
    setFreed(true);
  };

  const openFile = (file: SmartFile) => {
    if (opening) return;
    setReady(null);
    if (!file.onlineOnly) {
      setReady(file.name);
      return;
    }
    setOpening(file.name);
    window.setTimeout(() => {
      setOpening(null);
      setReady(file.name);
    }, 1300);
  };

  return (
    <section id="smart-storage" className="border-t border-neutral-200/80 bg-[#f8fafc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700"><Sparkles className="h-4 w-4"/>Smart storage</div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-5xl">Your files are there. Your disk stays free.</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">Online-only files appear in your file manager without storing the full file locally. OmniDrive fetches only the chunks you need when you open one.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><HardDrive className="h-5 w-5"/></span><div><h3 className="font-semibold text-neutral-900">Local disk usage</h3><p className="text-sm text-neutral-500">Files using local storage</p></div></div>
            <div className="mt-6 flex items-baseline gap-2"><span className="text-4xl font-bold tracking-tight text-neutral-950">{localUsed} GB</span><span className="text-sm text-neutral-500">currently used</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${(localUsed / 200) * 100}%` }}/></div>
            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4"><div className="text-sm font-medium text-neutral-800">Potentially removable</div><div className="mt-1 flex items-end justify-between gap-3"><span className="text-2xl font-bold text-emerald-700">{potential} GB</span><ArrowDownToLine className="h-5 w-5 text-emerald-600"/></div></div>
            <button onClick={freeSpace} disabled={potential === 0} className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-emerald-600">{potential > 0 ? `Free ${potential} GB` : <span className="inline-flex items-center gap-2"><Check className="h-4 w-4"/>{freed ? 'Space freed' : 'Everything optimized'}</span>}</button>
            <p className="mt-3 text-center text-xs text-neutral-500">Your cloud copies stay safe. Freeing space removes only local copies.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4"><div><h3 className="font-semibold text-neutral-900">Online-only files</h3><p className="mt-0.5 text-sm text-neutral-500">Open a file to fetch only the chunks you need</p></div><Cloud className="h-5 w-5 text-sky-500"/></div>
            <div className="divide-y divide-neutral-100">
              {files.map(file => <div key={file.name} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${file.onlineOnly ? 'bg-sky-50 text-sky-600' : 'bg-neutral-50 text-neutral-500'}`}><Cloud className="h-5 w-5"/></span>
                <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-neutral-900">{file.name}</div><div className="mt-0.5 text-xs text-neutral-500">{file.kind} · {file.size} GB · {file.onlineOnly ? 'Online only' : 'On this device'}</div></div>
                <button onClick={() => openFile(file)} disabled={opening !== null} className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 hover:border-sky-300 hover:text-sky-700 disabled:opacity-60"><span className="inline-flex items-center gap-1.5">{opening === file.name ? <Download className="h-3.5 w-3.5 animate-bounce"/> : ready === file.name ? <Check className="h-3.5 w-3.5 text-emerald-600"/> : null}{opening === file.name ? 'Fetching chunks…' : ready === file.name ? 'Ready to open' : 'Open'}</span></button>
              </div>)}
            </div>
            <div className="flex items-start gap-3 bg-sky-50/70 px-5 py-4 text-xs leading-relaxed text-sky-900"><Download className="mt-0.5 h-4 w-4 shrink-0 text-sky-600"/><span>{opening ? `Cloud → Download required chunks → Open ${opening}` : ready ? `${ready} is ready to open${files.find(file => file.name === ready)?.onlineOnly ? ' after fetching its required chunks' : ' from its local copy'}.` : 'Cloud → Download required chunks → Open. Large files stay online-only until you need them.'}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
