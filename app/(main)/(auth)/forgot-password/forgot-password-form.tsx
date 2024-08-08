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
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { forgotPasswordValidator } from '@/validators/authValidator'
import Link from 'next/link'

const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordValidator>>({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof forgotPasswordValidator>) => {
    // Submit form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldset disabled={form.formState.isSubmitting}>
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
        </FormFieldset>
        <Button isLoading={form.formState.isSubmitting} className="w-full mb-4">
          Send password reset code
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
