import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import {
  User,
  Building,
  MessageSquare,
  Send,
  Smile,
  Star,
  TrendingUp,
  Award,
  TrendingDown,
  Target,
  Globe,
  Youtube,
  Twitter,
  Linkedin,
  Phone,
  MapPin,
  HelpCircle,
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ServiceDetailPage from "./components/ServiceDetailPage";
import ContactPage from "./components/ContactPage";
import AboutUsPage from "./components/AboutUsPage";
import Interactive3DDice from "./components/Interactive3DDice";
import CasosDeExito from "./components/CasosDeExito";
import EcosistemaCanales from "./components/EcosistemaCanales";
import FaqPage from "./components/FaqPage";
import TestimoniosActual from "./components/TestimoniosActual";
import InfluencerMarketingStory from "./components/InfluencerMarketingStory";

interface CasinoTextProps {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
}

export function CasinoText({
  text,
  className = "",
  onClick,
  href,
}: CasinoTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const letters = text.split("");

  const containerProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
    className: `${className} relative inline-flex overflow-hidden pb-[0.1em]`,
  };

  const content = (
    <span className="flex overflow-hidden">
      {letters.map((char, index) => {
        const isSpace = char === " ";
        // Render whitespace properly as non-breaking space to keep widths exact
        const displayChar = isSpace ? "\u00A0" : char;

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
            style={{
              lineHeight: "1.1",
            }}
          >
            {/* Upper / Original Letter */}
            <motion.span
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={{
                duration: 0.35,
                ease: [0.19, 1, 0.22, 1],
                delay: index * 0.02,
              }}
              className="inline-block select-none"
            >
              {displayChar}
            </motion.span>

            {/* Lower / Incoming Letter */}
            <motion.span
              animate={{ y: isHovered ? "0%" : "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.19, 1, 0.22, 1],
                delay: index * 0.02,
              }}
              className="absolute left-0 top-0 inline-block w-full h-full select-none"
            >
              {displayChar}
            </motion.span>
          </span>
        );
      })}
    </span>
  );

  if (href) {
    return (
      <a href={href} {...containerProps}>
        {content}
      </a>
    );
  }

  return (
    <span {...containerProps} style={{ cursor: "pointer" }}>
      {content}
    </span>
  );
}

const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  if (url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{count}</>;
};

const campaignPlatforms = [
  {
    name: "Amazon",
    imageUrl:
      "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/c5j9yl6x8x4ioieswyqx.png",
  },
  {
    name: "Walmart",
    imageUrl:
      "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ogwssccpagtzcvckp3w4.png",
  },
  {
    name: "Etsy",
    imageUrl:
      "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/emzfeubwetlobz2byh25.png",
  },
  {
    name: "Target",
    imageUrl:
      "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ilrnxr9bnwzrphkrxryc.png",
  },
  {
    name: "Ebay",
    imageUrl:
      "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/bach9mdxgmbraufw8sue.png",
  },
];

const platformInsights = {
  Amazon: {
    titleEs: "Estrategia de Crecimiento Amazon",
    titleEn: "Amazon Growth Playbook",
    es: "Maximizamos tu visibilidad y rentabilidad en Amazon España y USA. Desarrollamos campañas sofisticadas de Sponsored Products, Sponsored Brands y DSP, combinadas con posicionamiento orgánico SEO de listados para blindar la Buybox y disparar tu ROAS.",
    en: "We maximize your visibility and profitability on Amazon EU & US. We deploy top-performing Sponsored Products, Sponsored Brands, and DSP campaigns, paired with advanced listing SEO to secure the Buybox and scale your ROAS.",
    roas: "5.4x",
    acos: "64%",
  },
  Walmart: {
    titleEs: "Expansión en Walmart Marketplace",
    titleEn: "Walmart Marketplace Expansion",
    es: "Expandimos tu catálogo a Walmart de forma acelerada. Implementamos Walmart Connect Ads con estrategias exclusivas de puja inteligente para dominar los resultados de búsqueda antes que tu competencia directa.",
    en: "Expand your reach onto Walmart's fast-growing marketplace. We establish Walmart Connect Ads with exclusive smart bidding to dominate search placements ahead of your competitors.",
    roas: "4.9x",
    acos: "52%",
  },
  Etsy: {
    titleEs: "Escalabilidad Creativa en Etsy",
    titleEn: "Creative Scaling on Etsy",
    es: "Conectamos con audiencias hiper-segmentadas que buscan exclusividad y diseño. Potenciamos tu volumen de ventas usando Etsy Ads de forma súper eficiente, optimizando títulos, etiquetas y listados altamente enfocados en la conversión.",
    en: "Connect with hyper-niche audiences looking for hand-crafted and unique products. We boost your order volume via highly efficient Etsy Ads and fully optimized tag arrays for maximal visibility.",
    roas: "4.5x",
    acos: "45%",
  },
  Target: {
    titleEs: "Target Plus (Target+) Premium",
    titleEn: "Target Plus (Target+) Premium",
    es: "Impulsamos tu marca en el exclusivo club de Target+. Desarrollamos campañas publicitarias altamente personalizadas mediante Target Roundel, uniendo datos de consumo del mundo real para conectar con compradores de alto valor.",
    en: "Get your brand inside Target's invite-only marketplace. We leverage Target Roundel data-driven advertising to connect with highly loyal, premium buyers using real-world consumer patterns.",
    roas: "5.2x",
    acos: "58%",
  },
  Ebay: {
    titleEs: "Dominio Multi-Canal en eBay",
    titleEn: "eBay Multi-Channel Dominance",
    es: "Optimizamos tu presencia en la plataforma de comercio global más versátil. Diseñamos campañas de eBay Promoted Listings (Standard y Advanced) para capturar demanda activa y acelerar la rotación de tu inventario.",
    en: "Optimize your presence on the most versatile global trading hub. We build advanced eBay Promoted Listings (Standard & Advanced) to target high-intent searchers and turn over inventory rapidly.",
    roas: "4.6x",
    acos: "50%",
  },
};

const clientLogos = [
  "https://dingoppc.com/wp-content/uploads/2026/02/logo-ugo-21-12-1030x130-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/shape.svg",
  "https://dingoppc.com/wp-content/uploads/2025/03/brook.webp",
  "https://dingoppc.com/wp-content/uploads/2025/07/u1-jpg.png",
  "https://dingoppc.com/wp-content/uploads/2025/07/pura-vitalia-jpg.png",
  "https://dingoppc.com/wp-content/uploads/2026/02/logo-1077334878-1739986519-0cfa1c846554de4c85aa56da8da9e63b1739986520-640-0.webp",
  "https://dingoppc.com/wp-content/uploads/2026/01/Logo-Holiherb.svg",
];

const techLogos = [
  "https://dingoppc.com/wp-content/uploads/2025/03/1-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/4-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/7-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/5-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/APO_Logo_Black_P1R1@2x.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/6-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/2-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/3-1.png",
  "https://dingoppc.com/wp-content/uploads/2025/03/tumo.png",
];

const partners = [
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/bfrhro8muvrtntysh0o5.png",
    alt: "Amazon Advertising Partner",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/h7o7xnsutpjxbv7i9j41.png",
    alt: "Partner 2",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216801/uf4fjl5wakxeeljote1m.png",
    alt: "Partner 3",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/ykhuayp805ieuic194iv.png",
    alt: "Partner 4",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/idcu6eqwok73ht0bbf2x.png",
    alt: "Partner 5",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779218569/yuv2jafnf0khbyuz2kox.png",
    alt: "Partner 6",
  },
];

const marketplaces = [
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/c5j9yl6x8x4ioieswyqx.png",
    alt: "Amazon",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ogwssccpagtzcvckp3w4.png",
    alt: "Walmart",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/emzfeubwetlobz2byh25.png",
    alt: "Etsy",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ilrnxr9bnwzrphkrxryc.png",
    alt: "Target",
  },
  {
    img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/bach9mdxgmbraufw8sue.png",
    alt: "Ebay",
  },
];

const translationsList = {
  es: {
    navHome: "Inicio",
    navServices: "Servicios",
    navContact: "Contacto",
    ctaFreePpc: "Free PPC",
    ctaServices: "Nuestros Servicios",
    avgRoas: "ROAS Promedio",
    reducedAcos: "ACOS Reducido",
    sponsoredCamp: "Sponsored Brands & Display",
    topRated: "Top Rated",
    agency: "Agencia",
    liveData: "En Vivo",
    monthlySales: "Ventas Mensuales",
    globalExpansion: "Expansión Global",
    auditButton: "Free PPC Audit",
    boxLeftTitle: "cómo potenciamos tu empresa",
    boxMiddleTitle: "¡hacer crecer tu empresa!",
    contactTitle: "Trabajemos Juntos",
    contactSubtitle:
      "Completa tus datos y un especialista en Amazon se contactará contigo para diseñar tu estrategia.",
    lblName: "Nombre completo",
    lblCompany: "Empresa",
    lblEmail: "Correo electrónico",
    lblMessage: "Mensaje",
    placeholderName: "Ej. Jeff Bezos",
    placeholderCompany: "Nombre de tu marca en Amazon",
    placeholderEmail: "contacto@tuempresa.com",
    placeholderMessage:
      "¿En qué podemos ayudarte para potenciar tus ventas y presencia de marca?",
    btnSend: "Enviar Mensaje",
    consentText:
      "Al enviar este formulario, aceptas que nos contactemos contigo.",
    footerText: "Expertos en crecimiento de marcas en Amazon.",
    footerCopy: "Todos los derechos reservados.",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Servicio",
    growTitle: "¡Haz Crecer tu Marca!",
    growDescription:
      "¿Buscas lanzar y establecer tu marca en Amazon, impulsar un crecimiento sustancial o expandir tu cuota de mercado en múltiples plataformas como eBay, Walmart, Etsy o Target? ¡Desbloquea el potencial de la publicidad PPC (Pago por Clic) ahora!",
    adsTitle: "Anuncios para todos los Sitios y Plataformas",
    adsDescription:
      "Somos una Agencia de Marketing de Anuncios que ayuda a las marcas a crecer a través de listados optimizados para SEO, campañas de PPC dirigidas y estrategias de oferta inteligentes. Hemos trabajado con empresas para impulsar la visibilidad, las ventas y la rentabilidad en múltiples plataformas publicitarias como Meta, Google, TikTok, Amazon, Mercado Libre entre otras.",
    adsMetricValue: "37 +",
    adsMetricLabel: "Empresas de Confianza",
    whyAmazonTitle: "¿Por qué vender en Amazon?",
    whyAmazonParagraph1:
      "Amazon es el mercado más grande, con 1.6 millones de clientes diarios, $19.4 mil millones de dólares en ventas mensuales y una tasa de conversión del 9.39%.",
    whyAmazonParagraph2:
      "Una estrategia sólida de PPC es esencial para impulsar las ventas y mejorar el ranking orgánico frente a los competidores.",
    whyAmazonParagraph3:
      "Te acompañamos en cada etapa de tu camino en Amazon: Lanzamiento, Estructuración de Campañas y Optimización de Portafolio, ofreciendo estrategias para escalar tu marca.",
    content: [
      {
        subtitle: "PPC & Gestión Estratégica",
        title: (
          <>
            Domina <span className="text-[#f90] drop-shadow-sm">Amazon</span>{" "}
            con <br className="hidden lg:block" /> Estrategias Reales
          </>
        ),
        description: (
          <>
            Escalamos tus ventas, optimizamos tu{" "}
            <span className="text-[#102135] font-extrabold">ACOS</span> y
            posicionamos tus productos.
          </>
        ),
      },
      {
        subtitle: "Optimización Basada en Datos",
        title: (
          <>
            Toma el control de <br className="hidden lg:block" /> tu{" "}
            <span className="text-[#102135] drop-shadow-sm">Rentabilidad</span>
          </>
        ),
        description: (
          <>
            Analizamos cada métrica y campaña para reducir costos innecesarios y
            multiplicar tu{" "}
            <span className="text-[#f90] font-extrabold">ROAS</span>.
          </>
        ),
      },
      {
        subtitle: "Escalabilidad Global",
        title: (
          <>
            Lleva tu Marca al <br className="hidden lg:block" />{" "}
            <span className="text-[#f90] drop-shadow-sm">Siguiente Nivel</span>
          </>
        ),
        description: (
          <>
            Desde mercados locales hasta la expansión a USA, Europa y LATAM con
            un enfoque{" "}
            <span className="text-[#102135] font-extrabold">360°</span>.
          </>
        ),
      },
    ],
  },
  en: {
    navHome: "Home",
    navServices: "Services",
    navContact: "Contact",
    ctaFreePpc: "Free PPC",
    ctaServices: "Our Services",
    avgRoas: "Average ROAS",
    reducedAcos: "Reduced ACOS",
    sponsoredCamp: "Sponsored & Display",
    topRated: "Top Rated",
    agency: "Agency",
    liveData: "Live Data",
    monthlySales: "Monthly Sales",
    globalExpansion: "Global Expansion",
    auditButton: "Free PPC Audit",
    boxLeftTitle: "how we boost your business",
    boxMiddleTitle: "grow your business!",
    contactTitle: "Let's Work Together",
    contactSubtitle:
      "Fill in your details and an Amazon specialist will contact you to design your strategy.",
    lblName: "Full Name",
    lblCompany: "Company",
    lblEmail: "Email Address",
    lblMessage: "Message",
    placeholderName: "e.g. Jeff Bezos",
    placeholderCompany: "Your Amazon brand name",
    placeholderEmail: "contact@yourcompany.com",
    placeholderMessage:
      "How can we help you boost your sales and brand presence?",
    btnSend: "Send Message",
    consentText: "By submitting this form, you agree to be contacted by our team.",
    footerText: "Experts in Amazon brand growth.",
    footerCopy: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    growTitle: "Grow your Brand!",
    growDescription:
      "Are you looking to launch and establish your brand on Amazon, drive substantial growth, or expand your market share across multimarket platforms like Ebay, Wallmart, Etsy or Target? Unlock the potential of PPC (Pay-Per-Click) advertising now!",
    adsTitle: "Ads for all Sites & Platforms",
    adsDescription:
      "We are an Ads Marketing Agency that helps brands grow through SEO optimized listings, targeted PPC campaigns, and smart bidding strategies. We’ve worked with companies to boost visibility, sales, and profitability on multiple advertising platforms such as Meta, Google, Tik Tok, Amazon, Mercado Libre among others.",
    adsMetricValue: "37 +",
    adsMetricLabel: "Trusted Companies",
    whyAmazonTitle: "Why should i Sell on Amazon ?",
    whyAmazonParagraph1:
      "Amazon is the largest marketplace, with 1.6M daily customers, $19.4B in monthly sales, and a 9.39% conversion rate.",
    whyAmazonParagraph2:
      "A solid PPC strategy is essential to boost sales and improve organic ranking against competitors.",
    whyAmazonParagraph3:
      "We assist at every stage of your Amazon journey: Launching, Campaign Structuring, and Portfolio Optimization, delivering strategies to scale your brand.",
    content: [
      {
        subtitle: "PPC & Strategic Management",
        title: (
          <>
            Dominate <span className="text-[#f90] drop-shadow-sm">Amazon</span>{" "}
            with <br className="hidden lg:block" /> Real Strategies
          </>
        ),
        description: (
          <>
            We scale your sales, optimize your{" "}
            <span className="text-[#102135] font-extrabold">ACOS</span> and
            position your products.
          </>
        ),
      },
      {
        subtitle: "Data-Driven Optimization",
        title: (
          <>
            Take Control of <br className="hidden lg:block" /> Your{" "}
            <span className="text-[#102135] drop-shadow-sm">Profitability</span>
          </>
        ),
        description: (
          <>
            We analyze every metric and campaign to reduce unnecessary costs and
            multiply your{" "}
            <span className="text-[#f90] font-extrabold">ROAS</span>.
          </>
        ),
      },
      {
        subtitle: "Global Scalability",
        title: (
          <>
            Take Your Brand to <br className="hidden lg:block" /> the{" "}
            <span className="text-[#f90] drop-shadow-sm">Next Level</span>
          </>
        ),
        description: (
          <>
            From local markets to expansion in the USA, Europe, and LATAM with a{" "}
            <span className="text-[#102135] font-extrabold">360°</span>{" "}
            approach.
          </>
        ),
      },
    ],
  },
};

const getInitialLanguage = (): "es" | "en" => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam === "es" || langParam === "en") {
      return langParam;
    }
    const saved = localStorage.getItem("user_lang");
    if (saved === "es" || saved === "en") {
      return saved as "es" | "en";
    }
  } catch (e) {
    // Fail-safe default
  }
  return "en";
};

interface InteractiveCarouselProps {
  items: any[];
  renderItem: (item: any, idx: number) => React.ReactNode;
  direction?: "horizontal" | "vertical" | "vertical-reverse";
  speed?: number;
  className?: string;
  wrapperClassName?: string;
}

