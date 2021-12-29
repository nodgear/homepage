import React from 'react';
import config from 'config.json';

interface Props {
  List: {
    _id: string;
    documentPath: {
      filename: string
    }[];
    amount: string | number;
    description: string;
    title: string
  }[]
}

function OutboundTransaction(props) {


  const TransactionItem = ({title, description, image, amount}: {title:string, description: string, image?: string, amount: number | string}) => {
    return <div className='flex flex-col w-full px-6 mb-6 lg:px-20 lg:flex-row'>
      <div className='flex justify-center w-full mr-6'>
        <img src={image} className='w-full rounded-md lg:w-64'/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row w-full'>
          <h1 className='w-full text-3xl font-bold text-accent'>{title}</h1>
          <span className='text-3xl font-bold text-white lg:ml-auto'><span className='mx-2 text-xl font-regular'>R$</span>{amount}</span>
        </div>
        <p className='hidden lg:block'>
          {description}
        </p>
      </div>
      <p className='block mt-3 lg:hidden'>
        {description}
      </p>
    </div>
  }

  return (
    <section className='flex flex-col items-center justify-center w-3/4 py-32 mx-auto lg:px-20'>
      <h1 className='my-12 mb-12 text-2xl font-bold text-white uppercase lg:text-3xl'>O que estamos fazendo</h1>
      {props.list.map( action => {
        console.log(action)
        return <TransactionItem title={action.title} description={action.description} amount={action.amount} image={`${config.apiEndPoint}/assets/${action.documentPath[0].filename}`}/>
      })}
    </section>
  )
}

export default OutboundTransaction;