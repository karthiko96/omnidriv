import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface WhyOmniDriveProps {
  onOpenGetStarted: () => void;
  onExploreSdk: () => void;
  onSeeEnterprise: () => void;
}

export const WhyOmniDrive: React.FC<WhyOmniDriveProps> = ({
  onExploreSdk,
  onSeeEnterprise
}) => {
  const points = [
    {
      num: '01',
      title: 'Files open instantly',
      description:
        'OmniDrive streams byte ranges from the cloud in real time, meaning files never need to be downloaded before being opened in your applications. A 50 GB 8K video opens in 200 milliseconds.'
    },
    {
      num: '02',
      title: 'Instant sync and collaboration',
      description:
        'Hit save and your changes are synced across every device connected to your workspace in seconds. Your teammates see your modifications with zero manual re-uploading or sync conflicts.'
    },
    {
      num: '03',
      title: 'Works with the apps you already use',
      description:
        'Premiere, Blender, Final Cut, Figma, Revit, AutoCAD, Excel, Xcode, and VS Code all see OmniDrive as a lightning-fast native SSD drive. No special plugins or proprietary file formats required.'
    },
    {
      num: '04',
      title: 'Your agents work in it too',
      description:
        'Autonomous AI agents read and write the exact same files you do through safe POSIX mounts and our Model Context Protocol (MCP) server. When an agent saves code or renders an asset, it appears immediately.'
    },
    {
      num: '05',
      title: 'Persistent and versioned',
      description:
        'Every single save is a cryptographic version snapshot, so nothing is ever lost or overwritten. Fork an entire 20 TB project in an instant with zero copying or extra disk cost.'
    }
  ];

  return (
    <section id="why-omnidrive" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Never wait for file transfers again
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            OmniDrive streams files in real time, straight to the application that asks for them. No more juggling external hard drives or waiting hours for large file downloads.
          </p>
        </div>

        {/* Editorial numbered feature list */}
        <div className="mt-16 divide-y divide-neutral-200/90 border-y border-neutral-200/90">
          {points.map((point) => (
            <div
              key={point.num}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-white/60 px-4 -mx-4 rounded-xl"
            >
              <div className="md:col-span-1 text-sm font-mono text-neutral-400">
                {point.num}
              </div>
              <div className="md:col-span-4 text-xl sm:text-2xl font-semibold text-neutral-950 font-display">
                {point.title}
              </div>
              <div className="md:col-span-7 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {point.description}
              </div>
            </div>
          ))}
        </div>

        {/* Action cards matching screenshot */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onExploreSdk}
            className="group p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-900 transition-all text-left flex items-center justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-xs text-neutral-500 font-mono">Building on OmniDrive?</div>
              <div className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-neutral-950">
                Explore the Developer SDK
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={onSeeEnterprise}
            className="group p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-900 transition-all text-left flex items-center justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-xs text-neutral-500 font-mono">Rolling out to your organization?</div>
              <div className="mt-1 text-base font-semibold text-neutral-900 group-hover:text-neutral-950">
                See Enterprise & Administration
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
