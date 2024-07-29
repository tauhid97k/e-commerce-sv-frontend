import Link from "next/link"
import LoginForm from "./login-form"

const LoginPage = () => {
  return (
    <>
      <div className='heading'>
        <h1 className='title'>Account Login</h1>
        <p className='description'>Enter your account information</p>
      </div>
      <LoginForm />
      <div className='flex gap-1.5 justify-center text-center mt-5'>
        <span className='text-muted'>Do not have an account?</span>
        <Link
          href='/register'
          className='hover:underline focus:underline focus:outline-none'
        >
          Register
        </Link>
      </div>
    </>
  )
}

export default LoginPage
