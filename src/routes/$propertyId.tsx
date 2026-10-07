import { createFileRoute, notFound } from '@tanstack/react-router'
import { getProperty } from '../api/properties'

// valid list of property codes to save hitting the properties api with garbage codes
const validPropertyCodes = new Set([
  '60735', '66266', '60507', '77961', '36017',
  '47314', '35903', '5826', '31116', '7918',
  '40333', '41069', '47157', '96185',
])

// used AI to help understand tanstack routing in general along with Routing Concepts documentation on https://tanstack.com/router/latest/docs/routing/routing-concepts
export const Route = createFileRoute('/$propertyId')({
  beforeLoad: ({params: { propertyId } }) => {
    if (!validPropertyCodes.has(propertyId)) throw notFound()
  },
  loader: async ({ params: { propertyId } }) => { 
    return await getProperty(propertyId)
  },
  pendingComponent: () => {
    return <p>... Finding Property</p>
  },
  component: PropertyLayout,
  notFoundComponent: () => {
    return <p>404 - Page not found</p> // Because this is a top level url I need to pass a generic error for page not found 
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

