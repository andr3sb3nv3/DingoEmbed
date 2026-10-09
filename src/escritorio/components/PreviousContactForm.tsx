import React, { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";

interface PreviousContactFormProps {
  lang: "es" | "en";
}

export default function PreviousContactForm({ lang }: PreviousContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    mensaje: ""
  });

  const translations = {
    contactTitleEs: "Diseñemos tu Siguiente Fase de Escala",
    contactTitleEn: "Architect Your Brand's Next Phase of Scale",
    contactSubtitleEs: "Agenda un diagnóstico estratégico personalizado con nuestro equipo de liderazgo tecnológico para evaluar tu catálogo y proyectar tus vías de crecimiento.",
    contactSubtitleEn: "Schedule a high-impact diagnostic session with our leadership team to evaluate your current catalog performance and map clear expansion vectors.",
    placeholderNameEs: "Ej. Jeff Bezos",
    placeholderNameEn: "e.g. Jeff Bezos",
    placeholderCompanyEs: "Nombre de tu marca en Amazon",
    placeholderCompanyEn: "Your Amazon brand name",
    placeholderEmailEs: "contacto@tuempresa.com",
    placeholderEmailEn: "contact@yourcompany.com",
    placeholderMessageEs: "¿En qué podemos ayudarte para potenciar tus ventas y presencia de marca?",
    placeholderMessageEn: "How can we help you boost your sales and brand presence?",
    btnSendEs: "Enviar Mensaje",
    btnSendEn: "Send Message",
    lblHablemosEs: "Hablemos",
    lblHablemosEn: "Let's Talk"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dingo Previous Contact Form submitted:", formData);
    alert(lang === "es" ? "¡Mensaje listo para enviar!" : "Message ready to send!");
  };

  return (
    <section id="contacto" className="w-full py-16 px-4 md:px-8 shrink-0 relative particles-light z-40 bg-white">
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
              {lang === "es" ? translations.lblHablemosEs : translations.lblHablemosEn}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white hover:text-[#f90] transition-colors duration-300 mb-3 tracking-tight leading-tight">
              {lang === "es" ? translations.contactTitleEs : translations.contactTitleEn} 
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 font-bold leading-relaxed max-w-md mx-auto lg:mx-0">
              {lang === "es" ? translations.contactSubtitleEs : translations.contactSubtitleEn}
            </p>
          </div>
          
          {/* Right Column: Form (Horizontal Layout) */}
          <div className="w-full lg:w-[65%] xl:w-[70%] bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] border border-slate-100">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col group">
                  <input 
                    type="text" 
                    id="nombre" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                    placeholder={lang === "es" ? translations.placeholderNameEs : translations.placeholderNameEn}
                  />
                </div>
                <div className="flex flex-col group">
                  <input 
                    type="text" 
                    id="empresa" 
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                    placeholder={lang === "es" ? translations.placeholderCompanyEs : translations.placeholderCompanyEn}
                  />
                </div>
                <div className="flex flex-col group sm:col-span-2">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                    placeholder={lang === "es" ? translations.placeholderEmailEs : translations.placeholderEmailEn}
                  />
                </div>
                <div className="flex flex-col group sm:col-span-2">
                  <textarea 
                    id="mensaje" 
                    rows={2}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className="bg-[#f3f6f8] shadow-[inset_4px_4px_8px_#d9e0e6,inset_-4px_-4px_8px_#ffffff] rounded-xl px-5 py-4 text-[#102135] outline-none resize-none transition-all placeholder:text-[#102135]/40 font-bold text-sm focus:shadow-[inset_6px_6px_12px_#d9e0e6,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-[#f90]/50 border border-transparent"
                    placeholder={lang === "es" ? translations.placeholderMessageEs : translations.placeholderMessageEn}
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-3 bg-[#f90] text-[#102135] hover:bg-[#ffc233] font-black text-sm tracking-widest uppercase rounded-xl px-8 py-4 transition-all duration-300 group cursor-pointer shadow-[6px_6px_12px_#d9e0e6,-6px_-6px_12px_#ffffff] hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(255,153,0,0.4)] active:translate-y-0 active:shadow-inner"
                >
                  <span>{lang === "es" ? translations.btnSendEs : translations.btnSendEn}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
