import React from 'react'
import Products from '../Products/Products'


const Home = ({ products, onAddToCart }) => {
    return (
        <>
            <Products products={products} onAddToCart={onAddToCart} />
        </>
    )
}

export default Home