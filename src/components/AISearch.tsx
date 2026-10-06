import React, { useState } from 'react';
import { Search, Sparkles, FileText, Video, Box, ArrowRight, CornerDownLeft, Shield } from 'lucide-react';

interface SearchResult {
  title: string;
  type: string;
  path: string;
  snippet: string;
  matchScore: string;
  synthesizedAnswer?: string;
}

export const AISearch: React.FC = () => {
  const [query, setQuery] = useState('Where is the indemnification clause capped at $50k?');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const presets = [
    'Where is the indemnification clause capped at $50k?',
    'Show me 4K ProRes videos exported this month',
    'Find the 3D rock model with 8K albedo texture',
    'What were the Q3 enterprise gross margins in the spreadsheet?'
  ];

  const resultsMap: Record<string, SearchResult> = {
    'Where is the indemnification clause capped at $50k?': {
      title: 'Enterprise_Master_Service_Agreement_v4.2.pdf',
      type: 'pdf',
      path: '/OmniDrive/Legal/Contracts/2026/Enterprise_Master_Service_Agreement_v4.2.pdf',
      snippet: 'Section 12.3 (Limitation of Liability): "In no event shall aggregate liability exceed the total fees paid in preceding 12 months, capped strictly at fifty thousand United States dollars ($50,000.00)..."',
      matchScore: '99.4% semantic match',
      synthesizedAnswer: 'Located in Section 12.3, Page 14 of the Master Service Agreement executed with Acme Holdings on March 18, 2026.'
    },
    'Show me 4K ProRes videos exported this month': {
      title: 'launch-hero_4k.mov',
      type: 'video',
      path: '/OmniDrive/Team/Launch Assets/launch-hero_4k.mov',
      snippet: 'Format: ProRes 422 HQ · Resolution: 3840x2160 · Audio: 24-bit 48kHz Stereo · Rendered: 12 minutes ago by Video Studio.',
      matchScore: '98.9% semantic match',
      synthesizedAnswer: 'Found 1 primary master delivery file (24.3 GB) in Launch Assets ready for streaming.'
    },
    'Find the 3D rock model with 8K albedo texture': {
      title: 'Canyon_Rock_Albedo_8K.png & Canyon_Rock.blend',
      type: '3d',
      path: '/OmniDrive/Engineering/3D/Canyon/Canyon_Rock_Albedo_8K.png',
      snippet: 'PBR texture map with matching Blender scene file Canyon_Rock.blend (486 MB). Vertex count: 142k, UV unwrap verified.',
      matchScore: '97.8% semantic match',
      synthesizedAnswer: 'Found 8K PBR map along with the master Blender file in the Canyon environment folder.'
    },
    'What were the Q3 enterprise gross margins in the spreadsheet?': {
      title: 'Q3 Metrics.xlsx',
      type: 'sheet',
      path: '/OmniDrive/Finance/2026/Q3 Metrics.xlsx',
      snippet: 'Sheet "Consolidated P&L", Cell G44: Enterprise SaaS Gross Margin recorded at 81.4%, beating target forecast of 78.5%.',
      matchScore: '99.1% semantic match',
      synthesizedAnswer: 'Q3 Enterprise gross margin is 81.4% (Cell G44 in Consolidated P&L tab).'
    }
  };

  const currentResult = resultsMap[query] || resultsMap[presets[0]];

  const handleSelectPreset = (p: string) => {
    setIsSearching(true);
    setQuery(p);
    setTimeout(() => {
      setIsSearching(false);
    }, 180);
  };

  return (
    <section id="ai-search" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>Multimodal Intelligence</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Find anything. Ask anything.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Search 10x faster than local Spotlight, across your Mac, Windows PC, and every OmniDrive drive. Ask OmniDrive to work with files that don't even exist on your local disk.
          </p>
        </div>

        {/* Interactive Spotlight Search Bar */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="rounded-2xl border-2 border-neutral-900/10 shadow-xl bg-white p-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
              <Search className="w-5 h-5 text-neutral-500 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask OmniDrive in natural language..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 focus:outline-none placeholder:text-neutral-400"
              />
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-200/60 text-xs font-mono text-neutral-600">
                <span>Enter</span>
                <CornerDownLeft className="w-3 h-3" />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="px-3 pt-3 pb-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-400 mr-1">Try asking:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-xs px-2.5 py-1 rounded-md text-left transition-colors truncate max-w-xs ${
                    query === preset
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Instant AI Synthesized Response Box */}
          <div className="mt-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/60 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider flex items-center justify-between">
                    <span>OmniDrive Neural File Synthesis</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      {currentResult.matchScore}
                    </span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base font-medium text-neutral-900 leading-relaxed">
                    {currentResult.synthesizedAnswer}
                  </p>
                </div>

                {/* Source File Card */}
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-semibold text-neutral-900">{currentResult.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">Byte-Stream Available</span>
                  </div>

                  <div className="text-xs text-neutral-500 font-mono truncate">
                    {currentResult.path}
                  </div>

                  <p className="text-xs text-neutral-600 italic bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/40">
                    {currentResult.snippet}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
