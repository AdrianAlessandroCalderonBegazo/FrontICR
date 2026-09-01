# Inversiones ICR — Sitio corporativo

Frontend del sitio corporativo de Inversiones ICR: React + Vite + Tailwind CSS + React Router.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # previsualizar el build
```

## Estructura

- `src/pages/` — una página por ruta (`Home`, `Nosotros`, `Sectores`, `Soluciones`, `Experiencia`, `ProyectoDetalle`, `Contacto`).
- `src/components/` — Navbar, Footer, Layout, Carousel, FAQAccordion, ProjectCard, PeruMap, WhatsAppButton, iconos de sector e ilustraciones de respaldo.
- `src/data/content.js` — todo el contenido textual del sitio (propósito, misión/visión, valores, proyectos, FAQ, datos de contacto). Editar aquí primero ante cualquier cambio de copy.
- `public/fonts/` — tipografías Gotham (Black, Bold, Medium) declaradas vía `@font-face` en `src/index.css`.

## Pendientes de contenido real

El sitio está completo a nivel de estructura y funciona con contenido e ilustraciones de respaldo mientras se recibe el material final:

- **Imágenes de proyectos y sectores**: hoy se usan ilustraciones generadas (`SceneIllustration`) por sector. Reemplazar por fotos reales en cada página/componente que las usa (`Home`, `Sectores`, `Experiencia`, `ProyectoDetalle`, `ProjectCard`).
- **Video institucional** en `Nosotros`: colocar el archivo en `public/videos/nosotros-hero.mp4` (y opcionalmente un poster) — el componente ya está listo para mostrarlo automáticamente en cuanto exista.
- **Logo real**: hoy se usa un isotipo generado en `Navbar.jsx` y `favicon.svg`.
- **Íconos de sector y mapa del Perú**: se usan versiones propias mientras se reciben `mining-svgrepo-com.svg`, `factory-industry-construction-svgrepo-com.svg`, `farmer-human-svgrepo-com.svg`, `wool-svgrepo-com.svg`, `energy-panel-solar-sun-svgrepo-com.svg` y `Perú.svg`.
- **Tipografía Gotham-Book**: no se recibió el archivo; el body usa una fuente de respaldo del sistema. Al agregar `Gotham-Book.woff2`/`.woff` a `public/fonts/`, la regla `@font-face` en `src/index.css` la tomará automáticamente.
- **Datos de contacto** (`src/data/content.js` → `contact`): teléfono/WhatsApp, correo, dirección y redes sociales son provisionales.
- **Página Soluciones**: queda en espera de contenido definitivo, tal como se solicitó.
- **Formulario de contacto**: al enviarse, arma un mensaje con los datos y abre WhatsApp (no hay backend todavía). Las opciones del selector "¿Qué solución te interesa?" son genéricas (Solución 1–4) hasta tener el listado real.
