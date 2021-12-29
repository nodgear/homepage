import Head from 'next/head'
import AboutUs from '@components/sections/AboutUs'

export default function Home() {
  return <>
    <Head>
      <title>Podemos Ajudar</title>
      <meta property="og:title" content="Podemos Ajudar"/>
      <meta property="og:site_name" content="Podemos Ajudar"/>
      <meta property="og:type" content="website"/>
    </Head>
    <AboutUs />
  </>
}
