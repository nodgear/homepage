import React from 'react';
import People from '@components/People'

import config from '../../config.json'

const QuemSomos = () => {

  return (
    <section className='flex flex-col items-center h-screen px-6 lg:flex-row lg:px-20'>
      <div className='flex flex-col lg:w-1/2'>
        <h1 className='w-full px-3 mb-6 text-2xl font-bold text-center uppercase lg:mb-12 text-accent'>Quem somos</h1>
        <p className='mb-2 text-lg lg:px-3'>
        Somos um grupo formado por docentes e estudantes da rede Uniftc, que nos unimos com o objetivo de colaborar com as famílias do Sul da Bahia, que estão enfrentando uma situação bastante difícil, devido às fortes chuvas que tem assolado essa região. Por entendermos que temos uma responsabilidade social e que podemos e devemos ser agentes de transformação, convidamos você para fazer parte deste movimento. 
Juntos podemos transformar!!
        </p>
        <p className='mb-2 text-lg lg:px-3'>
        Esta plataforma foi criada para que você possa fazer sua contribuição e, além disso, acompanhar todo o direcionamento das doações de forma transparente.
Todo valor arrecadado será direcionado para Organizações não governamentais que já estão envolvidas no trabalho de assistência as pessoas necessitadas.
        </p>
        <People list={config.contribuidores} onPick={(person)=>{
          console.log(person)
           //TODO: Alguém faz o modal <3
        }} />
      </div>
      <div className='flex flex-col items-center w-full mt-16 lg:mt-0 lg:w-1/2'>
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