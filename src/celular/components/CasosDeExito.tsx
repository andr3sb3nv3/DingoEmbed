import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  Lightbulb, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";

export interface CaseStudy {
  id: string;
  category: "amazon" | "meli" | "social";
  brandName: string;
  nicheEs: string;
  nicheEn: string;
  heroMetric: string;
  heroMetricLabelEs: string;
  heroMetricLabelEn: string;
  logoUrl: string;
  challengeEs: string;
  challengeEn: string;
  strategyEs: string[];
  strategyEn: string[];
  resultsEs: string[];
  resultsEn: string[];
  growthStats: {
    labelEs: string;
    labelEn: string;
    value: string;
    trend: "up" | "down";
  }[];
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "case-1",
    category: "amazon",
    brandName: "Unit 1",
    nicheEs: "Tecnología Deportiva & Equipamiento Inteligente",
    nicheEn: "Smart Sports Gear & Wearables",
    heroMetric: "14.2%",
    heroMetricLabelEs: "TACOS Estabilizado",
    heroMetricLabelEn: "TACOS Secured",
    logoUrl: "https://dingoppc.com/wp-content/uploads/2025/07/u1-jpg.png",
    challengeEs: "La marca requería lanzar su nueva línea de cascos inteligentes integrando una estrategia PPC agresiva pero controlada en Amazon US y EU, buscando rentabilidad desde el primer día.",
    challengeEn: "The brand needed to launch its new smart helmets catalog across Amazon US and EU with a highly optimized PPC architecture targeting immediate profitability.",
    strategyEs: [
      "Re-estructuración total de la arquitectura de campañas aislada por coincidencia exacta y presupuesto rígido.",
      "Despliegue defensivo quirúrgico mediante Sponsored Display e incentivo mediante Brand Store.",
      "Optimización SEO profunda del catálogo de productos para potenciar el posicionamiento orgánico real.",
      "Algoritmo de puja dinámica ajustado por tramos horarios de mayor conversión."
    ],
    strategyEn: [
      "Total re-architecting of keyword match-type campaigns with isolated custom daily budget allocations.",
      "Deployment of surgical defense layers via Sponsored Product/Display campaigns surrounding company brand names.",
      "Comprehensive copy and SEO listings overhaul for immediate conversion rate optimization index scaling.",
      "Hourly dynamic bidding engine tailored around peak conversion traffic timeframes."
    ],
    resultsEs: [
      "Reducción definitiva del TACOS de 35.2% a un 14.2% sostenido.",
      "Incremento de un +180% en facturación orgánica sin elevar el gasto de pauta.",
      "Posicionamiento absoluto del top 3 de productos estrella en la primera página de búsquedas transaccionales."
    ],
    resultsEn: [
      "Secured structured global TACOS compression from 35.2% down to a sustainable 14.2%.",
      "Achieved a +180% organic sales wave growth without inflating public marketing caps.",
      "Anchored all 3 top flagship SKUs permanently in the absolute organic top-3 search slots."
    ],
    growthStats: [
      { labelEs: "TACOS Inicial", labelEn: "Initial TACOS", value: "35.2%", trend: "up" },
      { labelEs: "TACOS Final", labelEn: "Target TACOS", value: "14.2%", trend: "down" },
      { labelEs: "Ventas Orgánicas", labelEn: "Organic Sales", value: "+180%", trend: "up" }
    ]
  },
  {
    id: "case-2",
    category: "meli",
    brandName: "Filhos",
    nicheEs: "Moda Sostenible & Indumentaria Premium",
    nicheEn: "Sustainable Clothing & Premium Fashion",
    heroMetric: "5.2x",
    heroMetricLabelEs: "ROAS Promedio en Product Ads",
    heroMetricLabelEn: "Average Product Ads ROAS",
    logoUrl: "https://dingoppc.com/wp-content/uploads/2026/02/logo-1077334878-1739986519-0cfa1c846554de4c85aa56da8da9e63b1739986520-640-0.webp",
    challengeEs: "Ventas domésticas estancadas con altos costos operativos de logística y nula participación en eventos clave como Hot Sale y Buen Fin por falta de reputación calificada.",
    challengeEn: "Flatlining regional revenue compounded by severe logistics friction and minimal optimization of native marketing tools during high-volume shopping festivals.",
    strategyEs: [
      "Sincronización automatizada de promociones de temporada mediante Mercado Envíos Full.",
      "Segmentación precisa de pauta patrocinada de Mercado Libre (Product Ads) apuntalando términos de alta intención.",
      "Campañas personalizadas para obtener medallas oficiales de 'Tienda Oficial' dentro del ecosistema.",
      "Creación de kits estratégicos con precios optimizados para maximizar el ticket promedio."
    ],
    strategyEn: [
      "Systemic warehousing synchronization combined with strategic distribution routing via Mercado Envios Full.",
      "Granular keyword and bid mapping inside native Mercado Libre Product Ads portfolios.",
      "Targeted scaling loops that successfully unlocked 'Official Store' tier badge.",
      "Dynamic bundle and cross-selling listings composition to accelerate unified store Average Order Value."
    ],
    resultsEs: [
      "Logramos un retorno de inversión publicitaria promedio de 5.2x (ROAS).",
      "Obtención del estatus condecorado 'Tienda Oficial' en tiempo récord.",
      "Crecimiento del +210% de ventas mensuales brutas en México y Brasil."
    ],
    resultsEn: [
      "Maintained a stellar 5.2x unified Return on Advertising Spend (ROAS).",
      "Unlocked prestigious 'Official Store' elite credentials in record timeline.",
      "Propelled overall gross monthly revenue upward by a clean +210% across key accounts."
    ],
    growthStats: [
      { labelEs: "ROAS Promedio", labelEn: "Average ROAS", value: "5.2x", trend: "up" },
      { labelEs: "Ventas Totales", labelEn: "Unified Revenue", value: "+210%", trend: "up" },
      { labelEs: "Costo Adquisición", labelEn: "CAC Compress", value: "-35%", trend: "down" }
    ]
  }
];

