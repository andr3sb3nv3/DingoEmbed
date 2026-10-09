import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Target,
  Zap,
  Recycle,
  ArrowLeft,
  ArrowRight,
  RotateCw
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

// Helper function to optimize Cloudinary URLs locally
function optimizeCloudinaryUrl(url: string, width: number): string {
  if (!url) return "";
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto/`);
  }
  return url;
}

// Estructura de datos generales con los textos para cada idioma
export const servicesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  metricValue: string;
  metricLabelEs: string;
  metricLabelEn: string;
  accentColor: string;
  bulletsEs: string[];
  bulletsEn: string[];
}> = {
  "amazon-solutions": {
    title: "Amazon Solutions",
    subtitle: "Gestión Integral y Aceleración de Ventas en Amazon",
    description: "Maximizamos tu presencia en el marketplace más grande del mundo. Optimizamos tus listados para SEO, estructuramos y escalamos campañas avanzadas de PPC (Sponsored Products, Brands, y Sponsored Display), impulsamos reseñas genuinas y controlamos tus inventarios para dominar el Buy Box y multiplicar tu rentabilidad.",
    icon: ShoppingBag,
    metricValue: "+350%",
    metricLabelEs: "ROAS Promedio en Amazon PPC",
    metricLabelEn: "Average ROAS in Amazon PPC",
    accentColor: "#f90", // Amazon Orange
    bulletsEs: [
      "Optimización de Listados con SEO avanzado de palabras clave",
      "Creación de Contenido A+ premium y Stores de marca exclusivas",
      "Gestión experta en Amazon Seller & Vendor Central de punta a punta",
      "Publicidad PPC de alta eficiencia con ofertas dinámicas automatizadas",
      "Control de inventario, prevención de quiebres de stock y soporte logístico FBA",
      "Soporte de Registro de Marca (Brand Registry) y protección de canal"
    ],
    bulletsEn: [
      "Listing optimization with advanced keyword SEO",
      "Premium A+ Content creations and custom Brand Stores",
      "Expert end-to-end Amazon Seller & Vendor Central management",
      "High-efficiency PPC advertising with custom dynamic bidding",
      "Inventory forecasting, out-of-stock mitigation, and FBA optimization",
      "Brand Registry support and listing hijack prevention"
    ]
  },
};

interface ServiceDetailPageProps {
  serviceSlug?: string;
  lang: 'es' | 'en';
  onGoBack?: () => void;
  onContactClick?: () => void;
}

// Flecha sonrisa — guiño al smile de Amazon, con la marca propia
const SmileArrow = ({ className = "", color = "#232F3E", strokeWidth = 8 }: { className?: string, color?: string, strokeWidth?: number }) => (
  <svg viewBox="0 0 120 34" className={className} fill="none" aria-hidden="true">
    <path d="M6 8 C 38 32, 82 30, 112 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M102 4 L114 11 L101 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Cinta transportadora (full-width)
const ConveyorBelt = ({ 
  lang, 
  isShifting, 
  onPrev, 
  onNext,
  onRotate
}: { 
  lang: "es" | "en", 
  isShifting: boolean, 
  onPrev: () => void, 
  onNext: () => void,
  onRotate: () => void
}) => (
  <div
    className="absolute left-1/2 -translate-x-1/2 w-screen z-0 pointer-events-none select-none"
    style={{ top: 'calc(100% - 44px)', ['--belt-speed' as any]: isShifting ? '0.3s' : '1.15s' }}
  >
    {/* Superficie de goma */}
    <div style={{ perspective: '600px' }}>
      <div
        className="dingo-belt-anim w-full h-[90px]"
        style={{
          transform: 'rotateX(55deg)',
          transformOrigin: 'center bottom',
          backgroundImage: [
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 3px, transparent 3px, transparent 72px)',
            'linear-gradient(180deg, #434b58 0%, #2a3038 100%)'
          ].join(', '),
          boxShadow: 'inset 0 10px 22px rgba(0,0,0,0.40), inset 0 -5px 12px rgba(0,0,0,0.35)',
          borderTop: '2px solid rgba(255,255,255,0.16)',
          animation: 'dingoBeltMove var(--belt-speed) linear infinite',
        }}
      />
    </div>

    {/* Frente metálico con bulones */}
    <div
      className="relative w-full h-8 md:h-10 border-t border-white/25"
      style={{
        backgroundImage: 'radial-gradient(circle 2px at 50% 30%, rgba(0,0,0,0.45) 0px 2px, transparent 2.4px), linear-gradient(180deg, #525a68 0%, #3a414c 60%, #333944 100%)',
        backgroundSize: '52px 100%, 100% 100%',
      }}
    >
      <button
        onClick={onPrev}
        className="absolute left-[6%] sm:left-[10%] top-1/2 -translate-y-1/2 w-11 h-11 md:w-9 md:h-9 bg-white hover:bg-slate-50 text-slate-950 p-0 rounded-full shadow-lg border border-slate-200/80 pointer-events-auto flex items-center justify-center transition-all cursor-pointer active:scale-90 hover:scale-110 z-20"
        title={lang === "es" ? "Atrás" : "Back"}
      >
        <ArrowLeft className="w-5.5 h-5.5 md:w-4.5 md:h-4.5 stroke-[2.5px] text-slate-950" />
      </button>
      
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#1c1f26] text-[#F5C518] font-mono font-black text-[7px] md:text-[8px] px-2 py-0.5 tracking-[0.2em] uppercase rounded-[1px] shadow-sm whitespace-nowrap z-10 font-bold">
        {lang === "es" ? "Logística" : "Logistics"}
      </div>

      <div className="absolute right-[6%] sm:right-[10%] top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-auto z-20 lg:hidden">
        <button
          onClick={onRotate}
          className="w-11 h-11 md:w-9 md:h-9 bg-white hover:bg-slate-50 text-slate-950 p-0 rounded-full shadow-lg border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90 hover:scale-110"
          title={lang === "es" ? "Rotar" : "Rotate"}
        >
          <RotateCw className="w-5.5 h-5.5 md:w-4.5 md:h-4.5 stroke-[2.5px] text-slate-950" />
        </button>

        <button
          onClick={onNext}
          className="w-11 h-11 md:w-9 md:h-9 bg-white hover:bg-slate-50 text-slate-950 p-0 rounded-full shadow-lg border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90 hover:scale-110"
          title={lang === "es" ? "Siguiente" : "Next"}
        >
          <ArrowRight className="w-5.5 h-5.5 md:w-4.5 md:h-4.5 stroke-[2.5px] text-slate-950" />
        </button>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-[4px] md:h-[5px]"
        style={{ background: 'repeating-linear-gradient(45deg, #F5C518 0px, #F5C518 10px, #1c1f26 10px, #1c1f26 20px)' }}
      />
    </div>

    {/* Rodillos a la vista */}
    <div
      className="dingo-belt-anim w-full h-3.5 md:h-4"
      style={{
        backgroundColor: '#11151b',
        backgroundImage: 'radial-gradient(circle 5px at 14px 50%, #1d232c 0px 3.8px, #39404d 4.2px, transparent 5.4px)',
        backgroundSize: '28px 100%',
        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6)',
        animation: 'dingoBeltMove var(--belt-speed) linear infinite',
      }}
    />

    {/* Patas */}
    <div className="relative w-full h-8 md:h-10">
      {[8, 32, 56, 80].map((p) => (
        <div
          key={p}
          className="absolute top-0 w-4 md:w-6 h-full"
          style={{ left: `${p}%`, background: 'linear-gradient(90deg, #4d5563 0%, #2e333d 70%)' }}
        />
      ))}
    </div>
  </div>
);

// Crate 3D con el texto del servicio: frente kraft + tapa y lateral
// en 3D real, etiqueta blanca de envío con badge, título y descripción.
const ServiceCrate = ({ item, index, total, lang, width, isRotated }: {
  item: any,
  index: number,
  total: number,
  lang: "es" | "en",
  width: number,
  isRotated: boolean,
}) => {
  const height = width > 330 ? 350 : 300;
  const depth = width; // Cubo perfecto

  // Reloj local actualizable segundo a segundo para la etiqueta "Hora"
  const [currentTime, setCurrentTime] = React.useState("");

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ 
        width, 
        height, 
        transformOrigin: 'bottom center', 
        perspective: '1400px'
      }}
    >
      {/* Sombra de contacto realista en el suelo (debajo de la caja) */}
      <div
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black/45 blur-[12px] rounded-[100%] z-0 pointer-events-none transition-transform duration-700"
        style={{ 
          width: width * 0.95, 
          height: '22px',
          transform: isRotated ? 'translateX(-50%) rotate(5deg) scale(0.95)' : 'translateX(-50%) scale(1)'
        }}
      />

      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          rotateY: isRotated ? -90 : 0,
          rotateX: -12 // Rotación negativa para ver la tapa superior
        }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* 1. CARA FRONTAL (Frente de la caja con etiqueta blanca del servicio) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: `rotateY(0deg) translateZ(${depth / 2}px)`,
            backgroundImage: 'linear-gradient(165deg, #EBD3AB 0%, #D9B98D 55%, #C9A678 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 38px rgba(95,55,18,0.15)',
            border: '1px solid #B08A55',
          }}
        >

          {/* Número estampado a stencil */}
          <span className="absolute top-1 right-3 font-mono font-black text-5xl md:text-6xl text-[#232F3E] opacity-[0.13] pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Códigos de imprenta */}
          <div className="absolute bottom-1.5 inset-x-3 md:inset-x-4 flex items-center justify-between pointer-events-none opacity-50 text-[#4a3015]">
            <div className="flex items-center gap-1">
              <Recycle className="w-2.5 h-2.5" strokeWidth={2.5} />
              <span className="font-mono text-[6px] font-bold tracking-[0.2em] uppercase">
                {lang === "es" ? "Caja 100% reciclable" : "100% recyclable box"}
              </span>
            </div>
            <span className="font-mono text-[6px] font-bold tracking-[0.2em] uppercase">AR-BUE · DNGO</span>
          </div>

          {/* Etiqueta blanca de envío */}
          <div
            className="absolute inset-x-4 md:inset-x-6 top-9 md:top-10 bottom-6 -rotate-1 bg-[#FDFDF8] rounded-[3px] p-3.5 md:p-4.5 flex flex-col text-left"
            style={{ boxShadow: '0 7px 18px rgba(80,45,15,0.26), 0 1px 0 rgba(255,255,255,0.5) inset' }}
          >
            <div className="flex justify-between items-center gap-2">
              <span className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 truncate">
                {lang === "es" ? "Servicio" : "Service"} {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>
              <SmileArrow className="w-7 md:w-8 shrink-0" color="#FF9900" strokeWidth={10} />
            </div>

            <div className="border-t border-dashed border-[#102135]/15 my-1.5 md:my-2" />

            {/* Badge del servicio */}
            <div className="flex items-baseline gap-2 mb-1 md:mb-1.5">
              <span className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] text-slate-400 shrink-0">
                {lang === "es" ? "Contenido:" : "Contents:"}
              </span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wide text-[#102135] border-b-2 border-[#FF9900] pb-0.5 truncate">
                {lang === "es" ? item.badgeEs : item.badgeEn}
              </span>
            </div>

            <h3 className="text-sm sm:text-base md:text-xl font-black uppercase tracking-tight text-[#102135] leading-tight">
              {lang === "es" ? item.titleEs : item.titleEn}
            </h3>

            <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-slate-600 leading-snug md:leading-relaxed font-semibold mt-2 mb-auto overflow-hidden">
              {lang === "es" ? item.descEs : item.descEn}
            </p>

            <div className="border-t border-dashed border-[#102135]/15 my-1.5 md:my-2" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                DNGO-AMZ-{String(index + 1).padStart(2, '0')}
              </span>
              <div
                className="h-4.5 md:h-5.5 w-12 md:w-16"
                style={{ background: 'repeating-linear-gradient(90deg, #102135 0px, #102135 2px, transparent 2px, transparent 4px, #102135 4px, #102135 5px, transparent 5px, transparent 9px)' }}
              />
            </div>
          </div>

          {/* Sombreado dinámico cuando la cara frontal rota hacia el perfil */}
          <div 
            className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-750" 
            style={{ opacity: isRotated ? 0.45 : 0 }} 
          />
        </div>

        {/* 2. CARA DERECHA (La "Hora" que rota al frente al pulsar el botón de rotación) */}
        <div
          className="absolute inset-x-0 top-0 h-full overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: `rotateY(90deg) translateZ(${width / 2}px)`,
            backgroundImage: 'linear-gradient(165deg, #EBD3AB 0%, #D9B98D 55%, #C9A678 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 38px rgba(95,55,18,0.15)',
            border: '1px solid #B08A55',
          }}
        >
          {/* Cinta negra vertical vertical de seguridad estilo caja Prime */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#1A2433] opacity-90 flex items-center justify-center pointer-events-none">
            <div className="h-full w-[2px] bg-[#FF9900]/40" />
          </div>

          <span className="absolute top-1 right-3 font-mono font-black text-5xl md:text-6xl text-[#232F3E] opacity-[0.13] pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Cara de integración: los carteles flotantes se apoyan visualmente sobre este lado al rotar */}
          <div
            className="absolute inset-x-4 md:inset-x-6 top-9 md:top-10 bottom-6 bg-[#FDFDF8] rounded-[3px] shadow-lg border border-dashed border-[#102135]/10"
          />
          <ServiceBoxChipDock item={item} lang={lang} isRotated={isRotated} />

          <div 
            className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-750" 
            style={{ opacity: isRotated ? 0 : 0.45 }} 
          />
        </div>

        {/* 3. CARA IZQUIERDA (Perfil izquierdo de seguridad para realismo 3D completo) */}
        <div
          className="absolute inset-x-0 top-0 h-full overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
            backgroundImage: 'linear-gradient(165deg, #EBD3AB 0%, #D9B98D 55%, #C9A678 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 38px rgba(95,55,18,0.15)',
            border: '1px solid #B08A55',
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-left text-[#4a3015] select-none pointer-events-none opacity-45">
            <div className="border-2 border-dashed border-[#4a3015]/40 p-2 text-center rounded-[2px] font-mono font-black text-[9px] uppercase tracking-wider">
              {lang === "es" ? "▲ FRÁGIL · MANEJAR CON CUIDADO ▲" : "▲ FRAGILE · HANDLE WITH CARE ▲"}
            </div>
            <div className="flex flex-col items-center my-auto">
              <Recycle className="w-8 h-8 mb-1.5" />
              <span className="font-mono text-[7px] text-center font-bold tracking-[0.2em] uppercase">
                {lang === "es" ? "POR FAVOR RECIClA ESTA CAJA" : "PLEASE RECYCLE THIS BOX"}
              </span>
            </div>
            <div className="font-mono text-[6px] font-bold text-center tracking-[0.2em]">
              DNGO LOGISTICS CORP · REGIONAL DEPOT
            </div>
          </div>
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>

        {/* 4. CARA POSTERIOR */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: `rotateY(180deg) translateZ(${width / 2}px)`,
            backgroundImage: 'linear-gradient(165deg, #EBD3AB 0%, #D9B98D 55%, #C9A678 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 38px rgba(95,55,18,0.15)',
            border: '1px solid #B08A55',
          }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        {/* 5. TAPA SUPERIOR (Tapa superior de la caja que da sentido al cubo 3D) */}
        <div
          className="absolute inset-x-0 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            height: width, // profundidad
            top: (height - width) / 2,
            transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
            backgroundImage: 'linear-gradient(180deg, #F2DDB6 0%, #D9B98D 100%)',
            boxShadow: 'inset 0 0 30px rgba(95,55,18,0.2)',
            border: '1px solid #B08A55',
          }}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#1A2433] opacity-90 flex items-center justify-center">
            <div className="h-full w-[2px] bg-[#FF9900]/45" />
            <span className="absolute text-[5px] font-mono font-black text-white/40 tracking-[0.3em] rotate-90 uppercase whitespace-nowrap">
              DNGO PRIME
            </span>
          </div>

          <div className="absolute top-4 left-4 w-9 h-9 border border-black/10 p-0.5 flex flex-wrap gap-0.5 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`} />
            ))}
          </div>

          <div 
            className="absolute inset-0 bg-black/15 pointer-events-none transition-opacity duration-750" 
            style={{ opacity: isRotated ? 0.25 : 0.05 }}
          />
        </div>

        {/* 6. BASE INFERIOR */}
        <div
          className="absolute inset-x-0 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            height: width, 
            top: (height - width) / 2,
            transform: `rotateX(90deg) translateZ(${height / 2}px)`,
            backgroundImage: 'linear-gradient(180deg, #AD8156 0%, #855C35 100%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
            border: '1px solid #855C35',
          }}
        >
        </div>
      </motion.div>
    </div>
  );
};

