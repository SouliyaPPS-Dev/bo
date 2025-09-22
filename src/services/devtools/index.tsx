import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'

export function Devtools() {
  return (
    <Suspense>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </Suspense>
  )
}

