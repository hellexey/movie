import React, { useState } from 'react'

import MovieList from '../MovieList'
import Search from '../search/Search'

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('the')

  return (
    <div>
      <Search setSearchQuery={setSearchQuery} />
      <MovieList searchQuery={searchQuery} />
    </div>
  )
}

export default App
