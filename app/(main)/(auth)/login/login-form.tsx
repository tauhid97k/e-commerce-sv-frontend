'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

const LoginForm = () => {
  const axios = useAxios()

  const { mutate: login, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof loginValidator>) =>
      axios.post('/login', formData),
  })

  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  })

  const onSubmit = (values: z.infer<typeof loginValidator>) => {
    login(values, {
      onError: (data) => {
        // Error handling
      },
      onSuccess: (data) => {
        // Success handling
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
                  <Input type="email" placeholder="Your email" {...field} />
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
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
