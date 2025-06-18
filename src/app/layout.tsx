import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PoliBest - Конструктор комерційних пропозицій',
  description: 'Створюйте професійні комерційні пропозиції для полімерних покриттів',
  keywords: 'PoliBest, полімерні покриття, комерційні пропозиції, бетон',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}