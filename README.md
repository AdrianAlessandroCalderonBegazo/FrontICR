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
- `src/components/` — Navbar, Footer, Layout, Carousel, FAQAccordion, ProjectCard, ProjectImage, HeroBackground, VideoWithFallback, PeruMap, WhatsAppButton, iconos de sector e ilustraciones de respaldo.
- `src/data/content.js` — todo el contenido textual del sitio (propósito, misión/visión, valores, proyectos, FAQ, datos de contacto). Editar aquí primero ante cualquier cambio de copy.
- `public/fonts/` — tipografías Gotham (Black, Bold, Medium) declaradas vía `@font-face` en `src/index.css`.

## Pendientes de contenido real

El sitio está completo a nivel de estructura y funciona con contenido e ilustraciones de respaldo mientras se recibe el material final:

- **Imágenes de proyectos y sectores**: ✅ listas. Fotos reales en `public/images/projects/<id>-1.jpg`, `-2.jpg`, etc. (referenciadas desde `images` en cada proyecto en `content.js`) y `public/images/sectors/agricultura.jpg` para el bloque genérico de Agricultura. `ProjectImage` las muestra automáticamente y cae a la ilustración del sector si a un proyecto le falta una foto (ver `mina-quellaveco`, que solo tiene 2 de las 3 del layout de galería). Para agregar/reemplazar fotos: sumar el archivo a esa carpeta y añadir su ruta al array `images` del proyecto en `src/data/content.js`.
- **Backgrounds de Home y Nosotros**: pendientes. Copiar el archivo a `public/images/backgroundMain.(jpg|jpeg|png|webp)` (hero de Home) y `public/images/backgroundNosotros.(jpg|jpeg|png|webp)` (hero de Nosotros) — `HeroBackground` prueba esas extensiones en ese orden y usa la primera que exista; mientras tanto se ve la ilustración de respaldo.
- **Video institucional**: ✅ listo, en `public/videos/nosotros-video.mp4`, en la página Nosotros entre "Nuestros valores" y "Nuestros hitos" (`VideoWithFallback`).
- **Logo real**: ✅ listo. `public/favicon.svg` ya es el isotipo real (pestaña del navegador y navbar lo usan directamente).
- **Íconos de sector**: ✅ listos. Los 5 SVG reales ya están en `public/icons/sectors/` con el nombre esperado y `SectorIcon` los detecta y usa automáticamente (técnica de máscara, se recolorean solos).
- **Mapa del Perú**: hay un archivo real en `public/icons/maps/Perú.svg`, pero `PeruMap.jsx` todavía **no** lo usa — su proporción (630×912) y la posición de los pines de proyecto no están calibradas contra ese archivo, así que por ahora se sigue mostrando la silueta de respaldo (ya basada en la frontera real del Perú vía GeoJSON, con los pines en sus coordenadas geográficas reales). Para activar el archivo real: ajustar el `aspect-ratio` del contenedor y las coordenadas de `PINS` en `src/components/PeruMap.jsx` a la geometría de ese SVG, y apuntar `PERU_SVG_SRC` a `/icons/maps/Perú.svg`.
- **Tipografía Gotham-Book**: ✅ lista, con `.woff2` y `.woff` en `public/fonts/`.
- **Datos de contacto** (`src/data/content.js` → `contact`): teléfono/WhatsApp, correo, dirección y redes sociales son provisionales.
- **Página Soluciones**: queda en espera de contenido definitivo, tal como se solicitó.
- **Formulario de contacto**: al enviarse, arma un mensaje con los datos y abre WhatsApp (no hay backend todavía). Las opciones del selector "¿Qué solución te interesa?" son genéricas (Solución 1–4) hasta tener el listado real.
