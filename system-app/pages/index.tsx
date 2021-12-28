import Head from 'next/head'
import Navbar from '@components/Navbar'
import QuemSomos from '@components/sections/QuemSomos'
import DonationFeed from '@components/sections/DonationFeed'

export default function Home() {
  return <>
    <Head>
      <title>Podemos Ajudar</title>
      <meta property="og:image" content="www.meusite.com.br/imagem.jpg"/>
      <meta property="og:image:type" content="image/jpeg"/>
      <meta property="og:image:width" content="800"/> 
      <meta property="og:image:height" content="600"/> 
      <meta property="og:title" content="Título"/>
      <meta property="og:site_name" content="Nome projeto"/>
      <meta property="og:type" content="website"/>
    </Head>
    <Navbar />
    <QuemSomos />
    <DonationFeed list={[
      {
        name: 'Fulano',
        value: 50
      }
    ]}/>
  </>
}
