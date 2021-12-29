//@ts-nocheck
import { useState } from "react"
import useFetch from "react-fetch-hook"

import config from '../../config.json'
interface Donation {
  avatar?: string;
  name: string;
  value: number | string;
}

function DonationItem(props:Donation) {
  return <div className="flex flex-row px-3 py-2 rounded-md cursor-pointer hover:bg-slate-500"><span className="mr-auto font-bold text-white uppercase text lg">{props.name}</span> R$ {Number(props.value) + 0.00}</div>
}

interface ListProps {
  list: Donation[];
  totalGathered: string | number;
  totalTransactions: string | number;
}

export default function(props: ListProps) {
  const [filter, setFilter] = useState('')
  const { isLoading, data } = useFetch(`${config.apiEndPoint}/donations${filter !== '' ? '?name=' + filter : ''}`)

  function transformList() {
    const list = []
    for ( const index in data) {
      const transactions = data[index]
      if (!transactions?.value) { continue }
      list.push(transactions)
    }
    
    return list
  }

  return <section className='flex flex-col justify-center w-full h-screen px-6 py-32 lg:flex-row lg:px-20'>
    <div className='flex flex-col items-center justify-center h-full lg:w-2/3'>
      <div className="flex flex-col items-center justify-center w-full py-3">
        <h1 className='mb-6 text-3xl font-bold text-accent'>
          Número de doadores:<span className='ml-2 text-white'>{isLoading ? 'Carregando' : data?.donationsCount}</span>
        </h1>
        <h1 className='text-3xl font-bold text-accent'>
          Valor arrecadado:<span className='ml-2 text-white'>{isLoading ? 'Carregando' :  Math.round(Number( data.amount))}</span>
        </h1>
        <input type="text" name="search" placeholder="Pesquise um doador:" className="w-1/2 px-2 py-2 mt-12 text-black bg-white border border-white rounded-md bg-opacity-40 border-opacity-60" onChange={(e)=>{
          if (e.target.value.trim() !== '' && e.target.value.trim().length > 3) {
            setFilter(e.target.value.trim())
          } else {
            setFilter('')
          }
        }}></input>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center h-full lg:w-1/3'>
      <div className="flex flex-col w-2/3 h-full px-6 py-6 overflow-y-auto bg-white rounded-md lg:w-full bg-opacity-40">
        {transformList().map( (transaction, index) => {
          return <DonationItem name={transaction.name} value={transaction.value} key={`donation.${transaction.name}.${index}`}/>
        })}
      </div>
    </div>
    </section>
}