RF-2
- queryClient.ts - claude told me I should use tanstack's QueryClient class to create a queryClient instance to manage the cache and help me store the auth-token
  - I followed this guidance which lead me to https://tanstack.com/query/latest/docs/framework/react/reference/classes/QueryClient where I learned more about default options and what would be appropriate for a dev site like this.

- apiCLient.ts - I needed to fetch the auth token and store it in the queryClient so I goolged around and asked claude which suggested this documentation : https://tanstack.com/query/latest/docs/framework/react/guides/query-options 

