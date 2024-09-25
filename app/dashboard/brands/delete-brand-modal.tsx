'use client'

import { AlertModal } from '@/components/alert-modal'
import { getQueryClient } from '@/lib/query-client'
import { handleError, handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'
import { useAxios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/button'
import { FormFieldset } from '@/components/form'

const DeleteBrandModal = ({
  isModalOpen,
  setModalOpen,
  brandId,
}: {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
  brandId: string | number
}) => {
  const axios = useAxios()
  const queryClient = getQueryClient()

  // Delete Brand Mutation
  const { mutate: deleteBrand, isPending } = useMutation({
    mutationFn: () => axios.delete(`/admin/brands/${brandId}`),
  })

  // Handle Delete Brand
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    deleteBrand(undefined, {
      onError: (data) => {
        setModalOpen(false)
        const { error } = handleError(data)
        toast.error(error)
      },
      onSuccess: (data) => {
        const { message } = handleSuccess(data)
        setModalOpen(false)
        queryClient.invalidateQueries({
          queryKey: ['brands'],
        })
        queryClient.invalidateQueries({
          queryKey: ['brandOptions'],
        })
        toast.success(message)
      },
    })
  }

  return (
    <AlertModal
      title="Delete Brand"
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      isPending={isPending}
    >
      <form onSubmit={onSubmit}>
        <FormFieldset disabled={isPending}>
          <p>
            This action cannot be undone. This will permanently delete the brand
            and mark associated products as unbranded.
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

export default DeleteBrandModal
