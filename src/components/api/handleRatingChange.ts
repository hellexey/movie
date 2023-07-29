import { IMovie } from './getMovies'

const handleRatingChange = async (movie: IMovie, rating: number) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')!) || []
  const existingMovieIndex = ratedMovies.findIndex((ratedMovie: IMovie) => ratedMovie.id === movie.id)

  if (existingMovieIndex >= 0) {
    ratedMovies[existingMovieIndex].vote_average = rating
  } else {
    ratedMovies.push({ ...movie, vote_average: rating })
  }

  localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies))
}

export default handleRatingChange
