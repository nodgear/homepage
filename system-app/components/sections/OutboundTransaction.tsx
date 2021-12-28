import React from 'react';

interface Props {
  
}

function OutboundTransaction(props) {

  const TransactionItem = ({org, info, image, value}: {org:string, info: string, image?: string, value: number | string}) => {
    return <div className='flex flex-row w-full px-20'>
      <div className='w-64 max-w-xl mr-6'>
        <img src={image} className='w-full'/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row w-full'>
          <h1 className='w-full text-3xl font-bold text-accent'>{org}</h1>
          <span className='ml-auto text-3xl font-bold text-white'><span className='mx-2 text-xl font-regular'>R$</span>{value}</span>
        </div>
        <p>
          {info}
        </p>
      </div>

    </div>
  }

  return (
    <section className='flex flex-col items-center justify-center w-3/4 px-20 mx-auto py-22'>
      <h1 className='my-12 mb-12 text-3xl font-bold text-white uppercase'>O que estamos fazendo</h1>
      <TransactionItem org='SOS Bahia' info='Lorem ipsum dolor sit amet 123 123 123 ' value='30' image='/ong.png'/>
    </section>
  );
};

export default OutboundTransaction;