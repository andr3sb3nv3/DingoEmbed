import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  Shield,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import GlobeMap from "./GlobeMap";
import ContactDetails from "./ContactDetails";

interface AboutUsPageProps {
  lang: "es" | "en";
  onGoBack: () => void;
}

export default function AboutUsPage({ lang, onGoBack }: AboutUsPageProps) {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#f90]" />,
      titleEs: "Socio Oficial de Amazon",
      titleEn: "Official Amazon Ads Partner",
      descEs:
        "Garantizamos las mejores prácticas y acceso exclusivo a herramientas avanzadas de optimización.",
      descEn:
        "We guarantee best-in-class performance and early access to powerful advertising features.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#f90]" />,
      titleEs: "Enfoque en Rentabilidad",
      titleEn: "Profit-First Mindset",
      descEs:
        "No solo buscamos impresiones; maximizamos el retorno de inversión publicitaria (ROAS) de tu negocio.",
      descEn:
        "We don't focus only on impressions; we scale your actual advertising ROAS and sales margins.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#f90]" />,
      titleEs: "Equipo Expertos Senior",
      titleEn: "Senior Specialist Team",
      descEs:
        "Tus campañas son gestionadas por analistas experimentados de primera línea, no por bots ni pasantes.",
      descEn:
        "Your brand is personally optimized by battle-tested managers, never delegated to automated bots.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#f90]" />,
      titleEs: "Transparencia Absoluta",
      titleEn: "Absolute Transparency",
      descEs:
        "Informes claros, comunicación directa y acceso total a tus cuentas de publicidad.",
      descEn:
        "Clear executive reporting, real-time syncs, and 100% data transparency over all campaigns.",
    },
  ];

  return (
    <div
      id="about-us-view"
      className="w-full bg-[#fafafa] text-[#102135] min-h-screen pb-24 overflow-x-hidden relative"
    >
      {/* Dynamic Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[150px] -z-10 opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#2563eb] rounded-full blur-[180px] -z-10 opacity-[0.03] pointer-events-none" />

      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#102135]/60 hover:text-[#f90] hover:border-[#f90] transition-all duration-200 focus:outline-none bg-white p-3 rounded-xl border border-[#102135]/15 shadow-sm group cursor-pointer"
          title={lang === "es" ? "Volver" : "Back"}
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform text-[#102135]" />
          <span className="font-black text-xs uppercase tracking-widest text-[#102135]/80 group-hover:text-[#f90]">
            {lang === "es" ? "Volver" : "Go Back"}
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
        {/* Intro Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f90]/10 text-[#f90] rounded-full w-max">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === "es"
                  ? "AGENCIA DE RENDIMIENTO PREMIUM"
                  : "PREMIUM GROWTH AGENCY"}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#102135] tracking-tight leading-tight"
            >
              {lang === "es"
                ? "Impulsamos tu Cuenta de Amazon"
                : "We Accelerate Your Amazon Success"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base sm:text-lg text-[#102135]/75 font-semibold leading-relaxed"
            >
              {lang === "es"
                ? "Dingo es una agencia líder especializada en publicidad y crecimiento estratégico para Amazon. Combinamos tecnologías sofisticadas y consultoría especializada de primer nivel para llevar a las marcas al siguiente nivel de rentabilidad y escala."
                : "Dingo is an execution-led growth agency specialized in high-performance Amazon advertising. We combine cutting-edge technology and premium consulting to guide brands toward sustained profitability and market dominance."}
            </motion.p>
            <div className="h-1.5 w-24 bg-[#f90] rounded-full" />
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-[#102135] text-white p-8 rounded-3xl relative overflow-hidden border border-white/10 shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f90]/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-xl sm:text-2xl font-black mb-4 tracking-tight text-white flex items-center gap-2">
                <span className="text-[#f90]">•</span>
                {lang === "es" ? "Nuestra Misión" : "Our Mission"}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                {lang === "es"
                  ? "Transformar el potencial de marca en resultados tangibles de ventas y optimizar cada centavo invertido en campañas publicitarias mediante análisis rigurosos, estrategias robustas y un servicio altamente consultivo."
                  : "To unlock true brand potential into scalable sales revenue, ensuring every marketing dollar is optimized with maximum efficiency and clarity through dedicated, high-level specialist execution."}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#f90]">
                    {lang === "es" ? "+30M" : "+$30M"}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    {lang === "es" ? "Ventas Gestionadas" : "Sales Managed"}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#f90]">
                    350%
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    {lang === "es"
                      ? "Aumento de ROAS Prom."
                      : "Average ROAS Maximized"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Pillars Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102135] mb-2 tracking-tight">
              {lang === "es"
                ? "Por Qué Elegir Dingo"
                : "Why Modern Brands Choose Dingo"}
            </h2>
            <div className="w-16 h-1 bg-[#f90] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#102135]/15 p-6 rounded-2xl flex gap-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 bg-[#102135]/5 rounded-xl text-[#f90] shrink-0 h-max border border-[#102135]/5">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#102135] mb-1">
                    {lang === "es" ? pillar.titleEs : pillar.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#102135]/75 font-semibold leading-relaxed">
                    {lang === "es" ? pillar.descEs : pillar.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Map & Coordinates Grid Section */}
        <div className="pt-8 border-t border-[#102135]/10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-black text-[#102135] mb-8 flex items-center gap-3"
          >
            <span className="w-2 bg-[#f90] h-6 rounded-full inline-block" />
            {lang === "es"
              ? "Nuestras Oficinas y Direcciones"
              : "Our Office & Headquarters"}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Location Map */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <GlobeMap lang={lang} />
            </motion.div>

            {/* Right Column: Premium Office Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              <ContactDetails lang={lang} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
