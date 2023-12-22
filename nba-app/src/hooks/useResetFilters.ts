import { useSearchParams } from 'react-router-dom';

export const useResetFilters = (initialPage = '1') => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const resetFilters = () => {
    setSearchParams({ page: initialPage });
  };

  return resetFilters;
};
