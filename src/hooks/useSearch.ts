// hooks/useSearch.ts

import { useState, useCallback } from "react";
import { apiService } from "../services/api.service";
import { SearchQuery, SearchResults, UseSearchReturn } from "../types";
import { debounce } from "../utils/helpers";

export const useSearch = (): UseSearchReturn => {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchDebounced = useCallback(
    debounce(async (query: SearchQuery) => {
      if (!query.query.trim()) {
        setResults(null);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const response = await apiService.search(query);

        if (response.success && response.data) {
          setResults(response.data);
        } else {
          throw new Error(response.error?.message || "Search failed");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const search = async (query: SearchQuery) => {
    return searchDebounced(query);
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return {
    results,
    isSearching,
    error,
    search,
    clearResults,
  };
};
