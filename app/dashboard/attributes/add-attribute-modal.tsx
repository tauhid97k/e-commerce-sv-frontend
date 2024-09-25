'use client'

import * as z from 'zod'
import { FormModal } from '@/components/form-modal'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form'
import { getQueryClient } from '@/lib/query-client'
import { FieldPath, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { attributeValidator } from '@/validators/attributeValidator'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/input'
import { Plus, Trash } from 'lucide-react'
import { Button } from '@/components/button'

const AddAttributeModal = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}) => {
  const axios = useAxios()
  const queryClient = getQueryClient()

  // Add Attribute
  const { mutate: addAttribute, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof attributeValidator>) =>
      axios.post('/admin/attributes', formData),
  })

  // Form Config
  const form = useForm<z.infer<typeof attributeValidator>>({
    resolver: zodResolver(attributeValidator),
    defaultValues: {
      name: '',
      options: [],
    },
  })

  // Allow multiple options value
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  // Add Attribute Form Handler
  const onSubmit = (values: z.infer<typeof attributeValidator>) => {
    addAttribute(values, {
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
        queryClient.invalidateQueries({ queryKey: ['attributes'] })
        queryClient.invalidateQueries({
          queryKey: ['attributeOptions'],
        })
        toast.success(message)
      },
    })
  }

  // Close Modal
  const closeModal = () => {
    setModalOpen(false)
    form.reset({
      name: '',
      options: [],
    })
  }

  return (
    <FormModal
      form={form}
      title="Add New Attribute"
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
          <FormItem className="col-span-2">
            <FormLabel>Attribute Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="col-span-2 ml-auto mt-2">
        <Button
          onClick={() =>
            append({
              value: '',
            })
          }
          type="button"
          variant="outline"
        >
          <Plus className="icon" />
          <span>Add value</span>
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="col-span-2 space-y-4">
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`options.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attribute value &#40;{index + 1}&#41;</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="icon"
                        onClick={() =>
                          append({
                            value: '',
                          })
                        }
                      >
                        <Plus className="icon" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash className="icon" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      )}
    </FormModal>
  )
}

export default AddAttributeModal
