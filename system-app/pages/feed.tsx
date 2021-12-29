//@ts-nocheck

import DonationFeed from '@components/sections/DonationFeed';
import { data } from 'autoprefixer';
import React from 'react';
import useFetch from 'react-fetch-hook'

import config from '../config.json'

const feed = () => {

  return  <DonationFeed/>
};

export default feed;