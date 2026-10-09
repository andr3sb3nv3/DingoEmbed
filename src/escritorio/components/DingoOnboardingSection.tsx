import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle, Code, Copy, Check, Info } from 'lucide-react';

interface DingoOnboardingSectionProps {
  lang: 'es' | 'en';
}

const DOG = [0.00, 0.88];
const TEXT = [0.00, 0.88];
const TAIL = [0.88, 1.00];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

export default function DingoOnboardingSection({ lang }: DingoOnboardingSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress of scroll within the 150vh section
      const totalScrollable = r.height - viewportHeight;
      if (totalScrollable <= 0) return;
      
      const scrolled = -r.top;
      const p = clamp(scrolled / totalScrollable, 0, 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    // Initial call to set correct progress state
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  const dogProgress = seg(progress, DOG[0], DOG[1]);
  const dogOffset = (1 - dogProgress).toFixed(4);

  const tailProgress = seg(progress, TAIL[0], TAIL[1]);
  const tailOffset = (1 - tailProgress).toFixed(4);

  const tp = seg(progress, TEXT[0], TEXT[1]);
  const getLetterOffset = (i: number) => {
    const lp = clamp(tp * 5 - i, 0, 1);
    return (1 - lp).toFixed(4);
  };

  const codeString = `import React, { useEffect, useState, useRef } from 'react';

const DOG = [0.00, 0.88];
const TEXT = [0.00, 0.88];
const TAIL = [0.88, 1.00];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

export default function App() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      // Calculamos el progreso basado en el scroll dentro de la sección
      const p = clamp(-r.top / (r.height - window.innerHeight), 0, 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const dogProgress = seg(progress, DOG[0], DOG[1]);
  const dogOffset = (1 - dogProgress).toFixed(4);

  const tailProgress = seg(progress, TAIL[0], TAIL[1]);
  const tailOffset = (1 - tailProgress).toFixed(4);

  const tp = seg(progress, TEXT[0], TEXT[1]);
  const getLetterOffset = (i: number) => {
    const lp = clamp(tp * 5 - i, 0, 1);
    return (1 - lp).toFixed(4);
  };

  return (
    <div className="font-sans text-[#999] bg-white m-0 box-border">
      <div className="h-[40vh] flex items-center justify-center text-[13px] tracking-[.3em] uppercase text-[#ccc]">
        scroll ↓
      </div>

      {/* h-[150vh] reduce considerablemente el tiempo/scroll necesario para completarse */}
      <section ref={stageRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-[100vh] flex items-center justify-center">
          <svg
            id="dingo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-8 -45 660 375"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Logo Dingo"
            className="w-[min(82vw,780px)] h-auto overflow-visible"
          >
            <path
              d="M 422,0 L 425,0 L 426,2 L 426,10 L 438,0 L 437,6 L 427,25 L 444,43 L 446,53 L 449,58 L 471,74 L 474,77 L 474,81 L 469,86 L 460,88 L 459,96 L 455,98 L 448,97 L 437,91 L 419,85 L 393,83 L 381,93 L 357,99 L 353,105 L 352,121 L 352,129 L 357,142 L 388,200 L 405,218 L 421,220 L 424,224 L 424,228 L 421,231 L 416,233 L 404,233 L 393,227 L 385,219 L 379,216 L 353,180 L 339,165 L 332,152 L 326,147 L 320,133 L 308,123 L 304,126 L 302,124 L 297,127 L 293,126 L 279,135 L 266,155 L 262,172 L 252,195 L 236,206 L 221,223 L 215,223 L 213,217 L 219,203 L 230,193 L 235,192 L 238,186 L 240,186 L 242,183 L 243,177 L 240,162 L 246,136 L 252,123 L 248,120 L 236,119 L 231,115 L 217,112 L 217,108 L 205,106 L 193,96 L 183,91 L 181,98 L 173,102 L 176,122 L 167,159 L 167,174 L 171,189 L 178,200 L 186,208 L 199,211 L 203,216 L 201,221 L 189,224 L 182,222 L 166,208 L 163,202 L 148,187 L 148,146 L 143,135 L 141,134 L 140,129 L 130,121 L 114,139 L 104,146 L 62,166 L 53,172 L 37,190 L 26,212 L 9,227 L 4,228 L 2,226 L 0,220 L 3,214 L 8,206 L 17,198 L 36,160 L 41,155 L 58,147 L 67,134 L 63,131 L 53,144 L 51,142 L 43,147 L 35,148 L 33,146 L 24,146 L 20,142 L 14,141 L 14,139 L 9,135 L 10,131 L 28,117 L 31,117 L 35,113 L 47,108 L 54,102 L 53,100 L 50,100 L 57,89 L 58,83 L 68,68 L 69,63 L 82,48 L 96,38 L 158,22 L 189,22 L 235,27 L 295,25 L 306,26 L 309,28 L 325,28 L 351,23 L 383,25 L 400,19 L 422,0 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={dogOffset}
            />
            <path
              d="M 422,0 C 455,-26 520,-34 565,-20 C 600,-9 612,-12 638,-28"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={tailOffset}
            />
            <path
              d="M 42.0,314.5 L 17.0,314.5 L 13.5,313.0 L 14.0,248.5 L 46.0,248.5 L 54.0,251.5 L 59.0,255.5 L 66.5,266.0 L 69.5,282.0 L 68.5,290.0 L 64.5,299.0 L 56.0,308.5 L 49.0,312.5 L 42.0,314.5 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(0)}
            />
            <path
              d="M 41.5,306.0 L 51.0,302.5 L 58.5,294.0 L 60.5,288.0 L 60.5,274.0 L 58.5,268.0 L 53.0,260.5 L 46.0,256.5 L 23.0,255.5 L 21.5,257.0 L 21.5,306.0 L 41.5,306.0 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(0)}
            />
            <path
              d="M 122.0,313.5 L 114.5,313.0 L 115.0,248.5 L 122.5,249.0 L 122.0,313.5 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(1)}
            />
            <path
              d="M 223.0,313.5 L 220.0,313.5 L 208.5,302.0 L 181.0,268.5 L 179.5,269.0 L 179.5,312.0 L 178.0,313.5 L 171.5,313.0 L 170.5,311.0 L 170.5,257.0 L 171.5,256.0 L 170.5,249.0 L 172.0,247.5 L 175.0,247.5 L 177.5,250.0 L 215.0,297.5 L 216.5,296.0 L 216.5,249.0 L 224.5,249.0 L 224.5,312.0 L 223.0,313.5 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(2)}
            />
            <path
              d="M 307.0,314.5 L 295.0,314.5 L 283.0,309.5 L 274.5,301.0 L 269.5,285.0 L 270.5,272.0 L 276.5,260.0 L 286.0,251.5 L 296.0,247.5 L 309.0,247.5 L 319.0,251.5 L 325.5,259.0 L 325.5,263.0 L 324.0,264.5 L 319.0,264.5 L 314.0,257.5 L 303.0,254.5 L 296.0,255.5 L 290.0,258.5 L 283.5,265.0 L 278.5,275.0 L 279.5,292.0 L 286.0,301.5 L 295.0,306.5 L 310.0,305.5 L 318.5,298.0 L 321.5,292.0 L 321.5,287.0 L 301.0,286.5 L 299.5,285.0 L 299.5,280.0 L 301.0,278.5 L 328.0,278.5 L 329.5,280.0 L 329.5,293.0 L 327.5,299.0 L 320.0,308.5 L 307.0,314.5 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(3)}
            />
            <path
              d="M 408.0,315.5 L 398.0,315.5 L 388.0,312.5 L 377.5,304.0 L 371.5,293.0 L 370.5,273.0 L 375.5,261.0 L 382.0,253.5 L 396.0,246.5 L 409.0,246.5 L 418.0,249.5 L 428.5,258.0 L 435.5,272.0 L 435.5,290.0 L 431.5,300.0 L 424.0,308.5 L 418.0,312.5 L 408.0,315.5 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(4)}
            />
            <path
              d="M 409.5,307.0 L 416.0,304.5 L 423.5,297.0 L 427.5,286.0 L 427.5,276.0 L 424.5,267.0 L 416.0,257.5 L 409.0,254.5 L 401.0,253.5 L 390.0,257.5 L 382.5,265.0 L 378.5,276.0 L 378.5,286.0 L 382.5,297.0 L 390.0,304.5 L 397.0,307.5 L 409.5,307.0 Z"
              pathLength="1"
              fill="none"
              stroke="#F39200"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={getLetterOffset(4)}
            />
          </svg>
        </div>
      </section>

      <div className="h-[40vh] flex items-center justify-center text-[13px] tracking-[.3em] uppercase text-[#ccc]">
        fin
      </div>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 mb-16 relative z-30 px-4">
      {/* Primary Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-4.5 rounded-full bg-gradient-to-r from-[#102135] to-[#1e344e] hover:from-[#1e344e] hover:to-[#2b486d] text-white font-display text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center gap-3 border border-white/10 group"
      >
        <Sparkles className="w-4.5 h-4.5 text-[#FF9900] transition-transform duration-500 group-hover:rotate-180" />
        <span>
          {lang === 'es' ? 'ONBOARDING CON DINGO' : 'ONBOARDING WITH DINGO'}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4.5 h-4.5 text-white/70" />
        ) : (
          <ChevronDown className="w-4.5 h-4.5 text-white/70" />
        )}
      </button>

      {/* Expandable Content Container */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="w-full max-w-5xl overflow-hidden mt-8"
          >
            <div className="bg-white border border-slate-200/80 rounded-[2rem] shadow-2xl p-5 sm:p-8 flex flex-col relative">
              
              {/* Internal Tabs (Interactive Demo / Source Code) */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                <div>
                  <h3 className="text-lg font-black font-display text-[#102135] tracking-tight uppercase">
                    {lang === 'es' ? 'Experiencia de Onboarding' : 'Onboarding Experience'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'es'
                      ? 'Haz scroll lento sobre el área interactiva para ver cómo se dibuja el trazo del logotipo.'
                      : 'Scroll slowly over the interactive area to watch the logo draw itself dynamically.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      !showCode
                        ? 'bg-[#102135] text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                    }`}
                  >
                    {lang === 'es' ? 'Ver Demostración' : 'Live Demo'}
                  </button>
                  <button
                    onClick={() => setShowCode(true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      showCode
                        ? 'bg-[#102135] text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                    }`}
                  >
                    {lang === 'es' ? 'Ver Código' : 'Code'}
                  </button>

                  {showCode && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar' : 'Copy')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Display */}
              {!showCode ? (
                <div 
                  className="w-full bg-[#fafbfc] border border-slate-100 rounded-2xl relative overflow-hidden flex flex-col"
                  style={{ maxHeight: '70vh' }}
                >
                  {/* Floating scrolling hint inside */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
                    <div className="bg-[#102135]/90 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FF9900] rounded-full animate-ping" />
                      <span>{lang === 'es' ? '¡HAZ SCROLL EN LA PÁGINA PARA DIBUJAR!' : 'SCROLL THE PAGE TO DRAW LOGO!'}</span>
                    </div>
                  </div>

                  {/* The scroll stage */}
                  <div ref={stageRef} className="relative h-[160vh] w-full bg-slate-50/20">
                    <div className="sticky top-0 h-[45vh] sm:h-[50vh] flex items-center justify-center p-4">
                      <div className="w-full max-w-[450px] flex flex-col items-center justify-center">
                        <svg
                          id="dingo-onboarding-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="-8 -45 660 375"
                          preserveAspectRatio="xMidYMid meet"
                          aria-label="Logo Dingo"
                          className="w-full h-auto overflow-visible select-none drop-shadow-[0_10px_30px_rgba(255,153,0,0.12)]"
                        >
                          <path
                            d="M 422,0 L 425,0 L 426,2 L 426,10 L 438,0 L 437,6 L 427,25 L 444,43 L 446,53 L 449,58 L 471,74 L 474,77 L 474,81 L 469,86 L 460,88 L 459,96 L 455,98 L 448,97 L 437,91 L 419,85 L 393,83 L 381,93 L 357,99 L 353,105 L 352,121 L 352,129 L 357,142 L 388,200 L 405,218 L 421,220 L 424,224 L 424,228 L 421,231 L 416,233 L 404,233 L 393,227 L 385,219 L 379,216 L 353,180 L 339,165 L 332,152 L 326,147 L 320,133 L 308,123 L 304,126 L 302,124 L 297,127 L 293,126 L 279,135 L 266,155 L 262,172 L 252,195 L 236,206 L 221,223 L 215,223 L 213,217 L 219,203 L 230,193 L 235,192 L 238,186 L 240,186 L 242,183 L 243,177 L 240,162 L 246,136 L 252,123 L 248,120 L 236,119 L 231,115 L 217,112 L 217,108 L 205,106 L 193,96 L 183,91 L 181,98 L 173,102 L 176,122 L 167,159 L 167,174 L 171,189 L 178,200 L 186,208 L 199,211 L 203,216 L 201,221 L 189,224 L 182,222 L 166,208 L 163,202 L 148,187 L 148,146 L 143,135 L 141,134 L 140,129 L 130,121 L 114,139 L 104,146 L 62,166 L 53,172 L 37,190 L 26,212 L 9,227 L 4,228 L 2,226 L 0,220 L 3,214 L 8,206 L 17,198 L 36,160 L 41,155 L 58,147 L 67,134 L 63,131 L 53,144 L 51,142 L 43,147 L 35,148 L 33,146 L 24,146 L 20,142 L 14,141 L 14,139 L 9,135 L 10,131 L 28,117 L 31,117 L 35,113 L 47,108 L 54,102 L 53,100 L 50,100 L 57,89 L 58,83 L 68,68 L 69,63 L 82,48 L 96,38 L 158,22 L 189,22 L 235,27 L 295,25 L 306,26 L 309,28 L 325,28 L 351,23 L 383,25 L 400,19 L 422,0 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={dogOffset}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 422,0 C 455,-26 520,-34 565,-20 C 600,-9 612,-12 638,-28"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={tailOffset}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 42.0,314.5 L 17.0,314.5 L 13.5,313.0 L 14.0,248.5 L 46.0,248.5 L 54.0,251.5 L 59.0,255.5 L 66.5,266.0 L 69.5,282.0 L 68.5,290.0 L 64.5,299.0 L 56.0,308.5 L 49.0,312.5 L 42.0,314.5 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(0)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 41.5,306.0 L 51.0,302.5 L 58.5,294.0 L 60.5,288.0 L 60.5,274.0 L 58.5,268.0 L 53.0,260.5 L 46.0,256.5 L 23.0,255.5 L 21.5,257.0 L 21.5,306.0 L 41.5,306.0 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(0)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 122.0,313.5 L 114.5,313.0 L 115.0,248.5 L 122.5,249.0 L 122.0,313.5 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(1)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 223.0,313.5 L 220.0,313.5 L 208.5,302.0 L 181.0,268.5 L 179.5,269.0 L 179.5,312.0 L 178.0,313.5 L 171.5,313.0 L 170.5,311.0 L 170.5,257.0 L 171.5,256.0 L 170.5,249.0 L 172.0,247.5 L 175.0,247.5 L 177.5,250.0 L 215.0,297.5 L 216.5,296.0 L 216.5,249.0 L 224.5,249.0 L 224.5,312.0 L 223.0,313.5 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(2)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 307.0,314.5 L 295.0,314.5 L 283.0,309.5 L 274.5,301.0 L 269.5,285.0 L 270.5,272.0 L 276.5,260.0 L 286.0,251.5 L 296.0,247.5 L 309.0,247.5 L 319.0,251.5 L 325.5,259.0 L 325.5,263.0 L 324.0,264.5 L 319.0,264.5 L 314.0,257.5 L 303.0,254.5 L 296.0,255.5 L 290.0,258.5 L 283.5,265.0 L 278.5,275.0 L 279.5,292.0 L 286.0,301.5 L 295.0,306.5 L 310.0,305.5 L 318.5,298.0 L 321.5,292.0 L 321.5,287.0 L 301.0,286.5 L 299.5,285.0 L 299.5,280.0 L 301.0,278.5 L 328.0,278.5 L 329.5,280.0 L 329.5,293.0 L 327.5,299.0 L 320.0,308.5 L 307.0,314.5 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(3)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 408.0,315.5 L 398.0,315.5 L 388.0,312.5 L 377.5,304.0 L 371.5,293.0 L 370.5,273.0 L 375.5,261.0 L 382.0,253.5 L 396.0,246.5 L 409.0,246.5 L 418.0,249.5 L 428.5,258.0 L 435.5,272.0 L 435.5,290.0 L 431.5,300.0 L 424.0,308.5 L 418.0,312.5 L 408.0,315.5 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(4)}
                            className="transition-all duration-75"
                          />
                          <path
                            d="M 409.5,307.0 L 416.0,304.5 L 423.5,297.0 L 427.5,286.0 L 427.5,276.0 L 424.5,267.0 L 416.0,257.5 L 409.0,254.5 L 401.0,253.5 L 390.0,257.5 L 382.5,265.0 L 378.5,276.0 L 378.5,286.0 L 382.5,297.0 L 390.0,304.5 L 397.0,307.5 L 409.5,307.0 Z"
                            pathLength={1}
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeDasharray="1"
                            strokeDashoffset={getLetterOffset(4)}
                            className="transition-all duration-75"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[60vh] overflow-auto p-4 md:p-6 bg-slate-900 rounded-2xl font-mono text-xs md:text-sm leading-relaxed text-slate-300">
                  <pre className="whitespace-pre overflow-x-auto select-all">
                    <code>{codeString}</code>
                  </pre>
                </div>
              )}

              {/* Informative Footer banner inside */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#FF9900]" />
                  <span>{lang === 'es' ? 'CONTROL TOTALMENTE IMPULSADO POR SCROLL' : 'TOTALLY SCROLL-DRIVEN PATHS'}</span>
                </span>
                <span>AR-BUE · DNGO-LABS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
