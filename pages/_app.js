// File: pages/_app.js
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
    </SessionProvider>
  );
}
