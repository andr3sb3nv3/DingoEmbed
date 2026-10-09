# Dingo

Sitio de Dingo, con la versión de escritorio y la de celular en un solo
proyecto. Se publica en dingo-final-unificado.vercel.app y la web de Atenea lo
muestra embebido en `/pruebas4`.

## De dónde sale

El sitio original estaba repartido en tres proyectos:

| Proyecto original | Qué era |
|---|---|
| `DingoFinalUnificado` (este repo, antes) | Un enrutador: cargaba una de las otras dos en un iframe según el ancho de pantalla |
| `dingoDesktopNew` | La versión de escritorio |
| `dingoMobile` | La versión de celular |

Acá están las dos versiones en **un solo proyecto**, y el corte se hace en el
código en lugar de con iframes: por debajo de 768px de ancho se muestra la de
celular y por encima la de escritorio. Así queda una sola dirección web para
embeber.

## Estructura

```
src/
  App.tsx         elige la versión según el ancho de pantalla
  index.css       estilos de las dos versiones (ver el comentario de arriba)
  escritorio/     código de dingoDesktopNew, sin cambios
  celular/        código de dingoMobile, sin cambios
```

El código de cada versión está copiado tal cual. Lo único que se tocó:

- **Estilos**: cada versión traía su hoja con su tipografía y animaciones con
  el mismo nombre pero distinta velocidad. Se juntaron en `src/index.css`, y lo
  que difiere va colgado de `.dingo-escritorio` o `.dingo-celular`.
- **Visor de código de la versión de celular**: las rutas a `package.json` e
  `index.css` se ajustaron a la nueva estructura.
- Se quitaron dependencias que ninguna de las dos versiones usaba
  (`@google/genai`, `express`, `dotenv`).

## Correrlo

```
npm install
npm run dev      # http://localhost:3000
npm run build    # deja el sitio en dist/
```

## Publicarlo en Vercel

En Vercel: **Add New → Project → importar este repo → Deploy**. Vercel detecta
Vite solo; no hace falta configurar nada ni cargar variables de entorno.
