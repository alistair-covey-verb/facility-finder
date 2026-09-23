import { createFileRoute, notFound } from '@tanstack/react-router'
import { getProperty } from '../api/properties'

// used AI to help understand tanstack routing in general along with Routing Concepts documentation on https://tanstack.com/router/latest/docs/routing/routing-concepts
export const Route = createFileRoute('/$propertyId')({
  loader: async ({ params: { propertyId } }) => { 
    const property = getProperty(propertyId)
    if (!property) throw notFound()
    return property
  },
  component: PropertyLayout,
  notFoundComponent: () => {
    return <p>Property not found.</p>
  }
})

function PropertyLayout() {
  const property = Route.useLoaderData();

  return (
    <div>
      <h1>{ property.title }</h1>
    </div>
  )
}