type ServiceChip = { text: string; className: string; detailEs: string; detailEn: string };

const serviceChipsByTitle: Record<string, ServiceChip[]> = {
  "PPC Solutions": [
    { text: "ROAS", detailEs: "Mide el retorno real de la inversión y nos ayuda a escalar lo rentable.", detailEn: "Measures real return on spend and helps us scale what is profitable.", className: "text-[#16a34a] bg-emerald-50/80" },
    { text: "ACOS", detailEs: "Controla cuánto cuesta vender para proteger margen y eficiencia.", detailEn: "Controls sales cost to protect margin and efficiency.", className: "text-[#2563eb] bg-blue-50/80" },
    { text: "CPC", detailEs: "Ajusta el costo por click para comprar tráfico con mejor intención.", detailEn: "Tunes cost per click to buy traffic with stronger intent.", className: "text-[#f59e0b] bg-amber-50/80" }
  ],
  "SEO Listing Optimization": [
    { text: "CVR", detailEs: "Optimiza el ratio de conversión para vender más con el mismo tráfico.", detailEn: "Optimizes conversion rate to sell more with the same traffic.", className: "text-[#7c3aed] bg-violet-50/80" },
    { text: "A/B", detailEs: "Compara variantes para decidir con datos y evitar cambios a ciegas.", detailEn: "Compares variants so decisions are data-backed, not blind.", className: "text-[#db2777] bg-pink-50/80" },
    { text: "UX", detailEs: "Mejora claridad, lectura y navegación para reducir fricción de compra.", detailEn: "Improves clarity, readability, and navigation to reduce buying friction.", className: "text-[#0891b2] bg-cyan-50/80" }
  ],
  "Listing SEO": [
    { text: "SEO", detailEs: "Estructura títulos, bullets y contenido para mejorar descubrimiento orgánico.", detailEn: "Structures titles, bullets, and content to improve organic discovery.", className: "text-[#2563eb] bg-blue-50/80" },
    { text: "Rank", detailEs: "Trabaja señales que ayudan a ganar posiciones en búsquedas clave.", detailEn: "Works on signals that help win positions in key searches.", className: "text-[#16a34a] bg-emerald-50/80" },
    { text: "KW", detailEs: "Conecta palabras clave con intención real de compra del cliente.", detailEn: "Connects keywords with the customer's real purchase intent.", className: "text-[#f59e0b] bg-amber-50/80" }
  ],
  "A+ Content": [
    { text: "A+", detailEs: "Presenta beneficios, usos y diferenciales de forma visual y convincente.", detailEn: "Presents benefits, use cases, and differentiators visually and clearly.", className: "text-[#FF9900] bg-orange-50/80" },
    { text: "Brand", detailEs: "Refuerza confianza y percepción premium con una identidad consistente.", detailEn: "Builds trust and premium perception through consistent identity.", className: "text-[#102135] bg-slate-50/90" },
    { text: "CVR", detailEs: "Convierte mejor al responder dudas antes de que el comprador abandone.", detailEn: "Improves conversion by answering doubts before shoppers leave.", className: "text-[#16a34a] bg-emerald-50/80" }
  ],
  "Keyword Research": [
    { text: "Intent", detailEs: "Identifica búsquedas con intención comercial para priorizar oportunidades.", detailEn: "Identifies commercial-intent searches to prioritize opportunities.", className: "text-[#7c3aed] bg-violet-50/80" },
    { text: "Terms", detailEs: "Agrupa términos útiles para campañas, títulos, bullets y backend.", detailEn: "Groups useful terms for campaigns, titles, bullets, and backend.", className: "text-[#2563eb] bg-blue-50/80" },
    { text: "PPC", detailEs: "Convierte investigación en campañas más precisas y menos desperdicio.", detailEn: "Turns research into sharper campaigns with less waste.", className: "text-[#FF9900] bg-orange-50/80" }
  ],
  "Reimbursements": [
    { text: "FBA", detailEs: "Revisa inventario perdido, dañado o mal conciliado dentro de FBA.", detailEn: "Reviews lost, damaged, or misreconciled inventory inside FBA.", className: "text-[#2563eb] bg-blue-50/80" },
    { text: "Audit", detailEs: "Detecta errores operativos que pueden convertirse en reclamos válidos.", detailEn: "Finds operational errors that can become valid claims.", className: "text-[#102135] bg-slate-50/90" },
    { text: "$ Back", detailEs: "Recupera capital que pertenece al negocio y mejora el margen neto.", detailEn: "Recovers capital owed to the business and improves net margin.", className: "text-[#16a34a] bg-emerald-50/80" }
  ],
  "Caselog Management": [
    { text: "Cases", detailEs: "Centraliza tickets, evidencia y seguimiento para resolver más rápido.", detailEn: "Centralizes tickets, evidence, and follow-up to resolve faster.", className: "text-[#2563eb] bg-blue-50/80" },
    { text: "SLA", detailEs: "Prioriza tiempos críticos y evita que incidencias pierdan tracción.", detailEn: "Prioritizes critical timing and keeps issues moving.", className: "text-[#dc2626] bg-red-50/80" },
    { text: "FBA", detailEs: "Escala problemas operativos con contexto claro para soporte.", detailEn: "Escalates operational problems with clear support context.", className: "text-[#FF9900] bg-orange-50/80" }
  ],
  "Account Deactivation Recovery": [
    { text: "POA", detailEs: "Construye un plan de acción claro, verificable y defendible.", detailEn: "Builds a clear, verifiable, and defensible plan of action.", className: "text-[#dc2626] bg-red-50/80" },
    { text: "Appeal", detailEs: "Redacta apelaciones con causa raíz, evidencia y medidas correctivas.", detailEn: "Writes appeals with root cause, evidence, and corrective actions.", className: "text-[#7c3aed] bg-violet-50/80" },
    { text: "Live", detailEs: "Busca recuperar la operación y reducir el impacto comercial.", detailEn: "Works to restore operations and reduce commercial impact.", className: "text-[#16a34a] bg-emerald-50/80" }
  ],
  "External Traffic": [
    { text: "Google", detailEs: "Captura demanda activa de usuarios que ya están buscando soluciones.", detailEn: "Captures active demand from users already searching for solutions.", className: "text-[#4285F4] bg-white/85" },
    { text: "Meta", detailEs: "Construye audiencias, remarketing y tráfico calificado hacia Amazon.", detailEn: "Builds audiences, remarketing, and qualified traffic into Amazon.", className: "text-[#0866FF] bg-blue-50/85" },
    { text: "TikTok", detailEs: "Activa descubrimiento y nuevas audiencias con potencial de compra.", detailEn: "Activates discovery and new audiences with purchase potential.", className: "text-[#111827] bg-slate-50/90" }
  ]
};

