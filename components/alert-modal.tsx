'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

// Modal
interface ModalInterface {
  title: string
  children: React.ReactNode
  isOpen: boolean
  isPending: boolean
  onClose: () => void
}

const AlertModal = ({
  title,
  children,
  isOpen = false,
  isPending = false,
  onClose,
}: ModalInterface) => {
  // Close modal if closable
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
      <div className="fixed inset-0 size-full flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg bg-white shadow-xl rounded-lg duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="text-lg font-medium leading-none p-5">
            {title}
          </DialogTitle>

          <div className="px-5">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export { AlertModal }
