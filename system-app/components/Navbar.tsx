import React from 'react';

const navbar = () => {

  const NavItem = (props) => {
    return <li className='mx-3 transition-colors duration-300 hover:text-accent' >
      <a href={`#${props.section}`}>{props.title}</a>
    </li>
  }

  return (
    <nav className='flex px-20 py-8'>
      <div className='mr-auto'>
        <img src="/logo_vertical.png" className='w-64'/>
      </div>
      <div className='ml-auto'>
        <ul className='flex flex-row'>
          <NavItem section='' title='Início' />
          <NavItem section='' title='Doações' />
          <NavItem section='' title='O que estamos fazendo?' />
          <NavItem section='' title='Pontos de coleta' />
        </ul>
      </div>
    </nav>
  );
};

export default navbar;