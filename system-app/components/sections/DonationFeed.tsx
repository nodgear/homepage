interface Donation {
  avatar?: string;
  name: string;
  value: number | string;
}

function DonationItem(props:Donation) {
  return <><span className="mr-3 font-bold text-white uppercase text lg">{props.name}</span> R$ {Number(props.value) + 0.00}</>
}

interface ListProps {
  list: Donation[];
  totalGathered: string | number;
  totalTransactions: string | number;
}

export default function(props: ListProps) {
  return <section className='flex flex-row justify-center w-full h-screen px-20 py-32'>
    <div className='flex flex-col items-center justify-center w-2/3 h-full'>
      <div className="flex flex-col items-center justify-center w-full py-3">
        <h1 className='mb-6 text-3xl font-bold text-accent'>Número de doadores:<span className='ml-2 text-white'>{props.totalTransactions}</span></h1>
        <h1 className='text-3xl font-bold text-accent'>Valor arrecadado:<span className='ml-2 text-white'>{props.totalGathered}</span></h1>
        <input type="text" name="search" placeholder="Pesquise um doador:" className="w-1/2 px-2 py-2 mt-12 text-black bg-white border border-white rounded-md bg-opacity-40 border-opacity-60"></input>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center w-1/3 h-full'>
      <div className="flex w-full h-full px-12 py-12 overflow-y-auto bg-white rounded-md bg-opacity-40">
        {props.list.map( (transaction, index) => {
          return <DonationItem name={transaction.name} value={transaction.value} key={`donation.${transaction.name}.index`}/>
        })}
      </div>
    </div>
    </section>
}