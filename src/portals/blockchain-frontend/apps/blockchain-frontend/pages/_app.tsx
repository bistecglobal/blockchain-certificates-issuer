import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to blockchain-frontend!</title>
      </Head>
      <div className='container'>
        <div className='content'>
      <main className="app" >
        <Component {...pageProps} />
      </main>
      </div>
      </div>
    </>
  );
}

export default CustomApp;
