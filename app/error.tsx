'use client'

import { Button } from '@/components/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-lg">Something went wrong!</h2>
        <Button onClick={() => reset()} variant="secondary" className="w-fit">
          Try again
        </Button>
      </div>
    </div>
  )
}
