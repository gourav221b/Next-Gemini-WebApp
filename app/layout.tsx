import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Script from 'next/script'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Arcades by Gg",
  description: 'Arcade games powered by Gemini Pro',
  keywords: "Gen ai, generative AI, AI, artificial intelligence,",
  metadataBase: new URL('https://ggarcade.vercel.app/'),
  openGraph: {
    title: "Arcades by Gg",
    description: 'Arcade games powered by Gemini Pro',

  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="og:image" content="/opengraph-image.jpg" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <body className={poppins.className + " min-h-screen"}>
        <Navbar />
        {children}
        <footer className='flex items-center justify-center h-[5dvh]'>Made with ❤️ by &nbsp;<a href='https://devgg.me' target='_blank'>Gourav</a></footer>
      </body>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ANALYTICS-TAG"></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'YOUR-ANALYTICS-TAG');`}
      </Script>
    </html >
  )
}
