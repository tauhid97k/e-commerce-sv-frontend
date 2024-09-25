'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Form, FormFieldset } from '@/components/form'
import { UseFormReturn } from 'react-hook-form'
import { Button } from './button'
import { FormHTMLAttributes } from 'react'
import { X } from 'lucide-react'

// Modal Props Interface
interface ModalInterface extends FormHTMLAttributes<HTMLFormElement> {
  title: string
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  form: UseFormReturn<any>
}

// FormModal Component
const FormModal = ({
  title,
  children,
  isOpen = false,
  isPending = false,
  onClose,
  form,
  ...formProps
}: ModalInterface) => {
  // Close modal if it's not pending
  const close = () => {
    if (!isPending) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} transition className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 size-full grid place-items-center p-8 overflow-y-auto">
        <DialogPanel
          transition
          className="w-full max-w-2xl bg-white shadow-xl rounded-lg duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <DialogTitle className="font-medium leading-none">
              {title}
            </DialogTitle>
            <button
              onClick={close}
              className="rounded-full hover:text-dark-300"
            >
              <X className="size-6 stroke-[1.5]" />
            </button>
          </div>

          <Form {...form}>
            <form {...formProps}>
              <FormFieldset disabled={isPending}>
                <div className="grid grid-cols-2 gap-3 p-5">{children}</div>
                <div className="flex justify-end gap-3 py-3 px-5 border-t">
                  <Button type="button" onClick={close} variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isPending}>
                    Save
                  </Button>
                </div>
              </FormFieldset>
            </form>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export { FormModal }
