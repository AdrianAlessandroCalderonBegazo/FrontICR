# Inversiones ICR — Sitio corporativo

Frontend del sitio corporativo de Inversiones ICR: Next.js (App Router) + Tailwind CSS.

> Esta es la rama `nextjs-migration`: mismo sitio, mismo diseño, reescrito sobre Next.js
> para desplegarse con Node + Docker. La versión Vite + React Router original sigue
> disponible en `claude/corporate-website-frontend-1sozw1`.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo (next dev)
npm run build    # build de producción (.next/)
npm run start    # levanta el build de producción (next start)
```

## Despliegue con Node + Docker

`next.config.js` tiene `output: 'standalone'`, así que `npm run build` genera además
`.next/standalone/server.js`, un servidor Node autocontenido con solo las dependencias
que realmente usa (ideal para una imagen Docker liviana). Ese modo **no** copia solo
por sí mismo los estáticos — en el Dockerfile hay que copiar también `public/` y
`.next/static/` dentro de `.next/standalone/` antes de correr `node server.js`
(es el patrón estándar documentado por Next.js para `output: standalone`). Aún no
se agregó el Dockerfile en sí — avisar si se quiere que lo arme.

## Formulario de contacto

El formulario de `/contacto` envía un correo real vía `POST /api/contact`
(`src/app/api/contact/route.js`), usando SMTP a través de `nodemailer`.

- **Validación**: nombre, correo, celular y ambos selects son obligatorios;
  el correo debe tener formato válido y el celular debe tener exactamente
  9 dígitos. La misma validación (`src/lib/contactValidation.js`) corre en
  el navegador (errores debajo de cada campo, sin llegar a enviar) y de
  nuevo en el servidor (nunca confía solo en el cliente).
- **Configuración**: copiar `.env.example` a `.env.local` y completar
  `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS`. Sin esas variables,
  el formulario sigue validando pero el envío responde un error controlado
  ("El envío de correo no está configurado todavía.") en vez de romperse.
- **Destinatario**: `CONTACT_EMAIL_TO` (por defecto `calderonbegazo@gmail.com`
  si no se define). Cambiar el correo de destino más adelante es solo
  cambiar esa variable de entorno — no requiere tocar código ni redeploy
  del código, solo de la config.
- **Pensado para responder la cotización**: el correo que llega tiene el
  `Reply-To` puesto al correo que la persona escribió en el formulario, así
  que responder ese correo desde la bandeja de `calderonbegazo@gmail.com`
  le llega directo al cliente, no de vuelta a la cuenta remitente. El
  asunto incluye nombre y solución de interés, y el cuerpo lista todos los
  campos etiquetados (nombre, correo, celular, cómo se enteró, solución).
- **Antispam básico**: un campo honeypot oculto (`website`) descarta envíos
  de bots sin enviar correo ni mostrar error.

## Estructura

- `src/app/` — rutas del App Router: `page.jsx` (Home), `nosotros/`, `sectores/`, `soluciones/`, `experiencia/` (+ `experiencia/[id]/` para el detalle de proyecto, con `generateStaticParams`), `contacto/`, además de `layout.jsx` (navbar + footer + metadata del sitio) y `globals.css`.
- `src/components/` — Navbar, Footer, Carousel, FAQAccordion, ProjectCard, ProjectImage, HeroBackground, VideoWithFallback, PeruMap, WhatsAppButton, iconos de sector e ilustraciones de respaldo. Los que usan estado/efectos del navegador llevan `'use client'` arriba; el resto son Server Components.
- `src/data/content.js` — todo el contenido textual del sitio (propósito, misión/visión, valores, proyectos, FAQ, datos de contacto). Editar aquí primero ante cualquier cambio de copy.
- `public/fonts/` — tipografías Gotham (Black, Bold, Medium, Book) declaradas vía `@font-face` en `src/app/globals.css`.

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
- **Formulario de contacto**: ✅ envía correo real (ver sección "Formulario de contacto" más arriba) — falta solo configurar las credenciales SMTP reales en el entorno de despliegue. Las opciones del selector "¿Qué solución te interesa?" son genéricas (Solución 1–4) hasta tener el listado real.