interface CasosDeExitoProps {
  lang: "es" | "en";
  onGoBack: () => void;
  onContactClick: () => void;
}

export default function CasosDeExito({ lang, onGoBack, onContactClick }: CasosDeExitoProps) {
  // Store open state for each case independently
  const [expandedCases, setExpandedCases] = useState<Record<string, boolean>>({
    "case-1": false,
    "case-2": false
  });

  const toggleCase = (id: string) => {
    setExpandedCases((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full bg-[#f4f6fc] text-[#102135] min-h-screen pb-24 relative overflow-x-hidden font-sans pt-12 sm:pt-16">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[160px] -z-10 opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#1d4ed8] rounded-full blur-[180px] -z-10 opacity-[0.02] pointer-events-none" />

      {/* Main Section Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#102135] tracking-tighter leading-none uppercase mb-3">
          {lang === "es" ? "CASOS DE ÉXITO" : "SUCCESS STORIES"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-extrabold max-w-2xl mx-auto uppercase tracking-wide leading-relaxed">
          {lang === "es" 
            ? "Selecciona un caso para ver los desafíos superados, la estrategia aplicada y los resultados."
            : "Select a case study below to expand on our full growth methodology and visual parameters."}
        </p>
      </div>

      {/* Main Interactive Screen Segment */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 space-y-8">
        {caseStudiesData.map((cs) => {
          const isExpanded = expandedCases[cs.id];
          return (
            <div
              key={cs.id}
              className={`w-full bg-white rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isExpanded 
                  ? "border-[#f90]/55 shadow-[12px_12px_45px_rgba(16,33,53,0.06),-10px_-10px_35px_rgba(255,255,255,0.8)]" 
                  : "border-slate-200/60 shadow-[8px_8px_25px_rgba(16,33,53,0.02),-8px_-8px_25px_rgba(255,255,255,0.6)] hover:border-[#f90]/25 hover:shadow-[10px_10px_35px_rgba(16,33,53,0.04)]"
              }`}
            >
              {/* Card Header (Always Visible, Clickable Selector) */}
              <button
                onClick={() => toggleCase(cs.id)}
                className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 focus:outline-none cursor-pointer group select-none"
              >
                {/* Brand Identity */}
                <div className="flex items-center gap-4 sm:gap-6 flex-1">
                  {/* Brand Logo Wrapper */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 border border-slate-100 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.01)] rounded-2xl flex items-center justify-center p-2.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={cs.logoUrl} 
                      alt={cs.brandName} 
                      className="max-h-full max-w-full object-contain pointer-events-none select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-[#f90] uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/50 block w-max mb-1">
                      {cs.category === "amazon" ? "AMAZON ADS" : "MERCADO LIBRE ADS"}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#102135] uppercase tracking-tight leading-none mb-1 group-hover:text-[#f90] transition-colors">
                      {cs.brandName}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-extrabold uppercase tracking-wide">
                      {lang === "es" ? cs.nicheEs : cs.nicheEn}
                    </p>
                  </div>
                </div>

                {/* Hero Metric & Action Chevron */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-3xl sm:text-4xl font-black text-[#102135] tracking-tighter leading-none block">
                      {cs.heroMetric}
                    </span>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                      {lang === "es" ? cs.heroMetricLabelEs : cs.heroMetricLabelEn}
                    </span>
                  </div>

                  {/* Elegant High Contrast Interactive Chevron */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isExpanded 
                      ? "bg-[#102135] border-[#102135] text-white" 
                      : "bg-slate-50 border-slate-200/80 text-slate-400 group-hover:border-[#f90]/40 group-hover:text-[#f90] group-hover:bg-[#102135]/5"
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </button>

              {/* Collapsible Info Segment (Framer Motion Height reveal) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                  >
                    <div className="p-6 sm:p-8 space-y-8 select-text">
                      {/* Grid: Desafío, Estrategia, Resultados */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {/* 1. El Desafío */}
                        <div className="space-y-3.5 text-left bg-white p-5 rounded-2xl border border-slate-200/30 flex flex-col">
                          <div className="flex items-center gap-2 text-[#102135] font-black uppercase text-xs tracking-wider border-b border-slate-200/60 pb-2.5 shrink-0">
                            <Target className="w-4 h-4 text-[#f90] shrink-0" />
                            <span>{lang === "es" ? "El Desafío" : "The Challenge"}</span>
                          </div>
                          <p className="text-[11.5px] sm:text-xs text-slate-600 font-bold uppercase tracking-tight leading-relaxed flex-1">
                            {lang === "es" ? cs.challengeEs : cs.challengeEn}
                          </p>
                        </div>

                        {/* 2. La Estrategia */}
                        <div className="space-y-3.5 text-left bg-white p-5 rounded-2xl border border-slate-200/30 flex flex-col">
                          <div className="flex items-center gap-2 text-[#102135] font-black uppercase text-xs tracking-wider border-b border-slate-200/60 pb-2.5 shrink-0">
                            <Lightbulb className="w-4 h-4 text-[#ffb400] shrink-0" />
                            <span>{lang === "es" ? "La Estrategia" : "The Strategy"}</span>
                          </div>
                          <ul className="space-y-2.5 flex-1">
                            {(lang === "es" ? cs.strategyEs : cs.strategyEn).map((st, i) => (
                              <li key={i} className="flex items-start gap-2 text-[10.5px] sm:text-[11px] text-slate-600 font-bold uppercase tracking-tight leading-normal">
                                <span className="text-[#f90] mt-0.5 shrink-0">&#9679;</span>
                                <span>{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Los Resultados */}
                        <div className="space-y-3.5 text-left bg-orange-50/20 p-5 rounded-2xl border border-orange-100/30 flex flex-col">
                          <div className="flex items-center gap-2 text-[#102135] font-black uppercase text-xs tracking-wider border-b border-slate-200/60 pb-2.5 shrink-0">
                            <Award className="w-4 h-4 text-[#22c55e] shrink-0" />
                            <span>{lang === "es" ? "Resultados" : "Results Summary"}</span>
                          </div>
                          <ul className="space-y-2.5 flex-1">
                            {(lang === "es" ? cs.resultsEs : cs.resultsEn).map((res, i) => (
                              <li key={i} className="flex items-start gap-2 text-[10.5px] sm:text-[11px] text-slate-700 font-extrabold uppercase tracking-tight leading-normal">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" />
                                <span>{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Growth Dashboard Metrics */}
                      <div className="bg-[#eaeded]/60 rounded-2xl border border-slate-200/40 p-4 sm:p-5 select-none">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {cs.growthStats.map((stat, idx) => {
                            const isUp = stat.trend === "up";
                            return (
                              <div key={idx} className="flex flex-col items-center justify-center p-1 font-mono">
                                <span className="text-[8px] sm:text-[10px] text-slate-400 font-black block uppercase tracking-wide leading-none mb-1 text-center">
                                  {lang === "es" ? stat.labelEs : stat.labelEn}
                                </span>
                                <div className="flex items-center gap-1">
                                  {isUp ? (
                                    <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-[#22c55e]" />
                                  ) : (
                                    <TrendingDown className="w-3 sm:w-4 h-3 sm:h-4 text-rose-500" />
                                  )}
                                  <span className={`text-[13px] sm:text-base font-black tracking-tighter ${isUp ? "text-[#22c55e]" : "text-rose-500"}`}>
                                    {stat.value}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to trigger dynamic Contact / Booking Route */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-20">
        <div className="bg-[#102135] text-white rounded-3rem p-8 sm:p-12 md:p-14 border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
            {lang === "es" ? "¿Listo para ser el próximo éxito?" : "Ready to scale your sales?"}
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-bold uppercase tracking-widest mb-8 max-w-lg mx-auto leading-relaxed">
            {lang === "es" 
              ? "Hagamos una auditoría gratuita con nuestros analistas seniors para destrabar tu rentabilidad."
              : "Claim your free professional PPC audit now to find immediate profit leaks in your campaign catalog."}
          </p>
          <button
            onClick={() => window.open("https://calendly.com/federico-rrwv/30min", "_blank")}
            className="inline-flex items-center gap-2 py-3.5 px-7 bg-[#f90] hover:bg-[#ffb400] text-[#102135] font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-orange-500/10 focus:outline-none cursor-pointer"
          >
            <span>{lang === "es" ? "Agendar Auditoría Gratuita" : "Schedule Free PPC Audit"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
