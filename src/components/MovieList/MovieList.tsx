import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Alert, Pagination } from 'antd'

import descriptionCut from '../utils/descriptionCut'
import getMovies, { IMovie } from '../api/getMovies'

import Loading from './Loading'

import './movieList.css'

interface MovieListProps {
  searchQuery: string
}

const MovieList = ({ searchQuery }: MovieListProps) => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)
  const defaultPoster =
    'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'

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
        <div className="movie" key={movie.id}>
          {movie.loading ? (
            <Loading />
          ) : (
            <>
              <img
                className="poster"
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : defaultPoster}
                alt={movie.title}
              />
              <div className="movie-info">
                <h1 className="movie-name">{movie.title}</h1>
                {movie.release_date && (
                  <h2 className="movie-year">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</h2>
                )}
                <h3 className="movie-genre">action, rpg</h3>
                <p className="description">{descriptionCut(movie.overview)}</p>
              </div>
            </>
          )}
        </div>
      ))}
      <Pagination total={totalPages} current={page} onChange={(page) => setPage(page)} />
    </div>
  )
}

export default MovieList
