import React, { useContext, useEffect, useState } from 'react'
import { Tabs } from 'antd'

import { GenresContext } from '../GenresContext/GenresContext'
import './app.css'
import createGuestSession from '../api/createGuestSession'
import MovieList from '../MovieList'
import Search from '../search/Search'
import RatedMovies from '../RatedMovies/RatedMovies'
import getGenres from '../api/getGenres'

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('the')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const [genres, setGenres] = useContext(GenresContext)

  useEffect(() => {
    createGuestSession()
      .then((guestSessionId) => {
        console.log('guest Session Id: ', guestSessionId)
      })
      .catch((err) => {
        console.error(err)
      })
    const fetchGenres = async () => {
      try {
        const genres = await getGenres()
        setGenres(genres)
        console.log(genres)
      } catch (error) {
        console.error(error)
      }
    }

    fetchGenres()
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
