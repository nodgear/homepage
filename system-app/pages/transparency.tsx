import OutboundTransaction from '@components/sections/OutboundTransaction';
import React from 'react';
import useFetch from 'react-fetch-hook';

import config from 'config.json'
import Head from 'next/head';

const transparency = () => {
  const { isLoading, data } = useFetch(`${config.apiEndPoint}/actions`)
  if (isLoading) { return <div className='flex items-center justify-center w-full h-screen text-2xl text-center'>Carregando</div>}

  return <>
    <Head>
      <title>Podemos Ajudar</title>
      <meta property="og:title" content="Podemos Ajudar"/>
      <meta property="og:site_name" content="Podemos Ajudar"/>
      <meta property="og:type" content="website"/>
    </Head>
    <OutboundTransaction list={data}/>;
  </>
};

export default transparency;