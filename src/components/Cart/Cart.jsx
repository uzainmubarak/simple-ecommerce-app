import React from 'react'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, onUpdateQty, onRemoveProduct, onEmptyCart }) => {

    const EmptyCart = () => {
        return (
            <div>You have no products in the cart! Go to <Link to='/' className='decoration-red-500 underline decoration-2 text-red-500'>Home Page</Link> to add items to the cart!</div>
        )
    }

    if (!cart) return <div>Loading</div>


    return (

        <div className='flex flex-col w-full justify-center px-2'>
            {cart.line_items.length === 0 ? < EmptyCart /> :
                <div>

                    <div className='w-full mt-4'>
                        {cart.line_items.map((line_item) => (
                            <CartItem
                            key={line_item.id}
                                item={line_item}
                                onUpdateQty={onUpdateQty}
                                onRemoveProduct={onRemoveProduct}
                                onEmptyCart={onEmptyCart}

                            />))
                        }
                    </div>
                    <div className='w-full px-2 border-t-2 border-red-100'>
                        <div className='mt-4 mb-4'>
                            Total: {cart.subtotal.formatted_with_symbol}
                        </div>
                        <button
                            className='border-2	border-red-600
                            text-red-500 hover:text-red-100 
                            rounded-lg 
                            px-3 py-1 mr-10 
                           hover:bg-red-600 
                            ease-linear 
                            duration-100'
                            onClick={onEmptyCart}
                        >
                            Empty cart
                        </button>
                        <Link to='/checkout'
                            
                            className='bg-red-600 
                            text-red-100
                            px-3 py-[6px]
                            rounded-lg'
                        >   
                            Checkout
                        </Link>
                    </div>

                </div>
            }
        </div>

    )
}

export default Cart