import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
