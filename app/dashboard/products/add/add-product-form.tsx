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
import TipTapEditor from '@/components/tiptap-editor'

const AddProductForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  })

  const onSubmit = (values: any) => {
    // Submit form
  }

  return (
    <div className="bg-white border rounded-md p-6 overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormFieldset
            disabled={form.formState.isSubmitting}
            className="grid-cols-4"
          >
            <div className="card col-span-2">
              <div className="card-body space-y-2.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Slug</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TipTapEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </FormFieldset>
          <div className="flex justify-end">
            <Button isLoading={form.formState.isSubmitting}>Add Product</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