const ServiceChipPill = ({ item, chip, className = "" }: { item: any; chip: ServiceChip; className?: string }) => (
  <motion.div
    className={`rounded-2xl border border-white/60 bg-white/40 px-3.5 py-2 text-center backdrop-blur-xl ${chip.className} ${className}`}
    style={{
      boxShadow: '0 16px 30px rgba(16,33,53,0.15), inset 0 1px 0 rgba(255,255,255,0.82)'
    }}
  >
    <span className="block whitespace-nowrap text-[9px] md:text-[10px] font-black leading-none tracking-tight">
      {chip.text}
    </span>
  </motion.div>
);

const ServiceGlassCallout = ({ item, isRotated }: { item: any, isRotated: boolean }) => {
  const chips = serviceChipsByTitle[item.titleEn] ?? [];
  const positions = [
    "left-[5%] top-[8%] md:left-[0%] md:top-[10%] lg:left-[-118px] lg:top-[42%]",
    "right-[0%] top-[36%] md:right-[-12%] md:top-[24%] lg:right-auto lg:left-[-88px] lg:top-[4%]",
    "left-[18%] bottom-[8%] md:left-[8%] md:bottom-[8%] lg:bottom-auto lg:left-[50%] lg:-translate-x-1/2 lg:top-[-34px]"
  ];

  if (isRotated) return null;

  return (
    <div className="absolute -inset-6 md:-inset-12 lg:inset-0 z-50 pointer-events-none">
      {chips.map((chip, idx) => (
        <motion.div
          key={chip.text}
          className={`absolute ${positions[idx]}`}
          animate={{
            x: idx === 1 ? [0, 10, 4, -6, 0] : [0, -8, -2, 7, 0],
            y: idx === 2 ? [0, -10, -4, 6, 0] : [0, 7, -5, -9, 0],
            rotate: idx === 1 ? [4, -3, 5, 1, 4] : [-4, 3, -2, -6, -4],
            scale: [1, 1.04, 0.99, 1.02, 1]
          }}
          transition={{
            duration: 5.4 + idx * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.35
          }}
        >
          <ServiceChipPill item={item} chip={chip} />
        </motion.div>
      ))}
    </div>
  );
};

