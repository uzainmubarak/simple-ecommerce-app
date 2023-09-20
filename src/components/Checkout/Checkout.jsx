import commerce from '../../Lib/commerce'
import React, { useState, useEffect } from 'react'
import CheckoutForm from './CheckoutForm'
import Payment from './Payment'
import Confirm from './Confirm'

// const steps = ['Shipping details', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout }) => {

    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState()

    const [checkoutToken, setCheckoutToken] = useState()
    
    // GENERATE TOKEN
    const generateToken = async (cart) => {

        const token = await commerce.checkout.generateTokenFrom('cart', cart.id)
        setCheckoutToken(token)

    }// END GENERATE TOKEN

    useEffect(() => {
        if (cart?.line_items?.length !== 0) {
            generateToken(cart)
        }
    }, [cart])

    const handleCheckShippingOption = async (checkoutTokenId, shippingRegion) => {
        const shippingMethod = await commerce.checkout.checkShippingOption(checkoutTokenId, shippingRegion)
        console.log(shippingMethod)
        setCheckoutToken(shippingMethod)
    }


    const nextStep = () => {
        setActiveStep(prevStep => prevStep + 1)
    }
    const backStep = () => {
        setActiveStep(prevStep => prevStep - 1)
    }

    const Form = () => (

        activeStep === 0 ?
            <CheckoutForm
                cart={cart}
                checkoutToken={checkoutToken}
                setShippingData={setShippingData}
                ShippingData={shippingData}
                nextStep={nextStep}
                onCheckShippingOption={handleCheckShippingOption}
            />
            :
            <Payment
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                backStep={backStep}
                shippingData={shippingData}
                onCaptureCheckout={onCaptureCheckout}
            />

    )



    return (
        <div>
            { activeStep === 2 ? <Confirm order={order}/> : checkoutToken &&  <Form /> }
        </div>
    )
}

export default Checkout