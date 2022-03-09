import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div>
      <ul className="nav-menu">
        <li>
          <Link to="/">
            <h1 className="covid19">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
        </li>
        <li className="nav-menu-item home">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-menu-item about">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
