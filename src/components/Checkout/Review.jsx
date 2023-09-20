import React from 'react'

const Review = ({ checkoutToken }) => {

    const Product = ({ lineItem }) => {
        return (
            <div className='flex justify-between border-solid border-b border-red-300 pt-2 pb-2'>
                <div>
                    <div className='text-red-900 text-base'>{lineItem.name}
                    </div>

                    <div className='text-red-400 text-[13px]'>
                        Qty: {lineItem.quantity}
                    </div>
                </div>
                <div className='text-sm text-red-800'>
                    {lineItem.price.formatted_with_symbol}
                </div>
            </div>
        )
    }


    return (
        <>
            <div className='flex flex-col justify-between'>
                {
                    checkoutToken.line_items.map((lineItem) => (
                        <div key={lineItem.id}>
                            <Product lineItem={lineItem} />
                        </div>

                    ))
                }
            </div>

            <div className=' flex- flex-col mb-3 pt-3 text-sm font-semibold text-red-900 text-right'>
                <div>
                    Delivery Charges: {checkoutToken.shipping.price.formatted_with_symbol}
                </div>
                <div>
                    Sub Total: {checkoutToken.subtotal.formatted_with_symbol}
                </div>
            </div>
        </>
    )
}

export default Review