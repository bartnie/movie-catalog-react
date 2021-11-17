import { useState, useEffect } from 'react';
import API from '../API';
// Helper
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const MOVIE_STATE_KEY = `movieState-${movieId}`

  useEffect(() => {
    const sessionState = isPersistedState(MOVIE_STATE_KEY);
    if(sessionState) {
      console.log('Getting data from sessionStorage')
      setState(sessionState);
      setLoading(true);
      setError(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        // Get directors
        const directors = credits.crew.filter(
          member => member.job === 'Director'
        );
        
        console.log('Getting data from API')
        setState({
          ...movie,
          actors: credits.cast,
          directors
        });
        setLoading(false);
      }
      catch (error) {
        setError(true);
      }
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    sessionStorage.setItem(MOVIE_STATE_KEY, JSON.stringify(state))
  }, [movieId, state]);

  return { state, loading, error };
}