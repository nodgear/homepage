import React, { useEffect } from 'react';
import config from '../../config.json'

function isElement(obj) {
  if (obj.nodeName){
    switch (obj.nodeType){
    case 1: return 'element';
    case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
    }
}
}
const DeliverLocation = () => {
  // useEffect(() => {
  //   const logos = document.querySelectorAll('nav img')
  //   logos.forEach( logo => {
  //     if (!isElement(logo)) { return }
  //     //@ts-expect-error
  //     logo.style.display = 'none'
  //   })
  // })
  return (
    <section className='flex flex-col px-6 lg:px-20 lg:py-14'>
      {/* <img src="/logo_vertical.png" className='w-72'/> */}
      <span className='mb-20'>Juntos podemos transformar.</span>

      <h3 className='mb-6 text-2xl uppercase'>Pontos de coleta</h3>
      {config.pontosColeta.map( (ponto, index) => {
        const locais = ponto.endereco

        return <div className='flex flex-col mb-16' key={`location.${index}`}>
          <h1 className='mb-3 text-5xl font-bold uppercase'>EM {ponto.cidade}</h1>
          {locais.map((local,index) => {
            return <h4 className='' key={`address.${ponto.cidade}.${index}`}>- {local}</h4>
          })}
        </div>
      })}
    </section>
  );
};

export default DeliverLocation;