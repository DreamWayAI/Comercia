import './globals.css';

export const metadata = {
  title: 'PoliBest — Комерційна пропозиція',
  description: 'Генератор комерційних пропозицій для покриття PoliBest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
