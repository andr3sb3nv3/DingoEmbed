import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQPage({ lang, onGoBack, onContactClick }: { lang: 'es' | 'en', onGoBack: () => void, onContactClick: () => void }) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const sections = [
    {
      title_es: "Preguntas Más Populares",
      title_en: "Most Popular Questions",
      items: [
        {
          q_es: "¿Qué servicios ofrecen para vender en Amazon?",
          q_en: "What services do you offer for selling on Amazon?",
          a_es: "Ofrecemos gestión de campañas publicitarias, optimización de listados, investigación de palabras clave, análisis de la competencia y estrategias de crecimiento para maximizar las ventas y la rentabilidad en Amazon.",
          a_en: "We provide ad campaign management, listing optimization, keyword research, competitor analysis, and growth strategies to maximize sales and profitability on Amazon."
        },
        {
          q_es: "¿Cómo pueden ayudarme a mejorar mis ventas en Amazon?",
          q_en: "How can you help me improve my sales on Amazon?",
          a_es: "Analizamos tu cuenta, optimizamos tus anuncios y listados, e implementamos estrategias avanzadas de ofertas para aumentar la visibilidad del producto, de forma que reduzcas costos innecesarios y mejores tu retorno de inversión publicitaria (ROAS).",
          a_en: "We analyze your account, optimize your ads and listings, and implement advanced bidding strategies to increase product visibility, reduce unnecessary costs, and improve your return on ad spend (ROAS)."
        },
        {
          q_es: "¿Trabajan con todo tipo de vendedores de Amazon?",
          q_en: "Do you work with all types of Amazon sellers?",
          a_es: "Sí, trabajamos tanto con marcas emergentes como con empresas consolidadas, adaptando nuestras estrategias a sus necesidades específicas y nivel de experiencia en la plataforma.",
          a_en: "Yes, we work with both emerging brands and established businesses, tailoring our strategies to their specific needs and experience level on the platform."
        },
        {
          q_es: "¿Cuánto tiempo se tarda en ver un impacto en las ventas?",
          q_en: "How long does it take to see an impact on sales?",
          a_es: "Los resultados varían según la cuenta y el mercado, pero la mayoría de los clientes notan mejoras en el tráfico y las conversiones dentro de las primeras semanas de optimización y gestión de campañas.",
          a_en: "Results vary depending on the account and market, but most clients notice improvements in traffic and conversions within the first few weeks of optimization and campaign management."
        }
      ]
    },
    {
      title_es: "Preguntas Sobre Pagos",
      title_en: "Questions About Payment",
      items: [
        {
          q_es: "¿Qué métodos de pago aceptan?",
          q_en: "What payment methods do you accept?",
          a_es: "Aceptamos transferencias bancarias, PayPal y pagos con tarjeta de crédito. También ofrecemos opciones de pago en cuotas según el plan seleccionado.",
          a_en: "We accept bank transfers, PayPal, and credit card payments. We also offer installment options depending on the selected plan."
        },
        {
          q_es: "¿Se requiere un contrato a largo plazo?",
          q_en: "Is a long-term contract required?",
          a_es: "No, nuestros planes son flexibles. Puedes elegir entre servicios mensuales sin compromiso o de largo plazo con descuentos exclusivos.",
          a_en: "No, our plans are flexible. You can choose between month-to-month services with no commitment or long-term plans with exclusive discounts."
        },
        {
          q_es: "¿Cómo se calcula el costo del servicio?",
          q_en: "How is the service cost calculated?",
          a_es: "El precio depende del nivel de gestión y optimización requerido. Ofrecemos planes de tarifa fija, así como opciones basadas en porcentajes vinculados a tu inversión publicitaria.",
          a_en: "Pricing depends on the level of management and optimization required. We offer fixed-rate plans as well as percentage-based options tied to your ad spend."
        },
        {
          q_es: "¿Garantizan resultados específicos?",
          q_en: "Do you guarantee specific results?",
          a_es: "No garantizamos una cantidad específica de ventas, ya que los resultados dependen de múltiples factores. Sin embargo, nuestro equipo utiliza estrategias probadas para maximizar el rendimiento publicitario y la rentabilidad de las marcas.",
          a_en: "We don’t guarantee a specific number of sales, as results depend on multiple factors. However, our team uses proven strategies to maximize your advertising performance and profitability."
        }
      ]
    }
  ];

  return (
    <div className="flex-1 w-full bg-[#f8fafc] text-[#102135]">
      {/* Dynamic Animated Header */}
      <div className="bg-[#102135] py-16 px-6 sm:px-12 md:px-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#007185] rounded-[100%] blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF9900] rounded-[100%] blur-[100px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start gap-4">
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100 hover:text-[#f90] transition-colors uppercase tracking-wider mb-2 cursor-pointer focus:outline-none"
          >
            ← {lang === 'es' ? "VOLVER" : "GO BACK"}
          </button>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tighter capitalize leading-none drop-shadow-md">
            {lang === 'es' ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h1>
          <p className="text-sm md:text-base font-medium opacity-80 max-w-2xl mt-4 leading-relaxed">
            {lang === 'es' 
              ? "Encuentra respuestas rápidas sobre nuestros servicios."
              : "Quick help regarding our services and agency expertise."}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 lg:py-24 space-y-12">
        {sections.map((section, secIdx) => {
          const sectionTitle = lang === 'es' ? section.title_es : section.title_en;
          return (
            <div key={secIdx} className="space-y-6">
              <h2 className="text-xl md:text-2xl font-black font-display text-[#f90] uppercase tracking-widest border-b border-[#102135]/10 pb-4">
                {sectionTitle}
              </h2>
              <div className="grid gap-4">
                {section.items.map((item, itemIdx) => {
                  const uniqueKey = `${secIdx}-${itemIdx}`;
                  const isExpanded = expandedFaq === uniqueKey;
                  const question = lang === 'es' ? item.q_es : item.q_en;
                  const answer = lang === 'es' ? item.a_es : item.a_en;

                  return (
                    <div 
                      key={itemIdx} 
                      className="border border-[#102135]/10 rounded-2xl overflow-hidden transition-all duration-250 bg-white shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : uniqueKey)}
                        className="w-full flex items-center justify-between p-5 md:p-6 bg-white hover:bg-slate-50 text-left text-base md:text-lg font-black text-[#102135] focus:outline-none cursor-pointer gap-4 transition-colors"
                      >
                        <span>{question}</span>
                        <span className={`text-[#f90] transition-transform duration-250 font-extrabold shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="p-5 md:p-6 pt-0 text-sm md:text-base text-[#102135]/80 leading-relaxed font-semibold">
                              {answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="bg-[#102135] text-white p-8 md:p-12 rounded-[2.5rem] mt-16 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-full h-full bg-[#f90] blur-[150px] opacity-10 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black font-display mb-2">
              {lang === 'es' ? "¿Tienes más preguntas?" : "Need more answers?"}
            </h3>
            <p className="text-sm font-semibold opacity-70 text-slate-300">
              {lang === 'es' ? "Nuestro equipo está listo para ayudarte" : "Our team is ready to help"}
            </p>
          </div>
          <button 
            onClick={() => {
              window.scrollTo(0, 0);
              onContactClick();
            }}
            className="relative z-10 bg-[#FF9900] text-white px-8 py-3 rounded-full font-black uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-[#FF9900]/40 whitespace-nowrap cursor-pointer"
          >
            {lang === 'es' ? "ESCRÍBENOS" : "CONTACT US"}
          </button>
        </div>
      </div>
    </div>
  );
}
