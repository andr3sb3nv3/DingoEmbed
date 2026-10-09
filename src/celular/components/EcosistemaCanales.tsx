import React, { useState } from "react";
import { ChevronRight, Target, BarChart3, TrendingUp, Zap } from "lucide-react";

//  ── LOGOS VECTORIALES (SVGs) ─────────────────────────────────────────────
const MetaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const MLLogo = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7">
    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" fill="#FFE600" />
    <path d="M14 24l7 7 13-14" stroke="#2D3277" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
  </svg>
);

//  ── ESTRUCTURA DE DATOS PRINCIPAL ─────────────────────────────────────────
const PLATFORMS = [
  {
    id: "meta",
    logo: <MetaLogo />,
    logoBg: "bg-[#1877F2] text-white",
    es: {
      name: "Meta Ads",
      role: "Generación de Demanda",
      objective: "Escalabilidad & Performance",
      description: "Meta Ads escala tu facturación con segmentación avanzada y creatividades de alto impacto.",
      specs: [
        "Advantage+ Shopping Campaigns con señales first-party",
        "Conversions API para recuperar señales post-iOS 14",
        "DPA (Dynamic Product Ads) con reglas de catálogo",
        "Arquitectura prospecting → retargeting → retención",
        "Creative testing estructurado por variable independiente"
      ]
    },
    en: {
      name: "Meta Ads",
      role: "Demand Generation",
      objective: "Scalability & Performance",
      description: "Meta Ads scales your revenue with advanced segmentation and high-impact creatives.",
      specs: [
        "Advantage+ Shopping Campaigns with first-party signals",
        "Conversions API to recover post-iOS 14 signals",
        "DPA (Dynamic Product Ads) with catalog rules",
        "Prospecting → Retargeting → Retention architecture",
        "Creative testing structured by independent variables"
      ]
    }
  },
  {
    id: "google",
    logo: <GoogleLogo />,
    logoBg: "bg-white border border-gray-100",
    es: {
      name: "Google Ads",
      role: "Captura de Intención",
      objective: "Conversión de Alta Intención",
      description: "Google Ads captura intención de compra directa posicionando tu marca en búsquedas.",
      specs: [
        "Performance Max con grupos de activos por categoría",
        "Shopping feed optimizado: títulos y atributos",
        "Smart Bidding con señales de calidad",
        "Conversiones mejoradas + Consent Mode V2",
        "RLSA y Customer Match para segmentación"
      ]
    },
    en: {
      name: "Google Ads",
      role: "Intent Capture",
      objective: "High-Intent Conversion",
      description: "Google Ads captures direct purchase intent by positioning your brand in search results.",
      specs: [
        "Performance Max with asset groups by category",
        "Optimized Shopping feed: titles and attributes",
        "Smart Bidding with quality signals",
        "Enhanced Conversions + Consent Mode V2",
        "RLSA and Customer Match for segmentation"
      ]
    }
  },
  {
    id: "ml",
    logo: <MLLogo />,
    logoBg: "bg-[#FFE600] text-black",
    es: {
      name: "ML Ads",
      role: "Dominio de Marketplace",
      objective: "Ventas Directas & Market Share",
      description: "ML Ads domina el marketplace más grande de la región impulsando tus ventas.",
      specs: [
        "Product Ads con gestión de pujas por ROI objetivo",
        "Brand Ads para dominar búsquedas de marca",
        "Análisis de share of voice y posición competitiva",
        "Estrategia coordinada orgánico + paid",
        "Segmentación por GMV histórico para escalar"
      ]
    },
    en: {
      name: "ML Ads",
      role: "Marketplace Dominance",
      objective: "Direct Sales & Market Share",
      description: "ML Ads dominates the largest marketplace in the region, driving your sales.",
      specs: [
        "Product Ads with bid management for target ROI",
        "Brand Ads to dominate brand searches",
        "Share of voice and competitive position analysis",
        "Coordinated organic + paid strategy",
        "Segmentation by historical GMV for scaling"
      ]
    }
  },
  {
    id: "tiktok",
    logo: <TikTokLogo />,
    logoBg: "bg-black text-white",
    es: {
      name: "TikTok Ads",
      role: "Upper Funnel",
      objective: "Awareness & Branding Viral",
      description: "TikTok Ads conecta tu marca con audiencias masivas mediante contenido viral nativo.",
      specs: [
        "Video Ads nativos con estructura hook-retención",
        "Smart+ Campaigns con optimización automática",
        "Ventas de catálogo para retargeting de visitantes",
        "Pixel TikTok con eventos de e-commerce",
        "Coordinación cross-channel con Meta"
      ]
    },
    en: {
      name: "TikTok Ads",
      role: "Upper Funnel",
      objective: "Awareness & Viral Branding",
      description: "TikTok Ads connects your brand with massive audiences using native viral content.",
      specs: [
        "Native Video Ads with hook-retention structure",
        "Smart+ Campaigns with automatic optimization",
        "Catalog Sales for visitor retargeting",
        "TikTok Pixel with e-commerce events",
        "Cross-channel coordination with Meta"
      ]
    }
  }
];

