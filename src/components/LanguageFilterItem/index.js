import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, isActiveId, activeIsChance} = props
  const {language, id} = eachItem

  const onActiveIdChange = () => {
    activeIsChance(id)
  }

  const activeBtn = isActiveId ? 'activeButton' : ''
  const activeText = isActiveId ? 'activeText' : ''

  return (
    <li className="header-li-container">
      <button
        onClick={onActiveIdChange}
        type="button"
        className={`nav-button ${activeBtn} `}
      >
        <p className={`header-name ${activeText}`}>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
