const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-8">
      <main className="w-full max-w-sm">{children}</main>
    </div>
  )
}

export default AuthLayout
