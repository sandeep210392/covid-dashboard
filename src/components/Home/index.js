import {Component} from 'react'
// eslint-disable-next-line
import {Redirect, Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import SearchListItem from '../SearchListItem'
import DashBoard from '../Dashboard'

import './index.css'

const initialStatesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

// eslint-disable-next-line
const formattedData = initialStatesList.map(eachState => ({
  stateName: eachState.state_name,
  stateCode: eachState.state_code,
}))

class Home extends Component {
  state = {
    statesList2: formattedData,
    searchInput: '',
  }

  componentDidMount() {
    this.getStatesData()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getStatesData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    // eslint-disable-next-line
    const data = await response.json()
  }

  render() {
    // eslint-disable-next-line
    const {statesList2, searchInput} = this.state
    const searchResults = statesList2.filter(eachState =>
      eachState.stateName.toLowerCase().includes(searchInput),
    )
    return (
      <div className="home-container">
        <Header />
        <div className="search-bar-container">
          <BsSearch className="search-icon" type="button" />
          <input
            type="search"
            value={searchInput}
            className="search-bar"
            onChange={this.onChangeSearchInput}
          />
        </div>
        <div>
          {searchInput !== '' && (
            <ul
              testid="searchResultsUnorderedList"
              className="search-list-container"
            >
              {searchResults.map(eachState => (
                <SearchListItem
                  stateDetails={eachState}
                  key={eachState.stateCode}
                  id={eachState.stateCode}
                />
              ))}
            </ul>
          )}
        </div>
        <DashBoard />
        <Footer className="footer-home" />
      </div>
    )
  }
}

export default Home
