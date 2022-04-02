import { useLocation } from 'react-router-dom';

export default function useQueryString(): { [key: string]: any } {
  const { search } = useLocation();

  const parsedParams = new URLSearchParams(search);

  const params = {};

  parsedParams.forEach((v, k) => {
    params[k] = v;
  });

  return params;
}
