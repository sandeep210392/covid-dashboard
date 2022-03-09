import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
// eslint-disable-next-line
import DistrictItem from '../DistrictItem'
import Charts from '../Charts'

// eslint-disable-next-line

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

class StateSpecificData extends Component {
  state = {
    confirmedCases: '',
    activeCases: '',
    recoveredCases: '',
    deceasedCases: '',
    totalStateTested: '',
    specificStateName: '',
    // eslint-disable-next-line
    specificStateCode: '',
    lastUpdated: '',
    districtNamesList: [],
    districtCovidData: [],
    activeTabId: 'confirmed',
    isLoading: true,
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data/'

    const options = {
      method: 'GET',
    }

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // eslint-disable-next-line
    const {activeTabId} = this.state
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const totalTested = data[stateCode].total.tested
      const stateData = initialStatesList.filter(
        eachState => eachState.state_code === stateCode,
      )
      const stateName = stateData[0].state_name
      const totalStateData = data[stateCode].total
      const lastDataUpdated = data[stateCode].meta.last_updated
      const districtsData = data[stateCode].districts

      const districtsList = Object.keys(districtsData)

      this.setState({
        totalStateTested: totalTested,
        specificStateName: stateName,
        confirmedCases: totalStateData.confirmed,
        recoveredCases: totalStateData.recovered,
        deceasedCases: totalStateData.deceased,
        lastUpdated: lastDataUpdated,
        activeCases:
          totalStateData.confirmed -
          totalStateData.recovered -
          totalStateData.deceased,
        districtNamesList: districtsList,
        districtCovidData: districtsData,
        // eslint-disable-next-line
        isLoading: false,
      })
    }
  }

  getDistrictData = () => {
    const {districtNamesList, districtCovidData, activeTabId} = this.state
    const totalDistrictData = districtNamesList.map(eachDistrict => ({
      name: eachDistrict,
      count: districtCovidData[eachDistrict].total[activeTabId]
        ? districtCovidData[eachDistrict].total[activeTabId]
        : 0,
    }))

    totalDistrictData.sort((a, b) => b.count - a.count)
    const districtActiveCaseData = districtNamesList.map(eachDistrict => ({
      name: eachDistrict,
      count:
        districtCovidData[eachDistrict].total.confirmed -
        (districtCovidData[eachDistrict].total.recovered +
          districtCovidData[eachDistrict].total.deceased)
          ? districtCovidData[eachDistrict].total.confirmed -
            (districtCovidData[eachDistrict].total.recovered +
              districtCovidData[eachDistrict].total.deceased)
          : 0,
    }))

    districtActiveCaseData.sort((a, b) => b.count - a.count)
    if (activeTabId === 'active') {
      return districtActiveCaseData
    }
    return totalDistrictData
  }

  onClickConfirm = () => {
    this.setState({activeTabId: 'confirmed'})
  }

  onClickActive = () => {
    this.setState({activeTabId: 'active'})
  }

  onClickRecovered = () => {
    this.setState({activeTabId: 'recovered'})
  }

  onClickDeceased = () => {
    this.setState({activeTabId: 'deceased'})
  }

  render() {
    const {
      confirmedCases,
      totalStateTested,
      specificStateName,
      recoveredCases,
      deceasedCases,
      lastUpdated,
      activeCases,

      // eslint-disable-next-line
      districtNamesList,
      // eslint-disable-next-line
      districtCovidData,
      // eslint-disable-next-line
      activeTabId,
      isLoading,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const topDistricts = this.getDistrictData()
    return (
      <div>
        <Header />

        {isLoading ? (
          <div className="loading-class" testid="stateDetailsLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="state-specific-container">
            <div className="heading">
              <div className="left-heading">
                <h1 className="state-name">{specificStateName}</h1>
                <p className="last-update">{lastUpdated}</p>
              </div>
              <div className="right-heading">
                <p className="tested-heading">Tested</p>
                <p className="tested-count">{totalStateTested}</p>
              </div>
            </div>

            <ul className="dashboard">
              <li onClick={() => this.onClickConfirm()}>
                <div
                  testid="stateSpecificConfirmedCasesContainer"
                  className="confirmed-cases confirm-tab-background"
                >
                  <p className="confirmed-cases-text">Confirmed</p>
                  <img
                    className="confirmed-image"
                    src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                    alt="state specific confirmed cases pic"
                  />
                  <p className="confirmed-count">{confirmedCases}</p>
                </div>
              </li>
              <li onClick={() => this.onClickActive()}>
                <div
                  testid="stateSpecificActiveCasesContainer"
                  className="confirmed-cases active-tab-background"
                >
                  <p className="active-cases-text">Active</p>
                  <img
                    className="active-image"
                    src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                    alt="state specific active cases pic"
                  />
                  <p className="active-count">{activeCases}</p>
                </div>
              </li>
              <li onClick={() => this.onClickRecovered()}>
                <div
                  testid="stateSpecificRecoveredCasesContainer"
                  className="recovered-tab-background confirmed-cases"
                >
                  <p className="recovered-cases-text">Recovered</p>
                  <img
                    className="recovered-image"
                    src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                    alt="state specific recovered cases pic"
                  />
                  <p className="recovered-count">{recoveredCases}</p>
                </div>
              </li>
              <li onClick={() => this.onClickDeceased()}>
                <div
                  testid="stateSpecificDeceasedCasesContainer"
                  className="confirmed-cases deceased-tab-background"
                >
                  <p className="deceased-cases-text">Deceased</p>
                  <img
                    className="deceased-image"
                    src="https://res.cloudinary.com/sandeep321/
            image/upload/v1645721504/covid%20dashboard/confirmed_rpdlzt.png"
                    alt="state specific deceased cases pic"
                  />
                  <p className="deceased-count">{deceasedCases}</p>
                </div>
              </li>
            </ul>
            <div testid="lineChartsContainer">
              <h1 className="top-districts-text">Top districts</h1>
              <ul
                testid="topDistrictsUnorderedList"
                className="top-districts-container"
              >
                {topDistricts.map(eachDistrict => (
                  <DistrictItem
                    count={eachDistrict.count}
                    name={eachDistrict.name}
                    key={eachDistrict.name}
                  />
                ))}
              </ul>
            </div>

            <Charts stateCode={stateCode} activeTabId={activeTabId} />
          </div>
        )}
      </div>
    )
  }
}

export default StateSpecificData
