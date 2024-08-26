'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const ProgressbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#4078FF"
        options={{ showSpinner: false }}
      />
    </>
  )
}

export default ProgressbarProvider
