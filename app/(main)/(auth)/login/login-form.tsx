'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldPath, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormFieldset,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form'
import Link from 'next/link'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { loginValidator } from '@/validators/authValidator'
import { Checkbox } from '@/components/checkbox'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'

const LoginForm = () => {
  const axios = useAxios()
  const router = useRouter()

  // Get CSRF Token (Must do this first otherwise 419 error will occur)
  const csrfCookie = useMutation({
    mutationFn: () =>
      axios.get(`/csrf-cookie`, {
        withCredentials: true,
      }),
  })

  // Login Request
  const { mutate: login, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof loginValidator>) =>
      axios.post('/login', formData),
  })

  // Form Config
  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  })

  // Login Form Handler
  const onSubmit = (values: z.infer<typeof loginValidator>) => {
    // Set CSRF Token
    csrfCookie.mutate()

    // Login
    login(values, {
      onError: (data) => {
        const { validationErrors, error } = handleError(data)
        if (validationErrors.length) {
          validationErrors.map(({ field, message }) => {
            form.setError(field as FieldPath<typeof values>, {
              message,
            })
          })
        } else if (error) {
          toast.error(error)
        }
      },
      onSuccess: (data) => {
        const { message } = handleSuccess(data)
        toast.success(message)
        router.replace('/dashboard')
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldset disabled={isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between flex-wrap gap-2 mt-2">
            <FormField
              control={form.control}
              name="remember_me"
              render={({ field }) => (
                <FormItem className="flex gap-1.5 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal !m-0">
                    Remember me
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="block text-center text-sm hover:underline focus:underline focus:outline-none whitespace-nowrap"
            >
              Forgot password?
            </Link>
          </div>
        </FormFieldset>
        <Button isLoading={isPending} className="w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
