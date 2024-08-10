'use client'

import { Toaster as SonnerToaster } from 'sonner'

const Toaster = () => {
  return (
    <SonnerToaster
      toastOptions={{
        duration: 2000,
        unstyled: true,
        classNames: {
          toast:
            'w-full flex items-center gap-1.5 bg-white p-4 rounded-md border shadow-lg',
          title: 'text-base font-medium tracking-wide',
        },
      }}
    />
  )
}

export default Toaster
