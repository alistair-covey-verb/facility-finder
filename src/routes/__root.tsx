// https://tanstack.com/router/latest/docs/routing/routing-concepts
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { BearerTokenDisplay } from '@/components/BearerTokenDisplay'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return(
    <div>
        <Outlet />

        <BearerTokenDisplay/>
    </div>
  )
}