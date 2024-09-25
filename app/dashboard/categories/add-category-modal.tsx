'use client'

import * as z from 'zod'
import { FormModal } from '@/components/form-modal'
import { Textarea } from '@/components/textarea'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form'
import { AsyncSelectCombobox } from '@/components/async-combobox'
import { getQueryClient } from '@/lib/query-client'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryValidator } from '@/validators/categoryValidator'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'
import { useAxios } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from '@/components/input'
import { Switch } from '@/components/switch'
import slugify from 'slugify'

const AddCategoryModal = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}) => {
  const axios = useAxios()
  const queryClient = getQueryClient()

  // Get Categories (For Select Option)
  const { data: categoryOptions, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categoryOptions'],
    queryFn: () =>
      axios.get('/options/categories').then((response) => response.data),
  })

  // Add Category
  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof categoryValidator>) =>
      axios.post('/admin/categories', formData),
  })

  // Form Config
  const form = useForm<z.infer<typeof categoryValidator>>({
    resolver: zodResolver(categoryValidator),
    defaultValues: {
      parent_id: '',
      name: '',
      slug: '',
      description: '',
      is_visible: false,
      seo_title: '',
      seo_description: '',
    },
  })

  // Slug generation from category name
  const handleSlug = (value: string) => {
    const generatedSlug = slugify(value, { lower: true, strict: true })
    form.setValue('slug', generatedSlug)
  }

  // Add Category Form Handler
  const onSubmit = (values: z.infer<typeof categoryValidator>) => {
    addCategory(values, {
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
        form.reset()
        setModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['categories'] })
        queryClient.invalidateQueries({
          queryKey: ['categoryOptions'],
        })
        toast.success(message)
      },
    })
  }

  // Close Modal
  const closeModal = () => {
    setModalOpen(false)
    form.reset()
  }

  return (
    <FormModal
      form={form}
      title="Add New Category"
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={form.handleSubmit(onSubmit)}
      isPending={isPending}
      autoComplete="off"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  handleSlug(e.target.value)
                }}
              />
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
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input type="text" {...field} readOnly disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="parent_id"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Parent Category</FormLabel>
            <FormControl>
              <AsyncSelectCombobox
                defaultOptions={categoryOptions}
                isLoading={isCategoryLoading}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption?.value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="seo_title"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>SEO Title</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="seo_description"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>SEO Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="is_visible"
        render={({ field }) => (
          <FormItem className="flex gap-2 items-center mt-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="text-sm font-normal !m-0">
              Visible to customers
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormModal>
  )
}

export default AddCategoryModal
