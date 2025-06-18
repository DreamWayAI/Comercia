export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}