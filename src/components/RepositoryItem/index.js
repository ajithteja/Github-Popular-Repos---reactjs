import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachItem

  return (
    <li className="popular-li-container">
      <img src={avatarUrl} alt={name} className="popular-img" />
      <h1 className="popular-heading">{name}</h1>
      <div className="icon-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-img"
        />
        <p className="popular-stars">{starsCount} stars</p>
      </div>
      <div className="icon-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-img"
        />
        <p className="popular-stars">{forksCount} forks</p>
      </div>
      <div className="icon-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-img"
        />
        <p className="popular-stars">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
