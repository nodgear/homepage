import DropLocation from '@components/sections/DropLocation';
import Head from 'next/head';
import React from 'react';

const places = () => {
  return <>
    <Head>
      <title>Podemos Ajudar</title>
      <meta property="og:title" content="Podemos Ajudar"/>
      <meta property="og:site_name" content="Podemos Ajudar"/>
      <meta property="og:type" content="website"/>
    </Head>
    <DropLocation />;
  </>
};

export default places;