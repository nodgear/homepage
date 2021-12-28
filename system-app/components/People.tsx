import React from 'react';

type Person = {
  name: string;
  bio: string;
  avatar: string;
}

type People = Person[];

type onPick = (person: {name: string, avatar: string, bio: string}) => void;

interface PeopleProps {
  list: People,
  onPick: onPick
}

function People(props: PeopleProps) {
  return <ul className='flex flex-row mt-12'>
    {props.list.map( (person, index) => {
      return <li className={`mx-3 w-20 h-20 bg-[#494949] person-${index} rounded-md cursor-pointer`} onClick={()=>{
        props.onPick(person)
      }}>
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