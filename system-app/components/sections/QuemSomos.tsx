import React from 'react';
import People from '@components/People'

import config from '../../config.json'

const QuemSomos = () => {
  return (
    <section className='flex flex-row items-center h-screen px-20'>
      <div className='flex flex-col w-2/3'>
        <h1 className='w-full px-3 mb-12 text-2xl font-bold text-center uppercase text-accent'>Quem somos</h1>
        <p className='px-3 mb-2 text-lg'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. 
        </p>
        <p className='px-3 mb-2 text-lg'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <People list={config.contribuidores} onPick={(person)=>{
          console.log(person)
           //TODO: Alguém faz o modal <3
        }} />
      </div>
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center justify-center text-2xl text-center'>
          <h1 className='font-bold uppercase text-accent'>Quero contribuir</h1>
          <p>Chave pix: {config.chavePix}</p>
          <img src="/qrpix.png" className='px-2 py-2 mt-6 bg-white rounded-md w-38' />
        </div>
        <div className='flex flex-col items-center justify-center m-6 text-2xl text-center'>
          <h1 className='font-bold uppercase text-accent'>Quem estamos ajudando?</h1>
          <img src="/ong.png" className='mt-6 w-38' />
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;