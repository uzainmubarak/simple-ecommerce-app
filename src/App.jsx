import { useState, useEffect } from 'react'
import commerce from './Lib/commerce'
// import {Routes, Route} from 'react-router-dom'
import './App.css'
import Cart from './components/Cart/Cart'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Checkout from './components/Checkout/Checkout'



function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState()
  const [order, setOrder] = useState()



  useEffect(() => {
    let isCancelled = false
    const fetchProducts = async () => {
      const { data } = await commerce.products.list()
      if (!isCancelled) {
        setProducts(data)

      }
    }
    const fetchCart = async () => {
      const cartData = await commerce.cart.retrieve()
      if (!isCancelled) {
        setCart(cartData)
      }
    }
    fetchProducts()
    fetchCart()

    return () => {
      isCancelled = true
    }
  }, [])


  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdateQty = async (productId, quantity) => {
    const qty = await commerce.cart.update(productId, { quantity })
    setCart(qty)
  }

  const handleRemoveProduct = async (productId) => {
    const removed = await commerce.cart.remove(productId)
    setCart(removed)
  }

  const handleEmptyCart = async () => {
    const empty = await commerce.cart.empty()
    setCart(empty)
  }


 

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
    console.log(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      console.log(incomingOrder)
      refreshCart()
    } catch (error) {
      console.log(error)
    }
  }




  return (

    <div className="App">
      <NavBar cart={cart} />
      <Routes>
        <Route path='/' element={<Home products={products} onAddToCart={handleAddToCart} />} />
        <Route path='/cart' element={
          <Cart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveProduct={handleRemoveProduct}
            onEmptyCart={handleEmptyCart}
          />
        } />
        <Route path='/checkout' element={
          cart &&
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} />
        } />
      </Routes>
    </div>

  )
}

export default App