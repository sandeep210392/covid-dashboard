import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class Charts extends Component {
  state = {
    chartList: '',
    totalCharts: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getChartsData()
  }

  getChartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {
      method: 'GET',
    }

    const {stateCode} = this.props
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const datesList = Object.keys(data[stateCode].dates)
      const stateDateCases = datesList.map(eachDate => ({
        eachDate,
        confirmed: data[stateCode].dates[eachDate].total.confirmed,
        recovered: data[stateCode].dates[eachDate].total.recovered,
        deceased: data[stateCode].dates[eachDate].total.deceased,
        active:
          data[stateCode].dates[eachDate].total.confirmed -
          (data[stateCode].dates[eachDate].total.recovered +
            data[stateCode].dates[eachDate].total.deceased),
      }))

      this.setState({
        chartList: stateDateCases,
        totalCharts: stateDateCases,
        isLoading: false,
      })
    }
  }

  lindGraphs = (caseList, color) => {
    const {totalCharts} = this.state
    return (
      <div>
        <LineChart
          width={900}
          height={250}
          data={totalCharts}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  lineChartsList = () => (
    <div>
      <h1 className="Charts-graph-heading">Daily Spread Trends</h1>
      <div testid="lineChartsContainer" className="lineChart-graph">
        <div className="charts-graph-list-margin charts-graph-red">
          {this.lindGraphs('confirmed', '#FF073A')}
        </div>
        <div className="charts-graph-list-margin charts-graph-blue">
          {this.lindGraphs('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin charts-graph-green">
          {this.lindGraphs('recovered', '#27A243')}
        </div>
        <div className="charts-graph-list-margin charts-graph-gray">
          {this.lindGraphs('deceased', '#6C757D')}
        </div>
        <div className="charts-graph-list-margin charts-graph-vi">
          {this.lindGraphs('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  render() {
    const {chartList, isLoading} = this.state
    const {activeTabId} = this.props
    const barChart = activeTabId.toLowerCase()
    const lastTenData = chartList.slice(Math.max(chartList.length - 10, 0))

    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#0A4FA0'
    } else if (barChart === 'recovered') {
      barColor = '#216837'
    } else if (barChart === 'deceased') {
      barColor = '#474C57'
    }

    return (
      <>
        {' '}
        {isLoading ? (
          <div className="loading-class" testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="Charts-container">
            <div className="Charts-BarChart">
              <BarChart
                width={700}
                height={400}
                data={lastTenData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={40}
              >
                <XAxis
                  dataKey="date"
                  stroke={`${barColor}`}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={`${barChart}`}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div>{this.lineChartsList()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts
