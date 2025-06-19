import './globals.css';

export const metadata = {
  title: 'PoliBest 911 — Конструктор комерційних пропозицій',
  description: 'Професійний генератор пропозицій для матеріалів PoliBest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}