import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/sandeep321/image/upload/v1645439193/covid%20dashboard/Not_found_lbdryn.png"
      alt="not-found-pic"
      className="not-found-img"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
