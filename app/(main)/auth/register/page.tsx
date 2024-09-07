import Link from 'next/link'
import RegisterForm from './register-form'

const RegisterPage = () => {
  return (
    <>
      <div className="heading">
        <h1 className="title">Account Registration</h1>
        <p className="description">Create a new account</p>
      </div>
      <RegisterForm />
      <div className="flex gap-1.5 justify-center flex-wrap text-center mt-5">
        <span className="text-muted">Already have an account?</span>
        <Link
          href="/auth/login"
          className="hover:underline focus:underline focus:outline-none"
        >
          Login
        </Link>
      </div>
    </>
  )
}

export default RegisterPage
