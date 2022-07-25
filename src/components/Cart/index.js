import {Component} from 'react'

import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import CartItemCard from '../CartItemCard'
import CartContext from '../../Context/CartContext'

class Cart extends Component {
  state = {isPlacedOrder: false}

  changedToPlaced = () => {
    this.setState({isPlacedOrder: true})
  }

  clearCart = () => {
    const {removeAll} = this.props
    removeAll()
  }

  renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517285/TastyKitchen/No-items-in-cart_ipjoai.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessful = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517127/TastyKitchen/payment-successful-icon_phlnbp.png"
        alt="payment successful"
        className="payment-img"
      />
      <h1 className="empty-cart-heading">Payment Successful</h1>
      <p className="empty-cart-para">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button
          type="button"
          className="order-now-btn go-to-btn"
          onClick={this.clearCart}
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItems = cartContextList => {
    const priceList = cartContextList.map(
      eachCart => eachCart.cost * eachCart.quantity,
    )
    const totalPrice = priceList.reduce((a, b) => a + b)
    return (
      <>
        <div className="large-devices-cart-header-bg">
          <div className="large-devices-cart-header">
            <h1 className="food-name margin-adjust">Item</h1>
            <h1 className="food-name">Quantity</h1>
            <h1 className="food-name padding-adjust">Price</h1>
          </div>

          <ul className="cart-items-list-container">
            {cartContextList.map(eachCart => (
              <CartItemCard cartItem={eachCart} key={eachCart.id} />
            ))}
          </ul>
          <hr className="hr-rule-line" />
          <div className="order-total-container">
            <h1 className="order-total">Order Total:</h1>
            <p className="total-price" testid="total-price">
              <BiRupee size={24} style={{paddingTop: '5px'}} />
              {totalPrice}
            </p>
          </div>
          <div className="place-btn-container">
            <button
              type="button"
              className="order-now-btn"
              onClick={this.changedToPlaced}
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="small-devices-cart-container">
          <ul className="cart-items-list-container-small">
            {cartContextList.map(eachCart => (
              <CartItemCard cartItem={eachCart} key={eachCart.id} />
            ))}
          </ul>
          <hr className="hr-rule-line" />
          <div className="order-total-container">
            <h1 className="order-total small-devices-size">Order Total:</h1>
            <p className="total-price small-devices-size" testid="total-price">
              <BiRupee size={24} style={{paddingTop: '5px'}} />
              {totalPrice}
            </p>
          </div>
          <div className="place-btn-container">
            <button
              type="button"
              className="order-now-btn"
              onClick={this.changedToPlaced}
            >
              Place Order
            </button>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  renderRespectiveItem = cartContextList =>
    cartContextList.length === 0
      ? this.renderEmptyCart()
      : this.renderCartItems(cartContextList)

  render() {
    const {isPlacedOrder} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartContextList} = value
          return (
            <>
              <Header />
              <div className="cart-bg-outside-container">
                <div className="cart-bg-container">
                  {isPlacedOrder
                    ? this.renderPaymentSuccessful()
                    : this.renderRespectiveItem(cartContextList)}
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
