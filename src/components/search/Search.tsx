import React from 'react'
import { Input } from 'antd'
import _ from 'lodash'

import './search.css'
interface ISearch {
  setSearchQuery: (query: string) => void
}
const Search: React.FC<ISearch> = ({ setSearchQuery }) => {
  const handleChange = _.debounce((e: string) => {
    setSearchQuery(e)
  }, 1000)
  // функция для очистки
  React.useEffect(() => {
    return () => {
      handleChange.cancel()
    }
  }, [handleChange])

  return <Input placeholder="Search movies" className="movie-search" onChange={(e) => handleChange(e.target.value)} />
}

export default Search
