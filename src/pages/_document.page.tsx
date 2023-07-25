import { Head, Html, Main, NextScript } from 'next/document';

const fonts = [
  '/fonts/Poppins-Regular.woff2',
  '/fonts/Montserrat/Montserrat-Medium.woff2',
  '/fonts/Montserrat/Montserrat-MediumItalic.woff2',
  '/fonts/Montserrat/Montserrat-Light.woff2',
  '/fonts/Montserrat/Montserrat-LightItalic.woff2',
  '/fonts/Montserrat/Montserrat-Regular.woff2',
  '/fonts/Montserrat/Montserrat-Italic.woff2',
  '/fonts/Montserrat/Montserrat-Semibold.woff2',
  '/fonts/Montserrat/Montserrat-SemiboldItalic.woff2',
  '/fonts/Montserrat/Montserrat-Bold.woff2',
  '/fonts/Montserrat/Montserrat-BoldItalic.woff2',
];

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {fonts.map((font) => (
          <link
            key={font}
            rel='preload'
            href={font}
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
