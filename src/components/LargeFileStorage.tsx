import React from 'react';
import { LargeFileTransfer } from './LargeFileTransfer';
import { Film, Box, Cpu, Building2, Zap, Clock } from 'lucide-react';

export const LargeFileStorage: React.FC = () => {
  const useCases = [
    {
      icon: Film,
      domain: 'Film, Video & Post-Production',
      title: 'Edit 8K ProRes from anywhere. Leave the SSDs behind.',
      description:
        'Scrub through 150 GB raw camera masters directly in Premiere, DaVinci Resolve, or Final Cut. OmniDrive requests only the frames your playhead needs, streaming at up to 1.8 GB/s.',
      metric: '180 GB project',
      benchmark: 'Instant scrub in 180ms vs 52 min full download'
    },
    {
      icon: Box,
      domain: 'Games, VFX & 3D Virtual Worlds',
      title: 'Build bigger worlds without filling your local SSD.',
      description:
        'Unreal Engine 5, Unity, Blender, and Maya projects with 8K nanite textures and gigabytes of geometry can be checked out and rendered in parallel without copying folders.',
      metric: '420 GB world cache',
      benchmark: 'Zero local cloning overhead'
    },
    {
      icon: Cpu,
      domain: 'AI Research & Machine Learning',
      title: 'Stream model checkpoints and training datasets on demand.',
      description:
        'Mount terabytes of .safetensors weights, embeddings, and tokenized datasets directly into your PyTorch training scripts or local Ollama / vLLM inference instances.',
      metric: '70B parameter weights',
      benchmark: 'Streams in seconds to GPU memory'
    },
    {
      icon: Building2,
      domain: 'Architecture, Engineering & CAD',
      title: 'Keep multi-disciplinary teams synced on the latest BIM models.',
      description:
        'Revit, AutoCAD, SolidWorks, and Rhino assemblies link cleanly across global offices. Engineers always open the latest revision with zero broken external references.',
      metric: '25 GB complex BIM',
      benchmark: 'Zero broken references'
    }
  ];

  return (
    <section id="large-file-storage" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4 text-neutral-900" />
            <span>High-Throughput Streaming Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Large-file storage for massive workloads
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Engineered from the ground up for 100 GB+ media files, 3D assets, and ML model weights. Byte-range chunking delivers files on demand without local SSD bloat.
          </p>
        </div>

        {/* 2x2 Bento grid for creative & heavy industry workloads */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.domain}
                className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {item.domain}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-neutral-950 font-display leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">{item.metric}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.benchmark}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <LargeFileTransfer />
      </div>
    </section>
  );
};
