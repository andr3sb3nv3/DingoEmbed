import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  ShoppingBag,
  Award,
  TrendingUp,
  Sparkles,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Target,
  Users,
  Zap,
  BarChart3,
  Play,
  Send,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import VentajasAmazon from "./VentajasAmazon";
import ProjectCodeViewer from "./ProjectCodeViewer";

// Service details data structured for both languages
export const servicesData: Record<
  string,
  {
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
  }
> = {
  "amazon-solutions": {
    title: "Amazon Solutions",
    subtitle: "Gestión Integral y Aceleración de Ventas en Amazon",
    description:
      "Maximizamos tu presencia en el marketplace más grande del mundo. Optimizamos tus listados para SEO, estructuramos y escalamos campañas avanzadas de PPC (Sponsored Products, Brands, y Sponsored Display), impulsamos reseñas genuinas y controlamos tus inventarios para dominar el Buy Box y multiplicar tu rentabilidad.",
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
      "Soporte de Registro de Marca (Brand Registry) y protección de canal",
    ],
    bulletsEn: [
      "Listing optimization with advanced keyword SEO",
      "Premium A+ Content creations and custom Brand Stores",
      "Expert end-to-end Amazon Seller & Vendor Central management",
      "High-efficiency PPC advertising with custom dynamic bidding",
      "Inventory forecasting, out-of-stock mitigation, and FBA optimization",
      "Brand Registry support and listing hijack prevention",
    ],
  },
  "mercado-libre-ads": {
    title: "Mercado Libre Ads",
    subtitle: "Domina el Marketplace Líder de Latinoamérica",
    description:
      "Multiplicamos la exposición y ventas de tus productos en Mercado Libre a través de estrategias inteligentes de Product Ads. Diseñamos estructuras óptimas de campaña y ajustamos las ofertas basadas en tus objetivos de rentabilidad para capitalizar la altísima intención de compra en la región.",
    icon: Award,
    metricValue: "-40%",
    metricLabelEs: "Efectividad del ACOS Promedio",
    metricLabelEn: "Average ACOS Optimization",
    accentColor: "#FFF159", // Meli Yellow
    bulletsEs: [
      "Especialistas con certificación de Mercado Libre Product Ads",
      "Optimización y refinamiento del catálogo para búsquedas locales",
      "Estrategias de puja personalizadas para cada etapa de tu marca",
      "Monitoreo constante e informes detallados de la competencia",
      "Soporte multi-país en LATAM (México, Colombia, Argentina, Chile)",
      "Mejora del posicionamiento orgánico como consecuencia de tus ventas publicitarias",
    ],
    bulletsEn: [
      "Certified Mercado Libre Product Ads specialists",
      "Catalog enrichment and local taxonomy optimization",
      "Bespoke bidding strategies aligned with profitability rules",
      "Real-time monitoring and aggressive competitor tracking",
      "Multi-country support across LATAM (Mexico, Colombia, Argentina, Chile)",
      "Organic rank improvement driven by paid sales velocity",
    ],
  },
  "google-meta-ads": {
    title: "Google & Meta Ads",
    subtitle: "Tráfico de Alta Calidad y Conversión Directa de e-Commerce",
    description:
      "Atraemos compradores de alta intención directo a tu canal de ventas o e-commerce. Generamos demanda mediante embudos persuasivos en Meta (Instagram, Facebook) combinados con la precisión transaccional de Google Ads (Shopping, Search, Performance Max) para lograr un volumen constante de conversiones.",
    icon: TrendingUp,
    metricValue: "4.5x",
    metricLabelEs: "Retorno de Inversión Promedio (ROAS)",
    metricLabelEn: "Average Return on Ad Spend (ROAS)",
    accentColor: "#2563eb", // Elegant Blue
    bulletsEs: [
      "Configuración y auditoría avanzada de Píxel y Conversions API",
      "Segmentaciones complejas de audiencias frías, tibias y remarketing",
      "Campañas integrales de Google Shopping y Performance Max integradas",
      "Copys persuasivos y guías creativas enfocadas 100% en ventas",
      "Atribución multi-canal transparente y reportes integrados en tiempo real",
      "Estrategias continuas de Pruebas A/B en anuncios y landing pages",
    ],
    bulletsEn: [
      "Advanced Pixel setup and server-side Conversions API integration",
      "Complex audience funnel segmenting (Prospecting & Remarketing)",
      "All-inclusive Google Shopping and Performance Max management",
      "Conversion-focused copywriting and creative design guidance",
      "Transparent multi-channel attribution and real-time dashboarding",
      "Continuous A/B testing of ad creatives, copy, and destinations",
    ],
  },
  "tiktok-shops": {
    title: "TikTok Shops",
    subtitle: "Venta Social y Viralización Comercial Instantánea",
    description:
      "Capitalizamos la ola del comercio social que está revolucionando las ventas online. Te ayudamos a integrar, configurar y operar TikTok Shops, conectando tu inventario directamente con videos virales, transmisiones en vivo (LIVE Shopping) y alianzas potentes con creadores clave del ecosistema.",
    icon: Sparkles,
    metricValue: "+250%",
    metricLabelEs: "Incremento de Tráfico Viral Orgánico",
    metricLabelEn: "Organic Viral Traffic Multiplier",
    accentColor: "#01f2f9", // TikTok Cyan
    bulletsEs: [
      "Configuración y enlace completo de tu catálogo con TikTok Shop",
      "Coordinación y automatización del backend operativo de pedidos",
      "Creación de estrategias y guías paso a paso para LIVE Shopping",
      "Planificación y optimización de campañas de publicidad pagada (Shop Ads)",
      "Enlace ágil con influencers integrados mediante el sistema oficial de afiliados",
      "Análisis de tendencias de audio y video para optimización instantánea",
    ],
    bulletsEn: [
      "Complete TikTok Shop setup and inventory catalog integration",
      "Fulfillment pipeline coordination and purchase flow automation",
      "Strategic formulas and playbooks for high-retention LIVE Shopping",
      "TikTok Shop Ads setup and hyper-targeted campaign optimization",
      "Seamless integration with creator campaigns through TikTok Affiliate Hub",
      "Audio and video trend discovery analytics to continuously adapt creatives",
    ],
  },
  "influencer-marketing": {
    title: "Influencer Marketing",
    subtitle: "Alianzas Estratégicas y Credibilidad de Marca Escalable",
    description:
      "Construimos relaciones de confianza que impulsan tus números de negocio. Identificamos, negociamos y gestionamos creadores de contenido auténticos con audiencias profundamente enganchadas en tu sector, logrando un UGC (contenido generado por el usuario) persuasivo que dispara la conversión de tu publicidad pagada.",
    icon: Share2,
    metricValue: "89%",
    metricLabelEs: "Mayor Tasa de Retención que Anuncios Tradicionales",
    metricLabelEn: "Higher Trust Score than Traditional Ads",
    accentColor: "#f43f5e", // Rose Pink
    bulletsEs: [
      "Auditoría y selección de influencers basada en engagement real y demografías",
      "Gestión de contratos, entregables, briefs creativos y pagos unificados",
      "Estrategias creativas basadas en reseñas orgánicas, unboxings y tutoriales",
      "Integración de enlaces rastreables personalizados y cupones de promoción",
      "Adquisición de derechos comerciales de UGC para usar en tus campañas de PPC",
      "Informes exhaustivos sobre el ROI e impacto de marca indirecto",
    ],
    bulletsEn: [
      "Rigorous influencer research focusing on real engagement and demographics",
      "End-to-end contract negotiation, brief creation, and payout handling",
      "Creative direction for organic product reviews, unboxings, and hooks",
      "Custom tracking links and personalized promo codes to record direct ROI",
      "UGC usage rights acquisition to power and amplify paid PPC campaigns",
      "Detailed post-campaign reporting showing direct and assisted conversion uplift",
    ],
  },
};

