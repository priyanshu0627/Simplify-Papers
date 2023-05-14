import '../styles/global.css';

import type { AppProps } from 'next/app';
import React from 'react';

import { Providers } from '@/redux/provider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);

export default MyApp;
