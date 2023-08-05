import React, { useEffect, useState } from 'react'
import { Alert, Pagination } from 'antd'

import getMovies, { IMovie } from '../api/getMovies'
import MovieCard from '../MovieCard'

import Loading from './Loading'

interface MovieListProps {
  searchQuery: string
}

const MovieList = ({ searchQuery }: MovieListProps) => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const { results, totalPages } = await getMovies(searchQuery, page)
        setMovies(results)
        setTotalPages(totalPages)
        setLoading(false)
      } catch (error) {
        console.error(error)

        if (error instanceof TypeError) {
          setNetworkError(true)
          setError('No internet connection.')
        } else {
          setError('Failed to fetch movies.')
          setMovies([])
        }
        setLoading(false)
      }
    }

    setLoading(true)
    loadMovies().catch((error) => {
      console.error(error)
    })
  }, [searchQuery, page])

  return (
    <div className="movie-list">
      {loading && <Loading />}
      {movies.length === 0 && !loading && !networkError && <Alert message="No movies found" type="info" />}
      {error && <Alert message={error} type={networkError ? 'warning' : 'error'} />}
      {!networkError && movies.map((movie) => <MovieCard movie={movie} key={movie.id} networkError={networkError} />)}
      <Pagination total={totalPages} current={page} onChange={(page) => setPage(page)} />
    </div>
  )
}

export default MovieList
