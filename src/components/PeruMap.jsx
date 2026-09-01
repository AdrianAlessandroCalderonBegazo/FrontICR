// Silueta estilizada de Perú a la espera del archivo Perú.svg definitivo.
// Marca los puntos donde Inversiones ICR ya tiene proyectos ejecutados.

const PINS = [
  { id: 'tacna', label: 'Tacna', x: 172, y: 430 },
  { id: 'arequipa', label: 'Arequipa', x: 135, y: 355 },
  { id: 'moquegua', label: 'Moquegua', x: 158, y: 393 },
  { id: 'ayacucho', label: 'Ayacucho', x: 178, y: 300 },
  { id: 'madre-de-dios', label: 'Pto. Maldonado', x: 305, y: 315, labelSide: 'left' },
]

export default function PeruMap({ className = 'w-full h-auto', showLabels = true }) {
  return (
    <svg viewBox="0 0 400 470" className={className} role="img" aria-label="Mapa del Perú con presencia de proyectos ICR">
      <path
        d="M100 25 L150 15 L220 20 L270 40 L320 60 L310 100 L340 130 L360 170 L345 210 L350 260 L330 300 L300 340 L260 380 L230 410 L180 430 L155 420 L140 390 L125 350 L115 310 L105 270 L95 230 L85 190 L75 150 L60 110 L50 70 Z"
        fill="url(#peruGradient)"
        stroke="#00ffc2"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="peruGradient" x1="0" y1="0" x2="400" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000073" />
          <stop offset="100%" stopColor="#00004c" />
        </linearGradient>
      </defs>
      {PINS.map((pin) => (
        <g key={pin.id}>
          <circle cx={pin.x} cy={pin.y} r="10" fill="#00b7c2" opacity="0.35">
            <animate attributeName="r" values="8;14;8" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.45;0.05;0.45" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={pin.x} cy={pin.y} r="5" fill="#00ffc2" stroke="#00004c" strokeWidth="1.5" />
          {showLabels && (
            <text
              x={pin.labelSide === 'left' ? pin.x - 10 : pin.x + 10}
              y={pin.y + 4}
              textAnchor={pin.labelSide === 'left' ? 'end' : 'start'}
              fontSize="14"
              fill="#ffffff"
              style={{ fontFamily: 'Gotham-Medium, sans-serif' }}
            >
              {pin.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
