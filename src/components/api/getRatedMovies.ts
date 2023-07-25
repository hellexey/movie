import { IMovie } from './getMovies'

interface IMovieApiResponse {
  totalPages: number
  results: IMovie[]
}

export async function getRatedMovies(guestSessionId: string | null, page: number): Promise<IMovieApiResponse> {
  if (!guestSessionId) {
    return {
      totalPages: 0,
      results: [],
    }
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
    },
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?page=${page}`,
    options
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch rated movies: ${response.statusText}`)
  }

  const data = await response.json()

  return { totalPages: data.total_pages, results: data.results }
}
