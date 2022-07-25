import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517194/TastyKitchen/Page-not-found_v4bvuj.png"
      alt="not found"
      className="empty-cart-img not-found-img"
    />
    <h1 className="empty-cart-heading">Page Not Found</h1>
    <p className="empty-cart-para">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <button type="button" className="order-now-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
