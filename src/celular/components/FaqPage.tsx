import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MessageSquare, ChevronDown } from "lucide-react";

interface FaqPageProps {
  lang: "es" | "en";
  onGoBack: () => void;
  onContactClick: () => void;
}

export default function FaqPage({
  lang,
  onGoBack,
  onContactClick,
}: FaqPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q_es: "¿Qué servicios ofrecen para las marcas en Amazon?",
      q_en: "What services do you offer to Amazon brands?",
      a_es: "Ofrecemos soluciones integrales de crecimiento para vendedores en Amazon, que incluyen gestión experta de PPC, optimización SEO de listados, fotografía y branding profesional de productos, y consultoría de salud de inventario y cuentas.",
      a_en: "We offer comprehensive growth solutions for Amazon sellers, including expert PPC management, listings SEO optimization, professional product photography & branding, and inventory/account health consulting.",
    },
    {
      q_es: "¿Cuánto cuesta la Auditoría Gratuita y qué incluye?",
      q_en: "How much does a Free Audit cost and what does it include?",
      a_es: "¡Nuestra auditoría de diagnóstico de PPC y marca es totalmente gratuita! Nuestros expertos analizarán sus ASINs objetivo, descubrirán oportunidades de palabras clave ocultas, detectarán gastos desperdiciados en PPC y le presentarán una estrategia de escala estructurada.",
      a_en: "Our PPC & Brand Diagnostic Audit is absolutely free! Our experts will look into your target ASINs, discover hidden keyword opportunities, locate wasted PPC spend, and present a structured scale strategy.",
    },
    {
      q_es: "¿Dónde operan físicamente?",
      q_en: "Where do you operate physically?",
      a_es: "Operamos nuestra agencia de crecimiento físico y operaciones de socios en Av Libertador, Buenos Aires, Argentina, apoyando a marcas de Amazon y comercio electrónico en todo el mundo.",
      a_en: "We operate our physical growth agency and partner operations out of Av Libertador, Buenos Aires, Argentina, supporting Amazon and e-commerce brands worldwide.",
    },
    {
      q_es: "¿Cómo puedo agendar una llamada estratégica?",
      q_en: "How can I book a live strategy meeting?",
      a_es: "Simplemente haga clic en los botones de 'Contacto' o en el ícono de WhatsApp para comunicarse directamente con nosotros y agendar a su conveniencia.",
      a_en: "Simply click the 'Contact' buttons or the WhatsApp icon to communicate directly with us and schedule at your convenience.",
    },
  ];

  const paymentFaqItems = [
    {
      q_es: "¿Qué métodos de pago aceptan?",
      q_en: "What payment methods do you accept?",
      a_es: "Aceptamos transferencias bancarias, PayPal y pagos con tarjeta de crédito. También ofrecemos opciones de pago en cuotas según el plan seleccionado.",
      a_en: "We accept bank transfers, PayPal, and credit card payments. We also offer installment payment options depending on the selected plan.",
    },
    {
      q_es: "¿Se requiere un contrato a largo plazo?",
      q_en: "Is a long-term contract required?",
      a_es: "No, nuestros planes son flexibles. Puedes elegir entre servicios mensuales sin compromiso o de largo plazo con descuentos exclusivos.",
      a_en: "No, our plans are flexible. You can choose from month-to-month services with no commitments, or long-term ones with exclusive discounts.",
    },
    {
      q_es: "¿Cómo se calcula el costo del servicio?",
      q_en: "How is the service cost calculated?",
      a_es: "El precio depende del nivel de gestión y optimización requerido. Ofrecemos planes de tarifa fija, así como opciones basadas en porcentajes vinculados a tu inversión publicitaria.",
      a_en: "Pricing depends on the level of management and optimization required. We offer flat-fee plans as well as percentage-based options tied to your ad spend.",
    },
    {
      q_es: "¿Garantizan resultados específicos?",
      q_en: "Do you guarantee specific results?",
      a_es: "No garantizamos una cantidad específica de ventas, ya que los resultados dependen de múltiples factores. Sin embargo, nuestro equipo utiliza estrategias probadas para maximizar el rendimiento publicitario y la rentabilidad de las marcas.",
      a_en: "We cannot guarantee a specific sales volume, as results depend on multiple factors. However, our team utilizes proven strategies to maximize ad performance and brand profitability.",
    },
  ];

  return (
    <div className="w-full relative bg-[#102135] min-h-screen text-white pt-10 sm:pt-14 pb-20 overflow-hidden flex flex-col items-center">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f90]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full px-6 relative z-10 flex-grow">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mt-6 mb-12">
          {/* Back button */}
          <button
            onClick={onGoBack}
            className="group flex flex-col items-center justify-center bg-white/5 hover:bg-white/15 w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 md:absolute md:left-6 md:top-2 hover:scale-105 active:scale-95 mb-8 md:mb-0 border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] sm:text-xs font-black uppercase text-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {lang === "es" ? "Regresar" : "Back"}
            </span>
          </button>

          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="text-[#f90] text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> FAQ
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter">
            {lang === "es"
              ? "Preguntas Frecuentes"
              : "Frequently Asked Questions"}
          </h1>

          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base md:text-lg font-medium">
            {lang === "es"
              ? "Encuentra respuestas rápidas sobre nuestros servicios estructurados de crecimiento."
              : "Quick help regarding our services, audits, and our structured growth framework."}
          </p>
        </div>

        {/* FAQs List */}
        <div className="w-full space-y-4">
          {faqItems.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            const question = lang === "es" ? item.q_es : item.q_en;
            const answer = lang === "es" ? item.a_es : item.a_en;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "bg-white/10 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-[#f90]/5"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-base sm:text-lg md:text-xl font-bold pr-8 text-white group-hover:text-[#f90] transition-colors duration-200">
                    {question}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${isExpanded ? "bg-[#f90] text-white" : "bg-white/10 text-white group-hover:bg-white/20"}`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 md:p-6 pt-0 text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Payment FAQs Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: faqItems.length * 0.1 }}
          className="mt-12 mb-6 text-center"
        >
          <h3 className="text-xl md:text-2xl font-black text-[#f90] uppercase tracking-widest">
            {lang === "es" ? "PREGUNTAS SOBRE PAGOS" : "PAYMENT QUESTIONS"}
          </h3>
          <div className="w-16 h-1 bg-[#f90] mx-auto mt-3 rounded-full opacity-50" />
        </motion.div>

        {/* Payment FAQs List */}
        <div className="w-full space-y-4">
          {paymentFaqItems.map((item, idx) => {
            const globalIdx = faqItems.length + idx;
            const isExpanded = expandedFaq === globalIdx;
            const question = lang === "es" ? item.q_es : item.q_en;
            const answer = lang === "es" ? item.a_es : item.a_en;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: (faqItems.length + idx) * 0.1,
                }}
                key={`payment-${idx}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "bg-white/10 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-[#f90]/5"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : globalIdx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-base sm:text-lg md:text-xl font-bold pr-8 text-white group-hover:text-[#f90] transition-colors duration-200">
                    {question}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${isExpanded ? "bg-[#f90] text-white" : "bg-white/10 text-white group-hover:bg-white/20"}`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 md:p-6 pt-0 text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action if more questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: faqItems.length * 0.1 }}
          className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-[#f90]/20 border border-white/10 text-center flex flex-col items-center"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            {lang === "es" ? "¿Todavía tienes dudas?" : "Still have questions?"}
          </h3>
          <p className="text-white/70 text-sm mb-6 max-w-sm">
            {lang === "es"
              ? "Nuestro equipo de expertos está listo para ayudarte con tus consultas."
              : "Our team of experts is ready to help with any inquiries you might have."}
          </p>
          <button
            onClick={onContactClick}
            className="px-8 py-3 bg-[#f90] hover:bg-[#ffb400] text-[#102135] font-black tracking-widest uppercase rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_5px_15px_rgba(255,153,0,0.3)]"
          >
            {lang === "es" ? "Contactar Ahora" : "Contact Us"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
