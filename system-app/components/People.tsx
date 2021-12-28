import React from 'react';

interface PeopleProps {
  name: string;
  bio: string;
  avatar: string;
}

function People({list}: {list: PeopleProps[] }) {
  return <ul className='flex flex-row mt-12'>
    {list.map( (person, index) => {
      return <li className={`mx-3 w-20 h-20 bg-[#494949] person-${index} rounded-md`}>
        <style jsx>
          {`
            .person-${index} {
              background-image: url('${person.avatar}');
              background-size: cover;
              background-position: center;
            }
          `}
        </style>
      </li>
    })}
  </ul>
}

export default People