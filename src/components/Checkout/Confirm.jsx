import React from 'react'
import { Link } from 'react-router-dom'

const Confirm = ({ order }) => {
    console.log(order)
    return (
        <div className='flex w-full h-screen -mt-14 justify-center items-center'>
            <div className=' flex flex-col justify-center items-center w-[300px] sm:w-[450px] md:w-[550px] h-[300px] bg-red-100 rounded-[5px]'>
                <h1 className=' text-red-900 font-semibold text-[30px] sm:text-[35px] text-center mb-4' >
                    Thank You for the Purchase!
                    <p className='text-[16px] sm:text-[20px] font-medium mt-2'>
                        Check Your Email for Order Details.
                    </p>
                </h1>
                <Link to='/'>
                    <button
                        className='bg-red-800 text-red-100 px-3 py-1 ease-linear 
                            duration-100 rounded-[5px] hover:bg-red-600
                        '
                    >   
                        Back To Home
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Confirm