export function InteractiveCarousel({
  items,
  renderItem,
  direction = "horizontal",
  speed = 1.6,
  className = "",
  wrapperClassName = "",
}: InteractiveCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const scrollTopRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const cappedDelta = Math.min(delta, 50);

      if (container && !isPausedRef.current && !isDraggingRef.current) {
        if (direction === "horizontal") {
          container.scrollLeft += 0.04 * speed * cappedDelta;
          const totalWidth = container.scrollWidth / 2;
          if (container.scrollLeft >= totalWidth) {
            container.scrollLeft -= totalWidth;
          }
        } else if (direction === "vertical") {
          container.scrollTop += 0.04 * speed * cappedDelta;
          const totalHeight = container.scrollHeight / 2;
          if (container.scrollTop >= totalHeight) {
            container.scrollTop -= totalHeight;
          }
        } else if (direction === "vertical-reverse") {
          container.scrollTop -= 0.04 * speed * cappedDelta;
          const totalHeight = container.scrollHeight / 2;
          if (container.scrollTop <= 0) {
            container.scrollTop += totalHeight;
          }
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [direction, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    startYRef.current = e.pageY - container.offsetTop;
    scrollLeftRef.current = container.scrollLeft;
    scrollTopRef.current = container.scrollTop;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    if (direction === "horizontal") {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      container.scrollLeft = scrollLeftRef.current - walk;
    } else {
      const y = e.pageY - container.offsetTop;
      const walk = (y - startYRef.current) * 1.5;
      container.scrollTop = scrollTopRef.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  const handleTouchStart = () => {
    isPausedRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (direction === "horizontal") {
      const totalWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= totalWidth) {
        container.scrollLeft -= totalWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += totalWidth;
      }
    } else {
      const totalHeight = container.scrollHeight / 2;
      if (container.scrollTop >= totalHeight) {
        container.scrollTop -= totalHeight;
      } else if (container.scrollTop <= 0) {
        container.scrollTop += totalHeight;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
      className={`overflow-auto scrollbar-none cursor-grab active:cursor-grabbing w-full h-full select-none ${wrapperClassName}`}
    >
      <div
        className={className}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) isPausedRef.current = false;
        }}
      >
        {items.map((item, idx) => renderItem(item, idx))}
        {items.map((item, idx) => renderItem(item, idx + items.length))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLangState] = useState<"es" | "en">(getInitialLanguage());

  const setLang = (newLang: "es" | "en") => {
    setLangState(newLang);
    localStorage.setItem("user_lang", newLang);
  };

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("lang") || localStorage.getItem("user_lang")) return;

      fetch("https://get.geojs.io/v1/ip/country.json")
        .then((res) => res.json())
        .then((data) => {
          const spanishCountries = [
            "AR",
            "BO",
            "CL",
            "CO",
            "CR",
            "CU",
            "DO",
            "EC",
            "SV",
            "GQ",
            "GT",
            "HN",
            "MX",
            "NI",
            "PA",
            "PY",
            "PE",
            "PR",
            "ES",
            "UY",
            "VE",
          ];
          if (data && data.country && spanishCountries.includes(data.country)) {
            setLang("es");
          }
        })
        .catch((err) => console.error("IP Country fetch failed", err));
    } catch (e) {}
  }, []);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Amazon");
  const isMeliCombined = selectedService
    ? [
        "mercado-libre-tiktok-influencer",
        "mercado-libre-ads",
        "tiktok-shops",
        "influencer-marketing",
      ].includes(selectedService)
    : false;
  const isAmazonCombined = selectedService
    ? ["amazon-google-meta", "amazon-solutions", "google-meta-ads"].includes(
        selectedService,
      )
    : false;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isServicesSectionOpen, setIsServicesSectionOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionAction, setTransitionAction] = useState<(() => void) | null>(
    null,
  );

  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Timer to render video (iframe) after 1.5 seconds (dejar la imagen 1.5 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const triggerTransition = (action: () => void) => {
    setTransitionAction(() => action);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning) {
      const overlayTimer = setTimeout(() => {
        if (transitionAction) {
          transitionAction();
        }

        window.scrollTo({ top: 0, behavior: "instant" });

        const hideTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 150);

        return () => clearTimeout(hideTimer);
      }, 550);
      return () => clearTimeout(overlayTimer);
    }
  }, [isTransitioning, transitionAction]);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get("service");
      setSelectedService(serviceParam);
      if (!serviceParam) {
        document.title = "The eCommerce Vanguard";
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const handleGoBack = () => {
    triggerTransition(() => {
      const url = new window.URL(window.location.href);
      url.searchParams.delete("service");
      window.history.pushState({}, "", url.toString());
      setSelectedService(null);
    });
  };

  useEffect(() => {
    if (!showIframe || !iframeRef.current) return;

    let player: any = null;
    let isPausedAtEnd = false;
    let fallbackInterval: any = null;

    const resumePlay = () => {
      if (player) {
        player
          .play()
          .then(() => {
            cleanupGestureListeners();
          })
          .catch((err: any) => {
            console.log(
              "Interactive Vimeo play attempt skipped or blocked:",
              err,
            );
          });
      }
    };

    const cleanupGestureListeners = () => {
      document.removeEventListener("click", resumePlay);
      document.removeEventListener("touchstart", resumePlay);
      document.removeEventListener("mousemove", resumePlay);
      document.removeEventListener("scroll", resumePlay);
    };

    const initPlayer = () => {
      // @ts-ignore
      if (window.Vimeo && window.Vimeo.Player && iframeRef.current) {
        // @ts-ignore
        player = new window.Vimeo.Player(iframeRef.current);

        let hasSettled = false;

        // Force volume to 0 (muting is mandatory for browsers to allow autoplay) and trigger play immediately
        player
          .setVolume(0)
          .then(() => {
            player.play().catch((err: any) => {
              console.log(
                "Initial autoplay blocked slightly by browser policy, fallback gesture handlers will resume it:",
                err,
              );
            });
          })
          .catch(() => {});

        // Only when the video is actively playing frames
        player.on("playing", () => {
          if (!hasSettled) {
            hasSettled = true;
            // Delay slightly after playback begins to guarantee a flawless frame transitions
            setTimeout(() => {
              setIsVideoReady(true);
            }, 100);
            cleanupGestureListeners();
          }
        });

        // Fast state display safety fallback
        setTimeout(() => {
          if (!hasSettled) {
            setIsVideoReady(true);
          }
        }, 1500);

        player
          .getDuration()
          .then((duration: number) => {
            // Pause slightly before the end to freeze exactly on the static brand logo frame (typically duration - 0.45 seconds)
            const stopTime = Math.max(0, duration - 0.45);

            player.on("timeupdate", (data: { seconds: number }) => {
              if (data.seconds >= stopTime && !isPausedAtEnd) {
                isPausedAtEnd = true;
                player
                  .pause()
                  .then(() => {
                    player.setCurrentTime(stopTime);
                  })
                  .catch(() => {});
              }
            });

            // Prevent video from going to a black screen if it manages to reach the 'ended' state
            player.on("ended", () => {
              isPausedAtEnd = true;
              player
                .setCurrentTime(stopTime)
                .then(() => {
                  player.pause();
                })
                .catch(() => {});
            });
          })
          .catch(() => {});
      }
    };

    // Attach click, touch, mouse movement and scroll listeners to catch any micro-movements on page load
    document.addEventListener("click", resumePlay);
    document.addEventListener("touchstart", resumePlay);
    document.addEventListener("mousemove", resumePlay, { passive: true });
    document.addEventListener("scroll", resumePlay, { passive: true });

    // @ts-ignore
    if (window.Vimeo) {
      initPlayer();
    } else {
      const handleScriptLoad = () => {
        initPlayer();
      };
      window.addEventListener("load", handleScriptLoad);

      fallbackInterval = setInterval(() => {
        // @ts-ignore
        if (window.Vimeo) {
          initPlayer();
          clearInterval(fallbackInterval);
        }
      }, 500);
    }

    return () => {
      cleanupGestureListeners();
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, [showIframe]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If user starts scrolling down the page, stop auto playing so we don't fight the user's focus
    if (latest > 0.05) {
      setIsAutoPlaying(false);
    }
    if (latest < 0.33) {
      setActiveStep(0);
    } else if (latest < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < translationsList[lang].content.length - 1) {
          return prev + 1;
        } else {
          // Stay on the final slide and stop auto-playing once the end is reached
          setIsAutoPlaying(false);
          return prev;
        }
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, lang]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 70);

      const navElement = document.getElementById("main-navigation");
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        // Measure coordinate at center of top navigation bar
        const checkY = rect.top + rect.height / 2;
        const checkX = window.innerWidth / 2;

        let detectedDark = false;

        // Find elements with classes representing colors
        const sections = document.querySelectorAll(
          "section, footer, main, .bg-white, [id]",
        );
        for (let i = 0; i < sections.length; i++) {
          const sec = sections[i];
          if (sec === navElement || navElement.contains(sec)) continue;

          const sRect = sec.getBoundingClientRect();
          if (sRect.top <= checkY && sRect.bottom >= checkY) {
            const classStr = sec.getAttribute("class") || "";
            const idStr = sec.id || "";

            const hasLightClass =
              classStr.includes("bg-white") ||
              classStr.includes("bg-[#eaeded]") ||
              classStr.includes("bg-slate-50") ||
              classStr.includes("bg-[#fafafa]") ||
              classStr.includes("bg-slate-100");

            const hasDarkClass =
              classStr.includes("bg-[#102135]") ||
              classStr.includes("bg-[#11253d]") ||
              classStr.includes("bg-[#16273b]") ||
              classStr.includes("bg-[#0b1626]") ||
              classStr.includes("bg-[#0d1723]") ||
              classStr.includes("from-[#102135]") ||
              classStr.includes("from-[#11253d]") ||
              classStr.includes("from-[#16273b]") ||
              idStr === "section-ads";

            if (hasLightClass) {
              detectedDark = false;
              break; // Specific light container wins
            } else if (hasDarkClass) {
              detectedDark = true;
            }
          }
        }

        // Fail-safe viewport-height fallback for absolute landing page accuracy
        if (!selectedService) {
          const wh = window.innerHeight;
          // Ads section (dark) is active after 100vh - 10px till section scroll beyond ~195vh
          if (scrollPos > wh - 10 && scrollPos < wh * 2 - 150) {
            detectedDark = true;
          }
        }

        setIsOverDarkBg(detectedDark);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Check multiple times with interval to adapt to image loads and dynamic state transitions
    const timer = setTimeout(handleScroll, 100);
    const interval = setInterval(handleScroll, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [selectedService]);

  const currentTranslation = translationsList[lang];

  const getDotColorClass = (step: number) => {
    switch (step % 3) {
      case 0:
        return "bg-[#f90] shadow-[0_0_8px_rgba(255,153,0,0.73)]";
      case 1:
        return "bg-[#007185] shadow-[0_0_8px_rgba(0,113,133,0.73)]";
      case 2:
        return "bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.73)]";
      default:
        return "bg-[#f90]";
    }
  };

  const renderCenterCards = () => (
    <>

      {/* ROAS Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#102135] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="h-11 w-11 rounded-full bg-[#eaeded] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-2">
          <TrendingUp className="w-5.5 h-5.5 text-[#102135]" />
        </div>
        <div className="mt-auto">
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">
            +350%
          </p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">
            {currentTranslation.avgRoas}
          </p>
        </div>
      </div>

      {/* ACOS Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#f90] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="h-11 w-11 rounded-full bg-[#eaeded] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-2">
          <TrendingDown className="w-5.5 h-5.5 text-[#102135]" />
        </div>
        <div className="mt-auto">
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">
            -40%
          </p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">
            {currentTranslation.reducedAcos}
          </p>
        </div>
      </div>

      {/* Sponsored Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <Target className="w-8 h-8 text-[#f90] drop-shadow-sm mb-2" />
        <div className="mt-auto">
          <p className="text-lg xl:text-xl font-black text-[#102135] leading-[1.1] mt-2">
            {currentTranslation.sponsoredCamp}
          </p>
        </div>
      </div>

      {/* Best Seller Badge */}
      <div className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto relative flex items-center justify-center p-0 transition-transform hover:scale-[1.03] duration-300 select-none group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#102135] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm z-20 pointer-events-none" />
        <img
          src="https://res.cloudinary.com/dzrqhomvz/image/upload/v1779219955/mkrdl3z28taeuvohkgai.png"
          alt="Best Seller Amazon Badge"
          className="w-[85%] h-[85%] object-contain pointer-events-none brightness-100"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Top Rated Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#f90] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="flex gap-1 drop-shadow-sm mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 xl:w-5 xl:h-5 fill-[#f90] text-[#f90]"
            />
          ))}
        </div>
        <div className="mt-auto">
          <p className="text-xl xl:text-2xl font-black text-[#102135] leading-none mb-2 tracking-tight">
            {currentTranslation.topRated}
          </p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest font-sans">
            {currentTranslation.agency}
          </p>
        </div>
      </div>

      {/* Sales Increase Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#102135] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#f90] animate-pulse" />
          <span className="text-xs font-bold text-[#f90]">
            {currentTranslation.liveData}
          </span>
        </div>
        <div className="mt-auto">
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">
            +2x
          </p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">
            {currentTranslation.monthlySales}
          </p>
        </div>
      </div>

      {/* Global Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <Globe className="w-8 h-8 text-[#102135] drop-shadow-sm mb-2" />
        <div className="mt-auto">
          <p className="text-lg xl:text-xl font-black text-[#102135] leading-[1.1] mt-2">
            {currentTranslation.globalExpansion}
          </p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">
            USA, EU, LATAM
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white flex items-center justify-center pointer-events-auto"
          >
          </motion.div>
        )}
      </AnimatePresence>
      <div 
        className="relative z-10 min-h-screen bg-[#eaeded] flex flex-col font-sans text-[#102135] w-full max-w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]" 
        style={{ marginBottom: footerHeight ? `${footerHeight}px` : "1px" }}
      >
        {/* Barra de Navegación Unificada */}
        {isNavMenuOpen && (
          <div
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsNavMenuOpen(false)}
          />
        )}
        <nav
          id="main-navigation"
          className="fixed top-2 sm:top-3 z-[100] w-full pointer-events-none transition-all duration-300"
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              mass: 1,
            }}
            className={`mx-auto flex items-center pointer-events-auto relative transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-in-out ${
              isOverDarkBg
                ? isScrolled || selectedService !== null
                  ? "w-[96%] sm:w-[92%] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-full bg-white/95 backdrop-blur-md shadow-[0_12px_30px_rgba(16,33,53,0.12)] border border-slate-200/80 px-4 sm:px-6 h-11 sm:h-12 mt-1 sm:mt-2 justify-between"
                  : "w-[96%] max-w-7xl xl:max-w-[1440px] rounded-[2rem] bg-white h-12 sm:h-14 px-4 sm:px-8 lg:px-12 border border-slate-200/50 shadow-[0_12px_30px_rgba(16,33,53,0.08)] mt-1 sm:mt-2 justify-between"
                : isScrolled || selectedService !== null
                  ? "w-[96%] sm:w-[92%] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-full bg-[#102135]/95 backdrop-blur-md shadow-[0_12px_30px_rgba(16,33,53,0.4)] border border-white/10 px-4 sm:px-6 h-11 sm:h-12 mt-1 sm:mt-2 justify-between"
                  : "w-[96%] max-w-7xl xl:max-w-[1440px] rounded-[2rem] bg-[#102135] h-12 sm:h-14 px-4 sm:px-8 lg:px-12 border border-white/5 shadow-[0_12px_30px_rgba(16,33,53,0.3)] mt-1 sm:mt-2 justify-between"
            }`}
          >
            {/* Col 1: Logo */}
            <div className="flex-none flex items-center justify-start shrink-0">
            </div>

            {/* Centered PPC Audit Button when Scrolled or Outside Home */}
            {(isScrolled || selectedService !== null) && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 pointer-events-auto">
                <motion.button
                  layoutId="free-ppc-audit"
                  onClick={() => {
                    window.open(
                      "https://calendly.com/federico-rrwv/30min",
                      "_blank",
                    );
                  }}
                  className={`px-3 py-1 sm:px-4 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider uppercase transition-colors duration-300 pointer-events-auto h-7 sm:h-8 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center min-w-max ${
                    isOverDarkBg
                      ? "bg-[#102135] text-white hover:bg-[#102135]/90 shadow-md"
                      : "bg-[#f90] text-white hover:bg-[#ffb400]/90 shadow-md shadow-[#f90]/15"
                  }`}
                >
                  {lang === "es" ? "Auditoría PPC Gratuita" : "Free PPC Audit"}
                </motion.button>
              </div>
            )}

            {/* Grupo de Botones: Hamburguesa */}
            <motion.div
              layout
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex-none flex items-center gap-2 sm:gap-3"
            >
              {/* Menu Hamburger Button */}
              <button
                onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                className={`p-1.5 sm:p-2 rounded-full cursor-pointer transition-colors duration-200 focus:outline-none flex items-center justify-center relative pointer-events-auto h-9 w-9 sm:h-10 sm:w-10 ${
                  isOverDarkBg
                    ? "text-slate-800 hover:bg-slate-100 hover:text-[#f90]"
                    : "text-white hover:bg-white/10 hover:text-[#ffb400]"
                }`}
                title={lang === "es" ? "Menú" : "Menu"}
              >
                <AnimatePresence mode="wait">
                  {isNavMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </motion.div>

          {/* Absolute Dropdown Panel */}
          <AnimatePresence>
            {isNavMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute top-[105%] left-4 right-4 sm:left-auto sm:right-[4%] mt-2 max-w-full sm:w-[325px] rounded-3xl shadow-[0_20px_50px_rgba(16,33,53,0.3)] z-[110] pointer-events-auto overflow-hidden divide-y ${
                  isOverDarkBg
                    ? "bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#102135] divide-slate-100"
                    : "bg-[#102135]/95 backdrop-blur-md border border-white/10 text-white divide-white/5"
                }`}
              >
                {/* Opción 1: Servicios con Sub-menú */}
                <div className="flex flex-col">
                  <button
                    onClick={() =>
                      setIsServicesSectionOpen(!isServicesSectionOpen)
                    }
                    className={`w-full flex items-center justify-between px-6 py-4 text-xs font-black tracking-widest uppercase transition-colors text-left focus:outline-none ${
                      isOverDarkBg
                        ? "hover:bg-slate-50 text-slate-800"
                        : "hover:bg-white/5 text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffb400]" />
                      {lang === "es" ? "Servicios" : "Services"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isServicesSectionOpen ? "rotate-180 text-[#ffb400]" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isServicesSectionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`overflow-hidden border-l-4 border-[#ffb400] ${
                          isOverDarkBg ? "bg-slate-50/50" : "bg-white/[0.02]"
                        }`}
                      >
                        <div className="py-2 px-7 flex flex-col gap-1">
                          {[
                            {
                              label: "Amazon Solutions",
                              slug: "amazon-google-meta",
                            },
                            {
                              label: "Mercado Libre Ads",
                              slug: "ecosistema-canales",
                              tab: "ml",
                            },
                            {
                              label: "Google & Meta Ads",
                              slug: "ecosistema-canales",
                              tab: "google",
                            },
                            {
                              label: "TikTok Shops",
                              slug: "ecosistema-canales",
                              tab: "tiktok",
                            },
                            {
                              label: "Influencer Marketing",
                              slug: "ecosistema-canales",
                              tab: "meta",
                            },
                          ].map((elem, idx) => (
                            <a
                              key={idx}
                              href={`?service=${elem.slug}${elem.tab ? `&tab=${elem.tab}` : ""}&lang=${lang}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsNavMenuOpen(false);
                                triggerTransition(() => {
                                  const url = new window.URL(
                                    window.location.href,
                                  );
                                  url.searchParams.set("service", elem.slug);
                                  if (elem.tab)
                                    url.searchParams.set("tab", elem.tab);
                                  else url.searchParams.delete("tab");
                                  url.searchParams.set("lang", lang);
                                  window.history.pushState(
                                    {},
                                    "",
                                    url.toString(),
                                  );
                                  window.dispatchEvent(new Event("popstate"));
                                  setSelectedService(elem.slug);
                                });
                              }}
                              className={`block py-2 text-xs font-bold transition-all transition-transform duration-200 hover:translate-x-1 ${
                                isOverDarkBg
                                  ? "text-slate-600 hover:text-[#f90]"
                                  : "text-white/70 hover:text-[#ffb400]"
                              }`}
                            >
                              {elem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Opción 2: Casos de éxito */}
                <button
                  onClick={() => {
                    setIsNavMenuOpen(false);
                    triggerTransition(() => {
                      const url = new window.URL(window.location.href);
                      url.searchParams.set("service", "casos-de-exito");
                      window.history.pushState({}, "", url.toString());
                      setSelectedService("casos-de-exito");
                    });
                  }}
                  className={`w-full text-left px-6 py-4 text-xs font-black tracking-widest uppercase transition-colors focus:outline-none flex items-center gap-2 ${
                    isOverDarkBg
                      ? "hover:bg-slate-50 text-slate-800"
                      : "hover:bg-white/5 text-white"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb400]" />
                  {lang === "es" ? "Casos de Éxito" : "Success Stories"}
                </button>

                {/* Opción 3: FAQ */}
                <button
                  onClick={() => {
                    setIsNavMenuOpen(false);
                    triggerTransition(() => {
                      const url = new window.URL(window.location.href);
                      url.searchParams.set("service", "faq");
                      window.history.pushState({}, "", url.toString());
                      setSelectedService("faq");
                    });
                  }}
                  className={`w-full text-left px-6 py-4 text-xs font-black tracking-widest uppercase transition-colors focus:outline-none flex items-center gap-2 ${
                    isOverDarkBg
                      ? "hover:bg-slate-50 text-slate-800"
                      : "hover:bg-white/5 text-white"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb400]" />
                  FAQ
                </button>

                {/* Opción 4: About Us */}
                <button
                  onClick={() => {
                    setIsNavMenuOpen(false);
                    triggerTransition(() => {
                      const url = new window.URL(window.location.href);
                      url.searchParams.set("service", "about-us");
                      window.history.pushState({}, "", url.toString());
                      setSelectedService("about-us");
                    });
                  }}
                  className={`w-full text-left px-6 py-4 text-xs font-black tracking-widest uppercase transition-colors focus:outline-none flex items-center gap-2 ${
                    isOverDarkBg
                      ? "hover:bg-slate-50 text-slate-800"
                      : "hover:bg-white/5 text-white"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb400]" />
                  {lang === "es" ? "Sobre Nosotros" : "About Us"}
                </button>

                {/* Opción 4: Contacto */}
                <button
                  onClick={() => {
                    setIsNavMenuOpen(false);
                    window.open("https://wa.me/5491165088135", "_blank");
                  }}
                  className={`w-full text-left px-6 py-4 text-xs font-black tracking-widest uppercase transition-colors focus:outline-none flex items-center justify-between text-[#ffb400] ${
                    isOverDarkBg ? "hover:bg-slate-50" : "hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb400]" />
                    {lang === "es" ? "Contacto" : "Contact"}
                  </span>
                  <span className="text-[10px] bg-[#ffb400]/20 text-[#ffb400] font-extrabold px-2 py-0.5 rounded-full tracking-normal capitalize font-sans">
                    {lang === "es" ? "Ahora" : "Now"}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Floating Actions */}
        <div className="fixed bottom-[15px] lg:bottom-[27px] right-5 lg:right-8 z-[100] flex items-center justify-end pointer-events-none gap-3">
          {/* Language Switcher */}
          <motion.button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="w-12 h-12 md:w-14 md:h-14 bg-[#102135] text-white rounded-full flex flex-col items-center justify-center border border-white/20 shadow-lg pointer-events-auto cursor-pointer focus:outline-none"
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <span className="text-[10px] md:text-xs font-bold leading-tight block uppercase text-slate-300">
              Lang
            </span>
            <span className="text-xs md:text-sm font-black leading-tight block uppercase text-[#ffb400]">
              {lang}
            </span>
          </motion.button>

          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/5491165088135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 active:scale-95 transition-transform duration-300 pointer-events-auto relative focus:outline-none cursor-pointer"
            title="WhatsApp"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <img
              src="https://res.cloudinary.com/dzrqhomvz/image/upload/v1778167834/inplbypdoknctwsb7pqr.png"
              alt="WhatsApp"
              className="w-[67px] h-[67px] md:w-[78px] md:h-[78px] drop-shadow-[0_4px_15px_rgba(37,211,102,0.4)] object-contain"
            />
          </motion.a>
        </div>

        {selectedService === "contacto" ? (
          <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
            <ContactPage lang={lang} onGoBack={handleGoBack} />
          </div>
        ) : selectedService === "casos-de-exito" ? (
          <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
            <CasosDeExito
              lang={lang}
              onGoBack={handleGoBack}
              onContactClick={() => {
                window.open("https://wa.me/5491165088135", "_blank");
              }}
            />
          </div>
        ) : selectedService === "ecosistema-canales" ? (
          <div className="flex flex-col min-h-screen bg-white pt-24 sm:pt-28 pb-12">
            <InfluencerMarketingStory />
            <div className="mt-8 lg:mt-16 relative z-10">
              <EcosistemaCanales
                initialTab={
                  new URLSearchParams(window.location.search).get("tab") ||
                  undefined
                }
                lang={lang}
              />
            </div>
          </div>
        ) : selectedService === "faq" ? (
          <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
            <FaqPage
              lang={lang}
              onGoBack={handleGoBack}
              onContactClick={() => {
                window.open("https://wa.me/5491165088135", "_blank");
              }}
            />
          </div>
        ) : selectedService === "about-us" ? (
          <div className="pt-16 sm:pt-20 flex flex-col min-h-screen">
            <AboutUsPage lang={lang} onGoBack={handleGoBack} />
          </div>
        ) : selectedService ? (
          <div
            className={`${isMeliCombined ? "" : isAmazonCombined ? "pt-12 sm:pt-14" : "pt-16 sm:pt-20"} flex flex-col min-h-screen`}
          >
            <ServiceDetailPage
              serviceSlug={selectedService}
              lang={lang}
              onGoBack={handleGoBack}
              onContactClick={() => {
                window.open("https://wa.me/5491165088135", "_blank");
              }}
            />
          </div>
        ) : (
          <>
            <main className="flex-1 flex flex-col w-full relative">
              {/* Contenedor Fijo para la Caratula (Hero) */}
              <div className="sticky top-0 left-0 w-full h-[100dvh] z-0 overflow-hidden bg-[#eaeded]">
                {/* Sección Hero */}
                <motion.section
                  ref={sectionRef}
                  className="relative px-4 pb-0 pt-16 sm:pt-20 lg:pt-[80px] xl:pt-[96px] lg:pb-12 z-10 w-full h-full overflow-y-auto lg:overflow-visible flex items-start lg:items-center"
                >
                  {/* Fondo decorativo sutil */}
                  <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#007185] rounded-[100%] blur-[150px] -z-10 opacity-[0.05] pointer-events-none" />
                  <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#f90] rounded-[100%] blur-[150px] -z-10 opacity-[0.04] pointer-events-none" />

                  <div className="max-w-7xl xl:max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row lg:justify-center gap-3 xl:gap-4 items-center lg:items-start pb-8 sm:pb-10 lg:pb-12 relative px-4">
                    {/* Columna Izquierda: Copy y CTA (Ancho ampliado y sutilmente más abajo) */}
                    <div className="w-full lg:w-[48%] xl:w-[50%] lg:sticky lg:top-[130px] xl:top-[148px] lg:h-max flex flex-col justify-center items-center text-center gap-2 sm:gap-3 z-20 bg-transparent px-4 pt-1 pb-0 lg:pb-8 xl:pb-12 mt-0 transition-all duration-300">
                      {/* Contenedor de Imagen y Video (Mismo Tamaño, Ocupan el Mismo Lugar) */}
                      <div className="w-full max-w-[480px] xs:max-w-[565px] sm:max-w-[680px] lg:max-w-[780px] xl:max-w-[920px] select-none relative flex items-center justify-center shrink-0 z-20 aspect-[16/9.6] sm:aspect-[1.62/1]">
                        {/* Imagen (Fase Inicial / 2 primeros segundos) */}
                        <motion.div
                          animate={{
                            opacity: showIframe ? 0 : 1,
                            scale: showIframe ? 0.95 : 1,
                          }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="w-full h-full select-none relative z-20 flex items-center justify-center"
                        >
                          <img
                            src="https://res.cloudinary.com/dzrqhomvz/image/upload/v1779291160/fmhpubtcndg84fvbqago.png"
                            alt="Premium Team & Agency"
                            className="w-full h-full object-cover select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            fetchPriority="high"
                          />
                        </motion.div>

                        {/* Video (Aparece a los 2 segundos en el exacto mismo lugar con el exacto mismo tamaño) */}
                        <AnimatePresence>
                          {showIframe && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                              className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-10 flex items-center justify-center"
                              style={{
                                maskImage:
                                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)",
                                WebkitMaskImage:
                                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)",
                              }}
                            >
                              <iframe
                                ref={iframeRef}
                                src="https://player.vimeo.com/video/1194020653?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=0&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="w-full h-full"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  filter: "contrast(1.05) brightness(1.02)",
                                }}
                                title="gemini_generated_video_1A63899E"
                                loading="eager"
                              ></iframe>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Free PPC Audit Neumorphic Button */}
                      <div className="mt-5 sm:mt-6 flex justify-center z-30 relative select-none h-12 sm:h-14">
                        {!isScrolled && (
                          <motion.button
                            layoutId="free-ppc-audit"
                            onClick={() => {
                              window.open(
                                "https://calendly.com/federico-rrwv/30min",
                                "_blank",
                              );
                            }}
                            className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#f90] hover:bg-[#ffb400] text-white text-xs sm:text-sm font-black tracking-wider uppercase border border-[#f90]/10 shadow-[4px_4px_8px_rgba(163,177,198,0.35),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_3px_rgba(163,177,198,0.25),-1px_-1px_3px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center"
                          >
                            {lang === "es"
                              ? "Auditoría PPC Gratuita"
                              : "Free PPC Audit"}
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Desktop Center Carousel: Single column tracking upwards */}
                    <div
                      id="center-carousel-wrapper"
                      className="hidden lg:flex flex-col items-center gap-4 sticky top-[85px] xl:top-[100px] lg:mt-1 xl:mt-2 self-start shrink-0 z-30"
                    >
                      {/* Center Carousel Header Badge */}
                      <div
                        id="center-carousel-badge"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-[#eaeded] shadow-[inset_3px_3px_6px_#c8cbcb,inset_-3px_-3px_6px_#ffffff] text-[#102135] text-xs xl:text-sm font-extrabold uppercase tracking-wider select-none"
                      >
                        {currentTranslation.boxMiddleTitle}
                      </div>

                      <div className="flex flex-col items-center justify-center w-[255px] lg:w-[265px] xl:w-[305px] h-[450px] lg:h-[490px] xl:h-[530px] bg-[#eaeded]/85 backdrop-blur-md rounded-[2.5rem] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] p-4 select-none overflow-hidden border border-white/50">
                        <div className="h-full w-full relative overflow-hidden carousel-mask-vertical">
                          <InteractiveCarousel
                            items={marketplaces}
                            direction="vertical-reverse"
                            speed={1.4}
                            className="flex flex-col gap-4 items-center shrink-0 w-full"
                            renderItem={(platform, mIdx) => (
                              <div
                                key={mIdx}
                                className="w-[190px] h-[110px] lg:w-[225px] lg:h-[135px] xl:w-[260px] xl:h-[155px] flex items-center justify-center rounded-2xl bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] border border-white/40 hover:scale-105 hover:shadow-[2px_2px_4px_#c8cbcb,-2px_-2px_4px_#ffffff] transition-all duration-300 opacity-95 cursor-pointer p-1.5 sm:p-2 group/box overflow-hidden shrink-0 mb-4"
                              >
                                <img
                                  src={platform.img}
                                  alt={platform.alt}
                                  className="max-h-[98%] max-w-[98%] scale-[1.72] group-hover/box:scale-[1.85] object-contain drop-shadow-sm select-none pointer-events-none transition-transform duration-300"
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mobile View: High impact Horizontal Carousels stacked together */}
                    <div className="lg:hidden w-full flex flex-col gap-5 mt-[15px] pb-6 z-20 select-none">
                      {/* Carousel 1: Marketplaces / Platforms */}
                      <div className="flex flex-col items-center w-full">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#eaeded] shadow-[inset_2px_2px_4px_#c8cbcb,inset_-2px_-2px_4px_#ffffff] text-[#102135] text-[9px] font-black uppercase tracking-widest select-none mb-2">
                          {currentTranslation.boxMiddleTitle}
                        </div>

                        <div className="w-full relative overflow-hidden pt-0.5 pb-0.5 select-none">
                          {/* Subtle blur mask on the edges */}
                          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#eaeded] to-transparent z-10 pointer-events-none" />
                          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#eaeded] to-transparent z-10 pointer-events-none" />

                          <div className="w-full relative overflow-hidden carousel-mask h-[76px]">
                            <InteractiveCarousel
                              items={marketplaces}
                              direction="horizontal"
                              speed={1.4}
                              className="flex flex-row pr-4 w-max items-center h-full gap-4 shrink-0"
                              renderItem={(platform, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="w-[135px] h-[68px] flex items-center justify-center rounded-xl bg-[#eaeded] shadow-[3px_3px_6px_#c8cbcb,-3px_-3px_6px_#ffffff] border border-white/40 p-1 shrink-0"
                                >
                                  <img
                                    src={platform.img}
                                    alt={platform.alt}
                                    className="max-h-[96%] max-w-[96%] scale-[1.38] object-contain drop-shadow-sm select-none pointer-events-none"
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Carousel 2: Brand Growth Partners */}
                      <div className="flex flex-col items-center w-full mt-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#eaeded] shadow-[inset_2px_2px_4px_#c8cbcb,inset_-2px_-2px_4px_#ffffff] text-[#102135] text-[9px] font-black uppercase tracking-widest select-none mb-2">
                          {currentTranslation.boxLeftTitle}
                        </div>

                        <div className="w-full relative overflow-hidden pt-0.5 pb-0.5 select-none">
                          {/* Subtle blur mask on the edges */}
                          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#eaeded] to-transparent z-10 pointer-events-none" />
                          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#eaeded] to-transparent z-10 pointer-events-none" />

                          <div className="w-full relative overflow-hidden carousel-mask h-[76px]">
                            <InteractiveCarousel
                              items={partners}
                              direction="horizontal"
                              speed={1.4}
                              className="flex flex-row pr-4 w-max items-center h-full gap-4 shrink-0 ml-[-75px]"
                              renderItem={(partner, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="w-[135px] h-[68px] flex items-center justify-center rounded-xl bg-[#eaeded] shadow-[3px_3px_6px_#c8cbcb,-3px_-3px_6px_#ffffff] border border-white/40 p-1 shrink-0"
                                >
                                  <img
                                    src={partner.img}
                                    alt={partner.alt}
                                    className="max-h-[96%] max-w-[96%] scale-[1.38] object-contain drop-shadow-sm select-none pointer-events-none"
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna Derecha: Carrusel de Partners / Servicios - Vertical & Sticky */}
                    <div
                      id="partners-carousel-wrapper"
                      className="hidden lg:flex flex-col items-center gap-4 sticky top-[85px] xl:top-[100px] lg:mt-1 xl:mt-2 self-start shrink-0 z-30"
                    >
                      {/* Partner Carousel Header Badge */}
                      <div
                        id="partners-carousel-badge"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-[#eaeded] shadow-[inset_3px_3px_6px_#c8cbcb,inset_-3px_-3px_6px_#ffffff] text-[#102135] text-xs xl:text-sm font-extrabold uppercase tracking-wider select-none"
                      >
                        {currentTranslation.boxLeftTitle}
                      </div>

                      <div className="flex flex-col items-center justify-center w-[255px] lg:w-[265px] xl:w-[305px] h-[450px] lg:h-[490px] xl:h-[530px] bg-[#eaeded]/85 backdrop-blur-md rounded-[2.5rem] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] p-4 select-none overflow-hidden border border-white/50">
                        <div className="h-full w-full relative overflow-hidden carousel-mask-vertical">
                          <InteractiveCarousel
                            items={partners}
                            direction="vertical"
                            speed={1.4}
                            className="flex flex-col gap-4 items-center shrink-0 w-full"
                            renderItem={(partner, pIdx) => (
                              <div
                                key={pIdx}
                                className="w-[190px] h-[110px] lg:w-[225px] lg:h-[135px] xl:w-[260px] xl:h-[155px] flex items-center justify-center rounded-2xl bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] border border-white/40 hover:scale-105 hover:shadow-[2px_2px_4px_#c8cbcb,-2px_-2px_4px_#ffffff] transition-all duration-300 opacity-95 cursor-pointer p-1.5 sm:p-2 group/box overflow-hidden shrink-0 mb-4"
                              >
                                <img
                                  src={partner.img}
                                  alt={partner.alt}
                                  className="max-h-[95%] max-w-[95%] scale-[1.72] group-hover/box:scale-[1.85] object-contain drop-shadow-sm select-none pointer-events-none transition-transform duration-300"
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>

              {/* Tercera Sección: Ads for all Sites & Platforms - Styled as a majestic Blue curtain sliding up */}
              <motion.section
                id="section-ads"
                initial={{ opacity: 0.95 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: "-5px" }}
                className="hidden lg:flex w-full pt-16 sm:pt-24 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#102135] via-[#11253d] to-[#16273b] text-white relative z-40 flex justify-center rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] lg:rounded-t-[100px] shadow-[0_-30px_60px_rgba(16,33,53,0.4)]"
              >
                <div className="max-w-7xl w-full">
                  {/* Style-free, borderless, clean layout grid */}
                  {/* Creative header with Title and Description */}
                  <div className="w-full text-left space-y-4 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white hover:text-[#ffb400] transition-colors duration-300 tracking-tight leading-none uppercase select-none">
                        {lang === "es"
                          ? "¡CRECE TU MARCA!"
                          : "GROW YOUR BRAND!"}
                      </h2>
                      <p className="text-[#ffb400] text-lg sm:text-xl font-bold tracking-normal leading-relaxed select-none">
                        {currentTranslation.adsTitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-base text-blue-100/80 md:leading-relaxed font-semibold max-w-4xl">
                      {currentTranslation.adsDescription}
                    </p>
                  </div>

                  <div className="w-full flex justify-center py-4 lg:py-8 mt-2 -mb-4">
                    <Interactive3DDice />
                  </div>

                  {/* Layout with vertical selectors on the left and dynamic content on the right, housed inside a unified light neumorphic deck */}
                  <div className="w-full bg-slate-50 rounded-[3rem] p-6 lg:p-8 xl:p-10 shadow-[20px_20px_50px_rgba(0,0,0,0.3)] border border-white/10 mt-8 flex flex-col lg:flex-row gap-8 items-stretch select-none">
                    {/* Left Column: Vertical Neumorphic Platform Selectors */}
                    <div className="w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-4 shrink-0">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#102135]/40 pl-1 select-none">
                        {lang === "es"
                          ? "Canales de Crecimiento"
                          : "Growth Channels"}
                      </p>

                      <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 w-full snap-x">
                        {campaignPlatforms.map((platform, idx) => {
                          const isSelected = selectedPlatform === platform.name;
                          return (
                            <motion.button
                              key={idx}
                              onClick={() => setSelectedPlatform(platform.name)}
                              className={`min-w-[200px] lg:min-w-0 w-full h-[125px] lg:h-[135px] xl:h-[145px] rounded-[24px] lg:rounded-[28px] cursor-pointer transition-all duration-300 transform outline-none flex items-center justify-center p-1 sm:p-1.5 select-none relative snap-center ${
                                isSelected
                                  ? "bg-white border-2 border-[#ffb400] shadow-[0_8px_20px_rgba(255,180,0,0.25),inset_3px_3px_6px_rgba(0,0,0,0.06)] scale-[1.03] z-10"
                                  : "bg-slate-50 border border-transparent shadow-[4px_4px_12px_rgba(163,177,198,0.45),-4px_-4px_12px_rgba(255,255,255,0.95)] hover:bg-slate-100 opacity-85 hover:opacity-100 hover:scale-[1.01]"
                              }`}
                              whileHover={{ scale: isSelected ? 1.03 : 1.01 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                <img
                                  src={optimizeCloudinaryUrl(
                                    platform.imageUrl,
                                    400,
                                  )}
                                  alt={platform.name}
                                  className="w-auto h-auto max-h-[95%] max-w-[95%] object-contain select-none pointer-events-none transition-transform duration-500 scale-[1.28]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              {/* Interactive Active Dot indicator */}
                              {isSelected && (
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#102135]/60 animate-pulse hidden lg:block" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Platform details and metric data sliding to the right */}
                    <div className="flex-grow w-full lg:min-h-[460px] flex flex-col justify-stretch">
                      {/* Playbook Info Box - Unified White Neumorphic Card */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedPlatform}
                          initial={{ opacity: 0, x: -90, scaleX: 0.93 }}
                          animate={{ opacity: 1, x: 0, scaleX: 1 }}
                          exit={{ opacity: 0, x: -90, scaleX: 0.93 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="origin-left bg-white rounded-[2.5rem] p-6 lg:p-8 xl:p-10 space-y-6 shadow-[10px_10px_30px_rgba(163,177,198,0.35),-10px_-10px_30px_rgba(255,255,255,0.9)] border border-slate-100/60 flex-1 flex flex-col justify-between"
                        >
                          <div className="space-y-6 flex flex-col items-center">
                            {/* Top: Selected Platform Large Logo directly on the background spanning broad width */}
                            <div className="w-full flex justify-center py-4 select-none">
                              <img
                                src={optimizeCloudinaryUrl(
                                  campaignPlatforms.find(
                                    (p) => p.name === selectedPlatform,
                                  )?.imageUrl || "",
                                  400,
                                )}
                                alt={selectedPlatform}
                                className="w-full max-w-[85%] h-24 object-contain select-none pointer-events-none"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Middle: Brief insight text beautifully centered and styled */}
                            <div className="w-full text-center py-2 px-4 sm:px-6">
                              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bold tracking-normal italic max-w-xl mx-auto">
                                {lang === "es"
                                  ? platformInsights[
                                      selectedPlatform as keyof typeof platformInsights
                                    ]?.es
                                  : platformInsights[
                                      selectedPlatform as keyof typeof platformInsights
                                    ]?.en}
                              </p>
                            </div>
                          </div>

                          {/* Highly aesthetic metrics row within the info block flowing nicely on the right side */}
                          <div className="grid grid-cols-2 gap-6 sm:gap-10 pt-6 sm:pt-8 border-t border-slate-100 mt-auto">
                            <div className="text-center sm:text-left">
                              <span className="text-5xl sm:text-6xl font-black text-[#102135] hover:text-[#f90] transition-colors duration-300 tracking-tighter block">
                                +
                                {platformInsights[
                                  selectedPlatform as keyof typeof platformInsights
                                ]?.roas || "5.4x"}
                              </span>
                              <span className="text-xs font-black uppercase tracking-widest text-[#f90] mt-1.5 block">
                                {lang === "es"
                                  ? "ROAS PROMEDIO"
                                  : "AVERAGE ROAS"}
                              </span>
                            </div>
                            <div className="text-center sm:text-left">
                              <span className="text-5xl sm:text-6xl font-black text-[#102135] hover:text-[#f90] transition-colors duration-300 tracking-tighter block">
                                -
                                {platformInsights[
                                  selectedPlatform as keyof typeof platformInsights
                                ]?.acos || "64%"}
                              </span>
                              <span className="text-xs font-black uppercase tracking-widest text-[#f90] mt-1.5 block">
                                {lang === "es"
                                  ? "ACOS / CAC REDUCIDO"
                                  : "REDUCED ACOS / CAC"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Cuarta Sección: Why should I Sell on Amazon? - Styled with an Elegant White Theme */}
              <section className="hidden lg:flex w-full pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-white text-slate-800 relative z-40 flex justify-center border-t border-slate-100">
                <div className="max-w-7xl w-full">
                  {/* Style-free, borderless, clean layout grid with Image on Left, Text on Right */}
                  <div className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Column: High Fidelity Showcase Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex-1 w-full flex justify-center items-center"
                    >
                      <div className="relative group w-full max-w-[420px] sm:max-w-[480px] lg:max-w-xl overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-200/55 shadow-[0_20px_50px_rgba(16,33,53,0.06)] p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_24px_56px_rgba(16,33,53,0.12)] z-20">
                        <img
                          src="https://res.cloudinary.com/dzrqhomvz/image/upload/v1779218569/yuv2jafnf0khbyuz2kox.png"
                          alt="Why choose Amazon"
                          className="w-full h-auto object-contain rounded-[1.8rem] select-none pointer-events-none"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>

                    {/* Right Column: Rich copy Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex-1 space-y-6 text-left"
                    >
                      {/* Accent Label */}
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#f90]/10 border border-[#f90]/20 text-[#f90] text-xs font-extrabold uppercase tracking-widest select-none">
                        {lang === "es"
                          ? "MERCADO DE AMAZON"
                          : "AMAZON MARKETPLACE"}
                      </span>

                      {/* Main Title of the section */}
                      <h2 className="text-4xl md:text-5xl lg:text-5.5xl font-black text-[#102135] hover:text-[#f90] transition-colors duration-300 tracking-tight leading-tight">
                        {currentTranslation.whyAmazonTitle}
                      </h2>

                      {/* Paragraphs with custom styling to enhance contrast & hierarchy */}
                      <div className="space-y-4 text-base sm:text-lg text-slate-600 font-medium">
                        <p className="border-l-4 border-[#f90] pl-4 font-bold text-[#102135] leading-relaxed">
                          {currentTranslation.whyAmazonParagraph1}
                        </p>
                        <p className="leading-relaxed">
                          {currentTranslation.whyAmazonParagraph2}
                        </p>
                        <p className="leading-relaxed text-slate-500 text-sm sm:text-base font-semibold pt-4 border-t border-slate-100">
                          {currentTranslation.whyAmazonParagraph3}
                        </p>
                      </div>

                      {/* Additional interactive info line or bullet indicators to balance the visual space */}
                      <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 py-2.5 px-4 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                          <span className="w-2 h-2 rounded-full bg-[#f90] animate-pulse"></span>
                          <span>
                            {lang === "es"
                              ? "1.6M Clientes Diarios"
                              : "1.6M Daily Customers"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 py-2.5 px-4 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                          <span className="w-2 h-2 rounded-full bg-[#f90] animate-pulse"></span>
                          <span>
                            {lang === "es"
                              ? "$19.4B Ventas Mensuales"
                              : "$19.4B Monthly Sales"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 py-2.5 px-4 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                          <span className="w-2 h-2 rounded-full bg-[#f90] animate-pulse"></span>
                          <span>
                            {lang === "es"
                              ? "9.39% Tasa Conversión"
                              : "9.39% Conversion Rate"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* ==================== SECCIONES EXCLUSIVAS MOBILE ==================== */}
              <div
                className="block lg:hidden w-full relative z-40"
                style={{ marginTop: "-5px" }}
              >
                {/* Segunda / Tercera Sección: Ads for all Sites & Platforms */}
                <motion.section
                  id="section-ads-mobile"
                  initial={{ opacity: 0.95 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full pt-16 pb-12 px-4 sm:px-6 bg-gradient-to-b from-[#102135] via-[#11253d] to-[#16273b] text-white rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_40px_rgba(16,33,53,0.35)]"
                >
                  <div className="w-full max-w-xl mx-auto space-y-6">
                    <div className="space-y-2 text-center">
                      <h2 className="text-4xl sm:text-5xl font-black text-white hover:text-[#ffb400] transition-colors duration-300 tracking-tight leading-none uppercase select-none">
                        {lang === "es"
                          ? "¡CRECE TU MARCA!"
                          : "GROW YOUR BRAND!"}
                      </h2>
                      <p className="text-[#ffb400] text-sm sm:text-base font-bold tracking-normal leading-relaxed select-none">
                        {currentTranslation.adsTitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-semibold">
                      {currentTranslation.adsDescription}
                    </p>

                    <div className="w-full relative py-2 flex justify-center mt-2 -mb-2">
                      <Interactive3DDice />
                    </div>

                    {/* Selector de Plataformas Estilo Squircle */}
                    <div className="space-y-4 pt-4">
                      {/* Unified Light Neumorphic Deck for Mobile containing both SELECTORS and the SLIDE-OUT Details Box */}
                      <div className="bg-slate-50 rounded-[2.5rem] p-4 shadow-[15px_15px_45px_rgba(0,0,0,0.3)] border border-white/10 flex flex-row gap-4 items-stretch select-none">
                        {/* Left Column: 5 White Neumorphic stacked vertical selectors */}
                        <div className="flex flex-col gap-3 shrink-0 w-24 sm:w-28">
                          {campaignPlatforms.map((platform, idx) => {
                            const isSelected =
                              selectedPlatform === platform.name;
                            return (
                              <motion.button
                                key={idx}
                                onClick={() =>
                                  setSelectedPlatform(platform.name)
                                }
                                className={`w-full h-[88px] sm:h-[100px] rounded-2xl cursor-pointer transition-all duration-300 transform outline-none flex items-center justify-center p-1 select-none relative ${
                                  isSelected
                                    ? "bg-white border-2 border-[#ffb400] shadow-[0_6px_12px_rgba(255,180,0,0.25),inset_2px_2px_4px_rgba(0,0,0,0.05)] scale-[1.03] z-10"
                                    : "bg-slate-50 border border-transparent shadow-[3px_3px_8px_rgba(163,177,198,0.45),-3px_-3px_8px_rgba(255,255,255,0.95)] hover:bg-slate-100 opacity-85 hover:opacity-100"
                                }`}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                  <img
                                    src={optimizeCloudinaryUrl(
                                      platform.imageUrl,
                                      200,
                                    )}
                                    alt={platform.name}
                                    className="w-auto h-auto max-h-[96%] max-w-[96%] object-contain select-none pointer-events-none transition-transform duration-300 scale-[1.22] sm:scale-[1.28]"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Right Column: Platform details and metrics inside White Neumorphic Panel */}
                        <div className="flex-1 min-h-[380px] sm:min-h-[420px] flex flex-col">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedPlatform}
                              initial={{ opacity: 0, x: -60, scaleX: 0.92 }}
                              animate={{ opacity: 1, x: 0, scaleX: 1 }}
                              exit={{ opacity: 0, x: -60, scaleX: 0.92 }}
                              transition={{
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="origin-left bg-white rounded-2xl p-4 sm:p-5 space-y-4 shadow-[4px_4px_12px_rgba(163,177,198,0.25),-4px_-4px_12px_rgba(255,255,255,0.95)] border border-slate-100 flex-1 flex flex-col justify-between"
                            >
                              <div className="space-y-4 flex flex-col items-center">
                                {/* Top: Selected Platform Logo directly on the background for Mobile */}
                                <div className="w-full flex justify-center py-2 select-none">
                                  <img
                                    src={optimizeCloudinaryUrl(
                                      campaignPlatforms.find(
                                        (p) => p.name === selectedPlatform,
                                      )?.imageUrl || "",
                                      250,
                                    )}
                                    alt={selectedPlatform}
                                    className="w-full max-w-[85%] h-16 object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                {/* Middle: Brief insight text */}
                                <p className="text-[11px] sm:text-xs text-slate-600 font-bold leading-relaxed text-center italic px-1">
                                  {lang === "es"
                                    ? platformInsights[
                                        selectedPlatform as keyof typeof platformInsights
                                      ]?.es
                                    : platformInsights[
                                        selectedPlatform as keyof typeof platformInsights
                                      ]?.en}
                                </p>
                              </div>

                              {/* Highly aesthetic metrics inside mobile right column */}
                              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 mt-auto text-center">
                                <div>
                                  <p className="text-lg sm:text-xl font-black text-[#102135] leading-none">
                                    +
                                    {platformInsights[
                                      selectedPlatform as keyof typeof platformInsights
                                    ]?.roas || "5.4x"}
                                  </p>
                                  <p className="text-[8px] uppercase font-bold text-[#f90] tracking-wider mt-1">
                                    {lang === "es" ? "ROAS" : "ROAS"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-lg sm:text-xl font-black text-[#102135] leading-none">
                                    -
                                    {platformInsights[
                                      selectedPlatform as keyof typeof platformInsights
                                    ]?.acos || "64%"}
                                  </p>
                                  <p className="text-[8px] uppercase font-bold text-[#f90] tracking-wider mt-1">
                                    {lang === "es"
                                      ? "ACOS / CAC"
                                      : "ACOS / CAC"}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Carrusel de Clientes / Marcas Asociadas - Infinite Flow Style */}
                <section className="w-full py-8 bg-white border-y border-slate-100 overflow-hidden relative">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#102135] text-center mb-4 select-none">
                    {lang === "es"
                      ? "NUESTRAS MARCAS ASOCIADAS"
                      : "TRUSTED BY GLOBAL BRANDS"}
                  </p>
                  <div className="w-full overflow-hidden relative space-y-6">
                    {/* Row 1 - Moving Left */}
                    <div className="w-full overflow-hidden relative">
                      <div className="flex w-max animate-scroll items-center select-none pointer-events-none">
                        {[
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                          ...[
                            clientLogos[0],
                            clientLogos[2],
                            clientLogos[4],
                            clientLogos[6],
                          ],
                        ].map((logoUrl, index) => (
                          <div
                            key={`client-row1-${index}`}
                            className="w-[150px] sm:w-[190px] shrink-0 flex justify-center items-center px-4"
                          >
                            <img
                              src={logoUrl}
                              alt="Brand Partner Logo"
                              className="h-10 w-auto max-w-[120px] opacity-85 filter grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Row 2 - Moving Left but staggered exactly halfway aligned to gaps */}
                    <div className="w-full overflow-hidden relative">
                      <div className="flex w-max animate-scroll items-center select-none pointer-events-none ml-[-75px] sm:ml-[-95px]">
                        {[
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                          ...[
                            clientLogos[1],
                            clientLogos[3],
                            clientLogos[5],
                            clientLogos[0],
                          ],
                        ].map((logoUrl, index) => (
                          <div
                            key={`client-row2-${index}`}
                            className="w-[150px] sm:w-[190px] shrink-0 flex justify-center items-center px-4"
                          >
                            <img
                              src={logoUrl}
                              alt="Brand Partner Logo"
                              className="h-10 w-auto max-w-[120px] opacity-85 filter grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Quinta Sección: Our Tech Stack */}
                <section className="w-full py-16 bg-slate-50 text-slate-800 border-b border-slate-100 overflow-hidden relative">
                  <div className="w-full max-w-2xl mx-auto mb-10 text-center px-4 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#102135] tracking-tight leading-tight uppercase">
                      Our Tech Stack
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-xl mx-auto">
                      Utilizamos Helium 10, Data Rova, Data Dive, Xmars y
                      Detrics para el análisis de datos. Nuestro flujo de
                      trabajo corre sobre Google Cloud y Slack. Para las
                      finanzas, confiamos en Tumo, Takenos, además de Wise,
                      Payoneer o DolarApp para transacciones.
                    </p>
                  </div>

                  {/* Carousel in the form of a sleek rounded rectangle container */}
                  <div className="w-full max-w-4xl mx-auto px-4">
                    <div className="bg-white border border-slate-200/60 rounded-[28px] shadow-[0_10px_35px_rgba(16,33,53,0.04)] overflow-hidden relative py-12 px-6 carousel-mask space-y-10">
                      {/* Row 1 - Moving Left */}
                      <div className="w-full overflow-hidden relative">
                        <div className="flex w-max animate-scroll items-center select-none">
                          {[
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                            ...techLogos.filter((_, idx) => idx % 2 === 0),
                          ].map((techUrl, idx) => {
                            let sizeClass = "h-14 sm:h-20";
                            if (techUrl.includes("6-1.png")) {
                              sizeClass = "h-18 sm:h-25"; // subtly larger
                            } else if (techUrl.includes("APO_Logo_Black")) {
                              sizeClass = "h-10 sm:h-13"; // subtly smaller
                            }
                            return (
                              <div
                                key={`row1-${idx}`}
                                className="w-[140px] sm:w-[180px] shrink-0 flex justify-center items-center"
                              >
                                <img
                                  src={techUrl}
                                  alt="Tech Tool Logo"
                                  className={`${sizeClass} w-auto object-contain hover:scale-110 transition-transform duration-300 select-none`}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 2 - Moving Left but staggered exactly halfway aligned to gaps */}
                      <div className="w-full overflow-hidden relative">
                        <div className="flex w-max animate-scroll items-center select-none ml-[-70px] sm:ml-[-90px]">
                          {[
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                            ...[
                              techLogos[5],
                              techLogos[7],
                              techLogos[1],
                              techLogos[3],
                            ],
                          ].map((techUrl, idx) => {
                            let sizeClass = "h-14 sm:h-20";
                            if (techUrl.includes("6-1.png")) {
                              sizeClass = "h-18 sm:h-25"; // subtly larger
                            } else if (techUrl.includes("APO_Logo_Black")) {
                              sizeClass = "h-10 sm:h-13"; // subtly smaller
                            }
                            return (
                              <div
                                key={`row2-${idx}`}
                                className="w-[140px] sm:w-[180px] shrink-0 flex justify-center items-center"
                              >
                                <img
                                  src={techUrl}
                                  alt="Tech Tool Logo"
                                  className={`${sizeClass} w-auto object-contain hover:scale-110 transition-transform duration-300 select-none`}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </>
        )}

        {/* Testimonios Section */}
        {selectedService === null && <TestimoniosActual lang={lang} />}

        {/* Global Contact Section - Horizontal layout (Apaisado)  - Styled with brand blue box and white form */}
        <section
          id="contacto"
          className="w-full py-16 px-4 md:px-8 shrink-0 relative bg-white z-40 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-7xl mx-auto bg-[#102135] rounded-[2rem] md:rounded-[2.5rem] p-6 lg:p-10 border border-white/10 shadow-[0_20px_50px_rgba(16,33,53,0.25)] relative overflow-hidden"
          >
            {/* Subtle bg decorations */}
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#f90]/5 blur-[100px] pointer-events-none" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[150%] bg-[#007185]/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Text */}
              <div className="w-full lg:w-[35%] xl:w-[30%] text-center lg:text-left shrink-0">
                <span className="inline-block py-1 px-3 rounded-full bg-[#f90]/15 border border-[#f90]/30 text-[#f90] text-[10px] sm:text-xs font-black tracking-widest uppercase mb-3">
                  {lang === "es" ? "Hablemos" : "Let's Talk"}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white hover:text-[#f90] transition-colors duration-300 mb-3 tracking-tight leading-tight">
                  {currentTranslation.contactTitle}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/80 font-bold leading-relaxed max-w-md mx-auto lg:mx-0">
                  {currentTranslation.contactSubtitle}
                </p>
              </div>

              {/* Right Column: Form (Horizontal Layout) */}
              <div className="w-full lg:w-[65%] xl:w-[70%] bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] border border-slate-100">
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col group">
                      <input
                        type="text"
                        id="nombre"
                        className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                        placeholder={currentTranslation.placeholderName}
                      />
                    </div>
                    <div className="flex flex-col group">
                      <input
                        type="text"
                        id="empresa"
                        className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                        placeholder={currentTranslation.placeholderCompany}
                      />
                    </div>
                    <div className="flex flex-col group sm:col-span-2">
                      <input
                        type="email"
                        id="email"
                        className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                        placeholder={currentTranslation.placeholderEmail}
                      />
                    </div>
                    <div className="flex flex-col group sm:col-span-2">
                      <textarea
                        id="mensaje"
                        rows={2}
                        className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none resize-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                        placeholder={currentTranslation.placeholderMessage}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 bg-[#f90] text-[#102135] hover:bg-[#ffc233] font-black text-sm tracking-widest uppercase rounded-xl px-8 py-4 transition-all duration-300 group cursor-pointer shadow-[6px_6px_12px_#d9e0e6,-6px_-6px_12px_#ffffff] hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(255,153,0,0.4)] active:translate-y-0 active:shadow-inner"
                    >
                      <span>{currentTranslation.btnSend}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Modern Multi-Column Footer will be rendered outside the main wrapper for the curtain effect */}
      </div>

      {/* Fixed Footer Content behind the main wrapper */}
      <footer ref={footerRef} className="fixed bottom-0 left-0 w-full text-white py-12 lg:py-16 border-t-[3px] border-[#f90] bg-[#0b1626] z-0 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-b border-white/10 pb-10">
              {/* Column 1: Brand / Description */}
              <div className="space-y-4">
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
                  We understand the ever-growing threat landscape of the digital
                  world.
                </p>
                <div className="flex gap-3 pt-1">
                  <a
                    href="#"
                    className="p-2 bg-white/5 hover:bg-[#f90] rounded-xl transition-all duration-200 text-white/50 hover:text-[#102135]"
                    title="Youtube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/5 hover:bg-[#f90] rounded-xl transition-all duration-200 text-white/50 hover:text-[#102135]"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/5 hover:bg-[#f90] rounded-xl transition-all duration-200 text-white/50 hover:text-[#102135]"
                    title="Linkedin"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Column 2: Contact Info */}
              <div className="space-y-4">
                <h3 className="text-[#f90] text-xs font-extrabold uppercase tracking-widest">
                  Contact
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm font-semibold text-white/70">
                  <li className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-white/5 rounded-lg border border-white/5 shrink-0">
                      <Phone className="w-3.5 h-3.5 text-[#f90]" />
                    </span>
                    <a
                      href="tel:+1159194932"
                      className="hover:text-[#f90] transition-colors font-bold"
                    >
                      +11 59 19 49 32
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="p-1.5 bg-white/5 rounded-lg border border-white/5 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f90]" />
                    </span>
                    <span className="font-semibold text-white/80">
                      Av Libertador 1838
                    </span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Quick Links */}
              <div className="space-y-4">
                <h3 className="text-[#f90] text-xs font-extrabold uppercase tracking-widest">
                  Quick link
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm font-semibold text-white/70">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (selectedService) handleGoBack();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:text-[#f90] transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="?service=contacto"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://wa.me/5491165088135", "_blank");
                      }}
                      className="hover:text-[#f90] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        triggerTransition(() => {
                          const url = new window.URL(window.location.href);
                          url.searchParams.set("service", "about-us");
                          window.history.pushState({}, "", url.toString());
                          setSelectedService("about-us");
                        });
                      }}
                      className="hover:text-[#f90] transition-colors font-semibold text-left focus:outline-none cursor-pointer"
                    >
                      {lang === "es" ? "Sobre Nosotros" : "About Us"}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        triggerTransition(() => {
                          const url = new window.URL(window.location.href);
                          url.searchParams.set("service", "faq");
                          window.history.pushState({}, "", url.toString());
                          setSelectedService("faq");
                        });
                      }}
                      className="hover:text-[#f90] transition-colors font-semibold text-left focus:outline-none cursor-pointer"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40 mt-8 font-semibold">
              <p>
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
      </footer>
    </>
  );
}
