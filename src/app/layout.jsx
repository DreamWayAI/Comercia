import './globals.css';

export const metadata = {
  title: 'PoliBest 911 – Конструктор комерційних пропозицій',
  description: 'Додаток для генерації професійних комерційних пропозицій для покриттів PoliBest.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head />
      <body>{children}</body>
    </html>
  );
}