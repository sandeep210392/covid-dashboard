import {Component} from 'react'

import './index.css'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateTableRow from '../StateTableRow'

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

class DashBoard extends Component {
  state = {
    confirmed: '',
    active: '',
    recovered: '',
    deceased: '',
    isLoading: true,
    covidStatesTable: [],
  }

  componentDidMount() {
    this.getStatesData()
  }

  getStatesData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      let totalConfirmedCases = 0

      let totalRecoveredCases = 0

      let totalDeceasedCases = 0

      let totalActiveCases = 0
      initialStatesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          totalConfirmedCases += total.confirmed
          totalRecoveredCases += total.recovered
          totalDeceasedCases += total.deceased
        }
      })

      totalActiveCases =
        totalConfirmedCases - (totalRecoveredCases + totalDeceasedCases)

      const statesTable = initialStatesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        confirmedList: Object.keys(data)
          .filter(eachState => eachState === eachItem.state_code)
          .map(each => data[each].total.confirmed),
        recoveredList: Object.keys(data)
          .filter(eachState => eachState === eachItem.state_code)
          .map(each => data[each].total.recovered),
        deceasedList: Object.keys(data)
          .filter(eachState => eachState === eachItem.state_code)
          .map(each => data[each].total.deceased),
        otherList: Object.keys(data)
          .filter(eachState => eachState === eachItem.state_code)
          .map(each => data[each].total.other),
        populationList: Object.keys(data)
          .filter(eachState => eachState === eachItem.state_code)
          .map(each => data[each].meta.population),
      }))

      this.setState({
        confirmed: totalConfirmedCases,
        recovered: totalRecoveredCases,
        deceased: totalDeceasedCases,
        active: totalActiveCases,
        isLoading: false,
        covidStatesTable: statesTable,
      })
    }
  }

  onClickAscending = () => {
    const {covidStatesTable} = this.state
    const sortedList = covidStatesTable.sort((first, second) => {
      const firstElement = first.stateName.toUpperCase()
      const secondElement = second.stateName.toUpperCase()
      return firstElement > secondElement ? 1 : -1
    })
    this.setState({covidStatesTable: sortedList})
  }

  onClickDescending = () => {
    const {covidStatesTable} = this.state
    const sortedList = covidStatesTable.sort((first, second) => {
      const firstElement = first.stateName.toUpperCase()
      const secondElement = second.stateName.toUpperCase()
      return firstElement < secondElement ? 1 : -1
    })
    this.setState({covidStatesTable: sortedList})
  }

  render() {
    const {confirmed, active, recovered, deceased} = this.state
    const {isLoading, covidStatesTable} = this.state

    return (
      <div>
        {isLoading ? (
          <div className="loading-class" testid="homeRouteLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div className="dashboard">
              <div
                testid="countryWideConfirmedCases"
                className="confirmed-cases"
              >
                <p className="confirmed-cases-text">Confirmed</p>
                <img
                  className="confirmed-image"
                  src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                  alt="country wide confirmed cases pic"
                />
                <p className="confirmed-count">{confirmed}</p>
              </div>

              <div testid="countryWideActiveCases" className="confirmed-cases">
                <p className="active-cases-text">Active</p>
                <img
                  className="active-image"
                  src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                  alt="country wide active cases pic"
                />
                <p className="active-count">{active}</p>
              </div>

              <div
                testid="countryWideRecoveredCases"
                className="confirmed-cases"
              >
                <p className="recovered-cases-text">Recovered</p>
                <img
                  className="recovered-image"
                  src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                  alt="country wide recovered cases pic"
                />
                <p className="recovered-count">{recovered}</p>
              </div>

              <div
                testid="countryWideDeceasedCases"
                className="confirmed-cases"
              >
                <p className="deceased-cases-text">Deceased</p>
                <img
                  className="deceased-image"
                  src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                  alt="country wide deceased cases pic"
                />
                <p className="deceased-count">{deceased}</p>
              </div>
            </div>

            <div
              className="list-of-state-tables"
              testid="stateWiseCovidDataTable"
            >
              <div className="table-heading-row">
                <div className="states-heading">
                  <p className="home-table-state-paragraph">States/UT</p>
                  <button
                    className="homeRoute-button-sort"
                    type="button"
                    onClick={this.onClickAscending}
                    testid="ascendingSort"
                  >
                    <FcGenericSortingAsc className="sort-logo-class" />
                  </button>
                  <button
                    className="homeRoute-button-sort"
                    type="button"
                    onClick={this.onClickDescending}
                    testid="descendingSort"
                  >
                    <FcGenericSortingDesc className="sort-logo-class" />
                  </button>
                </div>
                <p className="home-table-state-confirmed">Confirmed</p>
                <p className="home-table-state-active">Active</p>
                <p className="home-table-state-recovered">Recovered</p>
                <p className="home-table-state-deceased">Deceased</p>
                <p className="home-table-state-population">Population</p>
              </div>

              <ul className="state-ul-class">
                {covidStatesTable.map(eachItem => (
                  <StateTableRow
                    key={eachItem.stateCode}
                    stateData={eachItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DashBoard
