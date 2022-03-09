const StateListItem = props => {
  const {stateList} = props
  const {stateName} = stateList
  return (
    <div>
      <li>
        <p>{stateName}</p>
      </li>
    </div>
  )
}

export default StateListItem
