import React, { useEffect, useRef } from 'react';

const navbar = () => {
  const navbar = useRef(null)

  useEffect(()=>{
    var navbar = document.getElementById("navbar");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
        navbar.classList.add("bg-[#16222b]");
      } else {
        navbar.classList.remove("bg-[#16222b]");
      }
    };
  }, [])

  const NavItem = (props) => {
    return <li className='mx-3 transition-colors duration-300 hover:text-accent' >
      <a href={`#${props.section}`}>{props.title}</a>
    </li>
  }

  return (
    <nav className='fixed flex w-full px-20 py-8 transition-colors duration-300' ref={navbar} id='navbar'>
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