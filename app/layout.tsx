import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'PoliBest - Конструктор комерційних пропозицій',
  description: 'Створюйте професійні комерційні пропозиції для полімерних покриттів',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}