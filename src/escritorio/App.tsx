import { motion, useScroll, useMotionValueEvent, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from "motion/react";
import { User, Building, MessageSquare, Send, Smile, Star, TrendingUp, Award, TrendingDown, Target, Globe, Youtube, Twitter, Linkedin, Phone, MapPin, HelpCircle, FileText, Check, ShieldCheck, Percent, ShoppingCart, Zap, Sparkles, Menu, X, History, ChevronUp, ShoppingBag, Code } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ServiceDetailPage from "./components/ServiceDetailPage";
import ContactPage from "./components/ContactPage";
import SuccessStoriesPage from "./components/SuccessStoriesPage";
import FAQPage from "./components/FAQPage";
import VentajasAmazon from "./components/VentajasAmazon";
import NeumorphicContactForm from "./components/NeumorphicContactForm";
import { optimizeCloudinaryUrl } from "./utils";

interface CasinoTextProps {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
}

export function CasinoText({ text, className = "", onClick, href }: CasinoTextProps) {
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
    <span {...containerProps} style={{ cursor: 'pointer' }}>
      {content}
    </span>
  );
}

function useElementInView(triggerOnce = true, threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(el);
        }
      }
    }, { threshold });

    observer.observe(el);
    return () => {
      if (el && !triggerOnce) {
        observer.unobserve(el);
      }
    };
  }, [triggerOnce, threshold]);

  return [ref, isInView] as const;
}

export function Counter({ value, duration = 1.5, start = true, onComplete }: { value: number; duration?: number; start?: boolean; onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useElementInView(true);
  const completedRef = useRef(false);

  useEffect(() => {
    if (isInView && start && !completedRef.current) {
      let currentVal = 0;
      const end = value;
      if (currentVal === end) {
         if (!completedRef.current) {
             completedRef.current = true;
             onComplete?.();
         }
        return;
      }

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
      
      const timer = setInterval(() => {
        currentVal += 1;
        setCount(currentVal);
        if (currentVal >= end) {
          clearInterval(timer);
          if (!completedRef.current) {
             completedRef.current = true;
             onComplete?.();
          }
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, start, value, duration]); // Added start to dependencies to trigger when parent is half in view

  return <span ref={ref as any}>{count}</span>;
}

const CubeFaceWrapper = ({ transform, paddingClass = "p-6", children }: { transform: string, paddingClass?: string, children?: React.ReactNode }) => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full select-none pointer-events-none backface-hidden bg-[#0d213d]"
      style={{ transform }}
    >
      {/* Capa Inferior (Underlay): Color de los lados del cubo anterior, pero sin sombra oscura en los bordes para aclarar la intersección */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-[#0c182c] shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]" />
      
      {/* Capa Media: Contenido */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${paddingClass} z-10 pointer-events-auto`}>
        {children}
      </div>

      {/* Capa Superior (Overlay): Brillo de cristal/plástico para dar volumen curvo al dado, con bordes un poco iluminados */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none mix-blend-overlay border-[1.5px] border-blue-400/40 shadow-[inset_0_1px_10px_rgba(255,255,255,0.3)]" />
    </div>
  );
};

const InteractiveCube = ({ lang = 'es' }: { lang?: string }) => {
  // Use our hook to detect when at least 50% (half) of the cube container enters the viewport
  const [cubeRef, isHalfInView] = useElementInView(true, 0.5);

  // Posiciones de rotación iniciales: Inicia de frente
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs para hacer la rotación más suave (con inercia visual natural)
  const springX = useSpring(rotateX, { damping: 25, stiffness: 120 });
  const springY = useSpring(rotateY, { damping: 25, stiffness: 120 });

  const isAutoRotating = useRef(false);

  const startAutoRotate = () => {
    // Activamos la bandera para que useAnimationFrame comience a girar infinitamente
    isAutoRotating.current = true;
  };

  // Rotación infinita y continua
  useAnimationFrame((t, delta) => {
    if (isAutoRotating.current) {
      // delta es el tiempo en ms desde el último frame (aprox 16ms)
      rotateY.set(rotateY.get() - (delta * 0.04));
    }
  });

  // Tamaño de la caja en px (más pequeño para que no tape el texto)
  const cajaSize = 280;
  const offset = cajaSize / 2;

  return (
    <div 
      ref={cubeRef as any}
      className="w-[300px] h-[300px] shrink-0 flex flex-col items-center justify-center relative overflow-visible" 
      style={{ perspective: '1200px' }}
    >
      {/* Contenedor Giratorio */}
      <motion.div
        className="relative"
        style={{
          width: cajaSize,
          height: cajaSize,
          transformStyle: 'preserve-3d',
          rotateX: springX,
          rotateY: springY,
        }}
      >
        {/* CARA 1: FRENTE */}
        <CubeFaceWrapper transform={`translateZ(${offset}px)`}>
          <div className="relative flex flex-col items-center justify-center p-8 sm:p-10 text-center min-w-[260px] sm:min-w-[280px] select-none group w-full h-full">
            <span className="text-7xl sm:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300 tracking-tighter drop-shadow-[0_4px_12px_rgba(96,165,250,0.18)] select-none transition-transform duration-500 group-hover:scale-105">
              <Counter value={37} duration={0.3} start={isHalfInView} onComplete={startAutoRotate} />+
            </span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-400 mt-3 filter saturate-[1.2]">
              EMPRESAS DE CONFIANZA
            </span>
            <div className="mt-5 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        </CubeFaceWrapper>

        {/* CARA 2: ATRÁS (Desarrollo Web) */}
        <CubeFaceWrapper transform={`rotateY(180deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-4">
             <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                 <Code className="w-10 h-10 text-blue-400 opacity-90 relative z-10" />
             </div>
             <h3 className="text-2xl font-bold font-display text-white mb-3">
               {lang === 'es' ? 'Desarrollo Web' : 'Web Development'}
             </h3>
             <p className="text-blue-200/70 text-sm max-w-[200px] leading-relaxed">
               {lang === 'es' 
                 ? 'Sitios de alto rendimiento optimizados para máxima conversión.' 
                 : 'High-performance sites optimized for maximum conversion.'}
             </p>
          </div>
        </CubeFaceWrapper>

        {/* CARA 3: IZQUIERDA (E-Commerce) */}
        <CubeFaceWrapper transform={`rotateY(-90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-4">
             <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                 <ShoppingBag className="w-10 h-10 text-blue-400 opacity-90 relative z-10" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-3">E-Commerce</h3>
             <p className="text-blue-200/70 text-sm max-w-[200px] leading-relaxed">Integración total con las mejores plataformas del mercado.</p>
          </div>
        </CubeFaceWrapper>

        {/* CARA 4: DERECHA (Alcance Global) */}
        <CubeFaceWrapper transform={`rotateY(90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-4">
             <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                 <Globe className="w-10 h-10 text-blue-400 opacity-90 relative z-10" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-3">Alcance Global</h3>
             <p className="text-blue-200/70 text-sm max-w-[200px] leading-relaxed">Vende sin fronteras desde cualquier lugar del mundo.</p>
          </div>
        </CubeFaceWrapper>

        {/* CARA 5: ARRIBA (Plano) */}
        <CubeFaceWrapper transform={`rotateX(90deg) translateZ(${offset}px)`}>
        </CubeFaceWrapper>

        {/* CARA 6: ABAJO (Pagos Seguros) */}
        <CubeFaceWrapper transform={`rotateX(-90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-4">
             <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                 <ShieldCheck className="w-10 h-10 text-blue-400 opacity-90 relative z-10" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-3">Pagos Seguros</h3>
             <p className="text-blue-200/70 text-sm max-w-[200px] leading-relaxed">Transacciones protegidas con encriptación de grado bancario.</p>
          </div>
        </CubeFaceWrapper>

      </motion.div>
    </div>
  );
};

const getPlatformLogo = (name: string) => {
  switch (name) {
    case "Meta Ads":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#1877F2]" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.45 6.45a5.27 5.27 0 0 0-4-.2A5.27 5.27 0 0 0 7.45 6.45 5.54 5.54 0 0 0 2 11.89c0 3 2.44 5.44 5.45 5.44a5.27 5.27 0 0 0 4-.2 5.27 5.27 0 0 0 4 .2 5.54 5.54 0 0 0 5.45-5.44 5.54 5.54 0 0 0-5.45-5.44zm-8 8.89c-1.83 0-3.33-1.47-3.33-3.34s1.5-3.34 3.33-3.34c1.23 0 2.22.7 2.77 1.7.55-1 1.54-1.7 2.77-1.7 1.83 0 3.33 1.47 3.33 3.34s-1.5 3.34-3.33 3.34c-1.23 0-2.22-.7-2.77-1.7-.55 1-1.54 1.7-2.77 1.7z"/>
        </svg>
      );
    case "Google Ads":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EA4335" d="M12.24 4.75c1.8 0 3.42.62 4.69 1.83l3.5-3.5C18.29 1.11 15.42 0 12.24 0 7.47 0 3.34 2.75 1.34 6.75l4.06 3.15c.98-2.95 3.69-5.15 6.84-5.15z"/>
          <path fill="#4285F4" d="M23.75 12.25c0-.82-.07-1.61-.21-2.3H12.24v4.51h6.46c-.28 1.49-1.12 2.76-2.38 3.61l3.68 2.85c2.15-1.99 3.75-4.91 3.75-8.67z"/>
          <path fill="#FBBC05" d="M5.4 14.6c-.24-.73-.38-1.52-.38-2.35s.14-1.62.38-2.35L1.34 6.75C.49 8.46 0 10.37 0 12.35s.49 3.89 1.34 5.6l4.06-3.35z"/>
          <path fill="#34A853" d="M12.24 19.85c3.19 0 5.86-1.06 7.82-2.88l-3.68-2.85c-1.02.68-2.33 1.09-4.14 1.09-3.15 0-5.86-2.2-6.84-5.15L1.34 13.4c2 4 6.13 6.45 10.9 6.45z"/>
        </svg>
      );
    case "TikTok Ads":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#00F2FE]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.52 0c1.31 0 2.61.02 3.91.01.08 1.53.63 3.01 1.62 4.14.93.99 2.21 1.61 3.58 1.83v3.91c-1.28-.07-2.54-.49-3.61-1.21-.6-.4-1.12-.91-1.54-1.5-.13 1.9-.32 3.79-.53 5.69a6.24 6.24 0 0 1-5.26 5.48c-1.63.22-3.32-.12-4.71-.98-1.29-.8-2.27-2.11-2.65-3.61-.43-1.74-.11-3.62.86-5.11a6.11 6.11 0 0 1 5.34-3.12c.18-.01.36-.01.54 0v3.86c-1.11.13-2.03.88-2.31 2.64.04.59.27 1.15.65 1.59.45.48 1.08.77 1.73.79.82.02 1.56-.47 1.84-1.24.12-.34.16-.7.15-1.06V0z"/>
        </svg>
      );
    case "Amazon Ads":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#FF9900]" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8 15.6c-.6-.7-1.4-1-2.4-1.1-1.2-.1-2.4-.2-3.6-.3-.3 0-.6.2-.6.5l.1 1.5c0 .3.3.5.6.4 1.1 0 2.2.1 3.2.2.3.8-.2 1.6-1.1 1.6-1.9.1-3.8.1-5.7 0-.5 0-.9-.3-1.1-.7l-1-2.1c-.2-.4-.7-.6-1.2-.4l-1.4.6c-.4.2-.6.7-.4 1.1l1.4 3c.3.7 1.1 1.1 1.8 1.1 2.3.1 4.7.1 7 0 1.5 0 2.7-.9 3.2-2.3.4-1 .3-2.1-.3-3M12.1 3.2C6.9 3.2 3.3 5.9.8 9.9c-.3.5-.2 1.1.3 1.4l1.3 1c.5.4 1.2.2 1.5-.3 2-3.1 4.9-5.1 8.2-5.1 4.6 0 7.7 3.1 7.7 7.7 0 .5-.3.9-.8 1l-6 .7c-1.8.2-3.5 1-4.7 2.3-1.2 1.3-1.8 3-1.6 4.7.3 3.3 3 5.8 6.3 5.8 2.1 0 3.9-.9 5-2.5.4 1 .8 1.7 1.7 2.1.4.2 1 .2 1.4-.1.8-.7.4-2.1.4-3.1V12.9c0-6-3.8-9.7-9.6-9.7zm3.1 15.1c-.5 1-1.5 1.6-2.6 1.6-1.4 0-2.5-1.1-2.6-2.5 0-1.1.7-2.1 1.8-2.3l2.8-.3s.1 2.5.6 3.5z"/>
        </svg>
      );
    case "Mercado Libre":
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#FFE600]" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 36c2.5 1.5 5.5 2 8 2s5.5-.5 8-2c2.5 1.5 5.5 2 8 2s5.5-.5 8-2" strokeWidth="3" opacity="0.4" />
          <path d="M12 28h10M42 28h10" strokeWidth="2.5" opacity="0.3" />
          <path d="M26 22l-6 6c-1 1-1 2.5 0 3.5l1.5 1.5c1 1 2.5 1 3.5 0l6-6" />
          <path d="M38 22l6 6c1 1 1 2.5 0 3.5l-1.5 1.5c-1 1-2.5 1-3.5 0l-6-6" />
          <path d="M24 40h16M20 46h24" strokeWidth="2.5" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
};

const partners = [
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/bfrhro8muvrtntysh0o5.png", alt: "Amazon Advertising Partner" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/h7o7xnsutpjxbv7i9j41.png", alt: "Partner 2" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216801/uf4fjl5wakxeeljote1m.png", alt: "Partner 3" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/ykhuayp805ieuic194iv.png", alt: "Partner 4" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/idcu6eqwok73ht0bbf2x.png", alt: "Partner 5" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779218569/yuv2jafnf0khbyuz2kox.png", alt: "Partner 6" }
];

const marketplaces = [
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/c5j9yl6x8x4ioieswyqx.png", alt: "Amazon" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ogwssccpagtzcvckp3w4.png", alt: "Walmart" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/emzfeubwetlobz2byh25.png", alt: "Etsy" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ilrnxr9bnwzrphkrxryc.png", alt: "Target" },
  { img: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/bach9mdxgmbraufw8sue.png", alt: "Ebay" }
];

const techLogos = [
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/1-1.png",
    alt: "Helium 10",
    className: "h-9 sm:h-11 md:h-13 max-w-[150px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/4-1.png",
    alt: "Data Rova",
    className: "h-11 sm:h-13 md:h-15 max-w-[140px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/7-1.png",
    alt: "Data Dive",
    className: "h-11 sm:h-13 md:h-15 max-w-[140px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/5-1.png",
    alt: "Xmars",
    className: "h-10 sm:h-12 md:h-14 max-w-[150px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/APO_Logo_Black_P1R1@2x.png",
    alt: "APO",
    className: "h-10 sm:h-12 md:h-14 max-w-[140px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/6-1.png",
    alt: "Detrics",
    className: "h-10 sm:h-12 md:h-14 max-w-[150px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/2-1.png",
    alt: "Wise",
    className: "h-9 sm:h-11 md:h-13 max-w-[130px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/3-1.png",
    alt: "Payoneer",
    className: "h-10 sm:h-12 md:h-14 max-w-[150px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/tumo.png",
    alt: "Tumo",
    className: "h-9 sm:h-11 md:h-13 max-w-[140px]"
  }
];

const clientLogos = [
  {
    url: "https://dingoppc.com/wp-content/uploads/2026/02/logo-ugo-21-12-1030x130-1.png",
    alt: "Ugo",
    className: "h-8 sm:h-10 md:h-12 max-w-[180px] sm:max-w-[210px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/shape.svg",
    alt: "Shape",
    className: "h-11 sm:h-13 md:h-15 max-w-[130px] sm:max-w-[150px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/03/brook.webp",
    alt: "Brook",
    className: "h-10 sm:h-12 md:h-14 max-w-[140px] sm:max-w-[165px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/07/u1-jpg.png",
    alt: "U1",
    className: "h-11 sm:h-13 md:h-15 max-w-[140px] sm:max-w-[165px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2025/07/pura-vitalia-jpg.png",
    alt: "Pura Vitalia",
    className: "h-9 sm:h-11 md:h-13 max-w-[150px] sm:max-w-[180px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2026/02/logo-1077334878-1739986519-0cfa1c846554de4c85aa56da8da9e63b1739986520-640-0.webp",
    alt: "Partner Logo",
    className: "h-10 sm:h-12 md:h-14 max-w-[140px] sm:max-w-[165px]"
  },
  {
    url: "https://dingoppc.com/wp-content/uploads/2026/01/Logo-Holiherb.svg",
    alt: "Holiherb",
    className: "h-8 sm:h-10 md:h-12 max-w-[160px] sm:max-w-[190px]"
  }
];

const campaignPlatforms = [
  {
    name: "eBay",
    subtextEs: "Promoted Listings & Optimización SEO",
    subtextEn: "Promoted Listings & Search SEO Integration",
    color: "#0064D2",
    imageUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/c5j9yl6x8x4ioieswyqx.png"
  },
  {
    name: "Shopify",
    subtextEs: "Embudos CRO & Escala Omnicanal",
    subtextEn: "CRO Lead Funnels & Omnichannel Scale",
    color: "#96bf48",
    imageUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ogwssccpagtzcvckp3w4.png"
  },
  {
    name: "Etsy",
    subtextEs: "Adquisición de Nicho & Posicionamiento",
    subtextEn: "Bespoke Targeting & Search Visibility",
    color: "#f56400",
    imageUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/emzfeubwetlobz2byh25.png"
  },
  {
    name: "Target",
    subtextEs: "Roundel Retail Media & Pauta Programática",
    subtextEn: "Roundel Retail Media & Programmatic Ads",
    color: "#CC0000",
    imageUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ilrnxr9bnwzrphkrxryc.png"
  },
  {
    name: "Walmart",
    subtextEs: "Walmart Connect & Liderazgo de Categoria",
    subtextEn: "Walmart Connect & Category Dominance",
    color: "#0071CE",
    imageUrl: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/bach9mdxgmbraufw8sue.png"
  }
];

const translationsList = {
  es: {
    navHome: "Inicio",
    navCaseStudies: "Casos de éxito",
    navServices: "Servicios",
    navFaq: "FAQ",
    navAbout: "Sobre Nosotros",
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
    boxLeftTitle: "herramientas que te potencian",
    boxMiddleTitle: "conquista los marketplaces",
    contactTitle: "Diseñemos tu Siguiente Fase de Escala",
    contactSubtitle: "Agenda un diagnóstico estratégico personalizado con nuestro equipo de liderazgo tecnológico para evaluar tu catálogo y proyectar tus vías de crecimiento.",
    lblName: "Nombre completo",
    lblCompany: "Empresa",
    lblEmail: "Correo electrónico",
    lblMessage: "Mensaje",
    placeholderName: "Ej. Jeff Bezos",
    placeholderCompany: "Nombre de tu marca en Amazon",
    placeholderEmail: "contacto@tuempresa.com",
    placeholderMessage: "¿En qué podemos ayudarte para potenciar tus ventas y presencia de marca?",
    btnSend: "Enviar Mensaje",
    consentText: "Al enviar este formulario, aceptas que nos contactemos contigo.",
    footerText: "Sistemas avanzados de adquisición de tráfico y optimización de conversión para marcas globales.",
    footerCopy: "Todos los derechos reservados.",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Servicio",
    growTitle: "Sinergia en cada Escenario de Venta",
    growDescription: "Ya sea que estés fundando las bases de tu marca en Amazon, buscando un salto de facturación estructural o liderando una consolidación multicanal en Walmart, eBay y Target, optimizamos tus canales para capturar la demanda latente con una precisión quirúrgica. Redefinimos tu retorno de inversión publicitaria a través de un control de datos riguroso.",
    adsTitle: "grow your brand!",
    adsSubtitle: "Anuncios para todos los Sitios y Plataformas",
    adsDescription: "Somos una Agencia de Marketing de Anuncios que ayuda a las marcas a crecer a través de listados optimizados con SEO, campañas de PPC orientadas y estrategias de puja inteligentes. Hemos trabajado con empresas para impulsar la visibilidad, las ventas y la rentabilidad en múltiples plataformas de publicidad como Meta, Google, Tik Tok, Amazon, Mercado Libre entre otras.",
    adsMetricValue: "37 +",
    adsMetricLabel: "Empresas de Confianza",
    whyAmazonTitle: "¿Por qué vender en Amazon?",
    whyAmazonParagraph1: "Amazon es el mercado más grande, con 1.6 millones de clientes diarios, $19.4 mil millones de dólares en ventas mensuales y una tasa de conversión del 9.39%.",
    whyAmazonParagraph2: "Una estrategia sólida de PPC es esencial para impulsar las ventas y mejorar el ranking orgánico frente a los competidores.",
    whyAmazonParagraph3: "Te acompañamos en cada etapa de tu camino en Amazon: Lanzamiento, Estructuración de Campañas y Optimización de Portafolio, ofreciendo estrategias para escalar tu marca.",
    techStackTitle: "Nuestra Tecnología",
    techStackDescription: "Utilizamos Helium 10, Data Rova, Data Dive, Xmars y Detrics para el análisis de datos. Nuestro flujo de trabajo corre sobre Google Cloud y Slack. Para las finanzas, confiamos en Tumo, Takenos, además de Wise, Payoneer o DolarApp para transacciones.",
    content: [
      {
        subtitle: "PPC & Inteligencia de Retail",
        title: <>Adquisición de Alto Rendimiento en <span className="text-[#f90] drop-shadow-sm">Amazon</span></>,
        description: <>Desplegamos atribución avanzada para optimizar tu <span className="text-[#102135] font-extrabold">TACOS</span>, proteger tu marca frente a competidores y estabilizar tu volumen orgánico.</>
      },
      {
        subtitle: "Modelado Financiero Retail",
        title: <>Maximización de <br className="hidden lg:block"/> <span className="text-[#102135] drop-shadow-sm">Margen y Retorno Neto</span></>,
        description: <>No evaluamos campañas de forma aislada. Sincronizamos tus niveles de stock con ofertas algorítmicas dinámicas para maximizar el margen neto real de tu operación.</>
      },
      {
        subtitle: "Penetración de Canales",
        title: <>Infraestructura para <br className="hidden lg:block"/> <span className="text-[#f90] drop-shadow-sm">Invasión y Escala Global</span></>,
        description: <>Operamos bajo un enfoque global con gestión unificada para catálogos complejos en USA, Europa, Canadá y Latinoamérica con localización de alta conversión.</>
      }
    ]
  },
  en: {
    navHome: "Home",
    navCaseStudies: "Case Studies",
    navServices: "Services",
    navFaq: "FAQ",
    navAbout: "About Us",
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
    boxLeftTitle: "tools & partner ecosystem",
    boxMiddleTitle: "conquer global marketplaces",
    contactTitle: "Architect Your Brand's Next Phase of Scale",
    contactSubtitle: "Schedule a high-impact diagnostic session with our leadership team to evaluate your current catalog performance and map clear expansion vectors.",
    lblName: "Full Name",
    lblCompany: "Company",
    lblEmail: "Email Address",
    lblMessage: "Message",
    placeholderName: "e.g. Jeff Bezos",
    placeholderCompany: "Your Amazon brand name",
    placeholderEmail: "contact@yourcompany.com",
    placeholderMessage: "How can we help you boost your sales and brand presence?",
    btnSend: "Send Message",
    consentText: "By submitting this form, you agree to be contacted by our team.",
    footerText: "Advanced traffic acquisition and conversion systems for high-growth global platforms.",
    footerCopy: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    growTitle: "Sustained Revenue Across Touchpoints",
    growDescription: "Whether you are establishing your brand's foundation on Amazon, seeking defensive category leadership, or coordinating a multi-channel invasion across Walmart, eBay, and Target, we deploy systemic architectures to capture high-intent demand. We turn ad spend from a cost center into a predictable compounding motor.",
    adsTitle: "grow your brand!",
    adsSubtitle: "Ads for all Sites & Platforms",
    adsDescription: "We are an Ads Marketing Agency that helps brands grow through SEO optimized listings, targeted PPC campaigns, and smart bidding strategies. We’ve worked with companies to boost visibility, sales, and profitability on mutliple advertising platforms such as Meta, Google, Tik Tok, Amazon, Mercado Libre among others.",
    adsMetricValue: "37 +",
    adsMetricLabel: "Trusted Companies",
    whyAmazonTitle: "Why should i Sell on Amazon ?",
    whyAmazonParagraph1: "Amazon is the largest marketplace, with 1.6M daily customers, $19.4B in monthly sales, and a 9.39% conversion rate.",
    whyAmazonParagraph2: "A solid PPC strategy is essential to boost sales and improve organic ranking against competitors.",
    whyAmazonParagraph3: "We assist at every stage of your Amazon journey: Launching, Campaign Structuring, and Portfolio Optimization, delivering strategies to scale your brand.",
    techStackTitle: "Our Tech Stack",
    techStackDescription: "We use Helium 10, Data Rova, Data Dive, Xmars, and Detrics for data analysis. Our workflow runs on Google Cloud and Slack. For finances, we rely on Tumo, Takenos, plus Wise, Payoneer, or DolarApp for transactions.",
    content: [
      {
        subtitle: "PPC & Retail Intelligence",
        title: <>High-Performance Acquisition on <span className="text-[#f90] drop-shadow-sm">Amazon</span></>,
        description: <>We deploy advanced attribution architectures to optimize your <span className="text-[#102135] font-extrabold">TACOS</span>, defend brand real estate, and stabilize organic shelf positions.</>
      },
      {
        subtitle: "Retail Margin Modeling",
        title: <>Maximize Net <br className="hidden lg:block"/> <span className="text-[#102135] drop-shadow-sm">Marginal Backflow</span></>,
        description: <>We don't analyze bids in isolation. We synchronize sales velocity with real-time stock levels to maximize net profit across all marketplace listings.</>
      },
      {
        subtitle: "Global Channel Domination",
        title: <>Unified Multichannel <br className="hidden lg:block"/> <span className="text-[#f90] drop-shadow-sm">Expansion and Scale</span></>,
        description: <>Global deployment with consolidated strategy and customized optimization for complex catalog operations in USA, Europe, Canada, and LATAM.</>
      }
    ]
  }
};

const getInitialLanguage = (): 'es' | 'en' => {
  try {
    // 0. Check URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'es' || langParam === 'en') {
      return langParam;
    }

    // 1. Check browser languages
    const browserLangs = navigator.languages || [navigator.language];
    const hasSpanish = browserLangs.some(lang => lang.toLowerCase().startsWith('es'));
    if (hasSpanish) {
      return 'es';
    }

    // 2. Check timezone for Spanish-speaking cities/countries
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const spanishTzs = [
      "madrid", "mexico", "bogota", "buenos_aires", "santiago", "caracas", "lima", "quito", 
      "guatemala", "tegucigalpa", "managua", "san_jose", "panama", "san_salvador", "santo_domingo", 
      "asuncion", "montevideo", "la_paz", "havana", "san_juan"
    ];
    const normalizedTz = tz.toLowerCase();
    const matchesSpanishTz = spanishTzs.some(city => normalizedTz.includes(city));
    if (matchesSpanishTz) {
      return 'es';
    }
  } catch (e) {
    // Fail-safe default
  }
  return 'en';
};

const platformInsights = {
  "eBay": {
    titleEs: "Optimización Crítica de Tráfico en eBay",
    titleEn: "Global Traffic Dominance on eBay",
    es: "Maximizamos tus ventas internacionales mediante la calibración de eBay Promoted Listings (Standard y Advanced). Optimizamos el posicionamiento SEO de tus anuncios con estructuración avanzada de datos para capturar búsquedas de compradores altamente calificados en todo el mundo.",
    en: "We maximize international sales velocity through structured calibration of eBay Promoted Listings (Standard and Advanced). We optimize core product SEO with precision item details to capture high-intent buyers across eBay's global network."
  },
  "Shopify": {
    titleEs: "Escala y Arquitectura CRO en Shopify",
    titleEn: "Velocity Scaling & CRO on Shopify",
    es: "Convertimos tu tienda Shopify en una máquina de conversión de alta velocidad. Diseñamos embudos transaccionales automatizados, reducimos fricciones en la pasarela de pago e implementamos estrategias avanzadas de retención de clientes para elevar el valor promedio de ticket (AOV) de tu marca direct-to-consumer.",
    en: "We transform your Shopify storefront into a highly optimized, high-velocity conversion system. We architect seamless transactional funnel structures, reduce checkout friction, and implement advanced retention lifecycles to boost average order value (AOV) for your direct-to-consumer brand."
  },
  "Etsy": {
    titleEs: "Aceleración de Nicho en Etsy Ads",
    titleEn: "Bespoke Category Acceleration on Etsy",
    es: "Posicionamos tu catálogo frente a audiencias boutique apasionadas por productos únicos. Dominamos el algoritmo de Etsy Search (SEO) y expandimos tu visibilidad mediante campañas estratégicas en Etsy Ads, logrando un retorno robusto (ROAS) excelente para productos artesanales, vintage y de diseño.",
    en: "We position your listings before highly curated audiences searching for unique, custom-made goods. We master the native Etsy search algorithm (SEO) and scale visibility using strategic Etsy Ads to drive superb Return on Advertising Spend (ROAS)."
  },
  "Target": {
    titleEs: "Liderazgo de Retail Media en Target Roundel",
    titleEn: "Retail Media Domination on Target Roundel",
    es: "Conectamos tu marca con audiencias de Target mediante Roundel Media. Aprovechamos los ricos datos de compra directa (First-Party Data) para desplegar pautas patrocinadas, anuncios en display programático y campañas nativas de alta conversión tanto dentro como fuera de Target.com.",
    en: "We integrate your brand into Target's premier digital space using Target's Roundel platform. We leverage Target's exclusive search and purchase data to power display, off-site programmatic, and search campaigns with elite customer profile alignment."
  },
  "Walmart": {
    titleEs: "Dominio Multicanal en Walmart Marketplace",
    titleEn: "Unmatched Scale on Walmart Connect",
    es: "Capturamos al consumidor en el gigante de retail norteamericano. Estructuramos campañas de Sponsored Products avanzadas en Walmart Connect, maximizamos la visibilidad del Buy Box y sincronizamos inventario para dominar las búsquedas de mayor volumen comercial.",
    en: "Conquer America's largest omni-channel retail ecosystem. We deploy highly targeted Sponsored Products campaigns on Walmart Connect, maximize organic and paid Buy Box index rating, and optimize catalog inventory to capture massive peak volume sales."
  }
};

export default function App() {
   const [lang, setLang] = useState<'es' | 'en'>(getInitialLanguage());
  const [selectedPlatform, setSelectedPlatform] = useState<string>("eBay");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlatform === "eBay") {
      const timer = setTimeout(() => {
        setSelectedPlatform("Shopify");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedPlatform]);
  const isMeliCombined = selectedService ? [
    "mercado-libre-tiktok-influencer",
    "mercado-libre-ads",
    "tiktok-shops",
    "influencer-marketing"
  ].includes(selectedService) : false;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionAction, setTransitionAction] = useState<(() => void) | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const sectionRef = useRef<HTMLElement>(null);

  const triggerTransition = (action: () => void) => {
    setMobileMenuOpen(false);
    setTransitionAction(() => action);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning) {
      const overlayTimer = setTimeout(() => {
        if (transitionAction) {
          transitionAction();
        }
        
        window.scrollTo({ top: 0, behavior: 'instant' });
        
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
      const serviceParam = urlParams.get('service');
      setSelectedService(serviceParam);
      if (!serviceParam) {
        document.title = "The eCommerce Vanguard";
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleGoBack = () => {
    triggerTransition(() => {
      const url = new window.URL(window.location.href);
      url.searchParams.delete('service');
      window.history.pushState({}, '', url.toString());
      setSelectedService(null);
    });
  };



  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
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
      
      const navElement = document.getElementById('main-navigation');
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        // Measure coordinate at center of top navigation bar
        const checkY = rect.top + rect.height / 2;
        const checkX = window.innerWidth / 2;
        
        let detectedDark = false;
        
        // Find elements with classes representing colors
        const sections = document.querySelectorAll('section, footer, main, .bg-white, [id]');
        for (let i = 0; i < sections.length; i++) {
          const sec = sections[i];
          if (sec === navElement || navElement.contains(sec)) continue;
          
          const sRect = sec.getBoundingClientRect();
          if (sRect.top <= checkY && sRect.bottom >= checkY) {
            const classStr = sec.className || '';
            const idStr = sec.id || '';
            
            const hasLightClass = classStr.includes('bg-white') || 
                                  classStr.includes('bg-[#eaeded]') || 
                                  classStr.includes('bg-slate-50') || 
                                  classStr.includes('bg-[#fafafa]') ||
                                  classStr.includes('bg-slate-100');
                                  
            const hasDarkClass = classStr.includes('bg-[#102135]') || 
                                 classStr.includes('bg-[#11253d]') || 
                                 classStr.includes('bg-[#16273b]') || 
                                 classStr.includes('bg-[#0b1626]') || 
                                 classStr.includes('bg-[#0d1723]') ||
                                 classStr.includes('from-[#102135]') ||
                                 classStr.includes('from-[#11253d]') ||
                                 classStr.includes('from-[#16273b]') ||
                                 idStr === 'section-ads';
            
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
          // Ads section (dark) is active after 100vh - 15px till section scroll beyond ~195vh
          if (scrollPos > wh - 80 && scrollPos < wh * 2 - 150) {
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
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">+350%</p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">{currentTranslation.avgRoas}</p>
        </div>
      </div>

      {/* ACOS Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#f90] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="h-11 w-11 rounded-full bg-[#eaeded] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-2">
          <TrendingDown className="w-5.5 h-5.5 text-[#102135]" />
        </div>
        <div className="mt-auto">
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">-40%</p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">{currentTranslation.reducedAcos}</p>
        </div>
      </div>

      {/* Sponsored Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <Target className="w-8 h-8 text-[#f90] drop-shadow-sm mb-2" />
        <div className="mt-auto">
          <p className="text-lg xl:text-xl font-black text-[#102135] leading-[1.1] mt-2">{currentTranslation.sponsoredCamp}</p>
        </div>
      </div>

      {/* Best Seller Badge */}
      <div className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto relative flex items-center justify-center p-0 transition-transform hover:scale-[1.03] duration-300 select-none group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#102135] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm z-20 pointer-events-none" />
        <img 
          src={optimizeCloudinaryUrl("https://res.cloudinary.com/dzrqhomvz/image/upload/v1779219955/mkrdl3z28taeuvohkgai.png", 250)} 
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
          {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 xl:w-5 xl:h-5 fill-[#f90] text-[#f90]" />)}
        </div>
        <div className="mt-auto">
          <p className="text-xl xl:text-2xl font-black text-[#102135] leading-none mb-2 tracking-tight">{currentTranslation.topRated}</p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest font-sans">{currentTranslation.agency}</p>
        </div>
      </div>

      {/* Sales Increase Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#102135] rotate-45 rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-sm" />
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#f90] animate-pulse" />
          <span className="text-xs font-bold text-[#f90]">{currentTranslation.liveData}</span>
        </div>
        <div className="mt-auto">
          <p className="text-3xl xl:text-4xl font-black text-[#102135] tracking-tight">+2x</p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">{currentTranslation.monthlySales}</p>
        </div>
      </div>

      {/* Global Card */}
      <div className="bg-[#eaeded] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] mx-auto rounded-[2rem] p-5 lg:p-6 shadow-[12px_12px_24px_#c8cbcb,-12px_-12px_24px_#ffffff] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 relative group/card shrink-0 text-left">
        <Globe className="w-8 h-8 text-[#102135] drop-shadow-sm mb-2" />
        <div className="mt-auto">
          <p className="text-lg xl:text-xl font-black text-[#102135] leading-[1.1] mt-2">{currentTranslation.globalExpansion}</p>
          <p className="text-[10px] xl:text-[11px] font-black text-[#102135]/85 uppercase tracking-widest mt-1">USA, EU, LATAM</p>
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
      <div className="min-h-screen bg-[#eaeded] flex flex-col font-sans text-[#102135] overflow-x-clip relative z-10">

      {/* Floating Actions */}
      <div className="fixed bottom-5 lg:bottom-8 right-5 lg:right-8 z-[100] flex items-center justify-end gap-3 sm:gap-4 pointer-events-none">
        
        {/* Language Switcher hidden as requested */}

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/5491165088135"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 active:scale-95 transition-transform duration-300 pointer-events-auto cursor-pointer focus:outline-none"
          title="Contact on WhatsApp"
        >
          <img 
            src={optimizeCloudinaryUrl("https://res.cloudinary.com/dzrqhomvz/image/upload/v1778167834/inplbypdoknctwsb7pqr.png", 120)} 
            alt="WhatsApp Logo" 
            className="w-[67px] h-[67px] md:w-[78px] md:h-[78px] drop-shadow-[0_4px_15px_rgba(37,211,102,0.4)] object-contain"
          />
        </a>
      </div>

      {selectedService === 'about' || selectedService === 'contacto' ? (
        <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
          <ContactPage 
            lang={lang} 
            onGoBack={handleGoBack} 
          />
        </div>
      ) : selectedService === 'casos-exito' ? (
        <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
          <SuccessStoriesPage 
            lang={lang} 
            onGoBack={handleGoBack} 
            onContactClick={() => {
              window.open("https://wa.me/5491165088135", "_blank");
            }}
          />
        </div>
      ) : selectedService === 'faq' ? (
        <div className="pt-24 sm:pt-28 flex flex-col min-h-screen">
          <FAQPage
            lang={lang}
            onGoBack={handleGoBack}
            onContactClick={() => {
              window.open("https://wa.me/5491165088135", "_blank");
            }}
          />
        </div>
      ) : selectedService ? (
        <div className={`${isMeliCombined ? '' : 'pt-24 sm:pt-28'} flex flex-col min-h-screen`}>
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
        {/* Contenedor Sticky para la Carátula (Hero) */}
        <div className="w-full sticky top-0 left-0 z-0 h-[100dvh] overflow-hidden bg-[#eaeded]">

            {/* Sección Hero */}
            <section ref={sectionRef} className="relative px-4 pb-0 pt-8 sm:pt-10 lg:pt-12 xl:pt-14 lg:pb-12 z-10 w-full h-full overflow-y-auto lg:overflow-visible flex items-start lg:items-center">
          {/* Fondo decorativo sutil */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#007185] rounded-[100%] blur-[150px] -z-10 opacity-[0.05] pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#f90] rounded-[100%] blur-[150px] -z-10 opacity-[0.04] pointer-events-none" />
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 xl:gap-14 pb-8 sm:pb-10 lg:pb-12 relative px-4 lg:pt-8 min-h-[calc(100vh-120px)] justify-center">
            
            {/* Top Row: Agency Copy & Statement (Left) & Video Mockup (Right) */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-8 z-20">
              
              {/* Columna Izquierda: Brand Headline & E-Commerce Copy */}
              <div className="w-full lg:w-[50%] flex flex-col items-start text-left space-y-5 lg:space-y-6">
                
                {/* Elite Agency Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeded] shadow-[6px_6px_12px_#c8cbcb,-6px_-6px_12px_#ffffff] border border-white/60 text-[#102135] text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] select-none">
                  <Sparkles className="w-3.5 h-3.5 text-[#f90] animate-pulse" />
                  <span>Amazon eCommerce Agency</span>
                </div>

                {/* Majestic Main Headline */}
                <h1 className="text-3.5xl sm:text-5xl lg:text-5xl xl:text-[54px] font-black font-display text-[#102135] tracking-tight leading-[1.1] mb-2">
                  {lang === 'es' ? (
                    <>
                      Escalamos tu marca en <span className="text-[#f90] relative inline-block">Amazon<span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#f90]/25 rounded-full" /></span> & Marketplaces
                    </>
                  ) : (
                    <>
                      We scale your brand on <span className="text-[#f90] relative inline-block">Amazon<span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#f90]/25 rounded-full" /></span> & Marketplaces
                    </>
                  )}
                </h1>

                {/* Explanatory Subheadline/Paragraph */}
                <p className="text-sm sm:text-base lg:text-md xl:text-lg text-slate-700/95 font-semibold leading-relaxed max-w-xl">
                  {lang === 'es' ? (
                    "Somos una agencia de e-commerce de servicio completo dedicada a la pauta avanzada (PPC), optimización SEO de listados, modelado de margen financiero y expansión multicanal global."
                  ) : (
                    "We are a full-service e-commerce agency specializing in high-performance PPC, organic listing SEO, retail margin modeling, and global multi-channel expansion."
                  )}
                </p>

                {/* Interactive Action Row containing the highly-desired Audit Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-start gap-4 shrink-0 w-full z-20 relative h-[56px] max-w-xl">
                  {!isScrolled && (
                    <motion.button 
                      layoutId="audit-btn"
                      style={{ borderRadius: 9999, zIndex: 100 }}
                      transition={{ type: "spring", stiffness: 80, damping: 25, mass: 1.1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://calendly.com/federico-rrwv/30min", "_blank");
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#ffb400] shadow-[6px_6px_15px_rgba(255,180,0,0.35),-6px_-6px_15px_#ffffff] hover:shadow-[3px_3px_8px_rgba(255,180,0,0.35),-3px_-3px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.2)] transition-colors flex items-center justify-center gap-2 text-[#102135] group border border-transparent hover:border-white/50 cursor-pointer pointer-events-auto rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span layoutId="audit-btn-text" transition={{ type: "spring", stiffness: 80, damping: 25, mass: 1.1 }} className="font-extrabold text-sm tracking-wide uppercase text-[#102135] whitespace-nowrap">
                        {currentTranslation.auditButton}
                      </motion.span>
                      <motion.div 
                        layoutId="audit-btn-icon"
                        className="overflow-hidden flex items-center justify-center shrink-0"
                        initial={{ opacity: 0, width: 0, scale: 0 }}
                        animate={{ opacity: 1, width: "auto", scale: 1 }}
                        transition={{ type: "spring", stiffness: 80, damping: 25, mass: 1.1 }}
                      >
                        <TrendingUp className="w-4 h-4 text-[#102135] ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.div>
                    </motion.button>
                  )}

                  {!isScrolled && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetSec = document.getElementById("section-ads");
                        if (targetSec) {
                          targetSec.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="hidden sm:inline-flex items-center gap-2 px-5 py-3.5 bg-white/40 hover:bg-white/80 border border-[#102135]/10 text-[#102135] font-extrabold text-xs tracking-wider uppercase transition-all rounded-[16px] shadow-sm cursor-pointer z-10"
                    >
                      <span>{lang === 'es' ? 'Nuestros Canales' : 'Our Channels'}</span>
                      <ShoppingCart className="w-3.5 h-3.5 text-[#102135]" />
                    </motion.button>
                  )}
                </div>

              </div>

              {/* Columna Derecha: imagen de la carátula con anillos de neumorfismo interactivos */}
              <div className="w-full lg:w-[48%] xl:w-[46%] flex flex-col items-center justify-center pointer-events-auto relative py-16 px-8 sm:px-14 select-none">
                
                <div className="w-full relative group">
                  
                  {/* ADVANCED INTERACTIVE NEUMORPHIC RINGS */}
                  {/* Inner Ring 1: Core Extruded Neumorphic Frame with Pulse & Slow Rotation */}
                  <motion.div 
                    animate={{ scale: [1, 1.012, 1], rotate: [0, 360] }}
                    transition={{
                      scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 },
                      rotate: { duration: 120, repeat: Infinity, ease: "linear", delay: 3.5 }
                    }}
                    className="absolute inset-0 -m-3 sm:-m-5 lg:-m-6 rounded-[2.25rem] sm:rounded-[2.5rem] bg-[#eaeded] shadow-[15px_15px_30px_#b5b8b8,-15px_-15px_30px_#ffffff] border border-white/60 -z-10 pointer-events-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:shadow-[20px_20px_40px_#b5b8b8,-20px_-20px_40px_#ffffff]" 
                  />
                  
                  {/* Middle Ring 2: Recessed Concave Orbit with Opposite Slow Rotation */}
                  <motion.div 
                    animate={{ rotate: [0, -360], scale: [1, 1.008, 1] }}
                    transition={{
                      rotate: { duration: 150, repeat: Infinity, ease: "linear", delay: 4 },
                      scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4.5 }
                    }}
                    className="absolute inset-0 -m-6 sm:-m-10 lg:-m-12 rounded-[2.5rem] sm:rounded-[3rem] bg-[#eaeded] shadow-[inset_12px_12px_24px_#b5b8b8,inset_-12px_-12px_24px_#ffffff] border border-white/40 -z-20 pointer-events-none transition-all duration-700 ease-out opacity-95 scale-102 group-hover:scale-110"
                  />
                  
                  {/* Outer Ring 3: Dramatic Outermost Floating Neumorphic Ripple with Slow Rotation & Gentle Pulse */}
                  <motion.div 
                    animate={{ rotate: [0, 360], scale: [1, 1.015, 1] }}
                    transition={{
                      rotate: { duration: 180, repeat: Infinity, ease: "linear", delay: 4.5 },
                      scale: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }
                    }}
                    className="absolute inset-0 -m-9 sm:-m-15 lg:-m-18 rounded-[2.75rem] sm:rounded-[3.5rem] bg-transparent shadow-[25px_25px_50px_rgba(181,184,184,0.65),-25px_-25px_50px_#ffffff] border border-white/20 -z-30 pointer-events-none transition-all duration-700 ease-out opacity-80 hidden sm:block scale-104 group-hover:scale-115"
                  />

                  {/* Device / Dashboard Frame Mockup */}
                  <div className="w-full select-none relative flex items-center justify-center shrink-0 overflow-hidden rounded-[2rem] z-20 aspect-[16/10] sm:aspect-[16/9] shadow-[12px_12px_24px_#b5b8b8,-12px_-12px_24px_#ffffff] bg-[#eaeded] border border-white/75 transition-transform duration-700 ease-out group-hover:scale-102">
                    
                    {/* Glass reflections overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none mix-blend-overlay z-20" />
                    

                    {/* Imagen de la carátula */}
                          <div className="absolute inset-0 w-full h-full z-20 bg-[#eaeded] flex items-center justify-center rounded-[2rem] overflow-hidden">
                          <img 
                            src={optimizeCloudinaryUrl("https://res.cloudinary.com/dzrqhomvz/image/upload/v1779291160/fmhpubtcndg84fvbqago.png", 1000)} 
                            alt="Premium Team & Agency" 
                            className="w-full h-full object-cover select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            fetchPriority="high"
                          />
                          </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Dos Tiras Horizontales (Izquierda y Derecha) */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 z-30 mt-4 lg:mt-8">
              
              {/* Tira Izquierda: Hacer Crecer (Marketplaces) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-0">
                <div className="w-full flex justify-center items-center py-2.5 rounded-t-[1.5rem] bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] text-[#102135] text-xs font-extrabold uppercase tracking-widest select-none gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-[#f90] animate-pulse hidden sm:block"></span>
                  {currentTranslation.boxMiddleTitle}
                </div>
                <div className="w-full h-[140px] sm:h-[160px] bg-[#eaeded]/85 backdrop-blur-md rounded-b-[1.5rem] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] p-4 border-x-2 border-b-2 border-[#102135]/5 overflow-hidden flex items-center relative -mt-1">
                  <div className="flex flex-row flex-nowrap items-center h-full w-max animate-scroll hover:[animation-play-state:paused] shrink-0">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-6 items-center shrink-0 pr-6">
                        {marketplaces.map((platform, mIdx) => (
                          <div key={mIdx} className="w-[110px] h-[75px] sm:w-[150px] sm:h-[100px] flex items-center justify-center rounded-2xl bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] border border-white/40 hover:scale-[1.03] hover:shadow-[2px_2px_4px_#c8cbcb,-2px_-2px_4px_#ffffff] transition-all duration-300 opacity-95 cursor-pointer p-3 group/box">
                            <img src={optimizeCloudinaryUrl(platform.img, 200)} alt={platform.alt} className="max-h-[85%] max-w-[85%] scale-[1.18] group-hover/box:scale-[1.25] object-contain drop-shadow-sm select-none pointer-events-none transition-transform duration-300" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tira Derecha: Como Potenciamos (Partners) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-0">
                <div className="w-full flex justify-center items-center py-2.5 rounded-t-[1.5rem] bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] text-[#102135] text-xs font-extrabold uppercase tracking-widest select-none gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-[#f90] animate-pulse hidden sm:block"></span>
                  {currentTranslation.boxLeftTitle}
                </div>
                <div className="w-full h-[140px] sm:h-[160px] bg-[#eaeded]/85 backdrop-blur-md rounded-b-[1.5rem] shadow-[inset_4px_4px_8px_#c8cbcb,inset_-4px_-4px_8px_#ffffff] p-4 border-x-2 border-b-2 border-[#102135]/5 overflow-hidden flex items-center relative -mt-1">
                  <div className="flex flex-row flex-nowrap items-center h-full w-max animate-scroll hover:[animation-play-state:paused] shrink-0" style={{ animationDirection: 'reverse' }}>
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-6 items-center shrink-0 pr-6">
                        {partners.map((partner, pIdx) => (
                          <div key={pIdx} className="w-[110px] h-[75px] sm:w-[150px] sm:h-[100px] flex items-center justify-center rounded-2xl bg-[#eaeded] shadow-[5px_5px_10px_#c8cbcb,-5px_-5px_10px_#ffffff] border border-white/40 hover:scale-[1.03] hover:shadow-[2px_2px_4px_#c8cbcb,-2px_-2px_4px_#ffffff] transition-all duration-300 opacity-95 cursor-pointer p-3 group/box">
                            <img src={optimizeCloudinaryUrl(partner.img, 200)} alt={partner.alt} className="max-h-[85%] max-w-[85%] scale-[1.18] group-hover/box:scale-[1.25] object-contain drop-shadow-sm select-none pointer-events-none transition-transform duration-300" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        </div>

        {/* Tercera Sección: Ads for all Sites & Platforms - Styled as a majestic Blue curtain sliding up */}
        <motion.section 
          id="section-ads"
          initial={{ opacity: 0.95 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-16 sm:pt-24 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#102135] via-[#11253d] to-[#16273b] text-white relative z-40 flex justify-center rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] lg:rounded-t-[100px] shadow-[0_-30px_60px_rgba(16,33,53,0.4)]"
        >
          {/* Aesthetic animated yellow border beam along the top rounded edge */}
          <div className="absolute top-0 left-0 right-0 h-[40px] sm:h-[60px] md:h-[80px] lg:h-[100px] pointer-events-none z-50 overflow-hidden">
            {/* Base subtle amber line tracing the exact top curves */}
            <div className="absolute inset-0 rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] lg:rounded-t-[100px] border-t-2 border-l-2 border-r-2 border-amber-500/20" />
            {/* Running glowing beam tracing the exact top curves */}
            <div 
              className="absolute inset-0 rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] lg:rounded-t-[100px] border-t-2 border-l-2 border-r-2 border-[#ffb400] animate-border-beam-glow" 
              style={{ filter: 'drop-shadow(0 0 5px #ffb400)' }} 
            />
          </div>

          <div className="max-w-7xl w-full">
            {/* Style-free, borderless, clean layout grid */}
            <div className="max-w-5xl mx-auto w-full space-y-12">
              
              {/* Top Row: Responsive layout with text on left, 37+ metric display on right (above selector) */}
              <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-16">
                
                {/* Left Side: Creative copy */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 space-y-6 text-left"
                >
                  {/* Main Title of the section */}
                  <h2 className="text-4xl md:text-5xl lg:text-5.5xl font-black font-display text-white hover:text-[#ffb400] transition-colors duration-300 tracking-tight leading-tight">
                    {currentTranslation.adsTitle}
                  </h2>
                  
                  {/* Subtitle of the section */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#ffb400] leading-snug">
                    {currentTranslation.adsSubtitle}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base sm:text-lg text-blue-100/90 md:leading-relaxed font-semibold max-w-2xl">
                    {currentTranslation.adsDescription}
                  </p>
                </motion.div>

                {/* Right Side: High-impact Metric Section placed dynamically above the selector */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-auto flex justify-center items-center shrink-0"
                >
                  <InteractiveCube lang={lang} />
                </motion.div>
              </div>

              {/* Bottom Portion: Full Width Selector and Detailed Playbook Panel */}
              <div className="w-full pt-4 text-left">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#ffb400]/80 mb-4 select-none">
                  {lang === 'es' ? 'Prepara tu escala: Selecciona un canal' : 'Prepare your scale: Select a channel'}
                </p>
                
                {/* Full-width Grid of Neumorphic Buttons inside a polished white box */}
                <div className="bg-white rounded-[2.5rem] p-6 sm:p-9 shadow-[0_22px_45px_rgba(0,0,0,0.35)] w-full border border-white/95 select-none text-slate-800">
                  <div className="grid grid-cols-5 gap-4 sm:gap-6 w-full">
                    {campaignPlatforms.map((platform, idx) => {
                      const isSelected = selectedPlatform === platform.name;
                      return (
                        <motion.button
                          key={idx}
                          onClick={() => setSelectedPlatform(platform.name)}
                          className={`flex items-center justify-center rounded-2xl sm:rounded-[2rem] cursor-pointer transition-all duration-300 transform outline-none border focus:ring-2 focus:ring-[#ffb400]/45 aspect-square w-full ${
                            isSelected
                              ? "bg-gray-100 border-[#ffb400]/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,1.0)]"
                              : "bg-gray-50 border-transparent shadow-[5px_5px_12px_rgba(163,177,198,0.2),-5px_-5px_12px_rgba(255,255,255,1.0)] hover:-translate-y-0.5 hover:shadow-[7px_7px_16px_rgba(163,177,198,0.25),-7px_-7px_16px_rgba(255,255,255,1.0)]"
                          }`}
                          whileTap={{ scale: 0.96 }}
                        >
                          <div className={`w-full h-full p-2.5 sm:p-5 flex items-center justify-center transition-transform duration-300 ${isSelected ? "scale-90" : "hover:scale-105"}`}>
                            <img 
                              src={optimizeCloudinaryUrl(platform.imageUrl, 400)} 
                              alt={platform.name} 
                              className="w-auto h-auto max-h-[92%] max-w-[92%] object-contain select-none pointer-events-none filter drop-shadow-sm"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* White Interactive playbook detail panel representing selected channel inside the same box (glued together) with animation */}
                  <AnimatePresence mode="wait">
                    {selectedPlatform && (
                      <motion.div
                        key={selectedPlatform}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden w-full text-left"
                      >
                        {/* Upper dividing line */}
                        <div className="border-t border-slate-100 pt-6 space-y-3.5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-black text-[#e0a000] uppercase tracking-wider select-none">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb400] animate-pulse" />
                            {lang === 'es' ? 'Optimización Activa' : 'Active Optimization'}
                          </span>
                          
                          <h4 className="text-2xl sm:text-3xl font-black text-[#102135] tracking-tight">
                            {lang === 'es'
                              ? (platformInsights[selectedPlatform as keyof typeof platformInsights]?.titleEs || selectedPlatform)
                              : (platformInsights[selectedPlatform as keyof typeof platformInsights]?.titleEn || selectedPlatform)
                            }
                          </h4>
                          
                          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
                            {lang === 'es'
                              ? platformInsights[selectedPlatform as keyof typeof platformInsights]?.es
                              : platformInsights[selectedPlatform as keyof typeof platformInsights]?.en
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Carrusel de Clientes / Marcas Asociadas - Located under second section */}
        <section className="w-full py-16 bg-white text-slate-800 relative z-40 overflow-hidden flex justify-center shadow-sm">
          <div className="max-w-7xl w-full text-center">
            {/* Title for the clients carousel */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#102135] tracking-tight mb-8 leading-tight">
              {lang === 'es' ? (
                <>
                  Empresas que confiaron en <span className="text-[#f90] font-black drop-shadow-sm hover:scale-105 transition-transform duration-200 inline-block cursor-default">nosotros</span>
                </>
              ) : (
                <>
                  Companies that trusted <span className="text-[#f90] font-black drop-shadow-sm hover:scale-105 transition-transform duration-200 inline-block cursor-default">us</span>
                </>
              )}
            </h2>
            {/* Seamless Infinite Slider without mask, with clear borders */}
            <div className="w-full relative overflow-hidden py-8 bg-white border-y-4 border-slate-200/80">
              <div className="flex w-[300%] sm:w-[200%] animate-scroll items-center bg-white">
                {/* Quadrupled logos list to ensure perfect gap-free infinite circular flow with zero flicker */}
                {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logoObj, index) => (
                  <div key={index} className="flex-1 flex justify-center items-center px-10 sm:px-16 shrink-0 bg-white">
                    <img 
                      src={logoObj.url} 
                      alt={logoObj.alt || "Brand Partner Logo"} 
                      className={`${logoObj.className} opacity-95 hover:opacity-100 transition-all duration-300 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.015)] select-none pointer-events-none`} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quinta Sección: Our Tech Stack / Nuestra Tecnología */}
        <section className="w-full py-20 particles-light text-slate-800 relative z-40 flex justify-center shadow-sm">
          <div className="max-w-7xl w-full text-center">
            {/* Title and Description Wrapper with Padding so they do not touch the edges */}
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#102135] hover:text-[#f90] transition-colors duration-300 tracking-tight mb-5">
                {currentTranslation.techStackTitle}
              </h2>
  
              {/* Description Text with bolded partners for premium visual look */}
              <div className="max-w-3xl mx-auto mb-12 px-2">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
                  {lang === 'es' ? (
                    <>
                      Utilizamos <span className="text-[#102135] font-black whitespace-nowrap">Helium 10</span>, <span className="text-[#102135] font-black whitespace-nowrap">Data Rova</span>, <span className="text-[#102135] font-black whitespace-nowrap">Data Dive</span>, <span className="text-[#102135] font-black whitespace-nowrap">Xmars</span> y <span className="text-[#102135] font-black whitespace-nowrap">Detrics</span> para el análisis de datos. Nuestro flujo de trabajo corre sobre <span className="text-[#102135] font-black whitespace-nowrap">Google Cloud</span> y <span className="text-[#102135] font-black whitespace-nowrap">Slack</span>. Para las finanzas, confiamos en <span className="text-[#102135] font-black whitespace-nowrap">Tumo</span>, <span className="text-[#102135] font-black whitespace-nowrap">Takenos</span>, además de <span className="text-[#102135] font-black whitespace-nowrap">Wise</span>, <span className="text-[#102135] font-black whitespace-nowrap">Payoneer</span> o <span className="text-[#102135] font-black whitespace-nowrap">DolarApp</span> para transacciones.
                    </>
                  ) : (
                    <>
                      We use <span className="text-[#102135] font-black whitespace-nowrap">Helium 10</span>, <span className="text-[#102135] font-black whitespace-nowrap">Data Rova</span>, <span className="text-[#102135] font-black whitespace-nowrap">Data Dive</span>, <span className="text-[#102135] font-black whitespace-nowrap">Xmars</span>, and <span className="text-[#102135] font-black whitespace-nowrap">Detrics</span> for data analysis. Our workflow runs on <span className="text-[#102135] font-black whitespace-nowrap">Google Cloud</span> and <span className="text-[#102135] font-black whitespace-nowrap">Slack</span>. For finances, we rely on <span className="text-[#102135] font-black whitespace-nowrap">Tumo</span>, <span className="text-[#102135] font-black whitespace-nowrap">Takenos</span>, plus <span className="text-[#102135] font-black whitespace-nowrap">Wise</span>, <span className="text-[#102135] font-black whitespace-nowrap">Payoneer</span>, or <span className="text-[#102135] font-black whitespace-nowrap">DolarApp</span> for transactions.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Seamless Infinite Slider without mask, with clear borders to match the above carousel */}
            <div className="w-full relative overflow-hidden py-8 bg-white border-y-4 border-slate-200/80 -mx-4 sm:mx-0 sm:w-auto">
              <div className="flex w-[300%] sm:w-[200%] md:w-[150%] lg:w-[120%] animate-scroll items-center bg-white">
                {/* Quadrupled logos list to ensure perfect gap-free infinite circular flow with zero flicker */}
                {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((logoObj, index) => (
                  <div key={index} className="flex-1 flex justify-center items-center px-10 sm:px-14 shrink-0 bg-white">
                    <img 
                      src={logoObj.url} 
                      alt={logoObj.alt || "Technology Partner Logo"} 
                      className={`${logoObj.className} opacity-90 hover:opacity-100 transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)] select-none pointer-events-none`} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Domina tus Ventas en Amazon (el mismo componente de Amazon Solutions) */}
        <section className="w-full bg-[#eaeded] relative z-40 pt-16 lg:pt-20 overflow-x-hidden">
          <VentajasAmazon
            serviceSlug="amazon-solutions"
            lang={lang}
            onContactClick={() => {
              window.open("https://wa.me/5491165088135", "_blank");
            }}
          />
        </section>
      </main>
      </>
      )}

      </div>

    </>
  );
}
