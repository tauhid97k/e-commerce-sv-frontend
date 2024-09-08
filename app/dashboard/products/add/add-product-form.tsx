'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { Plus, Trash } from 'lucide-react'
import { SelectCombobox } from '@/components/combobox'

const AddProductForm = () => {
  const form = useForm<z.infer<typeof productValidator>>({
    resolver: zodResolver(productValidator),
    defaultValues: {
      name: '',
      slug: 'Some slug',
      description: '',
      brand: '',
      categories: [],
      images: [],
      variants: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  })

  // Submit form
  const onSubmit = (values: any) => {
    // Code
    console.log(values)
  }

  const brandOptions = [
    { value: '1', label: 'Le Reve' },
    { value: '2', label: 'Cats Eye' },
    { value: '3', label: 'Arong' },
    { value: '4', label: 'Richman' },
    { value: '5', label: 'Yellow' },
  ]

  const categoryOptions = [
    { value: '1', label: 'T-Shirt' },
    { value: '2', label: 'Hoodie' },
  ]

  const attributes = [
    { value: '1', label: 'Color' },
    { value: '2', label: 'Size' },
  ]

  const attributeOptions = [
    { value: '1', label: 'Red' },
    { value: '2', label: 'Black' },
  ]

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
                <h5 className="card-title">
                  Product Variants &#40;{fields.length}&#41;
                </h5>
                <button
                  onClick={() =>
                    append({
                      attribute: '',
                      attribute_options: [],
                      images: [],
                    })
                  }
                  type="button"
                  className="card-btn"
                >
                  <Plus className="icon" />
                  <span>Add Variant</span>
                </button>
              </div>
              {fields.length > 0 && (
                <div className="card-body">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.attribute`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute</FormLabel>
                            <FormControl>
                              <SelectCombobox
                                options={attributes}
                                placeholder="Select attribute"
                                value={attributes.find(
                                  (option) => option.value === field.value
                                )}
                                onChange={(selectedOption) =>
                                  field.onChange(selectedOption?.value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.attribute_options`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Options</FormLabel>
                            <FormControl>
                              <SelectCombobox
                                isMulti
                                options={attributeOptions}
                                placeholder="Select attribute options"
                                value={attributeOptions.filter((option) =>
                                  field.value?.includes(option.value)
                                )}
                                onChange={(selectedOptions) => {
                                  const selectedValues = selectedOptions.map(
                                    (option) => option.value
                                  )
                                  field.onChange(selectedValues)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.images`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Variant Images</FormLabel>
                            <FormControl>
                              <FileUploader
                                maxFiles={3}
                                onFilesChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Add and Remove Variant */}
                      <div className="flex justify-end gap-2 border-t pt-3">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash className="size-4" />
                          <span>Remove</span>
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            append({
                              attribute: '',
                              attribute_options: [],
                              images: [],
                            })
                          }
                        >
                          <Plus className="size-4" />
                          <span>Add</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <h5 className="card-title">Product Brand</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectCombobox
                          options={brandOptions}
                          placeholder="Select brand"
                          value={brandOptions.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Category */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Categories</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectCombobox
                          isMulti
                          options={categoryOptions}
                          placeholder="Select categories"
                          value={categoryOptions.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
                              (option) => option.value
                            )
                            field.onChange(selectedValues)
                          }}
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
