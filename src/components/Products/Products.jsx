import React from 'react'
import Product from './Product/Product'


const Products = ({products, onAddToCart}) => {
  


  return (
    <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4'>
      {products.map(product => ( <div key={product.id} >

        <Product 
          
          product={product} 
          onAddToCart={onAddToCart} 
        />
        </div>
      ))}
    </div>
  )
}

export default Products