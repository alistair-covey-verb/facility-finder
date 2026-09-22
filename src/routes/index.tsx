import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: TestComponent,
})


function TestComponent() {
    return(
        <h1>Test</h1>
    )
}