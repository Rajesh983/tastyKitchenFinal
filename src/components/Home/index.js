import {Component} from 'react'
import {BsFilterLeft} from 'react-icons/bs'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CarouselOffers from '../CarouselOffers'
import RestaurantCard from '../RestaurantCard'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    restaurantsList: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    searchInput: '',
    isLoading: false,
    totalPages: null,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const {selectedSortByValue, searchInput, activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=9&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(apiUrl, options)
    const restaurantsData = await data.json()
    let totalPages
    if (restaurantsData.total !== undefined) {
      totalPages = Math.ceil(restaurantsData.total / limit)
    }

    let updatedData

    if (restaurantsData.restaurants === undefined) {
      updatedData = []
    } else {
      updatedData = restaurantsData.restaurants.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        rating: eachItem.user_rating.rating,
        totalReviews: eachItem.user_rating.total_reviews,
      }))
    }

    this.setState({
      restaurantsList: updatedData,
      totalPages,
      isLoading: false,
    })
  }

  onChangeSortBy = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsList,
    )
  }

  updatingSearchText = event => {
    this.setState({searchInput: event.target.value}, this.getRestaurantsList)
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  incrementPage = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  renderLoader = () => (
    <div className="restaurants-list-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurants = () => {
    const {restaurantsList, activePage, totalPages} = this.state
    return restaurantsList.length === 0 ? (
      <div className="no-restaurants-container">
        <h1 className="no-restaurants-heading">No Restaurants Found</h1>
      </div>
    ) : (
      <>
        <ul className="restaurants-list-container">
          {restaurantsList.map(eachRest => (
            <RestaurantCard restData={eachRest} key={eachRest.id} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-left-button"
            onClick={this.decrementPage}
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={25} color="#334155" />
          </button>
          <p testid="active-page-number" className="page-count">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pagination-right-button"
            onClick={this.incrementPage}
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={25} color="#334155" />
          </button>
        </div>
      </>
    )
  }

  render() {
    const {selectedSortByValue, isLoading, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="home-bg-outside-container">
          <div className="home-bg-container">
            <CarouselOffers />
            <div className="popular-restaurants-bg-container">
              <div className="heading-para-sorting-bg-container">
                <div className="heading-para-sorting-container">
                  <div className="heading-para-container">
                    <h1 className="popular-restaurants-heading">
                      Popular Restaurants
                    </h1>
                    <p className="popular-para">
                      Select Your favourite restaurant special dish and make
                      your day happy...
                    </p>
                  </div>
                  <div className="sort-by-container">
                    <BsFilterLeft className="sort-by-icon" />
                    <p className="sort-by">Sort by</p>
                    <select
                      className="sort-by-select"
                      value={selectedSortByValue}
                      onChange={this.onChangeSortBy}
                    >
                      {sortByOptions.map(eachOption => (
                        <option
                          key={eachOption.id}
                          value={eachOption.value}
                          className="select-option"
                        >
                          {eachOption.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <hr className="hr-line" />
              <input
                type="search"
                className="search-box"
                placeholder="Search Restaurant"
                value={searchInput}
                onChange={this.updatingSearchText}
              />
              {isLoading ? this.renderLoader() : this.renderRestaurants()}
              <Footer />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
