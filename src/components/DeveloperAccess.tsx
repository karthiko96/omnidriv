import React, { useState } from 'react';
import { Terminal, Code, Copy, Check, Cpu } from 'lucide-react';

export const DeveloperAccess: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'typescript' | 'python' | 'cli' | 'posix'>('typescript');
  const [copied, setCopied] = useState(false);

  const snippets = {
    typescript: `import { OmniDrive } from '@omnidrive/sdk';

// Initialize with scoped team credentials
const drive = new OmniDrive({
  apiKey: process.env.OMNIDRIVE_API_KEY,
  workspaceId: 'ws_creative_launch'
});

// Stream byte-ranges directly without full file download
const stream = await drive.files.createReadStream('launch-hero_4k.mov', {
  start: 0,
  end: 1024 * 1024 * 64 // First 64MB chunk
});

// Watch changes across connected teammates and agents in real time
drive.watch('/Launch Assets', (event) => {
  console.log(\`File \${event.path} was modified by \${event.author}\`);
});`,
    python: `import omnidrive

# Connect Python worker to persistent drive
client = omnidrive.Client(api_key="omni_sec_8921a9f")

# Stream PyTorch weights directly into GPU memory
weights_ref = client.open("models/transformer_weights_v2.safetensors")
with weights_ref.stream() as stream:
    model.load_state_dict(torch.load(stream, map_location="cuda:0"))

# Create an immutable snapshot fork of current dataset
fork_result = client.drives.fork("dataset_v1", new_name="dataset_v1_experiment_3")
print(f"Fork created in 12ms: {fork_result.mount_path}")`,
    cli: `# Install OmniDrive CLI daemon globally
curl -fsSL https://get.omnidrive.io/install.sh | sh

# Mount team workspace as a local POSIX filesystem
omnidrive mount ws_creative_launch /Volumes/OmniDrive --cache-size 10GB

# Search files via semantic neural CLI
omnidrive search "indemnification clause $50k" --json

# Run a headless AI agent with sandboxed access
omnidrive agent run claude-worker --scope "/Volumes/OmniDrive/Engineering"`,
    posix: `# Native FUSE Kernel Integration
# Once mounted, ANY standard terminal utility works directly:

$ ls -lh /Volumes/OmniDrive/Launch\\ Assets/
-rw-r--r--  1 user  staff    24G Oct 05 23:14 launch-hero_4k.mov
-rw-r--r--  1 user  staff   820M Oct 05 23:05 Canyon_Rock_Albedo_8K.png

$ ffmpeg -ss 00:01:30 -i "/Volumes/OmniDrive/Launch Assets/launch-hero_4k.mov" -frames:v 1 preview.jpg
# ffmpeg byte-ranges 4MB from the cloud in 140ms without downloading 24GB!`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-neutral-800" />
              <span>Developer-First Platform</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
              Developer & API access for every stack
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              OmniDrive isn't just an app—it's a high-performance distributed virtual filesystem. Interact via idiomatic TypeScript, Python, Go, Rust, or mount directly into any Linux or macOS environment via FUSE.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 font-mono text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>REST & GraphQL APIs with webhooks</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>POSIX-compliant FUSE driver for local scripts</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>High-throughput S3-compatible gateway</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Real-time WebSocket filesystem mutation events</span>
              </div>
            </div>
          </div>

          {/* Right code terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden font-mono text-xs">
              {/* Tab selector */}
              <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="flex items-center gap-1">
                    {(['typescript', 'python', 'cli', 'posix'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors uppercase ${
                          activeLang === lang
                            ? 'bg-neutral-800 text-white font-semibold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Copy snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="p-5 overflow-x-auto">
                <pre className="text-neutral-200 leading-relaxed font-mono">
                  <code>{snippets[activeLang]}</code>
                </pre>
              </div>

              {/* Terminal footer */}
              <div className="px-5 py-2.5 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                <span>SDK v2.8.4 &middot; zero external runtime dependencies</span>
                <span className="text-emerald-400">● 99.99% API Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