const ServiceBoxChipDock = ({ item, lang, isRotated }: { item: any; lang: "es" | "en"; isRotated: boolean }) => {
  const chips = serviceChipsByTitle[item.titleEn] ?? [];
  const dockPoints = [
    "left-[7%] right-[6%] top-[18%]",
    "left-[7%] right-[6%] top-[43%]",
    "left-[7%] right-[6%] top-[68%]"
  ];

  if (!isRotated) return null;

  return (
    <div className="absolute inset-x-4 md:inset-x-6 top-9 md:top-10 bottom-6 z-30 pointer-events-none">
      {chips.map((chip, idx) => (
        <div key={chip.text} className={`absolute ${dockPoints[idx]} flex items-center gap-3`}>
          <ServiceChipPill
            item={item}
            chip={chip}
            className="shrink-0 shadow-lg px-3 md:px-3.5 py-2 md:py-2.5 [&_span]:text-[10px] md:[&_span]:text-[11px]"
          />
          <motion.span
            className="block min-w-0 flex-1 text-left text-[10px] md:text-[11px] font-bold leading-snug text-[#102135]/75"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, ease: "easeOut", delay: 0.72 + idx * 0.08 }}
          >
            {lang === "es" ? chip.detailEs : chip.detailEn}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const shortLabels = [
  { es: "PPC Ads", en: "PPC Ads" },
  { es: "Conversión", en: "Conversion" },
  { es: "SEO Rank", en: "SEO Rank" },
  { es: "Com. A+", en: "A+ Content" },
  { es: "Keywords", en: "Keywords" },
  { es: "Reembolsos", en: "Refunds" },
  { es: "Tickets FBA", en: "Case Mgmt" },
  { es: "Apelación", en: "Recovery" },
  { es: "Tráfico Ext.", en: "External Ads" }
];

export default function VentajasAmazon({ serviceSlug = "amazon-solutions", lang, onGoBack, onContactClick }: ServiceDetailPageProps) {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // --- Estado del sistema de cinta transportadora ---
  const [active, setActive] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isShifting, setIsShifting] = useState(false);
  const shiftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const autoRotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userRotatedFirstBox = useRef(false);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverRotate, setHoverRotate] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const isAmazonCombined = [
    "amazon-google-meta",
    "amazon-solutions",
    "google-meta-ads"
  ].includes(serviceSlug);

  useEffect(() => {
    const handleResizeWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWidth);
    return () => window.removeEventListener("resize", handleResizeWidth);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    setStageW(stageRef.current.clientWidth);
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect.width > 0) {
        setStageW(entries[0].contentRect.width);
      }
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [isAmazonCombined]);

  useEffect(() => () => {
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
  }, []);

  useEffect(() => {
    if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);

    if (active === 0 && !isRotated && !userRotatedFirstBox.current) {
      autoRotateTimer.current = setTimeout(() => {
        setIsRotated(true);
      }, 3600);
    }

    return () => {
      if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
    };
  }, [active, isRotated]);

  const handleRotate = () => {
    if (active === 0) {
      userRotatedFirstBox.current = true;
    }
    if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
    setIsRotated((prev) => !prev);
  };

  const handleContact = () => {
    onContactClick?.();
  };

  // --- BENEFICIOS COMPLETOS SIN ABREVIATURAS DE AMAZON SOLUTIONS ---
  const amazonIntroServices = [
    {
      titleEs: "PPC Solutions",
      titleEn: "PPC Solutions",
      descEs: "Implementamos estrategias de oferta avanzadas diseñadas para optimizar tu retorno de inversión publicitaria (ROAS) y mantener un ACOS bajo. Al perfeccionar las ofertas de CPC, logramos el equilibrio perfecto entre atraer tráfico, maximizar conversiones y garantizar la rentabilidad a largo plazo.",
      descEn: "We employ advanced bidding strategies designed to optimize your return on ad spend (ROAS) and maintain a low ACOS. By refining CPC bids, we achieve the perfect balance between driving traffic, maximizing conversions, and ensuring long-term profitability.",
      imgUrl: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Chart%20increasing/3D/chart_increasing_3d.png",
      badgeEs: "Optimización ROAS",
      badgeEn: "ROAS Optimization"
    },
    {
      titleEs: "SEO Listing Optimization",
      titleEn: "SEO Listing Optimization",
      descEs: "Analizamos tus listados y realizamos pruebas A/B estructuradas para optimizar la tasa de conversión (CVR), maximizando la visibilidad orgánica en los resultados y multiplicando tus ventas.",
      descEn: "We analyze your listings and conduct A/B testing to optimize the conversion rate (CVR), maximizing visibility and driving more sales.",
      imgUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779202064/xnewujtqbagjuio8xgzn.png",
      badgeEs: "Pruebas A/B",
      badgeEn: "A/B Testing"
    },
    {
      titleEs: "Listing SEO",
      titleEn: "Listing SEO",
      descEs: "Posicionamiento orgánico de la más alta precisión. Adaptamos la redacción, títulos, viñetas y descripciones de tus productos utilizando los algoritmos más recientes para asegurar los primeros lugares de búsqueda.",
      descEn: "Organic positioning of the highest precision. We adapt the copywriting, titles, bullet points, and descriptions of your products using the latest algorithms to ensure the top search ranks.",
      imgUrl: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying%20glass%20tilted%20left/3D/magnifying_glass_tilted_left_3d.png",
      badgeEs: "Visibilidad Orgánica",
      badgeEn: "Organic Rank"
    },
    {
      titleEs: "A+ Content",
      titleEn: "A+ Content",
      descEs: "Diseñamos material gráfico de alto rendimiento y Contenido A+ que eleva la identidad de tu marca, conectando emocionalmente con tus compradores y aumentando drásticamente el ratio de conversión (CVR) en Amazon.",
      descEn: "We design high-performing product artwork and A+ Content that elevate your brand and boost conversion rates (CVR) on Amazon.",
      imgUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779477884/x87faxqr4yrgm6l7aq0a.png",
      badgeEs: "Identidad Premium",
      badgeEn: "Premium Branding"
    },
    {
      titleEs: "Keyword Research",
      titleEn: "Keyword Research",
      descEs: "Realizamos investigaciones profundas de palabras clave para identificar términos de búsqueda con alta intención de compra. Optimizar tus campañas PPC con estas palabras atrae tráfico altamente cualificado, evita el desperdicio en publicidad y amplifica conversiones.",
      descEn: "We perform in-depth keyword research to identify high-converting search terms. Optimizing your PPC campaigns with these terms attracts qualified traffic, improving your chances of conversions and minimizing ad spend waste.",
      imgUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779474879/wugxj0pqcugcaeiibnyb.png",
      badgeEs: "Auditoría de Palabras",
      badgeEn: "Search Intent"
    },
    {
      titleEs: "Reimbursements",
      titleEn: "Reimbursements",
      descEs: "Gestionamos y reclamamos reembolsos ante Amazon por inventario FBA perdido, dañado o no devuelto por los clientes, recuperando capital legítimo que pertenece directamente al balance de tu empresa.",
      descEn: "We manage reimbursements on Amazon for lost, damaged, or unreturned FBA inventory.",
      imgUrl: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money%20bag/3D/money_bag_3d.png",
      badgeEs: "Recuperación FBA",
      badgeEn: "FBA Safeguards"
    },
    {
      titleEs: "Caselog Management",
      titleEn: "Caselog Management",
      descEs: "Administramos y procesamos todos los registros de casos y tickets de soporte técnico en tu nombre de manera proactiva, garantizando que cada incidencia o disputa con Amazon sea atendida rápidamente y resuelta con éxito.",
      descEn: "We manage and process all case logs and support tickets on your behalf, ensuring every issue with Amazon is handled promptly and resolved efficiently.",
      imgUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779486787/dlcdrflnv0kwvjv5yftb.png",
      badgeEs: "Soporte Proactivo",
      badgeEn: "Support Tickets"
    },
    {
      titleEs: "Account Deactivation Recovery",
      titleEn: "Account Deactivation Recovery",
      descEs: "Si tu cuenta de vendedor en Amazon es desactivada o suspendida, intervenimos de inmediato para analizar la raíz del problema, estructurar planes de acción detallados (POA), redactar la apelación formal y recuperar tu cuenta de forma exitosa.",
      descEn: "If your Amazon account is deactivated, we step in to analyze the root cause, build your appeal, and recover your account quickly and effectively.",
      imgUrl: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shield/3D/shield_3d.png",
      badgeEs: "Defensa de Cuenta",
      badgeEn: "POA & Appeal Support"
    },
    {
      titleEs: "External Traffic",
      titleEn: "External Traffic",
      descEs: "También ofrecemos soluciones publicitarias integrales externas, incluidas campañas optimizadas en Google Ads, Meta Ads y TikTok Ads para expandir tu alcance global, redirigir clientes cualificados a tus listados de Amazon y potenciar oportunidades de venta cruzada.",
      descEn: "We also offer multi-channel advertising solutions — including Google, Meta, and TikTok Ads — to help you increase visibility across platforms, drive external traffic to Amazon, and boost cross-selling opportunities.",
      imgUrl: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Megaphone/3D/megaphone_3d.png",
      badgeEs: "Sinergia Multicanal",
      badgeEn: "External Channels"
    }
  ];

  const select = (idx: number) => {
    if (idx === active || idx < 0 || idx >= amazonIntroServices.length) return;
    setIsRotated(false);
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    setIsShifting(true);
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    shiftTimer.current = setTimeout(() => setIsShifting(false), 1650);

    setTimeout(() => {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handlePrev = () => {
    setIsRotated(false);
    let prevIdx = active - 1;
    if (prevIdx < 0) {
      prevIdx = amazonIntroServices.length - 1;
    }
    setDirection(-1);
    setActive(prevIdx);
    setIsShifting(true);
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    shiftTimer.current = setTimeout(() => setIsShifting(false), 1650);
  };

  const handleNext = () => {
    setIsRotated(false);
    let nextIdx = active + 1;
    if (nextIdx >= amazonIntroServices.length) {
      nextIdx = 0;
    }
    setDirection(1);
    setActive(nextIdx);
    setIsShifting(true);
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    shiftTimer.current = setTimeout(() => setIsShifting(false), 1650);
  };

  const isWideStage = stageW >= 700;
  const imgSize = stageW === 0 ? 190 : isWideStage ? Math.min(300, stageW * 0.32) : Math.min(190, stageW * 0.5);
  const cardW = stageW === 0 ? 275 : isWideStage ? Math.min(385, stageW * 0.45) : Math.min(275, stageW * 0.73);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? "100%" : "-100%",
      transition: { duration: 0 }
    }),
    center: {
      x: "0%",
      transition: { duration: 0.9, ease: [0.16, 0.84, 0.28, 1], delay: 0.5 }
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? "-100%" : "100%",
      transition: { duration: 0.75, ease: [0.55, 0.05, 0.85, 0.4] }
    }),
  };

  if (isAmazonCombined) {
    const activeItem = amazonIntroServices[active];

    return (
      <div className="flex flex-col w-full font-sans text-[#102135] py-4 relative overflow-x-hidden">
        {/* Animaciones CSS requeridas por el carrusel */}
        <style>{`
          @keyframes dingoBeltMove {
            from { background-position-x: 0px; }
            to   { background-position-x: -72px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .dingo-belt-anim { animation: none !important; }
          }
        `}</style>

        {/* Luces sutiles de fondo */}
        <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[140px] -z-10 opacity-[0.05] pointer-events-none" />
        <div className="fixed bottom-20 right-1/4 w-[500px] h-[500px] bg-[#2563eb] rounded-full blur-[140px] -z-10 opacity-[0.05] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 relative px-4 select-none pt-2 sm:pt-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#102135] tracking-tight leading-tight mt-1">
              {lang === "es" ? "Domina tus Ventas en Amazon" : "Dominate your Amazon Sales"}
            </h1>

            {/* Arcos animados de flujo central de logística en dispositivos móviles */}
            <div className="lg:hidden absolute left-1/2 bottom-[-48px] sm:bottom-[-64px] -translate-x-1/2 w-72 sm:w-80 md:w-[480px] h-[48px] sm:h-[64px] pointer-events-none z-20 overflow-hidden">
              <div className="w-full h-20 sm:h-24 md:h-28">
                <svg
                  viewBox="0 0 400 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md overflow-visible"
                >
                  <defs>
                    <linearGradient id="center-arrow-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffb400" />
                      <stop offset="100%" stopColor="#f90" />
                    </linearGradient>
                    <linearGradient id="center-arrow-blue" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="center-arrow-teal" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d="M 185 8 C 120 10, 45 40, 50 75 C 55 95, 95 100, 130 108"
                    stroke="url(#center-arrow-orange)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
                  />

                  <motion.path
                    d="M 215 8 C 280 10, 355 40, 350 75 C 345 95, 305 100, 270 108"
                    stroke="url(#center-arrow-blue)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
                  />

                  <motion.path
                    d="M 200 8 Q 180 45, 220 75 T 200 110"
                    stroke="url(#center-arrow-teal)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Selector de servicios PREMIUM 3x3 en layouts móviles */}
          <div className="lg:hidden relative z-35 w-full max-w-sm sm:max-w-md mx-auto mb-10 px-4 mt-8 sm:mt-10 select-none">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {amazonIntroServices.map((item, idx) => {
                const isSelected = active === idx;
                const serviceName = lang === 'es' ? item.titleEs : item.titleEn;
                
                return (
                  <button
                    key={idx}
                    onClick={() => select(idx)}
                    className={`relative overflow-hidden flex flex-col items-center justify-center h-16 px-1.5 rounded-xl border transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                      isSelected
                        ? "bg-[#102135] text-white border-[#102135] shadow-md shadow-[#102135]/20 scale-[1.03] ring-1 ring-[#ffb400]"
                        : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80 shadow-sm"
                    }`}
                  >
                    <span className={`text-[9px] sm:text-[10px] font-black text-center tracking-tight leading-tight line-clamp-2 ${isSelected ? "text-white" : "text-slate-800"}`}>
                      {serviceName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Completo Horizontal (Línea de Producción) */}
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-start relative mb-6">

            {/* Sticky Selector Panel (Desktop) */}
            <div className="hidden lg:block w-full lg:w-[300px] shrink-0 relative z-30">
              <div className="sticky top-28 bg-white/100 backdrop-blur-xl border border-slate-200 shadow-[0_12px_40px_rgba(16,33,53,0.08)] rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6 ml-2 mr-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#102135]/50 text-left">
                    {lang === 'es' ? "Selector de Servicios" : "Service Selector"}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[8px] font-black uppercase tracking-widest text-emerald-600">
                      {lang === 'es' ? "En marcha" : "Running"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {amazonIntroServices.map((item, idx) => {
                    const isActive = idx === active;
                    return (
                      <div
                        key={idx}
                        onClick={() => select(idx)}
                        title={lang === "es" ? item.titleEs : item.titleEn}
                        className={`relative flex items-center justify-start text-left rounded-xl p-3.5 transition-all duration-300 border cursor-pointer overflow-hidden ${
                          isActive
                            ? "bg-[#102135] text-[#f90] border-[#102135] shadow-[0_8px_20px_rgba(16,33,53,0.25)] scale-[1.02] opacity-100 z-10"
                            : "bg-white/50 text-[#102135] border-slate-200/80 shadow-sm opacity-60 hover:opacity-100 hover:bg-white scale-100"
                        }`}
                      >
                        <span className={`text-[11px] sm:text-[12px] font-black leading-tight relative z-10 transition-colors duration-300 ${isActive ? "text-[#f90]" : "text-[#102135]"}`}>
                          {lang === 'es' ? item.titleEs : item.titleEn}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full flex justify-center mt-8">
                  <button
                    onClick={handleContact}
                    className="w-full py-4 rounded-xl bg-[#ffb400] text-[#102135] hover:bg-[#ffc233] hover:scale-[1.02] transition-all duration-300 font-extrabold text-[10px] sm:text-[11px] tracking-wider uppercase shadow-[0_8px_20px_rgba(255,180,0,0.25)] cursor-pointer"
                  >
                    {lang === 'es' ? "Consúltanos" : "Consult Us"}
                  </button>
                </div>
              </div>
            </div>

            {/* Escenario de la Cinta Interactiva */}
            <div
              ref={stageRef}
              className="flex-1 w-full relative mb-24 md:mb-28"
            >
              <ConveyorBelt 
                lang={lang} 
                isShifting={isShifting} 
                onPrev={handlePrev} 
                onNext={handleNext} 
                onRotate={handleRotate}
              />

              <div className="relative z-20 min-h-[440px] md:min-h-[470px] flex items-end justify-center overflow-visible">
                {/* Controladores de Navegación Neumofílicos/Claymorphic flotantes (Sólidos, solo Desktop) */}
                <div className="hidden lg:flex absolute -top-18 left-1/2 -translate-x-1/2 ml-[300px] xl:ml-[335px] z-40 items-center justify-center gap-5 select-none animate-none">
                  <button
                    onClick={handlePrev}
                    onMouseEnter={() => setHoverPrev(true)}
                    onMouseLeave={() => setHoverPrev(false)}
                    className="w-16 h-16 flex items-center justify-center bg-[#f4f7fa] hover:bg-[#ebf0f5] text-[#102135] rounded-full aspect-square shrink-0 transition-all duration-300 border-[5px] border-white cursor-pointer group active:scale-95"
                    title={lang === "es" ? "Anterior" : "Previous"}
                    style={{
                      boxShadow: hoverPrev 
                        ? '20px 28px 48px rgba(163, 177, 198, 0.55), -20px -28px 48px rgba(255, 255, 255, 1.0), inset 6px 6px 12px rgba(255, 255, 255, 1.0), inset -6px -6px 12px rgba(163, 177, 198, 0.4)'
                        : '14px 18px 36px rgba(163, 177, 198, 0.45), -14px -18px 36px rgba(255, 255, 255, 1.0), inset 4px 4px 8px rgba(255, 255, 255, 1.0), inset -4px -4px 10px rgba(163, 177, 198, 0.3)',
                      transform: hoverPrev ? 'translateY(-4px) scale(1.05)' : 'translateY(0px) scale(1)'
                    }}
                  >
                    <ArrowLeft className="w-5.5 h-5.5 transition-colors duration-300 text-[#102135] group-hover:text-[#FF9900]" />
                  </button>

                  <button
                    onClick={handleRotate}
                    onMouseEnter={() => setHoverRotate(true)}
                    onMouseLeave={() => setHoverRotate(false)}
                    className="flex-nowrap shrink-0 flex items-center justify-center gap-3 px-8 py-5.5 bg-[#f4f7fa] hover:bg-[#ebf0f5] text-slate-700 font-sans text-[13px] font-semibold tracking-wide normal-case rounded-[34px] transition-all duration-300 border-[5px] border-white cursor-pointer group active:scale-95 whitespace-nowrap"
                    style={{
                      boxShadow: hoverRotate 
                        ? '22px 30px 50px rgba(163, 177, 198, 0.55), -22px -30px 50px rgba(255, 255, 255, 1.0), inset 6px 6px 12px rgba(255, 255, 255, 1.0), inset -6px -6px 14px rgba(163, 177, 198, 0.4)'
                        : '15px 20px 38px rgba(163, 177, 198, 0.45), -15px -20px 38px rgba(255, 255, 255, 1.0), inset 4px 4px 8px rgba(255, 255, 255, 1.0), inset -4px -4px 12px rgba(163, 177, 198, 0.3)',
                      transform: hoverRotate ? 'translateY(-4px) scale(1.03)' : 'translateY(0px) scale(1)'
                    }}
                  >
                    <RotateCw className={`w-4.5 h-4.5 text-[#FF9900] transition-transform duration-700 shrink-0 ${isRotated ? 'rotate-180' : ''}`} />
                    <span className="text-slate-700 group-hover:text-[#FF9900] transition-colors duration-300 font-bold tracking-normal whitespace-nowrap">
                      {lang === "es" ? "Rotar caja" : "Rotate box"}
                    </span>
                  </button>

                  <button
                    onClick={handleNext}
                    onMouseEnter={() => setHoverNext(true)}
                    onMouseLeave={() => setHoverNext(false)}
                    className="w-16 h-16 flex items-center justify-center bg-[#f4f7fa] hover:bg-[#ebf0f5] text-[#102135] rounded-full aspect-square shrink-0 transition-all duration-300 border-[5px] border-white cursor-pointer group active:scale-95"
                    title={lang === "es" ? "Siguiente" : "Next"}
                    style={{
                      boxShadow: hoverNext 
                        ? '20px 28px 48px rgba(163, 177, 198, 0.55), -20px -28px 48px rgba(255, 255, 255, 1.0), inset 6px 6px 12px rgba(255, 255, 255, 1.0), inset -6px -6px 12px rgba(163, 177, 198, 0.4)'
                        : '14px 18px 36px rgba(163, 177, 198, 0.45), -14px -18px 36px rgba(255, 255, 255, 1.0), inset 4px 4px 8px rgba(255, 255, 255, 1.0), inset -4px -4px 10px rgba(163, 177, 198, 0.3)',
                      transform: hoverNext ? 'translateY(-4px) scale(1.05)' : 'translateY(0px) scale(1)'
                    }}
                  >
                    <ArrowRight className="w-5.5 h-5.5 transition-colors duration-300 text-[#102135] group-hover:text-[#FF9900]" />
                  </button>
                </div>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onPanEnd={(e: any, info: any) => {
                      if (info.offset.x < -50 || info.velocity.x < -500) select(active + 1);
                      else if (info.offset.x > 50 || info.velocity.x > 500) select(active - 1);
                    }}
                    className="cursor-grab active:cursor-grabbing w-full"
                  >
                    {/* No vibración: quitamos el efecto shake para la caja y el item */}
                    <LayoutGroup id={`service-chip-flow-${active}`}>
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8 md:gap-12 lg:gap-14">
                      {/* Item del servicio: grande, sin soga, apoyado en la cinta */}
                      <div className="relative shrink-0 flex flex-col items-center" style={{ perspective: '1200px' }}>
                        <motion.img
                          src={optimizeCloudinaryUrl(activeItem.imgUrl, 500)}
                          alt={lang === "es" ? activeItem.titleEs : activeItem.titleEn}
                          className="relative z-10 object-contain drop-shadow-[0_24px_40px_rgba(16,33,53,0.18)]"
                          style={{ width: imgSize, height: imgSize, transformStyle: 'preserve-3d' }}
                          animate={{ 
                            rotateY: isRotated ? -180 : 0
                          }}
                          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          draggable="false"
                        />
                        <ServiceGlassCallout item={activeItem} isRotated={isRotated} />
                        
                        {/* Sombra de contacto del item sobre la goma */}
                        <div
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/30 blur-[10px] rounded-[100%]"
                          style={{ width: imgSize * 0.72, height: '16px' }}
                        />
                      </div>

                      {/* La caja con el texto, a la derecha */}
                      <div className="flex flex-col items-center gap-2.5 md:gap-3.5 relative z-30 -translate-y-4 md:-translate-y-6">
                        <ServiceCrate
                          item={activeItem}
                          index={active}
                          total={amazonIntroServices.length}
                          lang={lang}
                          width={cardW}
                          isRotated={isRotated}
                        />
                      </div>
                    </div>
                    </LayoutGroup>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return null;
}
