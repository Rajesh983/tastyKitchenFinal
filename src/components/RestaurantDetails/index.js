import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import RestaurantBanner from '../RestaurantBanner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'
import CartContext from '../../Context/CartContext'

class RestaurantDetails extends Component {
  state = {
    isLoading: true,
    restDetails: {},
    foodItemsList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const data = await fetch(apiUrl, options)

    const updatedData = await data.json()

    const updatedRestDetails = {
      id: updatedData.id,
      imageUrl: updatedData.image_url,
      name: updatedData.name,
      location: updatedData.location,
      rating: updatedData.rating,
      reviewsCount: updatedData.reviews_count,
      costForTwo: updatedData.cost_for_two,
      cuisine: updatedData.cuisine,
    }

    const foodItems = updatedData.food_items.map(eachItem => ({
      cost: eachItem.cost,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
      quantity: 1,
    }))

    this.setState({
      restDetails: updatedRestDetails,
      foodItemsList: foodItems,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
    const {restDetails, foodItemsList} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            cartContextList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          return (
            <>
              <RestaurantBanner restDetails={restDetails} />
              <ul className="food-items-list-container">
                {foodItemsList.map(eachItem => (
                  <FoodItemCard
                    foodItem={eachItem}
                    key={eachItem.id}
                    onAddingToCartList={addCartItem}
                    checkRes={cartContextList.findIndex(
                      eachOne => eachOne.id === eachItem.id,
                    )}
                    quantityCheck={cartContextList.find(
                      eachOne => eachOne.id === eachItem.id,
                    )}
                    onIncrementingQuantity={incrementCartItemQuantity}
                    onDecrementingQuantity={decrementCartItemQuantity}
                  />
                ))}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="large-container">
          <div className="restaurant-details-bg-outside-container">
            <div className="restaurant-details-bg-container">
              {isLoading ? this.renderLoader() : this.renderDetails()}
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default RestaurantDetails
