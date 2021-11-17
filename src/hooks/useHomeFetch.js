import { useState, useEffect } from 'react';
// API
import API from '../API';
// Helper
import { isPersistedState } from '../helpers';

const HOME_STATE_KEY = 'homeState';

const initialState = {
  page: 0,
  results: [],
  totalPages: 0,
  totalResults: 0
}

export const useHomeFetch = () => {
  const [searchTerm, setSerchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, serchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(serchTerm, page);

      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  // Initial and search render
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState(HOME_STATE_KEY)
      if (sessionState) {
        console.log('Getting data from sessionStorage')
        setState(sessionState);
        return;
      }
    }
    console.log('Getting data from API')
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more
  useEffect(() => {
    if (isLoadingMore) {
      fetchMovies(state.page + 1, searchTerm);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if(!searchTerm) sessionStorage.setItem(HOME_STATE_KEY, JSON.stringify(state));
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSerchTerm, setIsLoadingMore };
}