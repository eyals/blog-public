import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="text-base">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.querySelectorAll('body link[rel="icon"], body link[rel="apple-touch-icon"]').forEach(el => document.head.appendChild(el))
            `,
          }}
        />
      </Head>
      <body className="font-jetbrains-mono text-slate-700 bg-white">
        <Main />
        <NextScript />
        <script 
          data-goatcounter="https://eyalblog.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        />
      </body>
    </Html>
  );
}