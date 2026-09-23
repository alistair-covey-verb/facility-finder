// https://tanstack.com/router/latest/docs/routing/routing-concepts
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return(
    <div>
        <Outlet />
    </div>
  )
}