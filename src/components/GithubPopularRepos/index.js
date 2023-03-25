import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    popularList: [],
    apiStatus: apiStatusList.initial,
  }

  activeIsChance = id => {
    this.setState(
      {
        activeId: id,
      },
      this.getPopularList,
    )
  }

  componentDidMount = () => {
    this.getPopularList()
  }

  getPopularList = async () => {
    const {activeId} = this.state

    this.setState({
      apiStatus: 'INPROGRESS',
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)

    if (response.ok) {
      const fetchedData = await response.json()
      const formateData = fetchedData.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        popularList: formateData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusList.failure,
      })
    }
  }

  loadingFunc = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  successView = () => {
    const {popularList} = this.state

    return (
      <ul className="ul-header-container popular-ul-container">
        {popularList.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  successFailureInprogress = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.successView()
      case 'FAILURE':
        return this.failureView()

      case 'INPROGRESS':
        return this.loadingFunc()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="main-bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="ul-header-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              activeIsChance={this.activeIsChance}
              isActiveId={activeId === eachItem.id}
              key={eachItem.id}
              eachItem={eachItem}
            />
          ))}
        </ul>

        {this.successFailureInprogress()}
      </div>
    )
  }
}

export default GithubPopularRepos
