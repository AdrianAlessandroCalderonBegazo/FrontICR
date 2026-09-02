# Inversiones ICR — Sitio corporativo

Frontend del sitio corporativo de Inversiones ICR: Next.js (App Router) + Tailwind CSS.

> Esta es la rama `nextjs-migration`: se reescribio sobre Next.js
> para desplegarse con Node + Docker

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
