import React from 'react'
import { format } from 'date-fns'
import { Rate, Tag } from 'antd'
import './movieCard.css'

import { GenresContext } from '../GenresContext/GenresContext'
import descriptionCut from '../utils/descriptionCut'
import ratingColor from '../utils/ratingColor'
import handleRatingChange from '../api/handleRatingChange'
import Loading from '../MovieList/Loading'
import { IMovie } from '../api/getMovies'

const defaultPoster =
  'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'

interface MovieCardProps {
  movie: IMovie
  networkError: boolean
}

const MovieCard = ({ movie }: MovieCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')!) || []
  const ratedMovie = ratedMovies.find((ratedMovie: IMovie) => ratedMovie.id === movie.id)
  const rating = ratedMovie ? ratedMovie.vote_average : 0
  const [genres] = React.useContext(GenresContext)
  const getGenreNames = () => {
    return genres
      .filter((genre) => movie.genre_ids.includes(genre.id))
      .map((genre) => (
        <Tag key={genre.id} color={'#575757'}>
          {genre.name}
        </Tag>
      ))
  }

  return (
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
            <div className="movie-title">
              <h1 className="movie-name">{movie.title}</h1>
              <div
                className="movie-rating"
                style={{
                  border: `2px solid ${ratingColor(movie.vote_average)}`,
                }}
              >
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
            {movie.release_date && (
              <h2 className="movie-year">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</h2>
            )}
            <h3 className="movie-genre">{getGenreNames()}</h3>
            <p className="description">{descriptionCut(movie.overview)}</p>
            <Rate
              allowHalf
              defaultValue={rating}
              count={10}
              className="rating"
              onChange={(rating) => {
                handleRatingChange(movie, rating)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MovieCard
