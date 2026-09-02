// Validación compartida del formulario de contacto — se usa tanto en el
// cliente (Contacto.jsx, para mostrar errores al vuelo) como en el
// servidor (api/contact/route.js, que nunca debe confiar solo en la
// validación del navegador).

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizePhone(value) {
  return (value || '').replace(/\D/g, '')
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test((value || '').trim())
}

export function isValidPhone(value) {
  return normalizePhone(value).length === 9
}

/**
 * Devuelve un objeto { campo: mensaje } con los errores encontrados.
 * Un objeto vacío significa que el formulario es válido.
 */
export function validateContactForm(form) {
  const errors = {}

  if (!form.nombre?.trim()) {
    errors.nombre = 'Ingresa tu nombre completo.'
  }

  if (!form.correo?.trim()) {
    errors.correo = 'Ingresa tu correo electrónico.'
  } else if (!isValidEmail(form.correo)) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  }

  if (!form.celular?.trim()) {
    errors.celular = 'Ingresa tu celular.'
  } else if (!isValidPhone(form.celular)) {
    errors.celular = 'El celular debe tener 9 dígitos.'
  }

  if (!form.comoTeEnteraste?.trim()) {
    errors.comoTeEnteraste = 'Selecciona una opción.'
  }

  if (!form.solucion?.trim()) {
    errors.solucion = 'Selecciona una opción.'
  }

  return errors
}
