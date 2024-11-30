// pages/_app.js
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '../context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}
