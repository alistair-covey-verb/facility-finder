# Requirement Notes
This markdown file gives a bit of context to decisions and how AI played a role in crafting of this demo project.


I've broken the Notes into thier 

## RF-1 
 This is retroactive, but I used AI to help me understand generally how tanstack router worked with the aid of examples on the [QuickStart Guide](https://tanstack.com/router/latest/docs/framework/react/examples/quickstart-file-based). 

 This lead me to add the RouterProvider wrapper component in the render on the main.tsx with a created router above.

I also created the `__root.tsx` file which is the wrapper around routed pages. this would be a great place to put header and footers  

 This is the site structure with the tanstack router: 

```
index.html 
   ↓

main.tsx (Initialises TanStack Router)
   ↓

__root.tsx (The Global Layout / Shell)
   ↳ Inside the <Outlet />:
      
      routes/index.tsx

      routes/$propertyId.tsx
```

## RF-2

queryClient.ts - claude told me I should use tanstack's QueryClient class to create a queryClient instance to manage the cache and help me store the auth-token
  

 I followed this guidance which lead me to [this documentation](https://tanstack.com/query/latest/docs/framework/react/reference/classes/QueryClient) where I learned more about default options and what would be appropriate for a dev site like this.

apiCLient.ts - I needed to fetch the auth token and store it in the queryClient so I goolged around and asked claude which suggested [this documentation](https://tanstack.com/query/latest/docs/framework/react/guides/query-options).


## RF-3
I asked claude how to handle the errors I'm getting on properties.ts when there is an invalid property code sent to the property endpoint

Claude advised me to add a try/catch block on the loader to help catch errors but I've swapped that for a beforeLoad that throws a notFound() and triggers the notFoundComponent if the code in the url does not match one that is in the array at the top of the file.