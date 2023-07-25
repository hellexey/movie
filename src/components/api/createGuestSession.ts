const createGuestSession = async () => {
  let guestSessionId = localStorage.getItem('guestSessionId')

  if (!guestSessionId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IzMGIwZjg5ZmEzM2I5OWVhODNlNGVlODZkN2Y4MyIsInN1YiI6IjY0OTU5Y2E5ZDVmZmNiMDBhZDg1MDJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMTmKFtngCrTMB-a5BQE8pYAuxyzHCACsGotO5u-R0',
      },
    }
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      const data = await response.json()
      guestSessionId = data.guest_session_id

      if (guestSessionId) {
        localStorage.setItem('guestSessionId', guestSessionId)
      } else {
        console.error('Guest session ID is null.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return guestSessionId
}
export default createGuestSession
