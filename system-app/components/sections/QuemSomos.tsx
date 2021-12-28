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
        <People list={config.contribuidores}/>
      </div>
      <div className='flex flex-col w-full'>

      </div>
    </section>
  );
};

export default QuemSomos;