import {Link} from 'react-router-dom'
import './index.css'

const StateTableRow = props => {
  const {stateData} = props
  const {
    stateCode,
    stateName,
    confirmedList,
    recoveredList,
    deceasedList,
    otherList,
    populationList,
  } = stateData

  const active = confirmedList - recoveredList - deceasedList - otherList

  return (
    <li className="row-item">
      <Link to={`/state/${stateCode}`}>
        <p className="name">{stateName}</p>
      </Link>
      <p className="confirmed">{confirmedList}</p>
      <p className="active">{active}</p>
      <p className="recovered">{recoveredList}</p>
      <p className="deceased">{deceasedList}</p>
      <p className="population">{populationList}</p>
    </li>
  )
}

export default StateTableRow
