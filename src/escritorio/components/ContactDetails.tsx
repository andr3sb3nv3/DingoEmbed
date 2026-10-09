import React from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

interface ContactDetailsProps {
  lang: 'es' | 'en';
}

export default function ContactDetails({ lang }: ContactDetailsProps) {
  return (
    <div className="bg-white border border-[#102135]/10 shadow-[0_25px_60px_-15px_rgba(16,33,53,0.06)] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex-1 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_30px_70px_rgba(16,33,53,0.09)]">
      
      {/* Luces sutiles de fondo (Glow Mesh) */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#f90]/5 rounded-bl-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2563eb]/2.5 rounded-tr-[100px] pointer-events-none" />

      <div className="space-y-8">
        {/* Cabecera Principal */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#102135] flex items-center justify-center text-[#f90] shrink-0 border border-white/10 shadow-md">
            <MapPin className="w-6 h-6 text-[#f90] animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-black text-[#f90] tracking-widest uppercase block mb-1">
              {lang === 'es' ? "OFICINA CENTRAL" : "HEAD OFFICE"}
            </span>
            <h3 className="text-2xl font-black text-[#102135] tracking-tight">
              Av. del Libertador 2402
            </h3>
            <p className="text-sm font-bold text-[#102135]/65 mt-0.5 uppercase tracking-wider">
              Palermo • Buenos Aires, ARG
            </p>
          </div>
        </div>

        {/* Canales Directos Inteligentes */}
        <div className="space-y-4 pt-6 border-t border-neutral-100">
          
          {/* Loseta de Correo */}
          <a 
            href="mailto:business@dingo-agency.com" 
            className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-[#102135] rounded-2xl border border-slate-100 hover:border-[#102135] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-white/10 flex items-center justify-center border border-slate-200/60 group-hover:border-transparent transition-all shadow-sm">
                <Mail className="w-4 h-4 text-[#102135] group-hover:text-[#f90]" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-[#102135]/50 group-hover:text-white/60 font-black uppercase tracking-wider block">
                  {lang === 'es' ? "CORREO DIRECTO" : "EMAIL INBOX"}
                </span>
                <span className="text-xs sm:text-sm font-black text-[#102135] group-hover:text-white tracking-wide transition-colors">
                  business@dingo-agency.com
                </span>
              </div>
            </div>
            <div className="text-[#102135]/30 group-hover:text-[#f90] text-sm font-black select-none pr-2 group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </div>
          </a>

          {/* Loseta de WhatsApp */}
          <a 
            href="https://wa.me/5491165088135"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-[#1fbf41] rounded-2xl border border-slate-100 hover:border-emerald-500 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-white/10 flex items-center justify-center border border-slate-200/60 group-hover:border-transparent transition-all shadow-sm">
                <Phone className="w-4 h-4 text-emerald-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-[#102135]/50 group-hover:text-white/80 font-black uppercase tracking-wider block">
                  {lang === 'es' ? "WHATSAPP DIRECTO" : "DIRECT WHATSAPP"}
                </span>
                <span className="text-xs sm:text-sm font-black text-[#102135] group-hover:text-white tracking-wide transition-colors">
                  +54 (11) 5258-2402
                </span>
              </div>
            </div>
            <div className="text-[#102135]/30 group-hover:text-white text-sm font-black select-none pr-2 group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </div>
          </a>

          {/* Micro-credencial de Confianza */}
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100/85">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </div>
            <span className="text-xs font-bold text-[#102135]/75">
              {lang === 'es' ? "Socio Oficial Registrado de Amazon Ads" : "Official Registered Amazon Ads Partner"}
            </span>
          </div>

        </div>
      </div>

      {/* Horario de Atención Integrado */}
      <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3 text-[#102135]/75 bg-slate-50/80 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102135]/5 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#f90]" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono font-bold text-[#102135]/40 uppercase block">
              {lang === 'es' ? "HORARIO DE ATENCIÓN" : "OPENING HOURS"}
            </span>
            <span className="text-xs font-extrabold text-[#102135]/90">
              {lang === 'es' ? "Lun a Vie: 9:00 AM a 6:00 PM" : "Mon to Fri: 9:00 AM to 6:00 PM"}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-[#f90]/10 text-[#f90] px-2 py-1 rounded-md font-bold uppercase shrink-0">
          GMT-3
        </span>
      </div>

    </div>
  );
}
