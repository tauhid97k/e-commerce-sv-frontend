'use client'

import { AlertModal } from '@/components/alert-modal'
import { getQueryClient } from '@/lib/query-client'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/button'
import { FormFieldset } from '@/components/form'

const DeleteCategoryModal = ({
  isModalOpen,
  setModalOpen,
  categoryId,
}: {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
  categoryId: string | number
}) => {
  const axios = useAxios()
  const queryClient = getQueryClient()

  // Delete Category Mutation
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: () => axios.delete(`/admin/categories/${categoryId}`),
  })

  // Handle Delete Category
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    deleteCategory(undefined, {
      onError: (data) => {
        setModalOpen(false)
        const { error } = handleError(data)
        toast.error(error)
      },
      onSuccess: (data) => {
        const { message } = handleSuccess(data)
        setModalOpen(false)
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categoryOptions'],
        })
        toast.success(message)
      },
    })
  }

  return (
    <AlertModal
      title="Delete Category"
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      isPending={isPending}
    >
      <form onSubmit={onSubmit}>
        <FormFieldset disabled={isPending}>
          <p>
            This action cannot be undone. This will permanently delete the
            category and remove associated products.
          </p>
          <div className="flex justify-end gap-3 py-5">
            <Button
              type="button"
              onClick={() => setModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              Continue
            </Button>
          </div>
        </FormFieldset>
      </form>
    </AlertModal>
  )
}

export default DeleteCategoryModal
