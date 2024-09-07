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
import { Plus } from 'lucide-react'

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

  // Submit form
  const onSubmit = (values: any) => {
    // Code
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormFieldset
          disabled={form.formState.isSubmitting}
          className="grid-cols-1 lg:grid-cols-4 gap-5"
        >
          <div className="lg:col-span-2 space-y-4">
            {/* Product Details */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">General Information</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Product Name</FormLabel>
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
                      <FormLabel isRequired>Product Slug</FormLabel>
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
                      <FormLabel isRequired>Description</FormLabel>
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

            {/* Product Variant */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Variants</h5>
                <button className="card-btn">
                  <Plus className="icon" />
                  <span>Add Variant</span>
                </button>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {/* Product Images */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Images</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          maxFiles={6}
                          onFilesChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Brand */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Brand</h5>
              </div>
              <div className="card-body"></div>
            </div>

            {/* Product Category */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Category</h5>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        </FormFieldset>
        <div className="flex justify-end">
          <Button
            type="submit"
            value="publish"
            isLoading={form.formState.isSubmitting}
          >
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddProductForm
