import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, TrendingUp, TrendingDown, Target, Globe, Star, ShoppingBag, ShieldCheck, Zap, Award, Search, Sparkles, Filter, CheckCircle, ArrowUpRight, TrendingUp as TrendingUpIcon, Eye, Users, ChevronDown, ChevronUp } from "lucide-react";
import { optimizeCloudinaryUrl } from "../utils";

interface SuccessStoriesPageProps {
  lang: 'es' | 'en';
  onGoBack: () => void;
  onContactClick: () => void;
}

interface CaseStudy {
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

export default function SuccessStoriesPage({ lang, onGoBack, onContactClick }: SuccessStoriesPageProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "amazon" | "meli">("all");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStudies = caseStudiesData.filter(
    (study) => activeFilter === "all" || study.category === activeFilter
  );

  return (
    <div className="w-full bg-[#fafafa] text-[#102135] min-h-screen pb-24 overflow-x-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[160px] -z-10 opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#2563eb] rounded-full blur-[200px] -z-10 opacity-[0.035] pointer-events-none" />

      {/* Top Hero Grid Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12 text-left">
        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-[#102135] tracking-tight leading-none">
            {lang === 'es' ? "Casos de Éxito & Escala" : "Our Proven Case Studies"}
          </h1>
          <p className="text-base sm:text-lg text-[#102135]/75 font-semibold leading-relaxed">
            {lang === 'es' 
              ? "Descubre cómo marcas líderes globales transformaron su capital publicitario en un motor predecible de adquisición y posicionamiento orgánico con nuestras formulas de optimización."
              : "Discover how top worldwide brands transformed their media-spend assets into highly efficient, organic-driven compounding wealth engines across key retail hubs."
            }
          </p>
          <div className="h-1.5 w-24 bg-[#f90] rounded-full" />
        </div>

        {/* Filter Pill Badges */}
        <div className="flex items-center flex-wrap gap-2.5 mt-12 select-none">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#102135]/50 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            {lang === 'es' ? "Filtrar Marketplace:" : "Filter Marketplace:"}
          </span>
          {[
            { id: "all", labelEs: "Todos", labelEn: "All" },
            { id: "amazon", labelEs: "Amazon Ads", labelEn: "Amazon Ads" },
            { id: "meli", labelEs: "Mercado Libre", labelEn: "Mercado Libre" }
          ].map((pill) => {
            const isSelected = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id as any)}
                className={`py-2 px-5 rounded-full text-xs font-black select-none pointer-events-auto transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#102135] text-white shadow-md border border-[#102135]"
                    : "bg-white text-[#102135]/70 hover:text-[#102135] border border-gray-200/80 hover:border-gray-300 shadow-sm"
                }`}
              >
                {lang === 'es' ? pill.labelEs : pill.labelEn}
              </button>
            );
          })}
        </div>

        {/* Success Stories Interactive Lists */}
        <div className="space-y-6 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => {
              const isExpanded = expandedStory === study.id;
              return (
                <motion.div
                  key={study.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-[0_15px_42px_rgba(16,33,53,0.04)] overflow-hidden"
                >
                  {/* Summary Block View */}
                  <div 
                    onClick={() => setExpandedStory(isExpanded ? null : study.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer select-none border-b border-gray-50/50 hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Brand header details info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                      <div className="h-40 w-40 md:h-44 md:w-44 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center p-4 lg:p-6 shadow-sm shrink-0 selection:bg-transparent">
                        <img 
                          src={optimizeCloudinaryUrl(study.logoUrl, 320)} 
                          alt={study.brandName} 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5 text-left mt-2 sm:mt-0">
                        <h3 className="text-2xl sm:text-3xl font-black font-display text-[#102135] tracking-tight">{study.brandName}</h3>
                        <p className="text-sm sm:text-base font-bold text-gray-500 leading-tight">
                          {lang === 'es' ? study.nicheEs : study.nicheEn}
                        </p>
                      </div>
                    </div>

                    {/* Massive metric highlight stats strip on summary row */}
                    <div className="flex items-center gap-8 justify-between w-full md:w-auto">
                      <div className="text-left md:text-right">
                        <span className="text-3xl sm:text-4xl font-black text-[#e0a000] tracking-tighter drop-shadow-sm block leading-none">
                          {study.heroMetric}
                        </span>
                        <span className="text-[10px] sm:text-xs font-black text-[#102135]/65 uppercase tracking-wider block mt-1">
                          {lang === 'es' ? study.heroMetricLabelEs : study.heroMetricLabelEn}
                        </span>
                      </div>
                      
                      <div className="p-3 bg-gray-100/60 rounded-full text-[#102135]/40 hover:text-amber-500 transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Playbook Drawer with detailed Challenge & Results */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-slate-50/50 text-left"
                      >
                        <div className="p-6 sm:p-8 border-t border-gray-100/65 grid grid-cols-1 lg:grid-cols-12 gap-8">
                          
                          {/* Inner Left Column: Challenge & Campaign Stats Indicators */}
                          <div className="lg:col-span-4 space-y-6">
                            <div className="space-y-2.5">
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                                {lang === 'es' ? "El Desafío" : "The Challenge"}
                              </h4>
                              <p className="text-sm font-semibold text-gray-600 leading-relaxed md:leading-relaxed">
                                {lang === 'es' ? study.challengeEs : study.challengeEn}
                              </p>
                            </div>

                            {/* Little growth stats metrics widget block */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 select-none">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                                {lang === 'es' ? "Kpis Logrados" : "Target Indicators achieved"}
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                {study.growthStats.map((stat, idx) => (
                                  <div key={idx} className="text-center">
                                    <span className="text-lg sm:text-xl font-black text-[#102135] tracking-tight block">
                                      {stat.value}
                                    </span>
                                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 block leading-tight mt-1 truncate">
                                      {lang === 'es' ? stat.labelEs : stat.labelEn}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Inner Right Column: Playbook Formula Strategy & Operational Results */}
                          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            
                            {/* Strategy Playbook List */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#102135]/70 flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-[#f90]" />
                                {lang === 'es' ? "Estrategia Dingo" : "Dingo Strategy Matrix"}
                              </h4>
                              <ul className="space-y-2.5">
                                {(lang === 'es' ? study.strategyEs : study.strategyEn).map((point, i) => (
                                  <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f90] shrink-0 mt-2" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Operational Success Outcome results items */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#102135]/70 flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-[#e0a000]" />
                                {lang === 'es' ? "Resultado Final" : "Final Return Result"}
                              </h4>
                              <ul className="space-y-2.5">
                                {(lang === 'es' ? study.resultsEs : study.resultsEn).map((point, i) => (
                                  <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-gray-700 leading-relaxed font-bold">
                                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Closing Dynamic Diagnose Call to Action Card Section */}
        <div className="mt-20">
          <div className="w-full bg-[#102135] border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl select-none">
            {/* Soft decorative visual glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#f90]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563eb]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-3 flex-1 text-left relative z-10 z-[2]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-extrabold text-[#ffb400] uppercase tracking-wider select-none">
                {lang === 'es' ? "Diagnóstico Gratuito" : "Free Tactical Scan"}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-3.5xl font-black font-display text-white tracking-tight leading-tight">
                {lang === 'es' ? "¿Listo para que tu marca sea el siguiente caso de éxito?" : "Ready to turn your brand into our next success story?"}
              </h3>
              <p className="text-sm sm:text-base text-blue-100/75 leading-relaxed font-semibold max-w-xl">
                {lang === 'es' 
                  ? "Analicemos tus campañas de retail para expandir tus márgenes orgánicos y optimizar agresivamente tu TACOS."
                  : "Let us perform a thorough media audit on your metrics to expose underlying leakage points and unlock new scaling vectors."
                }
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#f90] hover:bg-[#fff] hover:text-[#102135] text-[#102135] font-black text-sm sm:text-base rounded-full shadow-[0_4px_22px_rgba(255,153,0,0.4)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer select-none"
              >
                <span>{lang === 'es' ? "Diagnóstico Gratis Ahora" : "Book Free Diagnostic Unit"}</span>
                <ArrowUpRight className="w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
