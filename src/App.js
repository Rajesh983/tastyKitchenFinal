import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import CartContext from './Context/CartContext'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function getCartListFromLocalStorage() {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

const cartList = getCartListFromLocalStorage()

class App extends Component {
  state = {addedToCartList: cartList}

  onAddingToCartList = cartItem => {
    this.setState(
      prevState => ({
        addedToCartList: [...prevState.addedToCartList, cartItem],
      }),
      this.onUpdatingCartData,
    )
  }

  onDecrementingQuantity = id => {
    const {addedToCartList} = this.state
    const targetItem = addedToCartList.find(eachObj => eachObj.id === id)
    const {quantity} = targetItem
    if (quantity > 1) {
      this.setState(
        prevState => ({
          addedToCartList: prevState.addedToCartList.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity: quantity - 1}
            }
            return eachItem
          }),
        }),
        this.onUpdatingCartData,
      )
    } else {
      this.setState(
        prevState => ({
          addedToCartList: prevState.addedToCartList.filter(
            eachItem => eachItem.id !== id,
          ),
        }),
        this.onUpdatingCartData,
      )
    }
  }

  onIncrementingQuantity = id => {
    const {addedToCartList} = this.state
    const targetItem = addedToCartList.find(eachObj => eachObj.id === id)
    const {quantity} = targetItem
    this.setState(
      prevState => ({
        addedToCartList: prevState.addedToCartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: quantity + 1}
          }
          return eachItem
        }),
      }),
      this.onUpdatingCartData,
    )
  }

  emptyCartList = () => {
    this.setState({addedToCartList: []}, this.onUpdatingCartData)
  }

  onUpdatingCartData = () => {
    const {addedToCartList} = this.state

    const updatedCartData = addedToCartList.map(eachCart => ({
      cost: eachCart.cost,
      id: eachCart.id,
      quantity: eachCart.quantity,
      imageUrl: eachCart.imageUrl,
      name: eachCart.name,
    }))
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  }

  render() {
    const {addedToCartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartContextList: addedToCartList,
          addCartItem: this.onAddingToCartList,
          decrementCartItemQuantity: this.onDecrementingQuantity,
          incrementCartItemQuantity: this.onIncrementingQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            target="_blank"
            component={RestaurantDetails}
          />
          <ProtectedRoute
            exact
            path="/cart"
            target="_blank"
            component={() => <Cart removeAll={this.emptyCartList} />}
          />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
