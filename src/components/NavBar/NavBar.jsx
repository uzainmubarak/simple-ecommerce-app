import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

const NavBar = ({cart}) => {

  

  return (
    <div className='flex justify-between items-center px-5 py-6 border-b-2 border-b-rose-100'>
      <Link to='/'>
        <div className='text-xl text-red-900 font-semibold font-serif'>
          UBM
        </div>
      </Link>
      <Link to='/cart'>
        <div className={` ${styles.icon} flex flex-row items-center w-auto h-auto px-6 py-3 hover:bg-red-100 active:bg-red-300 ease-in-out duration-150 rounded-full cursor-pointer`}>
          <FiShoppingCart className='text-red-900 h-5 w-5' />
          { cart && <span className='bg-red-100 rounded-full text-red-900 text-sm ml-2 px-2 py-[2px] ease-in duration-150' >{cart.total_items}</span>}
        </div>
      </Link>
    </div>
  )
}

export default NavBar