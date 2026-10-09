import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Clock, Mail, Phone, CheckCircle2, Send, Shield, Sparkles, Building, Briefcase, ChevronDown, Copy, Check } from "lucide-react";
import GlobeMap from "./GlobeMap";
import ContactDetails from "./ContactDetails";


interface ContactPageProps {
  lang: 'es' | 'en';
  onGoBack: () => void;
}

export default function ContactPage({ lang, onGoBack }: ContactPageProps) {
  // Booking Meeting State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<'meeting' | 'visit'>('meeting');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Hardcoded upcoming business days for selection
  const getNextDays = () => {
    const days = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const locale = lang === 'es' ? 'es-ES' : 'en-US';
    
    let count = 0;
    let tempDate = new Date();
    
    // Add next 5 business days (skipping Sunday)
    while (count < 5) {
      tempDate.setDate(tempDate.getDate() + 1);
      if (tempDate.getDay() !== 0) { // skip Sundays
        days.push({
          raw: tempDate.toISOString().split('T')[0],
          formatted: tempDate.toLocaleDateString(locale, options)
        });
        count++;
      }
    }
    return days;
  };

  const nextDays = getNextDays();
  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !bookingName || !bookingEmail) return;

    setIsSubmittingBooking(true);
    setTimeout(() => {
      setIsSubmittingBooking(false);
      setBookingSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fafafa] text-[#102135] min-h-screen pb-24 overflow-x-hidden relative">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f90] rounded-full blur-[150px] -z-10 opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#2563eb] rounded-full blur-[180px] -z-10 opacity-[0.03] pointer-events-none" />

      {/* Main Header / Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#102135]/60 hover:text-[#f90] hover:border-[#f90] transition-all duration-200 focus:outline-none bg-white p-3 rounded-xl border border-[#102135]/15 shadow-sm group cursor-pointer"
          title={lang === 'es' ? "Volver al Inicio" : "Back to Home"}
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform text-[#102135]" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
        {/* Main Split Hero: Title on the Left, Simplified Card on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Get in Touch with Us Today Title Section */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-[#102135] tracking-tight leading-tight"
            >
              {lang === 'es' ? "Ponte en Contacto con Nosotros Hoy" : "Get in Touch With Us Today"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="text-base sm:text-lg text-[#102135]/75 font-semibold leading-relaxed max-w-lg"
            >
              {lang === 'es' 
                ? "Diseñemos tu estrategia de crecimiento publicitario en Amazon y otros marketplaces. Un equipo de especialistas te contactará para optimizar tus campañas."
                : "Let's build your growth advertising strategy on Amazon and other marketplaces. A team of specialists will connect with you to optimize your campaigns."
              }
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="h-1.5 w-24 bg-[#f90] rounded-full origin-left"
            />
          </div>

          {/* Right Column: We'd Love to Help Card component */}
          <div className="lg:col-span-7 w-full">
            <motion.div 
              id="we-would-love-to-help-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-[#102135] border border-white/10 shadow-[0_30px_70px_-15px_rgba(16,33,53,0.3)] rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden text-white"
            >
              {/* Accent Glow Effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#f90]/5 rounded-bl-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563eb]/10 rounded-tr-[100px] pointer-events-none" />

              {/* Grid Layout inside the Card: side-by-side on md and larger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                
                {/* Info & Booking CTAs Column */}
                <div className="flex flex-col justify-center space-y-6">
                  
                  {/* Brand Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-center shadow-md shrink-0">
                      <img 
                        src="https://dingoppc.com/wp-content/uploads/2025/02/Isotipo-dingo.avif" 
                        alt="Dingo Isotipo Logo" 
                        className="w-full h-full object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(255,153,0,0.35)]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://res.cloudinary.com/dzrqhomvz/image/upload/v1779216800/bfrhro8muvrtntysh0o5.png";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white tracking-wider leading-none">DINGO</h3>
                      <span className="text-[8px] font-mono font-bold uppercase text-[#f90] tracking-widest mt-0.5 block">Amazon Growth Partner</span>
                    </div>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                      {lang === 'es' ? "Nos Encantaría Ayudarte" : "We'd Love to Help"}
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed">
                      {lang === 'es' 
                        ? "Te brindamos un trato cercano y estratégico. Diseñemos tu camino al éxito sin rodeos."
                        : "We offer approachability and expert planning. Let us craft your path to success."
                      }
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 pt-1">
                    <button
                      onClick={() => {
                        setBookingType('meeting');
                        setShowBookingModal(true);
                      }}
                      className="w-full bg-[#f90] hover:bg-[#ffb400] text-[#102135] px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#f90]/15 transition-all cursor-pointer focus:outline-none hover:scale-[1.02] active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      {lang === 'es' ? "Agendar Reunión" : "Book a Meeting"}
                    </button>

                    <button
                      onClick={() => {
                        setBookingType('visit');
                        setShowBookingModal(true);
                      }}
                      className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/10 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none hover:scale-[1.02] active:scale-95"
                    >
                      <MapPin className="w-4 h-4 text-[#f90]" />
                      {lang === 'es' ? "Agendar Visita" : "Book a Visit"}
                    </button>
                  </div>

                </div>

                {/* Premium Image Column */}
                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Dingo strategic human growth"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102135]/95 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#102135]/15" />

                  {/* Small text block and screen down button */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 text-right relative z-10 select-none">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#f90]">
                        {lang === 'es' ? "SOPORTE HUMANO" : "HUMAN FIRST"}
                      </p>
                      <p className="text-[10px] font-extrabold text-white leading-tight">
                        {lang === 'es' ? "Desliza para ver más ↓" : "Scroll down ↓"}
                      </p>
                    </div>
                    
                    <motion.div
                      onClick={() => {
                        document.getElementById('contact-section-down-target')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full bg-[#f90] text-[#102135] shadow-md flex items-center justify-center cursor-pointer hover:bg-white transition-colors focus:outline-none"
                      title={lang === 'es' ? "Desplazar hacia abajo" : "Scroll down"}
                    >
                      <ChevronDown className="w-4 h-4 shrink-0 stroke-[3px]" />
                    </motion.div>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>

        {/* Component 3: Location Details & Interactive Map Grid Row */}
        <div className="mt-16 sm:mt-24" id="contact-section-down-target">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-black font-display text-[#102135] mb-8 flex items-center gap-3"
          >
            <span className="w-2 bg-[#f90] h-6 rounded-full inline-block" />
            {lang === 'es' ? "Visítanos o Contáctanos" : "Our Office & Headquarters"}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Minimalist Aesthetic Map Container - NO wrapping border box */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <GlobeMap lang={lang} />
            </motion.div>

            {/* Premium Aesthetic Contact Info Column */}
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

      {/* Book a Meeting Interactive Scheduler Modal Overlay */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#102135]/85 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
            onClick={() => {
              if (!isSubmittingBooking) {
                setShowBookingModal(false);
                setBookingSubmitted(false);
              }
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-white/20 select-none overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top header */}
              <div className="bg-[#102135] text-white p-6 px-8 relative">
                <h3 className="text-xl sm:text-2xl font-black font-display">
                  {bookingType === 'visit' 
                    ? (lang === 'es' ? "Agenda tu Visita Corporativa" : "Schedule Your Office Visit")
                    : (lang === 'es' ? "Agenda tu Sesión 1-on-1" : "Book Your 1-on-1 Strategy Call")
                  }
                </h3>
                <p className="text-xs text-white/60 font-semibold mt-1">
                  {bookingType === 'visit'
                    ? (lang === 'es' ? "Ven a conocernos en persona en nuestras oficinas de Av Libertador 2402." : "Come meet us in person at our workspace at Av Libertador 2402.")
                    : (lang === 'es' ? "Elige un día y hora conveniente con nuestro estratega principal." : "Select a convenient date & spot for a personal assessment.")
                  }
                </p>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSubmitted(false);
                  }}
                  className="absolute top-6 right-6 text-white/60 hover:text-white font-bold text-lg focus:outline-none bg-white/10 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!bookingSubmitted ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      
                      {/* Step 1: Select Day */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-black text-[#102135]/70 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#f90]" />
                          {lang === 'es' ? "1. Selecciona una Fecha" : "1. Choose a Date"}
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {nextDays.map((day) => {
                            const isSelected = selectedDate === day.raw;
                            const splitted = day.formatted.split(', ');
                            const weekday = splitted[0];
                            const numMonth = splitted[1] || day.formatted;
                            
                            return (
                              <button
                                key={day.raw}
                                type="button"
                                onClick={() => setSelectedDate(day.raw)}
                                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all focus:outline-none hover:scale-[1.03] cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#102135] text-white border-[#102135] shadow-md shadow-[#102135]/15 font-black' 
                                    : 'bg-slate-50 border-[#102135]/10 hover:border-[#102135]/30'
                                }`}
                              >
                                <span className={`text-[9px] uppercase tracking-wider font-extrabold ${isSelected ? 'text-[#f90]' : 'text-[#102135]/40'}`}>
                                  {weekday}
                                </span>
                                <span className="text-[11px] sm:text-xs font-black text-center whitespace-nowrap">
                                  {numMonth}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: Select Time Slot */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-black text-[#102135]/70 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#f90]" />
                          {lang === 'es' ? "2. Selecciona un Horario" : "2. Choose a Time Slot"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeSlots.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                disabled={!selectedDate}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg border text-center text-xs font-bold transition-all focus:outline-none hover:scale-[1.02] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                  isSelected
                                    ? 'bg-[#f90] border-[#f90] text-[#102135] font-black shadow-md shadow-[#f90]/20'
                                    : 'bg-slate-50 border-[#102135]/10 hover:border-[#102135]/30'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                        {!selectedDate && (
                          <span className="text-[10px] text-amber-600 font-semibold italic">
                            * {lang === 'es' ? "Por favor, elige una fecha primero" : "Please select a date above first"}
                          </span>
                        )}
                      </div>

                      {/* Step 3: Contact details */}
                      <div className="space-y-4 pt-2 border-t border-[#102135]/10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-[#102135]/65 uppercase tracking-wider block">
                              {lang === 'es' ? "Tu Nombre" : "Your Name"}
                            </label>
                            <input 
                              type="text"
                              required
                              placeholder="e.g. Jeff"
                              disabled={!selectedTime}
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="w-full bg-slate-50 border border-[#102135]/10 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f90] focus:border-[#f90] text-[#102135] disabled:opacity-50"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-extrabold text-[#102135]/65 uppercase tracking-wider block">
                              {lang === 'es' ? "Correo Electrónico" : "Email Address"}
                            </label>
                            <input 
                              type="email"
                              required
                              placeholder="jeff@amazon.com"
                              disabled={!selectedTime}
                              value={bookingEmail}
                              onChange={(e) => setBookingEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-[#102135]/10 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f90] focus:border-[#f90] text-[#102135] disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        disabled={isSubmittingBooking || !selectedDate || !selectedTime || !bookingName || !bookingEmail}
                        className="w-full bg-[#102135] hover:bg-[#102135]/95 text-white py-3 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmittingBooking ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>{lang === 'es' ? "Procesando..." : "Scheduling..."}</span>
                          </>
                        ) : (
                          <>
                            {bookingType === 'visit' ? <MapPin className="w-4 h-4 text-[#f90]" /> : <Calendar className="w-4 h-4 text-[#f90]" />}
                            <span>
                              {bookingType === 'visit' 
                                ? (lang === 'es' ? "Confirmar Visita Presencial" : "Confirm Physical Visit")
                                : (lang === 'es' ? "Confirmar Cita de Exploración" : "Confirm Discovery Call")
                              }
                            </span>
                          </>
                        )}
                      </button>

                    </form>
                  ) : (
                    <motion.div 
                      key="booking-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#102135]">
                        {bookingType === 'visit' 
                          ? (lang === 'es' ? "¡Visita Agendada con Éxito!" : "Office Visit Scheduled!")
                          : (lang === 'es' ? "¡Cita Confirmada con Éxito!" : "Appointment Scheduled!")
                        }
                      </h3>
                      <p className="text-sm text-[#102135]/70 max-w-sm mx-auto leading-relaxed">
                        {lang === 'es' 
                          ? (bookingType === 'visit'
                            ? `¡Excelente, ${bookingName}! Hemos reservado tu visita presencial para el día ${selectedDate} a las ${selectedTime}. Te esperamos en Av Libertador 2402, Palermo.`
                            : `¡Perfecto, ${bookingName}! Hemos reservado tu llamada estratégica de 15 minutos para el día ${selectedDate} a las ${selectedTime}. Se ha enviado una invitación a ${bookingEmail}.`
                          )
                          : (bookingType === 'visit'
                            ? `Fantastic, ${bookingName}! We've reserved your in-person office visit on ${selectedDate} at ${selectedTime}. Looking forward to hosting you at Av Libertador 2402, Palermo.`
                            : `Awesome, ${bookingName}! We've reserved your 15-minute diagnostic call on ${selectedDate} at ${selectedTime}. A calendar invitation has been fired to ${bookingEmail}.`
                          )
                        }
                      </p>
                      <button
                        onClick={() => {
                          setShowBookingModal(false);
                          setSelectedDate(null);
                          setSelectedTime(null);
                          setBookingName("");
                          setBookingEmail("");
                          setBookingSubmitted(false);
                        }}
                        className="bg-[#102135] text-white hover:bg-[#102135]/90 px-6 py-2.5 rounded-lg text-xs font-bold transition-all focus:outline-none"
                      >
                        {lang === 'es' ? "Terminar" : "Done"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
