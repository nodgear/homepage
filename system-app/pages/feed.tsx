import DonationFeed from '@components/sections/DonationFeed';
import React from 'react';

const feed = () => {
  return  <DonationFeed list={[
    {
      name: 'Fulano',
      value: 50
    }
  ]} totalGathered={69} totalTransactions={69}/>
};

export default feed;