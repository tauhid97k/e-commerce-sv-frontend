'use client'

import Modal from '@/components/modal'
import { useState } from 'react'
import { Button } from '@/components/button'

const ExampleModal = () => {
  const [testModal, setTestModal] = useState(false)

  const closeModal = () => {
    setTestModal(false)
  }

  return (
    <div>
      Overview Page
      <Button onClick={() => setTestModal(true)}>Open Modal</Button>
      <Modal isOpen={testModal} onClose={closeModal}>
        <section className="space-y-6 p-6">
          <header>
            <h2 className="text-lg font-medium leading-none mb-2">
              Delete User
            </h2>

            <p className="text-[15px] text-dark/70">
              Once user is deleted, all of its resources and data will be
              permanently deleted.
            </p>
          </header>

          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </section>
      </Modal>
    </div>
  )
}

export default ExampleModal
