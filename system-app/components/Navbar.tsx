import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const navbar = () => {
  const [dropdown, setDropdown] = useState(false)
  const navbar = useRef(null)

  useEffect(()=>{
    const navbar = document.getElementById("navbar");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
        navbar.style.backgroundColor = '#16222b'
      } else {
        navbar.style.backgroundColor = 'transparent'
      }
    };

  }, [])

  const NavItem = (props) => {
    return <li className='mx-3 my-6 transition-colors duration-300 lg:my-0 hover:text-accent' >
      <Link href={`/${props.route}`}>{props.title}</Link>
    </li>
  }

  const MobileDropdown = () => {
    return <nav 
      tabIndex={0} 
      className={`lg:hidden fixed z-50 w-full px-2 py-2 list-none bg-[#0e161c] mt-14 ${dropdown || 'hidden'}`} 
      id='dropdown'
      >
        <NavItem route='' title='Início' />
        <NavItem route='feed' title='Doações' />
        <NavItem route='transparency' title='O que estamos fazendo?' />
        <NavItem route='places' title='Pontos de coleta' />
    </nav>
  }

  return <>
    <nav className='fixed flex w-full px-6 py-2 transition-colors duration-300 lg:px-20 lg:py-8' ref={navbar} id='navbar' style={{backgroundColor: dropdown ? '#16222b' : 'transparent'}}>
      <div className='mr-auto cursor-pointer'>
         <Link href='/'><img src="/logo_vertical.png" className='hidden w-64 lg:block'/></Link>
         <Link href='/'><img src="/logo.svg" className='w-24 lg:hidden'/></Link>
      </div>
      <div className='hidden ml-auto lg:block'>
        <ul className='flex flex-row'>
        <NavItem route='' title='Início' />
        <NavItem route='feed' title='Doações' />
        <NavItem route='transparency' title='O que estamos fazendo?' />
        <NavItem route='places' title='Pontos de coleta' />
        </ul>
      </div>
      <button 
          className='lg:hidden ml-auto text-[#fff] cursor-pointer'
          onClick={()=>{
            setDropdown(!dropdown)
          }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="feather feather-menu">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>
    </nav>
    <MobileDropdown />
  </>
};

export default navbar;