import { useQuery } from '@tanstack/react-query'
import { tokenQueryOptions } from '../api/lib/apiClient'

export function BearerTokenDisplay() {
  const { data: token, isLoading, isError, error } = useQuery(tokenQueryOptions)

  if (isLoading) return <p>Loading token...</p>

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    return <p role="alert">Failed to authenticate: { message }</p>
  }

  return <p>Bearer Token: {token}</p>
  
}
