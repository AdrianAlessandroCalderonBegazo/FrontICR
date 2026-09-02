import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Inversiones ICR | Energía confiable, soluciones inteligentes',
  description:
    'Inversiones ICR — Energía confiable, soluciones inteligentes. Soluciones energéticas para minería, industria, agricultura, textil y energía en todo el Perú.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
