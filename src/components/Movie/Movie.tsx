import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'

interface IMovie {
  title: string
  release_date: string
  genres: { name: string }[]
  overview: string
  poster_path: string
}

interface MovieProps {
  movieId: number
}

const Movie = ({ movieId }: MovieProps) => {
  const [movie, setMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key:
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
        },
      })
      setMovie(response.data)
    }
    fetchMovie()
  }, [movieId])

  if (!movie) {
    return <div>Loading...</div>
  }

  const imageUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`

  return (
    <div className="movie">
      <img className="poster" src={imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h1 className="movie-name">{movie.title}</h1>
        <h2 className="movie-year">{movie.release_date}</h2>
        <h3 className="movie-genre">{movie.genres.map((genre) => genre.name).join(', ')}</h3>
        <p className="description">{movie.overview}</p>
      </div>
    </div>
  )
}

export default Movie
