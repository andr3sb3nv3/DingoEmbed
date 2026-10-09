import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Recycle, ArrowUp } from 'lucide-react';

// Mock data con los testimonios
const TESTIMONIALS_DATA = [
  {
    tagEs: "Agencia Estratégica", tagEn: "Strategic Agency",
    textEs: "Trabajar con este equipo fue una experiencia transformadora para nuestra marca. Su experiencia en publicidad de Amazon y estrategias inteligentes nos ayudó a mantenernos por delante de la competencia y aumentó significativamente nuestro rendimiento en la plataforma. Brindaron un apoyo excepcional, comunicación clara y perspectivas valiosas en cada etapa. Su enfoque personalizado ha llevado a un crecimiento sostenido y una mejor rentabilidad. Los recomiendo altamente.",
    textEn: "Working with this team was a transformative experience for our brand. Their expertise in Amazon advertising and smart bidding strategies helped us stay ahead of competitors and significantly boosted our performance on the platform. They provided exceptional support, clear communication, and valuable insights every step of the way. Their tailored approach has led to sustained growth and improved profitability. Highly recommend them.",
    name: "Agustin Janoter",
    roleEs: "CEO, Marsip", roleEn: "CEO, Marsip",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    tagEs: "Optimización de Campañas", tagEn: "Campaign Optimization",
    textEs: "Nos asociamos con ellos para optimizar nuestras campañas de Amazon, y los resultados han sido sobresalientes. Su profundo conocimiento de la plataforma de Amazon y sus estrategias expertas llevaron a un aumento de ventas y visibilidad. Su equipo es profesional, receptivo y está comprometido a entregar resultados tangibles. Recomiendo encarecidamente sus servicios.",
    textEn: "We partnered with this team to optimize our Amazon campaigns, and the results have been outstanding. Their deep understanding of Amazon's platform and expert strategies led to a significant increase in sales and visibility. Their team is professional, responsive, and committed to delivering tangible results. Highly recommend their services for anyone looking to scale their Amazon business effectively.",
    name: "Ezequiel Ramirez",
    roleEs: "Shapermint", roleEn: "Shapermint",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    tagEs: "Crecimiento y Escala", tagEn: "Growth & Scaling",
    textEs: "Su equipo ha sido un cambio radical para nuestro negocio en Amazon. Su equipo se tomó el tiempo para comprender nuestra marca y diseñó una estrategia que maximizó nuestro retorno de la inversión publicitaria (ROAS). Hemos visto una mejora notable en tráfico, conversiones y ventas en general. No son solo un proveedor de servicios, son un verdadero socio en nuestro crecimiento. No podríamos estar más satisfechos.",
    textEn: "This team has been a game-changer for our Amazon business. Their team took the time to understand our brand and tailored a strategy that maximized our return on ad spend (ROAS). We've seen a noticeable improvement in traffic, conversions, and overall sales. They're not just a service provider—they're a true partner in our growth. We couldn't be more satisfied with the results.",
    name: "Mellisa J.",
    roleEs: "Brookthorne", roleEn: "Brookthorne",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
];


const mod = (n: number, m: number) => ((n % m) + m) % m;

// Pose base de la caja sobre la cinta
const POSE_FRONT = -14;          // muestra el frente
const POSE_BACK = POSE_FRONT - 180; // giró media vuelta: muestra el dorso

// ---------------------------------------------------------------------------
// Flecha sonrisa — impresa en tinta sobre el cartón y en naranja sobre la cinta
// ---------------------------------------------------------------------------
const SmileArrow = ({ className = "", color = "#232F3E", strokeWidth = 8 }: { className?: string, color?: string, strokeWidth?: number }) => (
  <svg viewBox="0 0 120 34" className={className} fill="none" aria-hidden="true">
    <path d="M6 8 C 38 32, 82 30, 112 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M102 4 L114 11 L101 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Cinta transportadora de fábrica (full-width, fija en la sección).
// `isShifting` acelera la goma y los rodillos mientras entra una caja nueva.
//
// ⚙️ CALIBRACIÓN: el `top: calc(100% - 58px)` define dónde apoya la caja.
//    Subí el número (ej. 64) si la caja queda hundida; bajalo si flota.
// ---------------------------------------------------------------------------
const ConveyorBelt = ({ lang, isShifting }: { lang: "es" | "en", isShifting: boolean }) => (
  <div
    className="absolute left-1/2 -translate-x-1/2 w-[135vw] z-10 pointer-events-none select-none"
    style={{ top: 'calc(100% - 58px)', ['--belt-speed' as any]: isShifting ? '0.3s' : '1.15s' }}
  >
    {/* Superficie de goma de la cinta (animada) */}
    <div style={{ perspective: '700px' }}>
      <div
        className="dingo-belt-anim w-full h-[150px]"
        style={{
          transform: 'rotateX(55deg)',
          transformOrigin: 'center bottom',
          backgroundImage: [
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 3px, transparent 3px, transparent 72px)',
            'linear-gradient(180deg, #434b58 0%, #2a3038 100%)'
          ].join(', '),
          boxShadow: 'inset 0 14px 30px rgba(0,0,0,0.40), inset 0 -6px 14px rgba(0,0,0,0.35)',
          borderTop: '2px solid rgba(255,255,255,0.16)',
          animation: 'dingoBeltMove var(--belt-speed) linear infinite',
        }}
      >
      </div>
    </div>

    {/* Frente metálico de la estructura, con bulones */}
    <div
      className="relative w-full h-10 md:h-14 border-t border-white/25"
      style={{
        backgroundImage: 'radial-gradient(circle 2.2px at 50% 30%, rgba(0,0,0,0.45) 0px 2.2px, transparent 2.6px), linear-gradient(180deg, #525a68 0%, #3a414c 60%, #333944 100%)',
        backgroundSize: '52px 100%, 100% 100%',
      }}
    >
      {/* Placas de identificación */}
      <div className="absolute left-[13%] top-1/2 -translate-y-1/2 bg-[#F5C518] text-[#1c1f26] font-mono font-black text-[7px] md:text-[9px] px-1.5 md:px-2 py-0.5 md:py-1 tracking-[0.2em] uppercase rounded-[1px] shadow-sm">
        {lang === "es" ? "Cinta 04" : "Belt 04"}
      </div>
      <div className="absolute right-[13%] top-1/2 -translate-y-1/2 bg-[#1c1f26] text-[#F5C518] font-mono font-black text-[7px] md:text-[9px] px-1.5 md:px-2 py-0.5 md:py-1 tracking-[0.2em] uppercase rounded-[1px] shadow-sm">
        {lang === "es" ? "Logística" : "Logistics"}
      </div>
      {/* Franja de seguridad amarilla y negra */}
      <div
        className="absolute bottom-0 inset-x-0 h-[5px] md:h-[7px]"
        style={{ background: 'repeating-linear-gradient(45deg, #F5C518 0px, #F5C518 10px, #1c1f26 10px, #1c1f26 20px)' }}
      />
    </div>

    {/* Rodillos a la vista bajo la estructura */}
    <div
      className="dingo-belt-anim w-full h-4 md:h-5"
      style={{
        backgroundColor: '#11151b',
        backgroundImage: 'radial-gradient(circle 6px at 15px 50%, #1d232c 0px 4.5px, #39404d 5px, transparent 6.5px)',
        backgroundSize: '30px 100%',
        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6)',
        animation: 'dingoBeltMove var(--belt-speed) linear infinite',
      }}
    />

    {/* Patas de la estructura */}
    <div className="relative w-full h-10 md:h-14">
      {[10, 37, 63, 90].map((p) => (
        <div
          key={p}
          className="absolute top-0 w-5 md:w-7 h-full"
          style={{ left: `${p}%`, background: 'linear-gradient(90deg, #4d5563 0%, #2e333d 70%)' }}
        />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Cara con testimonio (se usa en el frente y en el dorso de la caja)
// ---------------------------------------------------------------------------
const TestimonialFace = ({ data, lang }: { data: typeof TESTIMONIALS_DATA[0], lang: "es" | "en" }) => (
  <>
    {/* Logo + smile impresos en tinta sobre el cartón */}
    <div className="absolute top-4 md:top-6 inset-x-0 flex flex-col items-center pointer-events-none">
      <SmileArrow className="w-16 md:w-24 mt-0.5 opacity-80" color="#232F3E" strokeWidth={9} />
    </div>

    {/* Códigos de imprenta en el borde inferior */}
    <div className="absolute bottom-2 md:bottom-2.5 inset-x-4 md:inset-x-6 flex items-center justify-between pointer-events-none opacity-50 text-[#4a3015]">
      <div className="flex items-center gap-1 md:gap-1.5">
        <Recycle className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" strokeWidth={2.5} />
        <span className="font-mono text-[6px] md:text-[7px] font-bold tracking-[0.2em] uppercase">
          {lang === "es" ? "Caja 100% reciclable" : "100% recyclable box"}
        </span>
      </div>
      <span className="font-mono text-[6px] md:text-[7px] font-bold tracking-[0.2em] uppercase">
        AR-BUE · DNGO
      </span>
    </div>

    {/* Etiqueta de envío (sticker blanco con el testimonio) */}
    <div
      className="absolute inset-x-4 sm:inset-x-7 top-[76px] md:top-[104px] bottom-8 md:bottom-9 -rotate-1 bg-[#FDFDF8] rounded-[3px] p-4 sm:p-6 flex flex-col text-left"
      style={{ boxShadow: '0 8px 22px rgba(80,45,15,0.28), 0 1px 0 rgba(255,255,255,0.5) inset' }}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="font-mono text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 truncate">
          {lang === "es" ? "Entrega verificada" : "Verified delivery"}
        </span>
        <div className="flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#FF9900] text-[#FF9900]" />
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-[#102135]/15 my-2 md:my-3" />

      <div className="flex items-baseline gap-2 mb-2 md:mb-3">
        <span className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] text-slate-400 shrink-0">
          {lang === "es" ? "Contenido:" : "Contents:"}
        </span>
        <span className="text-[10px] md:text-xs font-black uppercase tracking-wide text-[#102135] border-b-2 border-[#FF9900] pb-0.5">
          {lang === "es" ? data.tagEs : data.tagEn}
        </span>
      </div>

      <p className="text-[10px] sm:text-[11px] md:text-[13px] text-slate-600 leading-snug md:leading-relaxed font-medium mb-auto overflow-hidden">
        <span className="text-[#FF9900] font-black text-base md:text-lg leading-none mr-0.5 align-[-2px]">“</span>
        {lang === "es" ? data.textEs : data.textEn}
        <span className="text-[#FF9900] font-black text-base md:text-lg leading-none ml-0.5 align-[-2px]">”</span>
      </p>

      <div className="border-t border-dashed border-[#102135]/15 my-2 md:my-3" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <img
            src={data.image}
            alt={data.name}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#102135] shrink-0"
            draggable="false"
          />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[#102135] font-black uppercase text-[10px] md:text-xs leading-tight truncate">
              {data.name}
            </span>
            <span className="text-[#8B5A2B] font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.15em] mt-0.5 truncate">
              {lang === "es" ? data.roleEs : data.roleEn}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div
            className="h-6 md:h-7 w-14 md:w-20"
            style={{ background: 'repeating-linear-gradient(90deg, #102135 0px, #102135 2px, transparent 2px, transparent 4px, #102135 4px, #102135 5px, transparent 5px, transparent 9px)' }}
          />
          <span className="font-mono text-[6px] md:text-[7px] font-bold tracking-[0.2em] text-slate-400 mt-1">
            DNGO-{String(TESTIMONIALS_DATA.indexOf(data) + 1).padStart(4, '0')}
          </span>
        </div>
      </div>
    </div>
  </>
);

// ---------------------------------------------------------------------------
// Marca de manipulación para las caras angostas
// ---------------------------------------------------------------------------
const HandlingMark = ({ lang }: { lang: "es" | "en" }) => (
  <div className="flex flex-col items-center justify-center h-full text-[#232F3E] opacity-70">
    <div className="flex gap-1.5">
      <ArrowUp className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
      <ArrowUp className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
    </div>
    <div className="w-14 md:w-20 h-[3px] bg-[#232F3E] mt-1 rounded-full" />
    <span className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] mt-2">
      {lang === "es" ? "Este lado arriba" : "This side up"}
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// La caja: un paquete 3D con DOS testimonios (frente y dorso).
// `showBack` la gira media vuelta para revelar el segundo.
// ---------------------------------------------------------------------------
const PackageBox = ({ frontData, backData, showBack, lang, dims }: {
  frontData: typeof TESTIMONIALS_DATA[0],
  backData: typeof TESTIMONIALS_DATA[0],
  showBack: boolean,
  lang: "es" | "en",
  dims: { w: number, h: number }
}) => {
  const depth = dims.w * 0.5;
  const rotation = showBack ? POSE_BACK : POSE_FRONT;

  // Sombreado por cara según su ángulo final respecto a la cámara
  const shadeFor = (rotY: number) => (1 - Math.cos(((rotY + rotation) * Math.PI) / 180)) / 2;

  const cardboardStyle = {
    backgroundImage: 'linear-gradient(165deg, #EBD3AB 0%, #D9B98D 55%, #C9A678 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 44px rgba(95,55,18,0.15)',
    border: '1px solid #B08A55',
  };

  const sideStyle = {
    backgroundImage: 'linear-gradient(165deg, #DDBE92 0%, #C9A678 100%)',
    boxShadow: 'inset 0 0 40px rgba(95,55,18,0.20)',
    border: '1px solid #B08A55',
  };

  const springRot = { type: "spring" as const, stiffness: 50, damping: 14 };

  return (
    <div className="w-full h-full relative" style={{ perspective: '1600px' }}>
      {/* Sombra de contacto sobre la goma */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/40 blur-[10px] rounded-[100%]"
        style={{ width: dims.w * 0.95, height: '22px' }}
      />

      {/* Inclinación de cámara (fija) */}
      <div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg)' }}
      >
        {/* Rotador: gira 180° para mostrar el dorso */}
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: rotation }}
          transition={springRot}
        >
          {/* ── Tapa superior con cinta estilo prime ── */}
          <div
            className="absolute left-0 flex items-center justify-center overflow-hidden"
            style={{
              width: dims.w,
              height: depth,
              top: (dims.h - depth) / 2,
              transform: `rotateX(90deg) translateZ(${dims.h / 2}px)`,
              backgroundImage: 'linear-gradient(135deg, #F2DDB6 0%, #DDBE90 100%)',
              boxShadow: 'inset 0 0 50px rgba(95,55,18,0.14)',
              border: '1px solid #B08A55',
            }}
          >
            <div className="relative w-full h-10 md:h-12 bg-[#1A2433] flex items-center overflow-hidden whitespace-nowrap shadow-[0_2px_6px_rgba(60,35,10,0.35)]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 mx-3 md:mx-4 shrink-0">
                  <span className="text-white text-[11px] md:text-[13px] font-black lowercase tracking-tight">express</span>
                  <SmileArrow className="w-6 md:w-8" color="#FF9900" strokeWidth={11} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Caras angostas (laterales) con marcas de manipulación ── */}
          {[90, -90].map((rotY) => (
            <div
              key={rotY}
              className="absolute top-0 overflow-hidden"
              style={{
                width: depth,
                height: dims.h,
                left: (dims.w - depth) / 2,
                transform: `rotateY(${rotY}deg) translateZ(${dims.w / 2}px)`,
                backfaceVisibility: 'hidden',
                ...sideStyle,
              }}
            >
              <HandlingMark lang={lang} />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: '#2a1505' }}
                initial={false}
                animate={{ opacity: shadeFor(rotY) * 0.45 }}
                transition={springRot}
              />
            </div>
          ))}

          {/* ── Frente (testimonio A) y dorso (testimonio B) ── */}
          {[{ rotY: 0, data: frontData }, { rotY: 180, data: backData }].map(({ rotY, data }) => (
            <div
              key={rotY}
              className="absolute top-0 left-0 overflow-hidden select-none"
              style={{
                width: dims.w,
                height: dims.h,
                transform: `rotateY(${rotY}deg) translateZ(${depth / 2}px)`,
                backfaceVisibility: 'hidden',
                ...cardboardStyle,
              }}
            >
              <TestimonialFace data={data} lang={lang} />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: '#2a1505' }}
                initial={false}
                animate={{ opacity: shadeFor(rotY) * 0.45 }}
                transition={springRot}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Componente de Animación al aparecer en pantalla
const FadeInWhenVisible = ({ children, direction = "up" }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      variants={variants}
      className="w-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
};

// Título de Sección Estilizado
const SectionTitle = ({ title, titleColor = "text-white" }: { title: string, titleColor?: string }) => (
  <div className="mb-1 text-center">
    <h2 className={`text-3xl md:text-4xl lg:text-4xl font-black font-display italic uppercase tracking-tighter leading-none ${titleColor}`}>
      {title}
    </h2>
  </div>
);

export default function TestimoniosActual({ lang, onViewCasesClick }: { lang: "es" | "en", onViewCasesClick?: () => void }) {
  // \`step\` cuenta cuántas "informaciones" se mostraron. Cada caja trae dos:
  // step par = frente de una caja (llega por la cinta), step impar = dorso
  // de la misma caja (se muestra girándola). floor(step/2) identifica la caja.
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isShifting, setIsShifting] = useState(false);
  const shiftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Medición responsiva del tamaño de la caja
  const [dims, setDims] = useState({ w: 320, h: 440 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Coreografía de scroll: al llegar desde arriba, la caja entra por la
  // derecha; al seguir bajando, se va por la izquierda (sentido de la cinta).
  // Sin opacity: la caja nunca se desvanece, solo viaja por la cinta.
  const x = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], ["100vw", "0vw", "0vw", "-100vw"]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        if (width > 0 && height > 0) {
          setDims({ w: width, h: height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => { if (shiftTimer.current) clearTimeout(shiftTimer.current); }, []);

  const N = TESTIMONIALS_DATA.length;
  const boxNumber = Math.floor(step / 2);
  const showBack = mod(step, 2) === 1;
  const frontIdx = mod(boxNumber * 2, N);
  const backIdx = mod(boxNumber * 2 + 1, N);
  const activeDataIndex = mod(step, N);

  // Acelera la cinta mientras la caja nueva llega a su puesto
  const triggerShift = () => {
    setIsShifting(true);
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    shiftTimer.current = setTimeout(() => setIsShifting(false), 1650);
  };

  // Mueve el contador. Si cambia la caja → transición por cinta;
  // si es la misma caja → solo gira (lo maneja PackageBox con \`showBack\`).
  const transitionTo = (newStep: number, dirHint: number) => {
    if (Math.floor(newStep / 2) !== boxNumber) {
      setDirection(dirHint);
      triggerShift();
    }
    setStep(newStep);
  };

  const paginate = (dir: number) => transitionTo(step + dir, dir);

  const goToIndex = (idx: number) => {
    const diff = idx - activeDataIndex;
    if (diff === 0) return;
    transitionTo(step + diff, Math.sign(diff));
  };

  // Caja saliente se va por la izquierda, la nueva entra por la derecha
  // (sentido de la cinta). Con dirección inversa, al revés.
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? '110vw' : '-110vw',
      transition: { duration: 0 }
    }),
    center: {
      x: '0vw',
      // La caja nueva espera fuera de pantalla a que la saliente despeje
      transition: { duration: 0.9, ease: [0.16, 0.84, 0.28, 1], delay: 0.55 }
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? '-110vw' : '110vw',
      transition: { duration: 0.8, ease: [0.55, 0.05, 0.85, 0.4] }
    }),
  };

  return (
    <section ref={sectionRef} className="w-full pt-10 pb-24 px-4 sm:px-6 lg:px-8 particles-light text-slate-800 text-center overflow-hidden font-sans flex flex-col items-center justify-center relative z-40 border-t border-slate-200/50">
      {/* Animaciones de la cinta transportadora */}
      <style>{`
        @keyframes dingoBeltMove {
          from { background-position-x: 0px; }
          to   { background-position-x: -72px; }
        }
        @keyframes dingoBeltWordsMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-216px); }
        }
        .dingo-belt-word-track {
          animation: dingoBeltWordsMove calc(var(--belt-speed) * 3) linear infinite;
        }
        @media (min-width: 1024px) {
          @keyframes dingoBeltWordsMove {
            from { transform: translateX(0); }
            to   { transform: translateX(-288px); }
          }
          .dingo-belt-word-track {
            animation-duration: calc(var(--belt-speed) * 4);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dingo-belt-anim,
          .dingo-belt-word-track { animation: none !important; }
        }
      `}</style>

      <FadeInWhenVisible direction="up">
        {/* Títulos */}
        <div className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[560px] mx-auto text-center mb-1 relative z-10">
          <SectionTitle
            title={lang === "es" ? "TESTIMONIOS" : "TESTIMONIALS"}
            titleColor="text-[#FF9900]"
          />
        </div>

        {/* Contenedor Principal */}
        <div className="max-w-5xl w-full relative min-h-[500px] flex flex-col items-center justify-center px-4 md:px-16">

          {/* Controles de Navegación */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 md:-left-6 top-[38%] -translate-y-1/2 p-3 md:p-4 rounded-full bg-white text-[#FF9900] border border-slate-100 z-50 select-none cursor-pointer
                       shadow-[0_8px_24px_rgba(16,33,53,0.14)] transition-all
                       hover:scale-110 hover:shadow-[0_12px_28px_rgba(16,33,53,0.2)] active:scale-95
                       group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
            aria-label={lang === "es" ? "Anterior" : "Previous"}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:-translate-x-0.5" strokeWidth={3} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:-right-6 top-[38%] -translate-y-1/2 p-3 md:p-4 rounded-full bg-white text-[#FF9900] border border-slate-100 z-50 select-none cursor-pointer
                       shadow-[0_8px_24px_rgba(16,33,53,0.14)] transition-all
                       hover:scale-110 hover:shadow-[0_12px_28px_rgba(16,33,53,0.2)] active:scale-95
                       group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
            aria-label={lang === "es" ? "Siguiente" : "Next"}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
          </button>

          {/* Zona caja + cinta. El mb deja lugar a las patas de la cinta. */}
          <div className="relative w-full flex justify-center mt-8 mb-40 md:mb-48">

            {/* La cinta transportadora, fija y de ancho completo */}
            <ConveyorBelt lang={lang} isShifting={isShifting} />

            {/* Escenario: viaja con el scroll sobre la cinta */}
            <motion.div
              style={{ x }}
              className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[560px] h-[430px] sm:h-[470px] md:h-[510px] relative mx-auto z-30"
              ref={containerRef}
            >
              {/* Vibración sutil de la cinta sobre la caja */}
              <motion.div
                animate={{ y: [0, -1.5, 0, -0.5, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                {/* Intercambio de cajas (solo cuando cambia boxNumber):
                    la saliente se va por la izquierda, la nueva llega por
                    la derecha. El giro de 180° ocurre dentro de PackageBox. */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={boxNumber}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onPanEnd={(e: any, info: any) => {
                      if (info.offset.x < -50 || info.velocity.x < -500) paginate(1);
                      else if (info.offset.x > 50 || info.velocity.x > 500) paginate(-1);
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <PackageBox
                      frontData={TESTIMONIALS_DATA[frontIdx]}
                      backData={TESTIMONIALS_DATA[backIdx]}
                      showBack={showBack}
                      lang={lang}
                      dims={dims}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* Indicadores inferiores */}
          <div className="flex gap-3 justify-center z-50">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] cursor-pointer ${
                  activeDataIndex === idx
                    ? "w-8 bg-[#FF9900] shadow-[0_2px_10px_rgba(255,153,0,0.5)]"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`${lang === "es" ? "Ir al testimonio" : "Go to testimonial"} ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
