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
- **Logo real**: ✅ listo. `public/favicon.svg` ya es el isotipo real (pestaña del navegador y navbar lo usan directamente).
- **Íconos de sector**: ✅ listos. Los 5 SVG reales ya están en `public/icons/sectors/` con el nombre esperado y `SectorIcon` los detecta y usa automáticamente (técnica de máscara, se recolorean solos).
- **Mapa del Perú**: hay un archivo real en `public/icons/maps/Perú.svg`, pero `PeruMap.jsx` todavía **no** lo usa — su proporción (630×912) y la posición de los pines de proyecto no están calibradas contra ese archivo, así que por ahora se sigue mostrando la silueta de respaldo (ya basada en la frontera real del Perú vía GeoJSON, con los pines en sus coordenadas geográficas reales). Para activar el archivo real: ajustar el `aspect-ratio` del contenedor y las coordenadas de `PINS` en `src/components/PeruMap.jsx` a la geometría de ese SVG, y apuntar `PERU_SVG_SRC` a `/icons/maps/Perú.svg`.
- **Tipografía Gotham-Book**: ✅ lista, con `.woff2` y `.woff` en `public/fonts/`.
- **Datos de contacto** (`src/data/content.js` → `contact`): teléfono/WhatsApp, correo, dirección y redes sociales son provisionales.
- **Página Soluciones**: queda en espera de contenido definitivo, tal como se solicitó.
- **Formulario de contacto**: al enviarse, arma un mensaje con los datos y abre WhatsApp (no hay backend todavía). Las opciones del selector "¿Qué solución te interesa?" son genéricas (Solución 1–4) hasta tener el listado real.
