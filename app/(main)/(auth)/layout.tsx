const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen justify-center items-center py-4'>
      <main className='w-full max-w-md'>{children}</main>
    </div>
  )
}

export default AuthLayout
