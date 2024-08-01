const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] justify-center items-center py-8">
      <main className="w-full max-w-sm">{children}</main>
    </div>
  )
}

export default AuthLayout
