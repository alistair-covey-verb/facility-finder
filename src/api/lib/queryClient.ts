import { QueryClient } from '@tanstack/react-query';

// create the main queryClient for the site that will be used at the top level wrapper
// added additional defaults to help debug. retry:false to prevent silent retrys.
export const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      retry: false,
    }
  }
})