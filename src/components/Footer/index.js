import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="footer-header">
      COVID19<span className="footer-header2">INDIA</span>
    </h1>
    <p className="footer-para">
      we stand with everyone fighting on the front lines
    </p>
    <div className="social-icons-container">
      <VscGithubAlt className="social-icons" />
      <FiInstagram className="social-icons" />
      <FaTwitter className="social-icons" />
    </div>
  </div>
)

export default Footer
