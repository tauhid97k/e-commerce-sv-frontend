'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormFieldset,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { registerValidator } from '@/validators/authValidator'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const RegisterForm = () => {
  const axios = useAxios()

  const { mutate: register, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof registerValidator>) =>
      axios.post('/register', formData),
  })

  const form = useForm<z.infer<typeof registerValidator>>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registerValidator>) => {
    register(values, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormFieldset disabled={isPending}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldset>
        <Button isLoading={isPending} className="w-full">
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
