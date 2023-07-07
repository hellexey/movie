import React, { useState, useEffect } from 'react'
import './index.css'
import { format } from 'date-fns'

interface IMovie {
  id: number
  title: string
  release_date: string
  genres: { name: string }[]
  overview: string
  poster_path: string
}

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const descriptionCut = function (description: string) {
    if (description.length > 100) {
      const lastSpaceIndex = description.lastIndexOf(' ', 190)
      return description.substring(0, lastSpaceIndex) + '...'
    }
    return description
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
      },
    }
    setLoading(true)

    fetch('https://api.themoviedb.org/3/search/movie?query=the&include_adult=false&language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results)
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  if (loading) {
    return <div className="movie-list">Loading...</div>
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <img className="poster" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h1 className="movie-name">{movie.title}</h1>
            <h2 className="movie-year">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</h2>
            <h3 className="movie-genre">action, rpg</h3>
            <p className="description">{descriptionCut(movie.overview)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
