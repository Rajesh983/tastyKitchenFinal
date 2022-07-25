import React from 'react'

const CartContext = React.createContext({
  cartContextList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
