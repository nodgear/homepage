import Head from 'next/head'

export default function Home() {
  return <>
    <Head>
      <title>Título</title>
      <meta property="og:image" content="www.meusite.com.br/imagem.jpg"/>
      <meta property="og:image:type" content="image/jpeg"/>
      <meta property="og:image:width" content="800"/> 
      <meta property="og:image:height" content="600"/> 
      <meta property="og:title" content="Título"/>
      <meta property="og:site_name" content="Nome projeto"/>
      <meta property="og:type" content="website"/>
    </Head>
    <div className='flex w-full h-screen items-center justify-center'>
      Teste - OK
    </div>
  </>
}
