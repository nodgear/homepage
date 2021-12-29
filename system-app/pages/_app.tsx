import type { AppProps  } from 'next/app'
import '@styles/globals.css'
import Navbar from '@components/Navbar'
import { useEffect } from 'react'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Navbar />
    <div className='py-32 lg:py-6'>
      <Component {...pageProps} />
    </div>
  </>
}

export default App