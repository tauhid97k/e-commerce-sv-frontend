const NotFoundPage = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="container font-light flex flex-col items-center">
        <h2 className="flex items-center divide-x-2 mb-1">
          <span className="text-4xl lg:text-6xl pr-4">404</span>
          <span className="text-xl lg:text-2xl pl-4 text-dark-300/70">
            Not Found
          </span>
        </h2>
      </div>
    </div>
  )
}

export default NotFoundPage
