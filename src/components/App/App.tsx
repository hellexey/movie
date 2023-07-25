import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'

import './app.css'
import createGuestSession from '../api/createGuestSession'
import MovieList from '../MovieList'
import Search from '../search/Search'
import RatedMovies from '../RatedMovies/RatedMovies'

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('the')

  useEffect(() => {
    createGuestSession()
      .then((guestSessionId) => {
        console.log('guest Session Id: ', guestSessionId)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const { TabPane } = Tabs
  return (
    <Tabs defaultActiveKey="search" className="tabs" size="large" destroyInactiveTabPane={true}>
      <TabPane tab="Search" key="search">
        <Search setSearchQuery={setSearchQuery} />
        <MovieList searchQuery={searchQuery} />
      </TabPane>
      <TabPane tab="Rated" key="rated" className="rated">
        <RatedMovies />
      </TabPane>
    </Tabs>
  )
}

export default App
