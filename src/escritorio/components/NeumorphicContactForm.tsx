import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Linkedin, Globe, Send } from "lucide-react";
import { optimizeCloudinaryUrl } from "../utils";

interface NeumorphicContactFormProps {
  lang: "es" | "en";
}

export default function NeumorphicContactForm({ lang }: NeumorphicContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dingo Contact ready to submit:", formData);
    // Simple state feedback
    alert(lang === "es" ? "¡Mensaje listo para enviar!" : "Message ready to send!");
  };

  const translations = {
    connectEs: "Conecta con",
    connectEn: "Connect with",
    nameEs: "Nombre",
    nameEn: "Name",
    placeholderNameEs: "Tu nombre completo",
    placeholderNameEn: "Your full name",
    emailEs: "Email",
    emailEn: "Email",
    placeholderEmailEs: "contacto@tuempresa.com",
    placeholderEmailEn: "contact@yourcompany.com",
    messageEs: "Mensaje",
    messageEn: "Message",
    placeholderMessageEs: "¿Cómo podemos ayudarte?",
    placeholderMessageEn: "How can we help you?",
    btnEs: "Enviar Mensaje",
    btnEn: "Send Message",
  };

  return (
    <div id="contacto" className="bg-[#e0e5ec] py-16 px-4 sm:px-6 md:px-8 w-full font-sans relative z-40">
      <section className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* Columna Izquierda: Identidad y Redes Sociales */}
          <div className="flex flex-col items-center justify-center gap-6 md:gap-12 p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[4rem] bg-[#e0e5ec] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] md:shadow-[25px_25px_50px_#bebebe,-25px_-25px_50px_#ffffff]">
            
            <div className="flex flex-col items-center gap-4 md:gap-8 w-full">
              <div className="space-y-2 md:space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-[#102135] text-center">
                  {lang === "es" ? translations.connectEs : translations.connectEn}
                </h2>
                {/* Línea de acento naranja de Dingo */}
                <div className="h-1 w-12 md:h-1.5 md:w-20 bg-[#f90] mx-auto rounded-full shadow-[0_2px_8px_rgba(255,153,0,0.4)]" />
              </div>
              
              {/* Contenedor del logotipo hundido (Neumorfismo Invertido) */}
              <div className="p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff] flex items-center justify-center">
                <img 
                  src={optimizeCloudinaryUrl("https://res.cloudinary.com/dzrqhomvz/image/upload/v1778820431/agxg4ct1cdfiyxbuplyh.png", 300)} 
                  alt="Dingo Logotipo" 
                  className="h-12 sm:h-16 md:h-24 w-auto object-contain select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Botones Sociales Neumórficos */}
            <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
              {[
                { icon: Mail, href: "mailto:business@dingo-agency.com", label: "Email" },
                { icon: MessageCircle, href: "https://wa.me/5491165088135", label: "WhatsApp" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Globe, href: "/", label: "Website" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-[#e0e5ec] rounded-xl md:rounded-2xl flex items-center justify-center text-[#f90] transition-all duration-300
                             shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] md:shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff] 
                             hover:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] md:hover:shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff]
                             hover:scale-95 group"
                >
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-105 transition-transform" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta del Formulario */}
          <div className="bg-[#e0e5ec] rounded-[2rem] md:rounded-[4rem] p-6 sm:p-8 md:p-14 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] md:shadow-[25px_25px_50px_#bebebe,-25px_-25px_50px_#ffffff]">
            <form className="space-y-4 sm:space-y-8 md:space-y-10" onSubmit={handleSubmit}>
              
              {/* Campo: Nombre */}
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-black text-[#102135]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f90] shadow-[0_0_6px_#f90]" />
                  {lang === "es" ? translations.nameEs : translations.nameEn}
                </label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder={lang === "es" ? translations.placeholderNameEs : translations.placeholderNameEn}
                  required
                  className="w-full p-3.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#102135] font-semibold text-sm md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#102135]/30 transition-all"
                />
              </div>

              {/* Campo: Email */}
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-black text-[#102135]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f90] shadow-[0_0_6px_#f90]" />
                  {lang === "es" ? translations.emailEs : translations.emailEn}
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={lang === "es" ? translations.placeholderEmailEs : translations.placeholderEmailEn}
                  required
                  className="w-full p-3.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#102135] font-semibold text-sm md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#102135]/30 transition-all"
                />
              </div>

              {/* Campo: Mensaje */}
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-black text-[#102135]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f90] shadow-[0_0_6px_#f90]" />
                  {lang === "es" ? translations.messageEs : translations.messageEn}
                </label>
                <textarea 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder={lang === "es" ? translations.placeholderMessageEs : translations.placeholderMessageEn}
                  required
                  className="w-full h-24 md:h-32 p-3.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#102135] font-semibold resize-none text-sm md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#102135]/30 transition-all"
                />
              </div>

              {/* Botón de Enviar Impactante de Dingo */}
              <button 
                type="submit"
                className="w-full py-4 md:py-6 bg-[#f90] rounded-xl md:rounded-2xl font-black text-[#102135] uppercase tracking-[0.15em] md:tracking-[0.4em] text-xs md:text-sm
                           shadow-[4px_4px_10px_rgba(255,153,0,0.25)] md:shadow-[8px_8px_20px_rgba(255,153,0,0.25)]
                           hover:shadow-[6px_6px_15px_rgba(255,153,0,0.35)] md:hover:shadow-[12px_12px_25px_rgba(255,153,0,0.35)]
                           active:scale-[0.98] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] md:active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1)]
                           transition-all duration-300 flex items-center justify-center gap-2 md:gap-4 group mt-1 md:mt-2"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#102135]" />
                {lang === "es" ? translations.btnEs : translations.btnEn}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
