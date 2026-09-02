'use client'

import { useState } from 'react'
import WhatsAppButton from '../../components/WhatsAppButton'
import { contact } from '../../data/content'
import { validateContactForm } from '../../lib/contactValidation'

const HEARD_OPTIONS = [
  'Redes sociales',
  'Recomendación de un cliente',
  'Búsqueda en internet',
  'Publicidad',
  'Evento o feria',
  'Otro',
]

// Los nombres reales de las soluciones están pendientes de definición
// (ver página "Soluciones"); se muestran como opciones genéricas 1-4.
const SOLUTION_OPTIONS = ['Solución 1', 'Solución 2', 'Solución 3', 'Solución 4']

const initialForm = {
  nombre: '',
  correo: '',
  celular: '',
  comoTeEnteraste: '',
  solucion: '',
  website: '', // honeypot: los bots suelen rellenarlo, las personas nunca lo ven
}

const fieldClass = (hasError) =>
  `rounded-xl border px-4 py-3 outline-none transition-colors ${
    hasError ? 'border-red-400 focus:border-red-500' : 'border-icr-navy/15 focus:border-icr-cyan'
  }`

export default function Contacto() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('')

  const update = (field) => (e) => {
    const { value } = e.target
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((err) => {
      if (!err[field]) return err
      const next = { ...err }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.website) return // honeypot activado, no seguir

    const nextErrors = validateContactForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('idle')
      return
    }

    setStatus('submitting')
    setStatusMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        setStatus('success')
        setForm(initialForm)
        setErrors({})
        return
      }

      if (data.errors) {
        setErrors(data.errors)
        setStatus('idle')
        return
      }

      setStatus('error')
      setStatusMessage(data.message || 'No se pudo enviar tu solicitud. Intenta de nuevo.')
    } catch {
      setStatus('error')
      setStatusMessage('No se pudo enviar tu solicitud. Revisa tu conexión e intenta de nuevo.')
    }
  }

  return (
    <div>
      <section className="bg-icr-gradient py-16 text-white md:py-24">
        <div className="container-icr text-center">
          <span className="section-eyebrow text-icr-mint">Contacto</span>
          <h1 className="mt-4 font-black text-3xl md:text-5xl">Hablemos de tu proyecto energético</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Déjanos tus datos y un especialista de Inversiones ICR se pondrá en contacto contigo.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton variant="outline" label="Escríbenos directo por WhatsApp" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-icr grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-icr-navy/10 p-6 md:p-10">
            <h2 className="font-black text-2xl text-icr-navy">Déjanos tus datos</h2>
            <p className="mt-2 text-sm text-icr-navy/60">
              Completa el formulario y te contactaremos a la brevedad. También puedes enviarnos tus datos
              directamente por WhatsApp.
            </p>

            {/* Campo trampa para bots — oculto para personas */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update('website')}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-sm font-bold text-icr-navy">Nombre completo</span>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={update('nombre')}
                  placeholder="Ej. María Pérez"
                  aria-invalid={Boolean(errors.nombre)}
                  className={fieldClass(errors.nombre)}
                />
                {errors.nombre && <span className="text-xs font-medium text-red-500">{errors.nombre}</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-icr-navy">Correo electrónico</span>
                <input
                  type="email"
                  value={form.correo}
                  onChange={update('correo')}
                  placeholder="nombre@correo.com"
                  aria-invalid={Boolean(errors.correo)}
                  className={fieldClass(errors.correo)}
                />
                {errors.correo && <span className="text-xs font-medium text-red-500">{errors.correo}</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-icr-navy">Celular</span>
                <input
                  type="tel"
                  value={form.celular}
                  onChange={update('celular')}
                  placeholder="987654321"
                  aria-invalid={Boolean(errors.celular)}
                  className={fieldClass(errors.celular)}
                />
                {errors.celular ? (
                  <span className="text-xs font-medium text-red-500">{errors.celular}</span>
                ) : (
                  <span className="text-xs text-icr-navy/50">9 dígitos, sin espacios ni guiones.</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-icr-navy">¿Cómo te enteraste de nosotros?</span>
                <select
                  value={form.comoTeEnteraste}
                  onChange={update('comoTeEnteraste')}
                  aria-invalid={Boolean(errors.comoTeEnteraste)}
                  className={fieldClass(errors.comoTeEnteraste)}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {HEARD_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.comoTeEnteraste && (
                  <span className="text-xs font-medium text-red-500">{errors.comoTeEnteraste}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-icr-navy">¿Qué solución te interesa?</span>
                <select
                  value={form.solucion}
                  onChange={update('solucion')}
                  aria-invalid={Boolean(errors.solucion)}
                  className={fieldClass(errors.solucion)}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {SOLUTION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.solucion && <span className="text-xs font-medium text-red-500">{errors.solucion}</span>}
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-8 w-full rounded-full bg-icr-navy py-3.5 font-bold text-white transition-colors hover:bg-icr-blue disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {status === 'submitting' ? 'Enviando…' : 'Enviar'}
            </button>

            {status === 'success' && (
              <p className="mt-4 text-sm font-medium text-icr-cyan">
                ¡Gracias! Recibimos tus datos y un especialista te contactará pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm font-medium text-red-500">{statusMessage}</p>
            )}
          </form>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-icr-navy p-8 text-white">
              <h3 className="font-bold text-lg">Información de contacto</h3>
              <div className="mt-5 space-y-4 text-sm">
                <a href={`tel:${contact.phoneWhatsapp}`} className="flex items-center gap-3 hover:text-icr-mint">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-icr-mint">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 6l8 7 8-7" />
                  </svg>
                  {contact.email}
                </a>
                <p className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {contact.address}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-icr-navy/10 p-8">
              <h3 className="font-bold text-lg text-icr-navy">Horario de atención</h3>
              <p className="mt-3 text-sm text-icr-navy/70">Lunes a viernes: 8:00 a.m. – 7:00 p.m.</p>
              <p className="text-sm text-icr-navy/70">Sábados: 8:00 a.m. – 12:00 a.m.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
