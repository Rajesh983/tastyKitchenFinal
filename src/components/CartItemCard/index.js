import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItemCard = props => {
  const {cartItem} = props
  const {cost, id, imageUrl, name, quantity} = cartItem

  return (
    <CartContext.Consumer>
      {value => {
        const {incrementCartItemQuantity, decrementCartItemQuantity} = value

        const onClickDecrement = () => {
          decrementCartItemQuantity(id)
        }

        const onClickIncrement = () => {
          incrementCartItemQuantity(id)
        }

        return (
          <>
            <li className="food-item small-devices-item" testid="cartItem">
              <img src={imageUrl} alt={name} className="food-item-img" />
              <div className="food-item-details">
                <h1 className="food-name margin-space">{name}</h1>

                <div className="buttons-container margin-space">
                  <button
                    type="button"
                    className="quantity-btn"
                    testid="decrement-quantity"
                    onClick={onClickDecrement}
                  >
                    <BsDashSquare
                      size={20}
                      style={{color: '#475569', marginRight: '3px'}}
                    />
                  </button>
                  <p testid="item-quantity" className="active-count">
                    {quantity}
                  </p>
                  <button
                    type="button"
                    className="quantity-btn"
                    testid="increment-quantity"
                    onClick={onClickIncrement}
                  >
                    <BsPlusSquare
                      size={20}
                      style={{color: '#475569', marginLeft: '3px'}}
                    />
                  </button>
                </div>
                <p className="price price-color">
                  <BiRupee size={16} />
                  {cost}
                </p>
              </div>
            </li>
            <li className="food-item large-devices-item" testid="cartItem">
              <div className="img-name-container">
                <img src={imageUrl} alt={name} className="food-item-img" />
                <h1 className="food-name margin-space">{name}</h1>
              </div>
              <div className="buttons-container margin-space">
                <button
                  type="button"
                  className="quantity-btn"
                  testid="decrement-quantity"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare
                    size={20}
                    style={{color: '#475569', marginRight: '3px'}}
                  />
                </button>
                <p testid="item-quantity" className="active-count">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-btn"
                  testid="increment-quantity"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare
                    size={20}
                    style={{color: '#475569', marginLeft: '3px'}}
                  />
                </button>
              </div>
              <p className="price price-color">
                <BiRupee size={16} />
                {cost}
              </p>
            </li>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItemCard
