import { lazy, Suspense, useEffect, useState } from "react";

/**
 * Dingo unificado: una sola app con las dos versiones del sitio adentro.
 *
 * Antes eran tres proyectos: la versión de escritorio, la de celular y un
 * enrutador que cargaba una u otra en un iframe según el ancho de pantalla.
 * Acá el corte es el mismo (768px) pero se hace en el código, sin iframes:
 * por debajo se muestra src/celular y por encima src/escritorio.
 *
 * Cada versión se carga recién cuando hace falta, así en celular no se baja
 * el código de escritorio y al revés.
 */
const Escritorio = lazy(() => import("./escritorio/App"));
const Celular = lazy(() => import("./celular/App"));

const CORTE_CELULAR = "(max-width: 767px)";

function useEsCelular() {
  const [esCelular, setEsCelular] = useState(() => window.matchMedia(CORTE_CELULAR).matches);
  useEffect(() => {
    const mq = window.matchMedia(CORTE_CELULAR);
    const aplicar = () => setEsCelular(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);
  return esCelular;
}

export default function App() {
  const esCelular = useEsCelular();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaeded]" />}>
      {/* La clase de cada versión le da sus tipografías y sus animaciones
          propias (ver index.css). */}
      {esCelular ? (
        <div className="dingo-celular">
          <Celular />
        </div>
      ) : (
        <div className="dingo-escritorio">
          <Escritorio />
        </div>
      )}
    </Suspense>
  );
}