const LavaLamp = ({
  colors,
  opacity = 0.4,
  mixBlendMode = "normal",
}: {
  colors: string[];
  opacity?: number;
  mixBlendMode?: any;
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {colors.map((color, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full blur-[70px] md:blur-[90px]"
          style={{
            background: color,
            width: `${200 + (idx % 3) * 90}px`,
            height: `${200 + (idx % 3) * 90}px`,
            opacity: opacity,
            mixBlendMode: mixBlendMode,
          }}
          animate={{
            x: [
              `${(idx * 22) % 65}%`,
              `${(40 + idx * 18) % 85}%`,
              `${(8 + idx * 28) % 70}%`,
              `${(idx * 22) % 65}%`,
            ],
            y: [
              `${(12 + idx * 22) % 75}%`,
              `${(70 - idx * 18) % 80}%`,
              `${(30 + idx * 28) % 70}%`,
              `${(12 + idx * 22) % 75}%`,
            ],
            scale: [1, 1.25, 0.9, 1.15, 1],
            borderRadius: [
              "42% 58% 70% 30% / 45% 45% 55% 55%",
              "70% 30% 52% 48% / 60% 40% 60% 40%",
              "30% 70% 40% 60% / 50% 60% 40% 50%",
              "42% 58% 70% 30% / 45% 45% 55% 55%",
            ],
          }}
          transition={{
            duration: 14 + idx * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

interface MeliCombinedPageProps {
  lang: "es" | "en";
  serviceSlug: string;
  onContactClick?: () => void;
}

function MeliCombinedPage({
  lang,
  serviceSlug,
  onContactClick,
}: MeliCombinedPageProps) {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [activeSection, setActiveSection] = useState<
    "none" | "influencer" | "meli" | "tiktok"
  >("none");
  const containerRef = useRef<HTMLDivElement>(null);

  // Realiza el seguimiento del scroll a lo largo de este contenedor de 280vh (3 paneles)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transforms for columns (flex-grow) on desktop
  const influencerFlex = useTransform(
    scrollYProgress,
    [0, 0.12, 0.38, 0.62, 0.72, 1],
    [1.2, 1.2, 3.8, 0.5, 0.4, 0.4],
  );
  const meliFlex = useTransform(
    scrollYProgress,
    [0, 0.12, 0.3, 0.55, 0.8, 0.9, 1],
    [1.2, 1.2, 0.4, 3.8, 0.4, 0.4, 0.4],
  );
  const tiktokFlex = useTransform(
    scrollYProgress,
    [0, 0.12, 0.3, 0.5, 0.75, 1],
    [1.2, 1.2, 0.4, 0.4, 3.8, 3.8],
  );

  // Transforms for columns (flex-grow) on mobile layout
  const influencerMobileFlex = useTransform(
    scrollYProgress,
    [0, 0.12, 0.38, 0.62, 1],
    [1.2, 1.2, 3.2, 0.5, 0.5],
  );
  const meliMobileFlex = useTransform(
    scrollYProgress,
    [0, 0.18, 0.45, 0.72, 1],
    [1.2, 0.5, 3.2, 0.5, 0.5],
  );
  const tiktokMobileFlex = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 0.78, 1],
    [1.2, 0.5, 0.5, 3.2, 3.2],
  );

  // Snappy spring-physics configuration for real-time organic responsiveness
  const springConfig = { stiffness: 110, damping: 18, mass: 0.5 };

  const influencerFlexSpring = useSpring(influencerFlex, springConfig);
  const meliFlexSpring = useSpring(meliFlex, springConfig);
  const tiktokFlexSpring = useSpring(tiktokFlex, springConfig);

  const influencerMobileFlexSpring = useSpring(
    influencerMobileFlex,
    springConfig,
  );
  const meliMobileFlexSpring = useSpring(meliMobileFlex, springConfig);
  const tiktokMobileFlexSpring = useSpring(tiktokMobileFlex, springConfig);

  const scrollToPercent = (percent: number) => {
    if (containerRef.current) {
      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const scrollHeight = element.offsetHeight - window.innerHeight;
      const targetScrollY = absoluteTop + scrollHeight * percent;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.15) {
        setActiveSection("none");
      } else if (latest >= 0.15 && latest < 0.45) {
        setActiveSection("influencer");
      } else if (latest >= 0.45 && latest < 0.75) {
        setActiveSection("meli");
      } else {
        setActiveSection("tiktok");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleResizeWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWidth);
    return () => window.removeEventListener("resize", handleResizeWidth);
  }, []);

  const isMobileView = windowWidth < 768;

  useEffect(() => {
    document.title =
      lang === "es"
        ? "Estrategias de Crecimiento Multicanal"
        : "Integrated Growth Channels";

    let percent = 0;
    if (serviceSlug === "mercado-libre-ads") {
      percent = 0.58;
    } else if (serviceSlug === "tiktok-shops") {
      percent = 0.88;
    } else if (serviceSlug === "influencer-marketing") {
      percent = 0.28;
    }

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const element = containerRef.current;
        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const scrollHeight = element.offsetHeight - window.innerHeight;
        const targetY = absoluteTop + scrollHeight * percent;
        window.scrollTo({ top: targetY, behavior: "instant" });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [serviceSlug, lang]);

  const isEs = lang === "es";

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      document
        .getElementById("contacto")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280vh] bg-white overflow-clip font-sans text-slate-900"
    >
      {/* Sticky viewport content wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white flex flex-col">
        {/* Columns Flex Container */}
        <div className="flex-1 flex flex-col md:flex-row w-full overflow-hidden bg-white">
          {/* COLUMN 1: INFLUENCER MARKETING */}
          <motion.div
            onClick={() => {
              if (activeSection !== "influencer") scrollToPercent(0.28);
            }}
            style={{
              flexGrow: isMobileView
                ? influencerMobileFlexSpring
                : influencerFlexSpring,
            }}
            className={`relative overflow-hidden flex flex-col justify-center transition-all duration-300 bg-white border-r border-slate-100 ${
              activeSection !== "none" && activeSection !== "influencer"
                ? "cursor-pointer hover:bg-slate-50"
                : ""
            }`}
          >
            {/* Abs grid lines/patterns */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none z-10" />

            {/* Lava Lamp background effect */}
            <LavaLamp
              colors={["#ff0050", "#7a0270", "#ff6b00", "#ff007f"]}
              opacity={0.2}
            />

            {/* Compact State (Acts as Tab bar when minimized) */}
            {activeSection !== "none" && activeSection !== "influencer" && (
              <div className="absolute inset-0 z-10 flex flex-row md:flex-col items-center justify-center p-4 gap-3 text-center transition-all duration-500 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                  <Share2 className="w-5 h-5 text-[#ff0050]" />
                </div>
                <span className="font-black uppercase text-xs sm:text-sm tracking-widest text-slate-700 md:[writing-mode:vertical-lr] md:rotate-180 text-nowrap">
                  {isEs ? "Influencers" : "Influencers"}
                </span>
              </div>
            )}

            {/* Expanded State / Default All Columns State */}
            {(activeSection === "none" || activeSection === "influencer") && (
              <div className="p-6 sm:p-12 md:p-16 w-full max-w-6xl mx-auto h-full flex flex-col justify-center text-left scrollbar-thin overflow-y-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Copy Column */}
                  <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-start space-y-4">
                    <h2 className="font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-slate-900">
                      {isEs ? "Influencer Marketing" : "Influencer Marketing"}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {isEs
                        ? "Conecta tu marca con los creadores de contenido más afines para amplificar la visibilidad y construir confianza auténtica. Gestionamos desde la selección analítica y briefs creativos hasta la adquisición de derechos de uso en campañas pagadas."
                        : "Connect your brand with the right content creators to amplify visibility and craft genuine trust. We manage everything from rigorous vetted selection to licensing high-converting assets for paid search."}
                    </p>

                    {/* Read more triggers (Zone 0) */}
                    {activeSection === "none" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToPercent(0.28);
                        }}
                        className="mt-3 flex items-center gap-2 px-6 py-2.5 bg-[#ff0050] text-white hover:bg-[#ff0050]/90 font-black text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 shadow-md cursor-pointer select-none"
                      >
                        <span>{isEs ? "Ver Detalles" : "View Details"}</span>
                      </button>
                    )}

                    {/* Detailed action triggers (Zone 1) */}
                    {activeSection === "influencer" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContact();
                        }}
                        className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#ff0050] text-white hover:bg-slate-900 font-black text-xs tracking-widest uppercase rounded-full transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>
                          {isEs
                            ? "Hablemos de tu Marca"
                            : "Let's Talk About Your Brand"}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {/* Detailed Info Card */}
                  {activeSection === "influencer" && (
                    <div className="lg:col-span-12 xl:col-span-5 w-full animate-fadeIn">
                      <div className="bg-slate-50/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 space-y-4 shadow-md">
                        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff3b70]">
                            UGC KPI Targets
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-2">
                          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                            <span className="text-[9px] font-black uppercase text-slate-400 block leading-tight">
                              UGC Conversion
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-[#ff3b70] block tracking-tight">
                              +89%
                            </span>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                            <span className="text-[9px] font-black uppercase text-slate-400 block leading-tight">
                              Engagement Rate
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-emerald-600 block tracking-tight">
                              5.4%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {isEs ? "Puntos Clave" : "Key Offerings"}
                          </h4>
                          <ul className="space-y-1.5 text-[11px] text-slate-700">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b70] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Auditoría de perfiles y demografías"
                                  : "Rigorous selection based on real reach"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b70] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Unificación de contratos y briefings"
                                  : "Secure contracts and alignment briefs"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b70] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Adquisición de derechos para pauta publicitaria"
                                  : "Acquire usage rights for continuous PPC"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* COLUMN 2: MERCADO LIBRE ADS */}
          <motion.div
            onClick={() => {
              if (activeSection !== "meli") scrollToPercent(0.58);
            }}
            style={{
              flexGrow: isMobileView ? meliMobileFlexSpring : meliFlexSpring,
            }}
            className={`relative overflow-hidden flex flex-col justify-center transition-all duration-300 bg-white border-r border-slate-100 ${
              activeSection !== "none" && activeSection !== "meli"
                ? "cursor-pointer hover:bg-slate-50"
                : ""
            }`}
          >
            {/* Abs grid lines/patterns */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none z-10" />

            {/* Lava Lamp background effect */}
            <LavaLamp
              colors={["#FFE600", "#ffbe00", "#ffd700", "#fff59d"]}
              opacity={0.3}
            />

            {/* Compact State */}
            {activeSection !== "none" && activeSection !== "meli" && (
              <div className="absolute inset-0 z-10 flex flex-row md:flex-col items-center justify-center p-4 gap-3 text-center transition-all duration-500 animate-fadeIn text-[#102135]">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-black uppercase text-xs sm:text-sm tracking-widest text-[#102135] md:[writing-mode:vertical-lr] md:rotate-180 text-nowrap">
                  {isEs ? "Mercado Libre" : "Mercado Libre"}
                </span>
              </div>
            )}

            {/* Expanded State / Default All Columns State */}
            {(activeSection === "none" || activeSection === "meli") && (
              <div className="p-6 sm:p-12 md:p-16 w-full max-w-6xl mx-auto h-full flex flex-col justify-center text-left text-[#102135] scrollbar-thin overflow-y-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Copy Column */}
                  <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-start space-y-4">
                    <h2 className="font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-[#102135]">
                      {isEs ? "Mercado Libre Ads" : "Mercado Libre Ads"}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {isEs
                        ? "Aumenta tus ventas y escala posiciones en el canal más fuerte de América Latina. Gestionamos tu ACOS, optimizamos listados, enriquecemos tu taxonomía de búsquedas y maximizamos tu retorno de inversión publicitaria con especialistas certificados."
                        : "Boost your sales and conquer index positions inside Latam's major channel. We actively optimize ACOS, listings taxonomy, and maximize advertising returns via officially certified specialists."}
                    </p>

                    {/* Read more triggers (Zone 0) */}
                    {activeSection === "none" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToPercent(0.58);
                        }}
                        className="mt-3 flex items-center gap-2 px-6 py-2.5 bg-[#102135] text-white hover:bg-[#102135]/90 font-black text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 shadow-md cursor-pointer select-none"
                      >
                        <span>{isEs ? "Ver Detalles" : "View Details"}</span>
                      </button>
                    )}

                    {/* Detailed action triggers (Zone 1) */}
                    {activeSection === "meli" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContact();
                        }}
                        className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#102135] text-[#FFE600] hover:bg-[#102135]/90 font-black text-xs tracking-widest uppercase rounded-full transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>
                          {isEs
                            ? "Optimizar mi Canal MeLi"
                            : "Optimize My MeLi Channel"}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {/* Detailed Info Card */}
                  {activeSection === "meli" && (
                    <div className="lg:col-span-12 xl:col-span-5 w-full animate-fadeIn">
                      <div className="bg-[#102135] text-white rounded-2xl p-6 space-y-4 shadow-xl">
                        <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#FFE600]">
                            Target Performance
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-2">
                          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                            <span className="text-[9px] font-black uppercase text-white/50 block leading-tight">
                              ACOS Reduction
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-emerald-400 block tracking-tight">
                              -40%
                            </span>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                            <span className="text-[9px] font-black uppercase text-white/50 block leading-tight">
                              Conversion Boost
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-[#FFE600] block tracking-tight">
                              +18%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-[#FFE600] uppercase tracking-widest">
                            {isEs ? "Puntos Clave" : "Strategic Pillars"}
                          </h4>
                          <ul className="space-y-1.5 text-[11px] text-white/90">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Certificados en Product Ads"
                                  : "Officially certified in Product Ads"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Soporte regional México y LATAM"
                                  : "Full support across Mexico, Colombia, Chile"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Estrategias de puja por rentabilidad"
                                  : "Custom margins profitability targets"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* COLUMN 3: TIKTOK SHOPS */}
          <motion.div
            onClick={() => {
              if (activeSection !== "tiktok") scrollToPercent(0.88);
            }}
            style={{
              flexGrow: isMobileView
                ? tiktokMobileFlexSpring
                : tiktokFlexSpring,
            }}
            className={`relative overflow-hidden flex flex-col justify-center transition-all duration-300 bg-white border-l border-slate-100 ${
              activeSection !== "none" && activeSection !== "tiktok"
                ? "cursor-pointer hover:bg-slate-50"
                : ""
            }`}
          >
            {/* Abs grid lines/patterns */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none z-10" />

            {/* Lava Lamp background effect */}
            <LavaLamp
              colors={["#00f2fe", "#fe1f5b", "#8a2be2", "#4b0082"]}
              opacity={0.2}
            />

            {/* Compact State */}
            {activeSection !== "none" && activeSection !== "tiktok" && (
              <div className="absolute inset-0 z-10 flex flex-row md:flex-col items-center justify-center p-4 gap-3 text-center transition-all duration-500 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                  <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                </div>
                <span className="font-black uppercase text-xs sm:text-sm tracking-widest text-[#fe1f5b] md:[writing-mode:vertical-lr] md:rotate-180 text-nowrap">
                  {isEs ? "TikTok Shops" : "TikTok Shops"}
                </span>
              </div>
            )}

            {/* Expanded State / Default All Columns State */}
            {(activeSection === "none" || activeSection === "tiktok") && (
              <div className="p-6 sm:p-12 md:p-16 w-full max-w-6xl mx-auto h-full flex flex-col justify-center text-left text-slate-900 scrollbar-thin overflow-y-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Copy Column */}
                  <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-start space-y-4">
                    <h2 className="font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-slate-900">
                      {isEs ? "TikTok Shops" : "TikTok Shops"}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {isEs
                        ? "Adéntrate en la era dorada del Social Commerce. Genera ventas instantáneas, sincroniza catálogos, gestiona afiliados y optimiza anuncios nativos con campañas creativas diseñadas para convertir la viralidad en ingresos constantes."
                        : "Enter the golden era of Social Commerce. Generate instant checkouts, synchronize catalogues, configure affiliate dashboards, and deploy native campaign formats designed to convert organic loops to sales."}
                    </p>

                    {/* Read more triggers (Zone 0) */}
                    {activeSection === "none" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToPercent(0.88);
                        }}
                        className="mt-3 flex items-center gap-2 px-6 py-2.5 bg-[#fe1f5a] text-white hover:bg-[#fe1f5a]/90 font-black text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 shadow-md cursor-pointer select-none"
                      >
                        <span>{isEs ? "Ver Detalles" : "View Details"}</span>
                      </button>
                    )}

                    {/* Detailed action triggers (Zone 1) */}
                    {activeSection === "tiktok" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContact();
                        }}
                        className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#fe1f5a] text-white hover:bg-slate-900 font-black text-xs tracking-widest uppercase rounded-full transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>
                          {isEs
                            ? "Hablemos de tu Proyecto"
                            : "Let's Talk About Your Project"}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {/* Detailed Info Card */}
                  {activeSection === "tiktok" && (
                    <div className="lg:col-span-12 xl:col-span-5 w-full animate-fadeIn">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#01f2f9] via-transparent to-[#fe1f5a]" />

                        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#fe1f5a]">
                            Social commerce Funnel
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-2">
                          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-xs">
                            <span className="text-[9px] font-black uppercase text-slate-400 block leading-tight">
                              Viral Traffic
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-slate-900 block tracking-tight">
                              +250%
                            </span>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-xs">
                            <span className="text-[9px] font-black uppercase text-slate-400 block leading-tight">
                              Live Shopping ROI
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-[#fe1f5a] block tracking-tight">
                              3.8x
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {isEs ? "Capacidades" : "Key Pillars"}
                          </h4>
                          <ul className="space-y-1.5 text-[11px] text-slate-700">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#01f2f9] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Sincronización total de catálogos FBA"
                                  : "Full stock catalog inventory sync"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#fe1f5a] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Guiones y optimización para LIVE"
                                  : "Scripting and coaching for LIVE hooks"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#01f2f9] shrink-0 mt-0.5" />
                              <span>
                                {isEs
                                  ? "Anuncios integrados de afiliación"
                                  : "Affiliate partnerships tracking system"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface ServiceDetailPageProps {
  serviceSlug: string;
  lang: "es" | "en";
  onGoBack: () => void;
  onContactClick?: () => void;
}

export default function ServiceDetailPage({
  serviceSlug,
  lang,
  onGoBack,
  onContactClick,
}: ServiceDetailPageProps) {
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {}; // Stub since mobile is read inline and isMobile can be read from media query or state if needed.
  }, []);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAmazonScrolled, setIsAmazonScrolled] = useState<boolean>(false);
  const [isSelectorVisible, setIsSelectorVisible] = useState<boolean>(true);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResizeWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWidth);
    return () => window.removeEventListener("resize", handleResizeWidth);
  }, []);

  const isMobileView = windowWidth < 768;

  const isMeliCombined = [
    "mercado-libre-tiktok-influencer",
    "mercado-libre-ads",
    "tiktok-shops",
    "influencer-marketing",
  ].includes(serviceSlug);

  const isAmazonCombined = [
    "amazon-google-meta",
    "amazon-solutions",
    "google-meta-ads",
  ].includes(serviceSlug);

  useEffect(() => {
    if (!isAmazonCombined) return;

    // We only observe after rendering, waiting a tiny bit for layout.
    const handleScroll = () => {
      // Toggle banner scroll down state
      setIsAmazonScrolled(window.scrollY > 130);

      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      let currentIdx = 0; // Default to the first module being illuminated

      itemRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const top = ref.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          currentIdx = idx;
        }
      });

      let visible = true;
      const lastRef = itemRefs.current[itemRefs.current.length - 1];
      if (lastRef) {
        const bottom = lastRef.getBoundingClientRect().bottom;
        // Fade out selector when the last card is scrolled past the top quarter of screen
        if (bottom < window.innerHeight * 0.3) {
          visible = false;
        }
      }

      setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
      setIsSelectorVisible(visible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAmazonCombined]);

  const meliCombinedServices = [
    servicesData["mercado-libre-ads"],
    servicesData["tiktok-shops"],
    servicesData["influencer-marketing"],
  ].filter(Boolean);

  const amazonCombinedServices = [
    servicesData["amazon-solutions"],
    servicesData["google-meta-ads"],
  ].filter(Boolean);

  const service = servicesData[serviceSlug];
  // Fallback to amazon-solutions if invalid slug is provided
  const activeService = service || servicesData["amazon-solutions"];

  useEffect(() => {
    if (isAmazonCombined) {
      document.title =
        lang === "es"
          ? "Soluciones e-Commerce Integradas"
          : "Integrated E-Commerce Solutions";

      if (serviceSlug === "google-meta-ads") {
        const timer = setTimeout(() => {
          itemRefs.current[8]?.scrollIntoView({
            behavior: "instant",
            block: "center",
          });
        }, 50);
        return () => clearTimeout(timer);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    } else if (!isMeliCombined) {
      document.title = activeService.title;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [serviceSlug, activeService, isMeliCombined, isAmazonCombined, lang]);

  if (isMeliCombined) {
    return (
      <MeliCombinedPage
        lang={lang}
        serviceSlug={serviceSlug}
        onContactClick={onContactClick}
      />
    );
  }

  if (isAmazonCombined) {
    const amazonIntroServices = [
      {
        titleEs: "PPC Solutions",
        titleEn: "PPC Solutions",
        descEs:
          "Implementamos estrategias de oferta avanzadas diseñadas para optimizar tu retorno de inversión publicitaria (ROAS) y mantener un ACOS bajo. Al perfeccionar las ofertas de CPC, logramos el equilibrio perfecto entre atraer tráfico, maximizar conversiones y garantizar la rentabilidad a largo plazo.",
        descEn:
          "We employ advanced bidding strategies designed to optimize your return on ad spend (ROAS) and maintain a low ACOS. By refining CPC bids, we achieve the perfect balance between driving traffic, maximizing conversions, and ensuring long-term profitability.",
        imgUrl:
          "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Chart%20increasing/3D/chart_increasing_3d.png",
        badgeEs: "Optimización ROAS",
        badgeEn: "ROAS Optimization",
      },
      {
        titleEs: "SEO Listing Optimization",
        titleEn: "SEO Listing Optimization",
        descEs:
          "Analizamos tus listados y realizamos pruebas A/B estructuradas para optimizar la tasa de conversión (CVR), maximizando la visibilidad orgánica en los resultados y multiplicando tus ventas.",
        descEn:
          "We analyze your listings and conduct A/B testing to optimize the conversion rate (CVR), maximizing visibility and driving more sales.",
        imgUrl:
          "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779202064/xnewujtqbagjuio8xgzn.png",
        badgeEs: "Pruebas A/B",
        badgeEn: "A/B Testing",
      },
      {
        titleEs: "Listing SEO",
        titleEn: "Listing SEO",
        descEs:
          "Posicionamiento orgánico de la más alta precisión. Adaptamos la redacción, títulos, viñetas y descripciones de tus productos utilizando los algoritmos más recientes para asegurar los primeros lugares de búsqueda.",
        descEn:
          "Organic positioning of the highest precision. We adapt the copywriting, titles, bullet points, and descriptions of your products using the latest algorithms to ensure the top search ranks.",
        imgUrl:
          "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying%20glass%20tilted%20left/3D/magnifying_glass_tilted_left_3d.png",
        badgeEs: "Visibilidad Orgánica",
        badgeEn: "Organic Rank",
      },
      {
        titleEs: "A+ Content",
        titleEn: "A+ Content",
        descEs:
          "Diseñamos material gráfico de alto rendimiento y Contenido A+ que eleva la identidad de tu marca, conectando emocionalmente con tus compradores y aumentando drásticamente el ratio de conversión (CVR) en Amazon.",
        descEn:
          "We design high-performing product artwork and A+ Content that elevate your brand and boost conversion rates (CVR) on Amazon.",
        imgUrl:
          "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779477884/x87faxqr4yrgm6l7aq0a.png",
        badgeEs: "Identidad Premium",
        badgeEn: "Premium Branding",
      },
      {
        titleEs: "Keyword Research",
        titleEn: "Keyword Research",
        descEs:
          "Realizamos investigaciones profundas de palabras clave para identificar términos de búsqueda con alta intención de compra. Optimizar tus campañas PPC con estas palabras atrae tráfico altamente cualificado, evita el desperdicio en publicidad y amplifica conversiones.",
        descEn:
          "We perform in-depth keyword research to identify high-converting search terms. Optimizing your PPC campaigns with these terms attracts qualified traffic, improving your chances of conversions and minimizing ad spend waste.",
        imgUrl:
          "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779474879/wugxj0pqcugcaeiibnyb.png",
        badgeEs: "Auditoría de Palabras",
        badgeEn: "Search Intent",
      },
      {
        titleEs: "Reimbursements",
        titleEn: "Reimbursements",
        descEs:
          "Gestionamos y reclamamos reembolsos ante Amazon por inventario FBA perdido, dañado o no devuelto por los clientes, recuperando capital legítimo que pertenece directamente al balance de tu empresa.",
        descEn:
          "We manage reimbursements on Amazon for lost, damaged, or unreturned FBA inventory.",
        imgUrl:
          "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money%20bag/3D/money_bag_3d.png",
        badgeEs: "Recuperación FBA",
        badgeEn: "FBA Safeguards",
      },
      {
        titleEs: "Caselog Management",
        titleEn: "Caselog Management",
        descEs:
          "Administramos y procesamos todos los registros de casos y tickets de soporte técnico en tu nombre de manera proactiva, garantizando que cada incidencia o disputa con Amazon sea atendida rápidamente y resuelta con éxito.",
        descEn:
          "We manage and process all case logs and support tickets on your behalf, ensuring every issue with Amazon is handled promptly and resolved efficiently.",
        imgUrl:
          "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779486787/dlcdrflnv0kwvjv5yftb.png",
        badgeEs: "Soporte Proactivo",
        badgeEn: "Support Tickets",
      },
      {
        titleEs: "Account Deactivation Recovery",
        titleEn: "Account Deactivation Recovery",
        descEs:
          "Si tu cuenta de vendedor en Amazon es desactivada o suspendida, intervenimos de inmediato para analizar la raíz del problema, estructurar planes de acción detallados (POA), redactar la apelación formal y recuperar tu cuenta de forma exitosa.",
        descEn:
          "If your Amazon account is deactivated, we step in to analyze the root cause, build your appeal, and recover your account quickly and effectively.",
        imgUrl:
          "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shield/3D/shield_3d.png",
        badgeEs: "Defensa de Cuenta",
        badgeEn: "POA & Appeal Support",
      },
      {
        titleEs: "External Traffic",
        titleEn: "External Traffic",
        descEs:
          "También ofrecemos soluciones publicitarias integrales externas, incluidas campañas optimizadas en Google Ads, Meta Ads y TikTok Ads para expandir tu alcance global, redirigir clientes cualificados a tus listados de Amazon y potenciar oportunidades de venta cruzada.",
        descEn:
          "We also offer multi-channel advertising solutions — including Google, Meta, and TikTok Ads — to help you increase visibility across platforms, drive external traffic to Amazon, and boost cross-selling opportunities.",
        imgUrl:
          "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Megaphone/3D/megaphone_3d.png",
        badgeEs: "Sinergia Multicanal",
        badgeEn: "External Channels",
      },
    ];

    return (
      <div className="flex flex-col w-full font-sans text-[#102135] min-h-screen px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-10 lg:pb-16 relative bg-[#eaeded]">
        {/* Dynamic Background Intersecting Glows */}
        <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[140px] -z-10 opacity-[0.06] pointer-events-none" />
        <div className="fixed bottom-20 right-1/4 w-[500px] h-[500px] bg-[#2563eb] rounded-full blur-[140px] -z-10 opacity-[0.06] pointer-events-none" />

        {/* Reconstructed Native Amazon Solutions App or standard heading */}
        {serviceSlug === "amazon-google-meta" || serviceSlug === "amazon-solutions" ? (
          <div className="w-[calc(100%+32px)] sm:w-[calc(100%+48px)] lg:w-[calc(100%+64px)] relative z-30 mb-8 -mt-4 -ml-4 sm:-ml-6 lg:-ml-8 overflow-hidden">
            <VentajasAmazon 
              serviceSlug={serviceSlug} 
              lang={lang} 
              onGoBack={onGoBack} 
              onContactClick={onContactClick} 
            />
          </div>
        ) : (
          <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 relative px-4 select-none pt-2 sm:pt-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#102135] tracking-tight leading-tight mt-1">
              {lang === "es"
                ? "Domina tus Ventas en Amazon"
                : "Dominate your Amazon Sales"}
            </h1>

            {/* Centered Decorative SVGs that emerge from center under title to selector */}
            <div className="absolute left-1/2 bottom-[-80px] sm:bottom-[-100px] lg:bottom-[-120px] -translate-x-1/2 w-72 sm:w-80 md:w-[480px] h-20 sm:h-24 md:h-28 pointer-events-none z-20 overflow-visible">
              <svg
                viewBox="0 0 400 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-md overflow-visible"
              >
                <defs>
                  {/* Left Arrow Gradient (Orange) */}
                  <linearGradient
                    id="center-arrow-orange"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffb400" />
                    <stop offset="100%" stopColor="#f90" />
                  </linearGradient>
                  {/* Right Arrow Gradient (Blue) */}
                  <linearGradient
                    id="center-arrow-blue"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  {/* Center Arrow Gradient (Teal/Emerald) */}
                  <linearGradient
                    id="center-arrow-teal"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Left Arrow Path */}
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
                {/* Left Arrowhead */}
                <motion.path
                  d="M 112 108 L 132 109 L 126 89"
                  stroke="url(#center-arrow-orange)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }}
                />

                {/* Right Arrow Path */}
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
                {/* Right Arrowhead */}
                <motion.path
                  d="M 288 89 L 268 110 L 288 108"
                  stroke="url(#center-arrow-blue)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 1.4 }}
                />

                {/* Center Arrow Path (Wavy vertical down) */}
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
                {/* Center Arrowhead */}
                <motion.path
                  d="M 190 100 L 200 110 L 210 100"
                  stroke="url(#center-arrow-teal)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
                />
              </svg>
            </div>
          </div>
        )}

          {/* Portfolio Management Section (Compact Aesthetic Grid) */}
          <div className="w-[calc(100%-1rem)] sm:w-full bg-[#102135] py-14 lg:py-16 relative overflow-hidden mt-4 lg:mt-8 rounded-[2rem] md:rounded-[3rem] mx-auto max-w-[96%] md:max-w-7xl px-4 md:px-8 xl:px-10 shadow-2xl">
            {/* Decoraciones de fondo sutiles */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-gradient-to-b from-[#f90]/5 to-transparent opacity-60 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[120%] bg-gradient-to-t from-[#007185]/10 to-transparent opacity-40 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col">
              {/* Header Centrado */}
              <div className="text-center mb-10 max-w-3xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  {lang === "es"
                    ? "Gestión de Portafolio"
                    : "Portfolio Management"}
                </h2>
                <div className="w-12 h-1 bg-[#f90] rounded-full mb-4"></div>
                <p className="text-white/60 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                  {lang === "es"
                    ? "Un enfoque granular impulsado por datos reales para maximizar el ROAS, capturar cuota de mercado y dominar tu categoría."
                    : "A granular, data-driven approach to maximize your ROAS, capture market share, and dominate your category."}
                </p>
              </div>

              {/* Grid Compacto 3 Columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {[
                  {
                    titleEn: "Listing Optimization",
                    titleEs: "Optimización de Listados",
                    descEn:
                      "Rigorous A/B testing on your listings to optimize your conversion rates (CVR).",
                    descEs:
                      "Pruebas A/B rigurosas en tus listados para optimizar tus tasas de conversión (CVR).",
                    impactEn:
                      "Cuts down acquisition costs and accelerates organic sales momentum.",
                    impactEs:
                      "Reduce costos de adquisición y acelera el volumen de ventas orgánicas.",
                    icon: "01",
                  },
                  {
                    titleEn: "Market Share Strategy",
                    titleEs: "Keywords e Intención",
                    descEn:
                      "Deep keyword taxonomy identifies high-converting queries to feed PPC funnels.",
                    descEs:
                      "Taxonomía profunda que identifica búsquedas de alta conversión para embudos PPC.",
                    impactEn:
                      "Actively steals market share from rivals at the perfect buying moment.",
                    impactEs:
                      "Arrebata activamente cuota de mercado de tus rivales en el momento clave.",
                    icon: "02",
                  },
                  {
                    titleEn: "Competitors Analysis",
                    titleEs: "Inteligencia Competitiva",
                    descEn:
                      "Reverse-engineering competitor missteps to find clear operational advantages.",
                    descEs:
                      "Ingeniería inversa de errores de competidores para hallar ventajas operativas.",
                    impactEn:
                      "Positions your product as the dominant, logical choice for buyers.",
                    impactEs:
                      "Posiciona a tu producto como la elección dominante y lógica.",
                    icon: "03",
                  },
                  {
                    titleEn: "Smart Bidding",
                    titleEs: "Pujas Inteligentes",
                    descEn:
                      "Algorithmic-led implementations to control CPCs, keeping ACOS low.",
                    descEs:
                      "Implementaciones algorítmicas para controlar CPCs y mantener un ACOS bajo.",
                    impactEn:
                      "Eliminates spend waste on poor clicks, ensuring predictable scalability.",
                    impactEs:
                      "Elimina el gasto en clics pobres, asegurando escalabilidad predecible.",
                    icon: "04",
                  },
                  {
                    titleEn: "Reputation Mgt.",
                    titleEs: "Gestión de Reputación",
                    descEn:
                      "Analytics on historical customer reviews to decode friction factors.",
                    descEs:
                      "Analíticas sobre reseñas históricas para decodificar factores de fricción.",
                    impactEn:
                      "Proactively closing the feedback loop protects brand equity.",
                    impactEs:
                      "Cerrar el ciclo de feedback protege proactivamente el valor de marca.",
                    icon: "05",
                  },
                  {
                    titleEn: "Continuous Optimize",
                    titleEs: "Optimización Continua",
                    descEn:
                      "Campaign refinement based strictly on real-time market data signals.",
                    descEs:
                      "Refinamiento sistemático basado estrictamente en alertas del mercado en tiempo real.",
                    impactEn:
                      "Continually drives down CPA so ad efficiency compounds long-term.",
                    impactEs:
                      "Reduce continuamente el CPA para que la eficiencia se multiplique.",
                    icon: "06",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="flex flex-col group p-6 sm:p-7 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#f90]/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1.5 shadow-none hover:shadow-2xl hover:shadow-[#f90]/10"
                  >
                    {/* Top: Icon + Title */}
                    <div className="flex items-center gap-4 mb-4 relative z-10 w-full">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#f90] transition-colors duration-300">
                        <span className="text-sm font-black text-white/50 group-hover:text-[#102135] font-mono">
                          {item.icon}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {lang === "es" ? item.titleEs : item.titleEn}
                      </h3>
                    </div>

                    {/* Middle: Description */}
                    <div className="flex flex-col gap-4">
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-medium">
                        {lang === "es" ? item.descEs : item.descEn}
                      </p>

                      {/* Bottom: Impact */}
                      <div className="flex items-start gap-2 pt-4 border-t border-white/10">
                        <Target className="w-4 h-4 text-[#f90] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed font-semibold">
                          {lang === "es" ? item.impactEs : item.impactEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Campaigns Section */}
          <div className="w-full max-w-7xl mx-auto mt-24 mb-32 px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-[#102135] tracking-tight leading-tight mb-6">
                  {lang === "es" ? "Nuestras Campañas" : "Our Campaigns"}
                </h2>
                <div className="w-20 h-2 bg-[#2563eb] rounded-full" />
              </div>
            </div>

            <div className="flex flex-col gap-24 lg:gap-40">
              {[
                {
                  title: "Sponsored Products",
                  descEn:
                    "Promote products to shoppers actively searching with related keywords or viewing similar products on Amazon.",
                  descEs:
                    "Promociona productos a compradores que buscan activamente palabras clave relacionadas o que ven productos similares en Amazon.",
                  img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779368010/ueya7tfdjcteryqokcsd.jpg",
                },
                {
                  title: "Sponsored Brands",
                  descEn:
                    "Showcase a collection of products to shoppers actively searching with related keywords on Amazon.",
                  descEs:
                    "Muestra una colección de productos a compradores que buscan activamente palabras clave relacionadas en Amazon.",
                  img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779368009/wuudupws6q2l92t9depj.jpg",
                },
                {
                  title: "Sponsored Display",
                  descEn:
                    "Re-engage shoppers off Amazon who viewed your products or similar products, and drive them to your detail pages.",
                  descEs:
                    "Vuelve a interactuar con los compradores fuera de Amazon que vieron tus productos o productos similares, y dirígelos a tus páginas de detalles.",
                  img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779368009/tq8za471snkt84ldnauo.jpg",
                },
              ].map((campaign, idx) => {
                const isImageLeft = idx % 2 !== 0; // 0: img right, 1: img left, 2: img right

                return (
                  <div
                    key={idx}
                    className={`flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 relative z-0 ${isImageLeft ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Content */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        // Strictly horizontal translation coming from behind the image
                        x:
                          windowWidth >= 1024
                            ? isImageLeft
                              ? "-95%"
                              : "95%"
                            : isImageLeft
                              ? "-45%"
                              : "45%",
                        y: 0,
                        scale: 0.98,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 1.3, // Slower speed
                        delay: 0.75, // Wait for image to settle completely as solid
                      }}
                      style={{ zIndex: 10 }}
                      className="flex-1 w-full text-center lg:text-left relative z-10 px-4 lg:px-0"
                    >
                      <div
                        className={`inline-flex items-center gap-4 mb-6 ${isImageLeft ? "lg:flex-row-reverse lg:text-right" : ""}`}
                      >
                        <span className="w-10 h-10 rounded-full bg-[#102135] text-white flex items-center justify-center text-sm font-black shadow-lg">
                          {idx + 1}
                        </span>
                        <h3 className="text-3xl lg:text-5xl font-black text-[#102135] tracking-tight">
                          {campaign.title}
                        </h3>
                      </div>
                      <p
                        className={`text-[#102135]/70 font-medium text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 ${isImageLeft ? "lg:mr-0 lg:ml-auto lg:text-right" : ""}`}
                      >
                        {lang === "es" ? campaign.descEs : campaign.descEn}
                      </p>
                    </motion.div>

                    {/* Image Container */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 35 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ zIndex: 50 }}
                      className="flex-1 w-full relative z-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/5 to-[#f90]/5 rounded-[3rem] transform -rotate-2 scale-105 -z-10" />
                      <motion.div
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full max-w-lg mx-auto shadow-2xl rounded-[2rem] overflow-hidden bg-[#fafafa]"
                      >
                        <img
                          src={campaign.img}
                          alt={campaign.title}
                          className="w-full h-auto object-cover rounded-[2rem]"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans text-[#102135] min-h-[80vh] items-center justify-center relative">
      {/* Background Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] -z-10 opacity-[0.08] pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeService.accentColor }}
      />

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#102135] tracking-tight leading-tight origin-center text-center px-6 drop-shadow-sm mt-12">
        {activeService.title}
      </h1>
    </div>
  );
}
