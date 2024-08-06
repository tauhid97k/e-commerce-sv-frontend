'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

interface ModalInterface {
  children: React.ReactNode
  isOpen: boolean
  closable?: boolean
  onClose: () => void
}

const Modal = ({
  children,
  isOpen = false,
  closable = true,
  onClose,
}: ModalInterface) => {
  // Close modal if closable
  const close = () => {
    if (closable) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} transition className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="max-w-xl bg-white shadow-xl rounded-lg overflow-y-auto duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Modal
