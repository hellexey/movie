const handleRatingChange = async (movieId: number, rating: number) => {
  try {
    const guestSessionId = localStorage.getItem('guestSessionId')
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
      },
      body: JSON.stringify({ value: rating }),
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
      options
    )

    if (!response.ok) {
      throw new Error(`Failed to rate movie: ${response.statusText}`)
    }

    return await response.json()
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default handleRatingChange
