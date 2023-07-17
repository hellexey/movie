interface IMovie {
  id: number
  title: string
  release_date: string
  genres: { name: string }[]
  overview: string
  poster_path: string
  loading: boolean
}

async function getMovies(): Promise<IMovie[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
    },
  }

  const response = await fetch('https://api.themoviedb.org/3/search/movie?query=the', options)

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }

  const data = await response.json()

  return data.results
}

export default getMovies
