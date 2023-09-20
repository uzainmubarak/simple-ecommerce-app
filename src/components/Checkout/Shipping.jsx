import React from 'react'
import commerce from '../../Lib/commerce'
import { useEffect, useState } from 'react';

const SelectStyles = 'border-2 border-red-200 text-red-900 text-md rounded-[5px]  focus:outline-none focus:border-2 focus:border-solid focus:border-red-400 focus:bg-red-100 placeholder-red-900 ease-in-out duration-300 block w-full px-3 py-1 mt-2'


const Shipping = (
    { checkoutToken,
        shippingCountry,
        setShippingCountry,
        shippingSubdivision,
        setShippingSubdivision,
        setShippingOption
    }) => {

    


    const [shippingCountries, setShippingCountries] = useState();
    const [shippingSubdivisions, setShippingSubdivisions] = useState();
    const [shippingOptions, setShippingOptions] = useState();
    


    useEffect(() => {
        // FETCH SHIPPING COUNTRIES
        const fetchShippingCountries = async (checkoutToken) => {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutToken);

            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[1]);
        }// END FETCH SHIPPING COUNTRIES


        fetchShippingCountries(checkoutToken.id)


    }, []);



    // USEEFFECT fetchSubdivisions
    useEffect(() => {
        const fetchSubdivisions = async (countryCode) => {
            const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

            setShippingSubdivisions(subdivisions);
            setShippingSubdivision(Object.keys(subdivisions)[1]);
        }
        if (shippingCountry) {

            fetchSubdivisions(shippingCountry)
        };

    }, [shippingCountry])
    // END USEEFFECT fetchSubdivisions


    // USEEFFECT fetchShippingOptions
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])
    // END USEEFFECT fetchShippingOptions

    return (
        <>
            <div className='flex flex-col mt-3' >
                <label className='
                text-red-900 
                font-semibold 
                w-full 
                text-left'
                >
                    Country
                </label>
                <select value={shippingCountry}
                    onChange={(e) => (setShippingCountry(e.target.value))}
                    className={SelectStyles} >
                    {shippingCountries && Object.entries(shippingCountries).map(([code, name]) => (
                        { id: code, country: name }
                    )).map((item) => (<option key={item.id} value={item.id}>{item.country}</option>))}
                </select>
            </div>

            <div className='flex flex-col mt-3' >
                <label className='
                text-red-900 
                font-semibold 
                w-full 
                text-left'
                >
                    Subdivision
                </label>
                <select value={shippingSubdivision}
                    onChange={(e) => (setShippingSubdivision(e.target.value))}
                    className={SelectStyles}
                >

                    {shippingSubdivisions && Object.entries(shippingSubdivisions).map(([code, name]) => (
                        { id: code, subdivision: name }
                    )).map((item) => (<option key={item.id} value={item.id}>{item.subdivision}</option>))}
                </select>
            </div>

            <div className='flex flex-col mt-3' >
                <label className='
                text-red-900 
                font-semibold 
                w-full 
                text-left'
                >
                    Shipping Option
                </label>

                <select 
                
                    onChange={(e) => (setShippingOption(e.target.value))}
                    className={SelectStyles}
                >
                    {
                        shippingOptions &&
                        shippingOptions.map((SO) => (
                            {
                                id: SO.id,
                                label: `${SO.description} - ${SO.price.formatted_with_symbol}`
                            }
                        )).map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.label}
                            </option>
                        ))
                    }
                    
                </select>


            </div>
        </>
    )
}

export default Shipping