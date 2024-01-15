import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import '../styles/globals.css'
import '@fontsource/roboto';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora Hipertension',
  description: 'Calculadora de Riesgo de Hipertension',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Museo+Sans:wght@300;400;500;700&display=swap" />

      </Head>

      <html lang="en">

        <body className={inter.className}>
          {children}
        </body>
      </html>

    </>
  )
}
