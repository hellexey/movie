import React, { useEffect, useState } from 'react'
import { Alert, Pagination } from 'antd'

import getMovies, { IMovie } from '../api/getMovies'
import './movieList.css'
import MovieCard from '../MovieCard'

interface MovieListProps {
  searchQuery: string
}

const MovieList = ({ searchQuery }: MovieListProps) => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const { results, totalPages } = await getMovies(searchQuery, page)
        setMovies(results)
        setTotalPages(totalPages)
      } catch (error) {
        console.error(error)

        if (error instanceof TypeError) {
          setNetworkError(true)
          setError('No internet connection.')
        } else {
          setError('Failed to fetch movies.')
          setMovies([])
        }
      }
    }

    loadMovies().catch((error) => {
      console.error(error)
    })
  }, [searchQuery, page])

  return (
    <div className="movie-list">
      {error && <Alert message={error} type={networkError ? 'warning' : 'error'} />}
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
      <Pagination total={totalPages} current={page} onChange={(page) => setPage(page)} />
    </div>
  )
}

export default MovieList
