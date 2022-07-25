import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="logo-container">
      <img
        src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1658333499/TastyKitchen/Frame_275_gfufnc.png"
        alt="website-footer-logo"
        className="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons-container">
      <FaPinterestSquare
        className="footer-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="footer-icon" testid="instagram-social-icon" />
      <FaTwitter className="footer-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="footer-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
