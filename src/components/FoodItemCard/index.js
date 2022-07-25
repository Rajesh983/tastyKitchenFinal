import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const FoodItemCard = props => {
  const {
    foodItem,
    onAddingToCartList,
    checkRes,
    quantityCheck,
    onIncrementingQuantity,
    onDecrementingQuantity,
  } = props
  const {cost, id, imageUrl, name, rating} = foodItem
  let {quantity} = foodItem

  if (quantityCheck !== undefined) {
    quantity = quantityCheck.quantity
  }

  const onAddingItem = () => {
    onAddingToCartList(foodItem)
  }

  const onClickDecrement = () => {
    onDecrementingQuantity(id)
  }

  const onClickIncrement = () => {
    onIncrementingQuantity(id)
  }

  return (
    <li className="food-item" testid="foodItem">
      <img src={imageUrl} alt="food item" className="food-item-img" />
      <div className="food-item-details">
        <h1 className="food-name">{name}</h1>
        <p className="price">
          <BiRupee size={13} />
          {cost}
        </p>

        <p className="food-rating">
          <AiFillStar
            size={15}
            style={{color: '#FFB81C', marginRight: '3px'}}
          />
          {rating}
        </p>

        {checkRes === -1 ? (
          <button type="button" className="add-btn" onClick={onAddingItem}>
            ADD
          </button>
        ) : (
          <div className="buttons-container">
            <button
              type="button"
              className="quantity-btn"
              testid="decrement-count"
              onClick={onClickDecrement}
            >
              <BsDashSquare
                size={20}
                style={{color: '#475569', marginRight: '3px'}}
              />
            </button>
            <p testid="active-count" className="active-count">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-btn"
              testid="increment-count"
              onClick={onClickIncrement}
            >
              <BsPlusSquare
                size={20}
                style={{color: '#475569', marginLeft: '3px'}}
              />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItemCard
