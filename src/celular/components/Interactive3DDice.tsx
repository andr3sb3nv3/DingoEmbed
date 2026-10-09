import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, PanInfo, useAnimationFrame } from 'motion/react';
import { Star, ShoppingBag, Globe, ShieldCheck, Zap } from 'lucide-react';

export function useElementInView(triggerOnce = true) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [triggerOnce]);

  return [ref, isInView] as const;
}

export function Counter({ value, duration = 1.5, onComplete }: { value: number; duration?: number; onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useElementInView(true);
  const completedRef = useRef(false);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) {
         if (!completedRef.current) {
             completedRef.current = true;
             onComplete?.();
         }
        return;
      }

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
      const step = Math.max(1, Math.ceil(end / (totalMiliseconds / 16)));
      
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
          if (!completedRef.current) {
             completedRef.current = true;
             onComplete?.();
          }
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, onComplete]);

  return <span ref={ref as any}>{count}</span>;
}

const CubeFaceWrapper = ({ transform, children }: { transform: string, children: React.ReactNode }) => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full select-none pointer-events-none backface-hidden"
      style={{ transform, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      {/* Capa Inferior (Underlay): Fondo y sombras intensas para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#030918] shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />
      
      {/* Capa Media: Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 pointer-events-auto">
        {children}
      </div>

      {/* Capa Superior (Overlay): Brillo de cristal/plástico para dar volumen curvo al dado */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/30 pointer-events-none mix-blend-overlay border-[2px] border-white/20 shadow-[inset_0_4px_15px_rgba(255,255,255,0.5)]" />
    </div>
  );
};

export default function Interactive3DDice() {
  // Posiciones de rotación iniciales: Inicia con rotación sutil en X para ver la capa superior, Y en 0
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

  const [cajaSize, setCajaSize] = useState(350);

  useEffect(() => {
    const checkSize = () => {
      setCajaSize(window.innerWidth < 640 ? 250 : 350);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const offset = cajaSize / 2;

  // Marcas para la cara 2
  const partners = [
    { name: "Amazon", src: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298539/c5j9yl6x8x4ioieswyqx.png" },
    { name: "Walmart", src: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/bach9mdxgmbraufw8sue.png" },
    { name: "Etsy", src: "https://cdn.simpleicons.org/etsy/white" },
    { name: "Target", src: "https://cdn.simpleicons.org/target/white" },
    { name: "Shopify", src: "https://cdn.simpleicons.org/shopify/white" },
    { name: "eBay", src: "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779298540/ogwssccpagtzcvckp3w4.png" }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-8" style={{ perspective: '1600px', minHeight: `${cajaSize * 1.3}px` }}>
      
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
          <div className="relative flex flex-col items-center justify-center p-8 sm:p-10 text-center w-full h-full select-none group">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 pointer-events-none" />
            <span className="text-7xl sm:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300 tracking-tighter drop-shadow-[0_4px_12px_rgba(96,165,250,0.18)] select-none transition-transform duration-500 group-hover:scale-105">
              <Counter value={37} duration={0.3} onComplete={startAutoRotate} />+
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

        {/* CARA 2: ATRÁS (Logos Grid) */}
        <CubeFaceWrapper transform={`rotateY(180deg) translateZ(${offset}px)`}>
          <div className="w-full h-full flex flex-col items-center justify-center pt-2 pb-8">
             <h2 className="text-sm font-bold text-blue-400 tracking-[0.2em] uppercase mb-4 opacity-80 decoration-blue-500/30 underline underline-offset-8">Partners</h2>
             <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full place-items-center px-6">
                {partners.map(brand => (
                  <div key={brand.name} className="w-16 h-10 flex items-center justify-center">
                     <img 
                        src={brand.src} 
                        alt={brand.name} 
                        className={`max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity [filter:brightness(0)_saturate(100%)_invert(63%)_sepia(24%)_saturate(1523%)_hue-rotate(182deg)_brightness(101%)_contrast(99%)]`} 
                        draggable="false" 
                     />
                  </div>
                ))}
             </div>
          </div>
        </CubeFaceWrapper>

        {/* CARA 3: IZQUIERDA (E-Commerce) */}
        <CubeFaceWrapper transform={`rotateY(-90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative overflow-hidden group">
             <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
             <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500">
                 <ShoppingBag className="w-12 h-12 text-blue-400 opacity-90 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
             </div>
             <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-md">E-Commerce</h3>
             <p className="text-blue-100/70 text-sm max-w-[220px] leading-relaxed font-medium">Integración total con las mejores plataformas del mercado.</p>
          </div>
        </CubeFaceWrapper>

        {/* CARA 4: DERECHA (Alcance Global) */}
        <CubeFaceWrapper transform={`rotateY(90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative overflow-hidden group">
             <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
             <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500">
                 <Globe className="w-12 h-12 text-blue-400 opacity-90 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
             </div>
             <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-md">Alcance Global</h3>
             <p className="text-blue-100/70 text-sm max-w-[220px] leading-relaxed font-medium">Vende sin fronteras desde cualquier lugar del mundo.</p>
          </div>
        </CubeFaceWrapper>

        {/* CARA 5: ARRIBA (Plana) */}
        <CubeFaceWrapper transform={`rotateX(90deg) translateZ(${offset}px)`}>
          <div className="w-full h-full" />
        </CubeFaceWrapper>

        {/* CARA 6: ABAJO (Pagos Seguros) */}
        <CubeFaceWrapper transform={`rotateX(-90deg) translateZ(${offset}px)`}>
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative overflow-hidden group">
             <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
             <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500">
                 <ShieldCheck className="w-12 h-12 text-blue-400 opacity-90 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
             </div>
             <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-md">Pagos Seguros</h3>
             <p className="text-blue-100/70 text-sm max-w-[220px] leading-relaxed font-medium">Transacciones protegidas con encriptación de grado bancario.</p>
          </div>
        </CubeFaceWrapper>

      </motion.div>
    </div>
  );
}
