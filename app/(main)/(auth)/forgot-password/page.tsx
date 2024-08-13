import Link from 'next/link'
import ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordPage = () => {
  return (
    <div className="card">
      <div className="heading">
        <h1 className="title">Forgot Password?</h1>
        <p className="description">
          Enter your account email address and we will send a password reset
          code
        </p>
      </div>
      <ForgotPasswordForm />
      <Link
        href="/login"
        className="block text-center hover:underline focus:underline focus:outline-none"
      >
        Go back to login?
      </Link>
    </div>
  )
}

export default ForgotPasswordPage
