import Link from 'next/link'
import ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="heading">
        <h1 className="title">Forgot Password?</h1>
        <p className="description">
          Enter your account email address and we will send a password reset
          code
        </p>
      </div>
      <ForgotPasswordForm />
      <Link
        href="/auth/login"
        className="block text-center hover:underline focus:underline focus:outline-none mt-5"
      >
        Go back to login?
      </Link>
    </>
  )
}

export default ForgotPasswordPage
