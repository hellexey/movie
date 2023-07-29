import React, { useEffect, useState } from 'react'
import { Alert, Pagination } from 'antd'

import { IMovie } from '../api/getMovies'
import MovieCard from '../MovieCard'

import '../MovieList/movieList.css'

const RatedMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)
  const moviesPerPage = 20

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')!) || []
      const startIndex = (page - 1) * moviesPerPage
      const selectedMovies = ratedMovies.slice(startIndex, startIndex + moviesPerPage)
      setMovies(selectedMovies)
      setTotalPages(Math.ceil(ratedMovies.length / moviesPerPage))
    } catch (error) {
      console.error(error)

      if (error instanceof TypeError) {
        setNetworkError(true)
        setError('No internet connection.')
      } else {
        setError('An unknown error occurred.')
      }
    }
  }, [page])

  return (
    <div className="movie-list">
      {error && <Alert message={error} type={networkError ? 'warning' : 'error'} />}
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
      <Pagination total={totalPages * 10} current={page} onChange={(page) => setPage(page)} />
    </div>
  )
}

export default RatedMovies
