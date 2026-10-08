import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/properties/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello this is the base property page</div>
}
