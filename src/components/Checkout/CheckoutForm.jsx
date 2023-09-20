
import { useState } from 'react';
import { useForm } from "react-hook-form";
import InputField from "../../UI/InputField/InputField";
import Error from "../../UI/Error/Error";
import SubmitButton from "../../UI/SubmitButton/SubmitButton";
import Shipping from './Shipping';

const CheckoutForm = ({ checkoutToken, setShippingData, nextStep, onCheckShippingOption }) => {


  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOption, setShippingOption] = useState('')


  // REACT FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const required = {
    required: {
      value: true,
      message: "This field is required!"
    }
  }

  const validate = {
    ...required,
    email: {
      ...required,
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter a valid email address!"
      }
    }
  }// END REACT FORM VALIDATION

  const onSubmit = (data) => {
    setShippingData({...data, shippingCountry, shippingSubdivision, shippingOption});
    onCheckShippingOption(checkoutToken.id, {
      shipping_option_id: shippingOption, 
      country: shippingCountry, 
      region: shippingSubdivision
    })
    nextStep()
  };


  if (!checkoutToken) return <div>Loading...</div>
  else return (
    <div className="flex flex-col w-full items-center pb-10">
      <h1 className="
      text-[30px] 
      text-red-900 
      font-medium
      mt-5">
        Enter Your Details
      </h1>
      <form className='flex flex-col w-[310px] sm:w-96' onSubmit={handleSubmit(onSubmit)}>

        <InputField
          label="Full Name"
          type="text"
          placeholder="Full Name"
          {...register("fullName", required)}
        />
        <Error errorMessage={errors?.fullName?.message} />

        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email", validate.email)} />
        <Error errorMessage={errors?.email?.message} />

        <InputField
          label="Phone Number"
          option="(Optional)"
          type="tel"
          placeholder="Phone Number"
          {...register("phoneNumber")}
        />

        <InputField
          label="Street Address"
          type="text"
          placeholder="Street address"
          {
          ...register("streetAddress", required)
          }
        />
        <Error errorMessage={errors?.streetAddress?.message} />

        <InputField
          label="City"
          type="text"
          placeholder="City"
          {
          ...register("city", required)
          }
        />
        <Error errorMessage={errors?.city?.message} />

        {
        <Shipping
          shippingCountry={shippingCountry} 
          setShippingCountry={setShippingCountry}
          shippingSubdivision ={shippingSubdivision }
          setShippingSubdivision={setShippingSubdivision}
          setShippingOption={setShippingOption}
          register={register} checkoutToken={checkoutToken} 
        />
        }
        
        <SubmitButton style={{marginTop: "2rem"}} type="submit" value="Submit" />
        
      </form>
    </div>
  );
};

export default CheckoutForm;
