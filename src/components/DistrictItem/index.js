const DistrictItem = props => {
  const {count, name} = props

  return (
    <li>
      <div className="list-item">
        <p className="count">{count}</p>
        <p className="name">{name}</p>
      </div>
    </li>
  )
}
export default DistrictItem
