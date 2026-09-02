import nodemailer from 'nodemailer'
import { validateContactForm } from '../../../lib/contactValidation'

export const runtime = 'nodejs'

// Cambiar el destinatario más adelante es solo cambiar esta variable de
// entorno (CONTACT_EMAIL_TO) — no requiere tocar código.
const DEFAULT_RECIPIENT = 'calderonbegazo@gmail.com'

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null

  const port = Number(SMTP_PORT) || 587
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === 'true' || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmail(form) {
  const fields = [
    ['Nombre completo', form.nombre],
    ['Correo', form.correo],
    ['Celular', form.celular],
    ['¿Cómo se enteró?', form.comoTeEnteraste],
    ['Solución de interés', form.solucion],
  ]

  const subject = `Nueva cotización web — ${form.nombre} — ${form.solucion}`

  const text = [
    'Nueva solicitud desde el formulario de contacto de inversionesicr.pe',
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    `Recibido: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
    '',
    'Responde directamente a este correo para contactar al cliente.',
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1c1c2e; max-width: 480px;">
      <h2 style="color: #00004c; margin-bottom: 4px;">Nueva cotización web</h2>
      <p style="color: #666; margin-top: 0;">Inversiones ICR — formulario de contacto</p>
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        ${fields
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; font-weight: bold; color: #00004c; vertical-align: top; white-space: nowrap;">${escapeHtml(
              label,
            )}</td>
            <td style="padding: 8px 0; color: #1c1c2e;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <p style="margin-top: 20px; color: #888; font-size: 12px;">
        Recibido: ${escapeHtml(new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }))}<br />
        Responde directamente a este correo para contactar al cliente.
      </p>
    </div>
  `

  return { subject, text, html }
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, message: 'Solicitud inválida.' }, { status: 400 })
  }

  // Honeypot: los bots suelen rellenar cualquier campo que encuentren.
  if (body.website) {
    return Response.json({ ok: true })
  }

  const form = {
    nombre: body.nombre ?? '',
    correo: body.correo ?? '',
    celular: body.celular ?? '',
    comoTeEnteraste: body.comoTeEnteraste ?? '',
    solucion: body.solucion ?? '',
  }

  const errors = validateContactForm(form)
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 })
  }

  const transporter = getTransporter()
  if (!transporter) {
    console.error('[api/contact] Faltan variables de entorno SMTP_HOST/SMTP_USER/SMTP_PASS.')
    return Response.json(
      { ok: false, message: 'El envío de correo no está configurado todavía.' },
      { status: 500 },
    )
  }

  const { subject, text, html } = buildEmail(form)

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL_TO || DEFAULT_RECIPIENT,
      replyTo: `${form.nombre} <${form.correo}>`,
      subject,
      text,
      html,
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error('[api/contact] Error al enviar el correo:', error)
    return Response.json(
      { ok: false, message: 'No se pudo enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.' },
      { status: 502 },
    )
  }
}
