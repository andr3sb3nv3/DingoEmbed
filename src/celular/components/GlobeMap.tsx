import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

interface GlobeMapProps {
  lang: 'es' | 'en';
}

export default function GlobeMap({ lang }: GlobeMapProps) {
  const standardMapUrl = "https://maps.google.com/maps?q=-34.578583,-58.405232&t=&z=16&ie=UTF8&iwloc=0&output=embed";
  const externalDirectionsLink = "https://www.google.com/maps/?q=Av.+del+Libertador+2402,+Buenos+Aires";

  return (
    <div 
      id="aesthetic-modern-map"
      className="w-full h-full min-h-[420px] sm:min-h-[480px] relative rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(16,33,53,0.06)] bg-slate-50 border border-[#102135]/5"
    >
      {/* Integración del Mapa Líquido a todo color */}
      <iframe 
        title="Palermo Buenos Aires location map"
        src={standardMapUrl} 
        width="100%" 
        height="100%" 
        style={{ 
          border: 0, 
          filter: 'none', 
          minHeight: '440px'
        }} 
        allowFullScreen={false} 
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-full h-full relative z-10"
      />

      {/* Tarjeta flotante en esquina superior izquierda */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#102135] text-white px-3.5 py-2 rounded-xl shadow-lg border border-white/10 backdrop-blur-md">
          <MapPin className="w-4 h-4 text-[#f90] animate-bounce" />
          <span className="text-xs font-black tracking-wide">
            {lang === 'es' ? "Palermo" : "Palermo HQ"}
          </span>
        </div>
      </div>

      {/* Botón flotante para obtener Direcciones */}
      <div className="absolute bottom-4 right-4 z-20">
        <a 
          href={externalDirectionsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-center gap-1.5 bg-white hover:bg-[#f90] text-[#102135] hover:text-[#102135] px-4 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg border border-neutral-200 hover:scale-[1.03] active:scale-95"
        >
          <span>{lang === 'es' ? "Cómo Llegar" : "Directions"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Sutil viñeta elegante */}
      <div className="absolute inset-0 pointer-events-none z-15 ring-1 ring-inset ring-[#102135]/10 rounded-3xl" />
    </div>
  );
}
