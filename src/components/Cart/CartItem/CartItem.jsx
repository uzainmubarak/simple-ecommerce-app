import React from 'react'
import { BiMinus, BiPlus } from "react-icons/bi";

const CartItem = ({ item, onUpdateQty, onRemoveProduct }) => {



  return (
    <div key={item.id} className='flex mx-2 my-4'>
      {/* Item image */}
      <div className='w-2/5 h-auto'>
        <img className='w-32' src={item.image.url} alt={item.name} />
      </div>
      <div className='w-3/5'>

        <div className='w-full flex flex-row justify-between items-center my-2'>
          {/* Item name */}
          <div className='text-base font-medium text-red-900'>{item.name}</div>

          {/* Remove item */}
          <button 
            className='text-sm text-red-500 hover:underline hover:decoration-1 hover:decoration-red-400' 
            onClick={() => { onRemoveProduct(item.id) }} 
          >
            Remove
          </button>
        </div>

        <div className='w-full flex flex-row justify-between items-center'>
          {/* Item Quantity */}
          <div className='flex'>
            <div className='active:rounded-full'>
              <button
                className='bg-red-100 p-1 rounded-full ease-linear duration-100 active:bg-red-300'
                onClick={() => { onUpdateQty(item.id, item.quantity - 1) }}
              >
                <BiMinus />
              </button>
            </div>
            <div className='text-base mx-1'>{item.quantity}</div>
            <div>
              <button
                className='bg-red-100 p-1 rounded-full ease-linear duration-100 active:bg-red-300'
                onClick={() => { onUpdateQty(item.id, item.quantity + 1) }}
              >
                <BiPlus />
              </button>
            </div>
          </div>
          {/* Total item price */}
          <div className='flex flex-col items-center'>
            <div className='text-center text-sm'>{item.line_total.formatted_with_symbol}</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartItem