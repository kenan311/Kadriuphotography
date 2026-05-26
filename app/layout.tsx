import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Kadriu Photography | Foto dhe Video për Dasma',
  description: 'Shërbime moderne foto dhe video për dasma, fejesa dhe festa familjare në Kosovë.',
  keywords: 'fotografi dasmash, video dasmash, fejesa, fotograf profesionist, Kosovë',
  authors: [{ name: 'Kadriu Photography' }],
  icons: {
    icon: [{ url: '/kadriu-logo.png', type: 'image/png' }],
    shortcut: '/kadriu-logo.png',
    apple: '/kadriu-logo.png',
  },
  openGraph: {
    title: 'Kadriu Photography | Foto dhe Video për Dasma',
    description: 'Shërbime moderne foto dhe video për dasma, fejesa dhe festa familjare në Kosovë.',
    type: 'website',
    locale: 'sq_XK',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq-XK">
      <head>
        <link rel="stylesheet" href="/site-fallback.css" />
        <link rel="icon" href="/kadriu-logo.png" type="image/png" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
