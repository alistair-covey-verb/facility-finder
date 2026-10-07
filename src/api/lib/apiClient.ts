import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

// fetch token
const fetchToken = async (): Promise<string> => {
  const response = await fetch('https://1hotels.uat.dolli.cloud/api/tokens?dolliversion=v2', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({})
  })

  if (!response.ok) throw new Error ('API Call for Bearer Token Failed');
  const data = await response.json();
  return data.accessToken;
}

export const tokenQueryOptions = queryOptions({
  queryKey: ['auth-token'],
  queryFn: fetchToken,
  staleTime: 1000 * 60 * 60 * 48 // 48 hours
})

// validate auth token and set the timeout for 48 hours
export const getValidToken = () => {
  return queryClient.query(tokenQueryOptions);
}

// Function to invalidate Token, might be used in instance that the token has expired
export const invalidateToken = () => {
  queryClient.removeQueries({ queryKey: ['auth-token']});
}

export const apiFetch = async(url: string, options: RequestInit = {}) => {
  let token = await getValidToken();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token}`,
    }
  });

  if (response.status === 401) {
    invalidateToken();

    token = await getValidToken();

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        authorization: `Bearer ${token}`,
      }
    });
  }

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json()
 }