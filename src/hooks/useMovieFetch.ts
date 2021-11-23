import { useState, useEffect } from 'react';
import API, { Cast, Crew, Movie } from '../API';
// Helper
import { isPersistedState } from '../helpers';
// Types
export type MovieState = Movie & { actors: Cast[], directors: Crew[] };

export const useMovieFetch = (movieId: number) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const MOVIE_STATE_KEY = `movieState-${movieId}`

  useEffect(() => {
    const sessionState = isPersistedState(MOVIE_STATE_KEY);
    if(sessionState) {
      console.log('Getting data from sessionStorage')
      setState(sessionState);
      setLoading(false);
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
  }, [MOVIE_STATE_KEY, movieId]);

  useEffect(() => {
    sessionStorage.setItem(MOVIE_STATE_KEY, JSON.stringify(state))
  }, [MOVIE_STATE_KEY, state]);

  return { state, loading, error };
}