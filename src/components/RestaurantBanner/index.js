import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const RestaurantBanner = props => {
  const {restDetails} = props
  const {
    imageUrl,
    name,
    cuisine,
    location,
    rating,
    reviewsCount,
    costForTwo,
  } = restDetails

  return (
    <div className="banner-bg-container">
      <img src={imageUrl} alt="restaurant" className="banner-img" />
      <div className="rest-details-container">
        <h1 className="name-heading">{name}</h1>
        <p className="cuisine">{cuisine}</p>
        <p className="location">{location}</p>
        <div className="rating-cost-container">
          <div className="rating-outside-container">
            <div className="rating-container">
              <AiFillStar style={{color: '#ffffff'}} />
              <p className="rating">{rating}</p>
            </div>
            <p className="total-ratings">{reviewsCount}+Ratings</p>
          </div>
          <div className="cost-outside-container">
            <div className="cost-container">
              <BiRupee style={{color: '#ffffff'}} />
              <p className="cost">{costForTwo}</p>
            </div>
            <p className="cost-for-two">Cost for two</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBanner
