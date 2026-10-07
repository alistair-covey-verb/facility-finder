RF-2
- queryClient.ts - claude told me I should use tanstack's QueryClient class to create a queryClient instance to manage the cache and help me store the auth-token
  - I followed this guidance which lead me to https://tanstack.com/query/latest/docs/framework/react/reference/classes/QueryClient where I learned more about default options and what would be appropriate for a dev site like this.

- apiCLient.ts - I needed to fetch the auth token and store it in the queryClient so I goolged around and asked claude which suggested this documentation : https://tanstack.com/query/latest/docs/framework/react/guides/query-options 


RF-3
- asking claude how to handle the errors I'm getting on properties.ts when there is an invalid id getting sent to the property endpoint
  - Claude advised me to add a try/catch block on the loader to help catch errors but I've swapped that for a beforeLoad that throws a notFound() and triggers the notFoundComponent if the code in the url does not match one that is in the array at the top of the file.