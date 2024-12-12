import '@/styles/globals.css'
import { Nunito } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Galactic Innovators Group',
  description: 'Innovative 3D printing solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <LanguageProvider>
          <Header />
          {children}
          <SpeedInsights/>
          <Analytics/>
        </LanguageProvider>
      </body>
    </html>
  )
}
