import React from 'react'
import Review from './Review'
import InputField from '../../UI/InputField/InputField'
import { useForm } from 'react-hook-form'


const Payment = ({ checkoutToken, backStep, nextStep, shippingData, onCaptureCheckout }) => {

    const { register, handleSubmit } = useForm()

    



    const onSubmit = () => {
        const orderData = {
            line_items: checkoutToken.line_items,
            customer: {
                fullName: shippingData.fullName,
                email: shippingData.email,
                phoneNumber: shippingData.phoneNumber
            }, //CUSTOMER
            shipping: {
                name: shippingData.fullName,
                street: shippingData.streetAddress,
                town_city: shippingData.city,
                county_state: shippingData.shippingSubdivision,
                country: shippingData.shippingCountry
            }, //SHIPPING ADDRESS
            fulfillment: {
                shipping_method: shippingData.shippingOption
            }, //FULLFILMENT
            payment: {
                gateway: 'test_gateway',
                card: {
                    number: '4242 4242 4242 4242',
                    expiry_month: '01',
                    expiry_year: '2023',
                    cvc: '123',
                    postal_zip_code: '94103',
                } // CARD
            } // PAYMENTS
        } // ORDER DATA
        onCaptureCheckout(checkoutToken.id, orderData)
        nextStep()
    }


    return (
        <div className='flex w-full items-center h-screen justify-center'>
            <div className='bg-red-100 rounded-[5px] w-[300px] sm:w-96 px-2 pt-3 pb-3'>

                <Review checkoutToken={checkoutToken} />

                <form onSubmit={handleSubmit(onSubmit)} >
                        <InputField label="Card Number" value="4242424242424242" {...register("cardNumber")}/>
                        <InputField label="Card Expiry Month" value="01" {...register("expiryMonth")}/>
                        <InputField label="Card Expiry Year" value="23" {...register("expiryYear")}/>
                        <InputField label="CVC" value="123" {...register("cvc")}/>
                        <InputField label="ZIP code" value="94103" {...register("zipCode")}/>
                    <div className='flex flex-row h-10 justify-between items-center'>


                        <button
                            className='                        
                                text-red-500 
                                hover:bg-red-200 
                                rounded-[5px] 
                                px-3 py-1
                                ease-linear 
                                duration-100'
                            onClick={backStep}>
                            Back
                        </button>
                        <input 
                            className='bg-red-800 text-red-100 px-3 py-1 ease-linear 
                                duration-100 rounded-[5px] hover:bg-red-600' 
                            type="submit" 
                            value={`Pay ${checkoutToken.total.formatted_with_symbol}`}
                        />

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Payment