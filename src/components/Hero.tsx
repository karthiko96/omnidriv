import React, { useState } from 'react';
import { 
  Folder, FileText, Video, Image as ImageIcon, Box, 
  Search, HardDrive, Sparkles, Layers,
  Terminal, ShieldCheck, Download, ArrowRight, Grid, List, Eye,
  Home, Star, Clock3, Share2, Trash2, Settings, UserRound, Brain, Plus, UploadCloud, ChevronRight
} from 'lucide-react';
import { DriveFile } from '../types';

interface HeroProps {
  onOpenGetStarted: () => void;
  onOpenDownload: () => void;
  onSelectFile: (file: DriveFile) => void;
}

export const sampleFiles: DriveFile[] = [
  {
    id: 'f1',
    name: 'Brand',
    type: 'folder',
    size: '4.8 GB',
    itemsCount: 42,
    modified: 'Just now',
    author: 'Design Team',
    streamingSpeed: '1.2 GB/s',
    status: 'synced',
    description: 'Master vectors, design guidelines, brand kits, and 3D marks.'
  },
  {
    id: 'f2',
    name: 'Decks',
    type: 'folder',
    size: '1.4 GB',
    itemsCount: 18,
    modified: '2h ago',
    author: 'Elena Rostova',
    streamingSpeed: '980 MB/s',
    status: 'synced',
    description: 'Quarterly pitch decks, keynote presentations, and board updates.'
  },
  {
    id: 'f3',
    name: 'Legal',
    type: 'folder',
    size: '340 MB',
    itemsCount: 29,
    modified: 'Yesterday',
    author: 'Compliance Lead',
    streamingSpeed: '650 MB/s',
    status: 'synced',
    description: 'Executed MSAs, NDAs, patent filings, and corporate governance docs.'
  },
  {
    id: 'f4',
    name: 'Press Kit',
    type: 'folder',
    size: '890 MB',
    itemsCount: 14,
    modified: '3 days ago',
    author: 'PR & Media',
    streamingSpeed: '1.1 GB/s',
    status: 'synced',
    description: 'High-res photography, executive bios, and launch press releases.'
  },
  {
    id: 'f5',
    name: 'launch-hero_4k.mov',
    type: 'video',
    size: '24.3 GB',
    modified: '12m ago',
    author: 'Video Studio',
    streamingSpeed: '1.4 GB/s',
    status: 'streaming',
    description: 'ProRes 422 HQ 3840x2160 Master delivery. Streams instantly in Premiere without waiting for 24GB download.'
  },
  {
    id: 'f6',
    name: 'Pitch Deck.pdf',
    type: 'pdf',
    size: '45 MB',
    modified: '45m ago',
    author: 'Marcus Vance',
    streamingSpeed: '820 MB/s',
    status: 'synced',
    description: 'Series B presentation deck with financial projections and GTM expansion.'
  },
  {
    id: 'f7',
    name: 'Product Demo.mp4',
    type: 'video',
    size: '4.2 GB',
    modified: '1h ago',
    author: 'Growth Team',
    streamingSpeed: '1.1 GB/s',
    status: 'streaming',
    description: 'Interactive walkthrough video showing zero-latency FUSE filesystem mounting.'
  },
  {
    id: 'f8',
    name: 'Brand Guidelines.pdf',
    type: 'pdf',
    size: '95 MB',
    modified: 'Yesterday',
    author: 'Brand Design',
    streamingSpeed: '750 MB/s',
    status: 'synced',
    description: 'Typography hierarchy, color systems, voice guidelines, and logo lockups.'
  },
  {
    id: 'f9',
    name: 'Press Release.docx',
    type: 'doc',
    size: '84 KB',
    modified: '3h ago',
    author: 'PR Lead',
    streamingSpeed: '320 MB/s',
    status: 'synced',
    description: 'Embargoed press announcement for OmniDrive global availability.'
  },
  {
    id: 'f10',
    name: 'Team Photo.jpg',
    type: 'image',
    size: '8.4 MB',
    modified: '4h ago',
    author: 'People Ops',
    streamingSpeed: '580 MB/s',
    status: 'synced',
    description: 'High-resolution team group photo from annual offsite.'
  },
  {
    id: 'f11',
    name: 'Q3 Metrics.xlsx',
    type: 'sheet',
    size: '1.3 MB',
    modified: 'Just now',
    author: 'Finance & BI',
    streamingSpeed: '410 MB/s',
    status: 'agent-locked',
    description: 'Locked by Autonomous Financial Agent: reconciling live revenue streams.'
  },
  {
    id: 'f12',
    name: 'Launch Keynote.key',
    type: 'deck',
    size: '310 MB',
    modified: '2h ago',
    author: 'CEO Office',
    streamingSpeed: '940 MB/s',
    status: 'synced',
    description: 'Worldwide developer keynote presentation slides.'
  },
  {
    id: 'f13',
    name: 'Canyon_Rock_Albedo_8K.png',
    type: '3d',
    size: '820 MB',
    modified: '10m ago',
    author: 'Game Dev Team',
    streamingSpeed: '1.3 GB/s',
    status: 'streaming',
    description: '8192x8192 PBR texture map for Unreal Engine 5 virtual environment.'
  },
  {
    id: 'f14',
    name: 'model_weights.safetensors',
    type: 'model',
    size: '14.2 GB',
    modified: 'Just now',
    author: 'Claude Agent 03',
    streamingSpeed: '1.6 GB/s',
    status: 'agent-locked',
    description: 'Quantized transformer checkpoint written directly by background AI pipeline.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenGetStarted, onOpenDownload, onSelectFile }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'folders' | 'media' | 'docs'>('all');
  const [activeNav, setActiveNav] = useState('Home');

  const filteredFiles = sampleFiles.filter((file) => {
    const matchesQuery = file.name.toLowerCase().includes(filterQuery.toLowerCase());
    if (!matchesQuery) return false;
    if (activeCategory === 'folders') return file.type === 'folder';
    if (activeCategory === 'media') return ['video', 'image', '3d'].includes(file.type);
    if (activeCategory === 'docs') return ['pdf', 'doc', 'sheet', 'deck', 'model'].includes(file.type);
    return true;
  });

  const getFileIcon = (type: DriveFile['type']) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-10 h-10 text-sky-500 fill-sky-100" />;
      case 'video':
        return <Video className="w-10 h-10 text-violet-500 fill-violet-50" />;
      case 'pdf':
        return <FileText className="w-10 h-10 text-rose-500 fill-rose-50" />;
      case 'doc':
        return <FileText className="w-10 h-10 text-blue-500 fill-blue-50" />;
      case 'sheet':
        return <FileText className="w-10 h-10 text-emerald-500 fill-emerald-50" />;
      case 'deck':
        return <Layers className="w-10 h-10 text-amber-500 fill-amber-50" />;
      case 'image':
        return <ImageIcon className="w-10 h-10 text-teal-500 fill-teal-50" />;
      case '3d':
        return <Box className="w-10 h-10 text-indigo-500 fill-indigo-50" />;
      case 'model':
        return <Terminal className="w-10 h-10 text-purple-600 fill-purple-50" />;
      default:
        return <FileText className="w-10 h-10 text-neutral-500" />;
    }
  };

  const recentFiles = [
    { ...sampleFiles[5], name: 'Project Proposal.pdf' },
    { ...sampleFiles[6], name: 'Client Video.mp4' },
    { ...sampleFiles[0], name: 'Website Assets' },
    { ...sampleFiles[1], name: 'Project Alpha' },
  ];
  const navigation = [
    { label: 'Home', icon: Home }, { label: 'My Files', icon: Folder }, { label: 'Favorites', icon: Star },
    { label: 'Recent', icon: Clock3 }, { label: 'Shared', icon: Share2 }, { label: 'Trash', icon: Trash2 },
  ];

  return (
    <section className="relative min-h-[720px] bg-[#f8fafc] pb-16">
      <div className="mx-auto max-w-[1440px] overflow-hidden border-x border-neutral-200 bg-white shadow-sm">
        <header className="sticky top-0 z-30 flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-neutral-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white"><Layers className="h-4 w-4" /></span>
            OmniDrive
          </a>
          <label className="relative order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input value={filterQuery} onChange={e => setFilterQuery(e.target.value)} placeholder="Search files..." className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white" />
          </label>
          <div className="flex items-center gap-2">
            <button onClick={() => document.getElementById('transfers')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
              <Plus className="h-4 w-4" /><span>Upload</span>
            </button>
            <button onClick={onOpenGetStarted} aria-label="Profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"><UserRound className="h-4 w-4" /></button>
          </div>
        </header>
        <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="border-b border-neutral-200 bg-white p-3 md:border-b-0 md:border-r md:p-4">
            <nav aria-label="Main navigation" className="grid grid-cols-3 gap-1 md:grid-cols-1">
              {navigation.map(({label, icon: Icon}) => <button key={label} onClick={() => setActiveNav(label)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeNav===label?'bg-sky-50 font-semibold text-sky-700':'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}`}><Icon className="h-4 w-4 shrink-0"/><span>{label}</span></button>)}
            </nav>
            <div className="mt-6 hidden md:block">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Workspaces</div>
              {['Marketing','Design','Engineering'].map((name,i)=><button key={name} onClick={()=>setActiveNav(name)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${activeNav===name?'bg-neutral-100 text-neutral-900':'text-neutral-600 hover:bg-neutral-50'}`}><span className={`h-2 w-2 rounded-full ${['bg-rose-400','bg-violet-400','bg-emerald-400'][i]}`}/>{name}</button>)}
            </div>
            <div className="mt-6 hidden md:block">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">AI</div>
              {[['AI Search',Sparkles],['Organize',Brain]].map(([name,Icon])=>{const I=Icon as typeof Sparkles; return <button key={name as string} onClick={()=>setActiveNav(name as string)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"><I className="h-4 w-4"/>{name as string}</button>})}
            </div>
            <div className="mt-6 hidden md:block">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Settings</div>
              {[['Settings',Settings],['Profile',UserRound]].map(([name,Icon])=>{const I=Icon as typeof Settings; return <button key={name as string} onClick={()=>setActiveNav(name as string)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"><I className="h-4 w-4"/>{name as string}</button>})}
            </div>
          </aside>
          <main className="min-w-0 bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div><p className="text-sm font-medium text-neutral-500">Tuesday, October 6</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">Good morning <span aria-hidden="true">👋</span></h1></div>
                <button onClick={onOpenGetStarted} className="hidden items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800 sm:flex">Invite your team<ChevronRight className="h-4 w-4"/></button>
              </div>
              <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between"><div><h2 className="font-semibold text-neutral-900">Storage</h2><p className="mt-1 text-sm text-neutral-500">Your workspace usage</p></div><button onClick={()=>document.getElementById('smart-storage')?.scrollIntoView({behavior:'smooth'})} className="flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900"><HardDrive className="h-4 w-4"/>Free up disk space</button></div>
                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-neutral-100"><div className="h-full w-[64%] rounded-full bg-sky-500"/></div>
                <div className="mt-2 flex justify-between text-sm"><span className="font-medium text-neutral-800">64 GB used</span><span className="text-neutral-500">of 100 GB</span></div>
              </section>
              <section className="mt-8">
                <div className="mb-3 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-neutral-900">Recent Files</h2><p className="mt-0.5 text-sm text-neutral-500">Pick up where you left off</p></div><button onClick={()=>setActiveNav('Recent')} className="text-sm font-medium text-sky-700 hover:text-sky-800">View all</button></div>
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  {recentFiles.filter(file=>file.name.toLowerCase().includes(filterQuery.toLowerCase())).map(file=><button key={file.id} onClick={()=>onSelectFile(file)} className="flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3.5 text-left last:border-0 hover:bg-neutral-50 sm:px-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50">{getFileIcon(file.type)}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-neutral-900">{file.name}</span><span className="mt-0.5 block text-xs text-neutral-500">{file.modified} · {file.author}</span></span><span className="hidden text-xs text-neutral-500 sm:block">{file.size}</span><ChevronRight className="h-4 w-4 text-neutral-400"/>
                  </button>)}
                  {recentFiles.filter(file=>file.name.toLowerCase().includes(filterQuery.toLowerCase())).length===0&&<div className="p-8 text-center text-sm text-neutral-500">No recent files match your search.</div>}
                </div>
              </section>
              <section className="mt-8">
                <div className="mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-violet-500"/><h2 className="text-lg font-semibold text-neutral-900">AI suggestions</h2><span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">3 insights</span></div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[['24','duplicate files found','bg-violet-50 text-violet-700'],['8','obsolete files','bg-amber-50 text-amber-700'],['3','conflicting versions','bg-sky-50 text-sky-700']].map(([count,label,color])=><button key={label} onClick={()=>setActiveNav('Organize')} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-neutral-300 hover:shadow-sm"><span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${color}`}>{count}</span><span className="text-sm text-neutral-700">{label}</span><ChevronRight className="ml-auto h-4 w-4 shrink-0 text-neutral-400"/></button>)}
                </div>
              </section>
              <section className="mt-8 rounded-xl border border-sky-100 bg-sky-50/70 p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sky-600"><HardDrive className="h-5 w-5"/></span><div><div className="text-sm font-semibold text-neutral-900">Desktop apps for Windows, macOS, and Linux</div><div className="mt-0.5 font-mono text-sm text-sky-800">Windows Explorer · O:\OmniDrive</div><div className="mt-0.5 text-xs text-neutral-600">Finder integration · Ubuntu, Debian, Fedora + CLI</div></div></div><button onClick={()=>document.getElementById('desktop-apps')?.scrollIntoView({behavior:'smooth'})} className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50">Explore desktop apps</button></div><div className="mt-4 flex flex-wrap gap-2">{['Virtual Drive','Sync','Offline Files','Selective Sync','Upload Queue','File History'].map(label=><span key={label} className="rounded-full border border-sky-100 bg-white px-2.5 py-1 text-xs text-neutral-600">{label}</span>)}</div></section>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
