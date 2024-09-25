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
import { getQueryClient } from '@/lib/query-client'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { brandValidator } from '@/validators/brandValidator'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/input'
import { Switch } from '@/components/switch'
import slugify from 'slugify'

const AddBrandModal = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}) => {
  const axios = useAxios()
  const queryClient = getQueryClient()

  // Add Brand
  const { mutate: addBrand, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof brandValidator>) =>
      axios.post('/admin/brands', formData),
  })

  // Form Config
  const form = useForm<z.infer<typeof brandValidator>>({
    resolver: zodResolver(brandValidator),
    defaultValues: {
      name: '',
      slug: '',
      website: '',
      description: '',
      is_visible: false,
      seo_title: '',
      seo_description: '',
    },
  })

  // Slug generation from brand name
  const handleSlug = (value: string) => {
    const generatedSlug = slugify(value, { lower: true, strict: true })
    form.setValue('slug', generatedSlug)
  }

  // Add Brand Form Handler
  const onSubmit = (values: z.infer<typeof brandValidator>) => {
    addBrand(values, {
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
        queryClient.invalidateQueries({ queryKey: ['brands'] })
        queryClient.invalidateQueries({
          queryKey: ['brandOptions'],
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
      title="Add New Brand"
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
            <FormLabel>Brand Name</FormLabel>
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
        name="website"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Brand Website</FormLabel>
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

export default AddBrandModal
