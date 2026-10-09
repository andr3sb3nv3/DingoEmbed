import React, { useState } from "react";
import { FolderCode, FileJson, FileCode, Check, Copy, ChevronDown, ChevronRight, Terminal } from "lucide-react";
import packageJsonContent from "../../../package.json?raw"
import indexCssContent from "../../index.css?raw"
import appTsxContent from "../App.tsx?raw"
import serviceDetailContent from "./ServiceDetailPage.tsx?raw"

interface ProjectCodeViewerProps {
  lang: "es" | "en";
}

export default function ProjectCodeViewer({ lang }: ProjectCodeViewerProps) {
  const [activeTab, setActiveTab] = useState<"package.json" | "index.css" | "App.tsx" | "ServiceDetailPage.tsx">("ServiceDetailPage.tsx");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const files = {
    "package.json": packageJsonContent,
    "index.css": indexCssContent,
    "App.tsx": appTsxContent,
    "ServiceDetailPage.tsx": serviceDetailContent
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#181824] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-6 z-40 relative">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-3 bg-[#11111b] border-b border-slate-800 gap-2">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Terminal className="w-4 h-4 text-amber-500" />
          <span className="font-mono text-xs font-black text-slate-200 tracking-wide uppercase flex items-center gap-1.5">
            {lang === "es" ? "Código del Proyecto" : "Project Source Code"} 
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
              dingo-ppc-amazon
            </span>
          </span>
        </div>

        {isExpanded && (
          <div className="flex items-center gap-3 justify-end">
            {/* Tab switchers */}
            <div className="flex bg-[#1e1e2e]/80 p-0.5 rounded-lg border border-slate-800/80">
              <button
                onClick={() => setActiveTab("ServiceDetailPage.tsx")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                  activeTab === "ServiceDetailPage.tsx" 
                    ? "bg-[#181824] text-white shadow-sm border border-slate-800/60" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                ServiceDetailPage.tsx
              </button>
              <button
                onClick={() => setActiveTab("App.tsx")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                  activeTab === "App.tsx" 
                    ? "bg-[#181824] text-white shadow-sm border border-slate-800/60" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                App.tsx
              </button>
              <button
                onClick={() => setActiveTab("package.json")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                  activeTab === "package.json" 
                    ? "bg-[#181824] text-white shadow-sm border border-slate-800/60" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileJson className="w-3.5 h-3.5 text-amber-500" />
                package.json
              </button>
              <button
                onClick={() => setActiveTab("index.css")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                  activeTab === "index.css" 
                    ? "bg-[#181824] text-white shadow-sm border border-slate-800/60" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FolderCode className="w-3.5 h-3.5 text-cyan-400" />
                index.css
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 rounded-lg text-xs font-bold transition-all border border-slate-700 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === "es" ? "Copiado!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Editor Body */}
      {isExpanded && (
        <div className="relative text-left font-mono text-xs text-slate-300 bg-[#1e1e2e] leading-relaxed overflow-x-auto max-h-[290px] p-4 scrollbar-thin scrollbar-thumb-slate-800 select-text">
          <pre className="whitespace-pre overflow-x-auto">
            <code>
              {files[activeTab].split("\n").map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-slate-600 select-none text-[10px] w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell whitespace-pre-wrap word-break-all">
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
