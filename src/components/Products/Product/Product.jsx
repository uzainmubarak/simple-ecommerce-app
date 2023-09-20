import React from 'react'



const Product = ({product, onAddToCart}) => {
  

  
  return (
    <div className=' w-auto'>
      <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8' >
        <img src={product.image.url} className="w-full h-full object-center object-cover group-hover:opacity-75 hover:scale-110 ease-out duration-300"/>
      </div>

      <h2 className='text-lg font-normal mt-4'>{product.name}</h2>
      
      <div className='text-xs font-normal text-slate-600' dangerouslySetInnerHTML={{__html: product.description}} />
      <h5 className='text-lg font-semibold mt-3 mb-2' >{product.price.formatted_with_symbol}</h5>
      <button className=' bg-rose-800 w-full py-1 text-rose-300 hover:bg-rose-600 ease-in duration-100 rounded-md' onClick={() => onAddToCart(product.id, 1)} >Add to cart</button>
    </div>

  )
}

export default Product