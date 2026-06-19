import { useState, useEffect } from 'react';

const MOBILE_URL = 'https://dingo-mobile-last.vercel.app/';
const DESKTOP_URL = 'https://dingo-desktop.vercel.app/';
// Definimos el punto de quiebre para considerar una pantalla como "Móvil" o "Escritorio"
const MOBILE_BREAKPOINT = 768;

export default function App() {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const checkScreenSize = () => {
      const currentlyMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(currentlyMobile);
    };

    // Verificar cada 5 minutos (5 * 60 * 1000 milisegundos)
    const intervalId = setInterval(checkScreenSize, 5 * 60 * 1000);

    // Adicionalmente, verificamos cuando se redimensiona la ventana para mejor experiencia
    window.addEventListener('resize', checkScreenSize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const currentUrl = isMobile ? MOBILE_URL : DESKTOP_URL;

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <iframe
        src={currentUrl}
        className="w-full h-full border-none"
        title="Dingo Application"
        allow="camera; microphone; geolocation; fullscreen"
      />
    </div>
  );
}
