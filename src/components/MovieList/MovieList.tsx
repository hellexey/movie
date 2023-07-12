import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Alert } from 'antd'

import descriptionCut from '../utils/descriptionCut'
import getMovies from '../api/getMovies'

import Loading from './Loading'

import './index.css'

interface IMovie {
  id: number
  title: string
  release_date: string
  genres: { name: string }[]
  overview: string
  poster_path: string
  loading: boolean
}

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await getMovies()
        const loadingMovies = movies.map((movie: IMovie) => ({ ...movie, loading: true }))
        setMovies(loadingMovies)

        setTimeout(() => {
          const loadedMovies = movies.map((movie: IMovie) => ({ ...movie, loading: false }))
          setMovies(loadedMovies)
        }, 1000)
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
  }, [])

  return (
    <div className="movie-list">
      {error && <Alert message={error} type={networkError ? 'warning' : 'error'} />}
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          {movie.loading ? (
            <Loading />
          ) : (
            <>
              <img className="poster" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h1 className="movie-name">{movie.title}</h1>
                <h2 className="movie-year">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</h2>
                <h3 className="movie-genre">action, rpg</h3>
                <p className="description">{descriptionCut(movie.overview)}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default MovieList
