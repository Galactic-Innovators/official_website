import '@/styles/globals.css'
import { Nunito } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'

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
        </LanguageProvider>
      </body>
    </html>
  )
}
