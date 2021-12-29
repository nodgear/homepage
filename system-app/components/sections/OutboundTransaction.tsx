import React from 'react';

interface Props {
  
}

function OutboundTransaction(props) {

  const TransactionItem = ({org, info, image, value}: {org:string, info: string, image?: string, value: number | string}) => {
    return <div className='flex flex-col w-full px-6 lg:px-20 lg:flex-row'>
      <div className='flex justify-center w-full mr-6'>
        <img src={image} className='w-full rounded-md lg:w-64'/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row w-full'>
          <h1 className='w-full text-3xl font-bold text-accent'>{org}</h1>
          <span className='text-3xl font-bold text-white lg:ml-auto'><span className='mx-2 text-xl font-regular'>R$</span>{value}</span>
        </div>
        <p className='hidden lg:block'>
          {info}
        </p>
      </div>
      <p className='block mt-3 lg:hidden'>
        {info}
      </p>
    </div>
  }

  return (
    <section className='flex flex-col items-center justify-center w-3/4 py-32 mx-auto lg:px-20'>
      <h1 className='my-12 mb-12 text-2xl font-bold text-white uppercase lg:text-3xl'>O que estamos fazendo</h1>
      <TransactionItem org='SOS Bahia' info='Lorem ipsum dolor sit amet 123 123 123 ' value='30' image='/ong.png'/>
    </section>
  );
};

export default OutboundTransaction;