import React from 'react';
import { Bot, Terminal, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const AIAgentAccess: React.FC = () => {
  return (
    <section id="ai-agents" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3">
            <Bot className="w-4 h-4 text-purple-600" />
            <span>Autonomous Intelligence Primitives</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            First-class AI agent filesystem access
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Give coding assistants, research swarms, and background automation agents safe, scoped access to your files without granting them root machine permissions.
          </p>
        </div>

        {/* 3 Columns of Agent capabilities */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-950 font-display">
              Built-in MCP Server
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Native support for the Model Context Protocol (MCP). Claude Code, Cursor, and ChatGPT connect directly to your OmniDrive workspace with standard tool definitions.
            </p>
            <div className="pt-2 text-xs font-mono text-purple-800 bg-purple-50/70 p-2.5 rounded-lg border border-purple-200/50">
              mcp://omnidrive.local/ws_creative
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-950 font-display">
              Strict Sandbox & Path Scopes
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Restrict agents to designated subfolders (e.g. `/Renders/Drafts` or `/Code/Tests`). Agents cannot traverse outside their path boundary or delete protected versions.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/50">
              scope: ["/Drafts/*", "read:/Assets"]
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-950 font-display">
              Atomic Audit Trails
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every token, model mutation, or generated asset is cryptographically signed by the agent ID. Identify exactly which model generated a file and roll back anytime.
            </p>
            <div className="pt-2 text-xs font-mono text-sky-800 bg-sky-50/70 p-2.5 rounded-lg border border-sky-200/50">
              signed: agent_claude_3.7_sonnet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
