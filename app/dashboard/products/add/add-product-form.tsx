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
import { TipTapEditor } from '@/components/tiptap-editor'
import { FileUploader } from '@/components/file-uploader'
import { productValidator } from '@/validators/productValidator'

const AddProductForm = () => {
  const form = useForm<z.infer<typeof productValidator>>({
    resolver: zodResolver(productValidator),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      images: [],
    },
  })

  // Handle Files
  const handleFilesChange = (files: File[]) => {
    form.setValue('images', files)
  }

  // Submit form
  const onSubmit = (values: any) => {
    // Code
  }

  return (
    <div className="bg-white border rounded-md p-6 overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <FormFieldset
            disabled={form.formState.isSubmitting}
            className="grid-cols-1 lg:grid-cols-4"
          >
            <div className="lg:col-span-2 space-y-4">
              <div className="card">
                <div className="card-body">
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
                          <Input type="text" {...field} />
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
                            content={field.value as string}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="card">
                <div className="card-body">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Images</FormLabel>
                        <FormControl>
                          <FileUploader
                            maxFiles={6}
                            onFilesChange={handleFilesChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </FormFieldset>
          <div className="flex justify-end">
            <Button type="submit" isLoading={form.formState.isSubmitting}>
              Add Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
