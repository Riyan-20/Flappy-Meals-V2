// File: pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Flappy Meals - Food Delivery Service" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}