/* eslint-disable react/no-invalid-html-attribute */
import React from 'react';
import { Helmet } from 'react-helmet';

export default function HeadIcon(): JSX.Element {
  const [prefersColorScheme, setPrefersColorScheme] = React.useState<string>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  React.useEffect(() => {
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersColorScheme(e.matches ? 'dark' : 'light');
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleMediaChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <Helmet>
      <link
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="114x114"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="72x72"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-72x72."`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-144x144."`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="60x60"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-60x60."`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="120x120"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-120x120."`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="76x76"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-76x76."`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="152x152"
        href={`/icon/${prefersColorScheme}/apple-touch-icon-152x152."`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`/icon/${prefersColorScheme}/favicon-196x196.png`}
        sizes="196x196"
      />
      <link
        rel="icon"
        type="image/png"
        href={`/icon/${prefersColorScheme}/favicon-96x96.png`}
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href={`/icon/${prefersColorScheme}/favicon-32x32.png`}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={`/icon/${prefersColorScheme}/favicon-16x16.png`}
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href={`/icon/${prefersColorScheme}/favicon-128.png`}
        sizes="128x128"
      />
      <meta name="application-name" content="&nbsp;" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta
        name="msapplication-TileImage"
        content={`/icon/${prefersColorScheme}/mstile-144x144.png`}
      />
      <meta
        name="msapplication-square70x70logo"
        content={`/icon/${prefersColorScheme}/mstile-70x70.png`}
      />
      <meta
        name="msapplication-square150x150logo"
        content={`/icon/${prefersColorScheme}/mstile-150x150.png`}
      />
      <meta
        name="msapplication-wide310x150logo"
        content={`/icon/${prefersColorScheme}/mstile-310x150.png`}
      />
      <meta
        name="msapplication-square310x310logo"
        content={`/icon/${prefersColorScheme}/mstile-310x310.png`}
      />
    </Helmet>
  );
}