//  ── COMPONENTE EXPORTADO ──────────────────────────────────────────────────
export default function EcosistemaCanales({ initialTab, lang = "es" }: { initialTab?: string, lang?: "es" | "en" }) {
  const [activeId, setActiveId] = useState(initialTab || "meta");

  const platform = PLATFORMS.find((p) => p.id === activeId);
  const activePlatform = platform ? { ...platform, ...platform[lang] } : null;

  return (
    <div className="bg-white pt-28 pb-12 md:pt-36 lg:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Header and Navigation (Selector) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8 lg:sticky lg:top-36">
            {/* Header Section */}
            <header className="w-full text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#001B3D] italic uppercase tracking-tighter leading-[0.95]">
                {lang === "es" ? (
                  <>Cuatro canales.<br /><span className="text-yellow-500">Un solo sistema.</span></>
                ) : (
                  <>Four channels.<br /><span className="text-yellow-500">One single system.</span></>
                )}
              </h1>
            </header>

            {/* Selector de Navegación Neumórfico */}
            <nav className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="bg-slate-50 p-1.5 md:p-2 rounded-2xl flex flex-nowrap gap-1 md:gap-2 shadow-[10px_10px_30px_#bebebe,-10px_-10px_30px_#ffffff] md:shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
                {PLATFORMS.map((p) => {
                  const isActive = activeId === p.id;
                  const data = p[lang];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveId(p.id)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-4 rounded-xl transition-all duration-300 font-bold text-xs md:text-sm cursor-pointer select-none
                        ${isActive 
                          ? "text-[#00E676] bg-white shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]" 
                          : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
                        }
                      `}
                    >
                      <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "opacity-60"}`}>{p.logo}</span>
                      <span className="hidden sm:inline transition-opacity duration-300">{data.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Right Column: Panel de Detalle de Tarjeta */}
          <main className="lg:col-span-7 w-full transition-all duration-500">
            <div className="bg-white rounded-[25px] overflow-hidden shadow-xl md:shadow-2xl border border-slate-100">
              <div className="grid md:grid-cols-5 min-h-0 md:min-h-[460px]">
                
                {/* Columna Visual Lateral (Se oculta en móviles) */}
                <div className={`hidden md:flex md:col-span-2 p-8 flex-col justify-center items-center text-center transition-colors duration-500 ${activePlatform?.logoBg}`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    {activePlatform?.logo}
                  </div>
                  <h2 className="text-2xl font-black mb-1 tracking-tight italic uppercase">{activePlatform?.name}</h2>
                  <p className="text-[9px] font-mono opacity-80 uppercase tracking-[0.25em] font-black">
                    {activePlatform?.role}
                  </p>
                </div>

                {/* Columna de Estrategia */}
                <div className="col-span-1 md:col-span-3 p-6 md:p-10 flex flex-col justify-between bg-white text-left">
                  <div>
                    {/* Objetivo Principal */}
                    <div className="flex items-center gap-3 mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="p-1.5 bg-white text-[#001B3D] rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
                        <div className="scale-75">
                          {activePlatform?.logo}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#00E676] opacity-70">
                          {lang === "es" ? "Objetivo Principal" : "Main Objective"}
                        </p>
                        <p className="text-[#001B3D] font-black text-sm md:text-base italic uppercase leading-none">
                          {activePlatform?.objective}
                        </p>
                      </div>
                    </div>

                    {/* Texto Descriptivo */}
                    <p className="text-slate-600 leading-relaxed mb-5 text-xs md:text-sm italic font-medium">
                      "{activePlatform?.description}"
                    </p>
                    
                    {/* Specs / Listado de características de gran desempeño */}
                    <div className="space-y-2 mb-6">
                      {activePlatform?.specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                            <ChevronRight size={10} className="text-[#00E676]" />
                          </div>
                          <span className="text-slate-700 font-semibold text-xs md:text-sm leading-tight">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón de Acción Call to Action */}
                  <button className="self-start px-6 py-3 bg-[#001B3D] hover:bg-[#001B3D]/90 text-white rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:scale-103 active:scale-97 transition-all shadow-lg shadow-[#001B3D]/20 cursor-pointer select-none">
                    {lang === "es" ? "Optimizar mi canal" : "Optimize my channel"}
                  </button>
                </div>

              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

