import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SearchListItem = props => {
  const {stateDetails, id} = props
  const {stateName, stateCode} = stateDetails
  return (
    <li className="search-list-item">
      <Link to={`/state/${id}`} className="link">
        <div className="container">
          <p className="state-name">{stateName}</p>

          <p type="button" className="state-code">
            {stateCode}
            <BiChevronRightSquare
              testid="searchResultChevronRightIcon"
              className="chevron-icon"
            />
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SearchListItem
