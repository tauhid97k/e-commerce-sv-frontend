'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { Input } from './input'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

type FileUploaderProps = {
  maxFiles?: number
  maxFileSize?: number
  onFilesChange: (files: File[]) => void
}

export const FileUploader = ({
  maxFiles = 1,
  maxFileSize = 5, // 5MB
  onFilesChange,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<(File & { url: string })[]>([])

  // Handle files selection (on drag or browse)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { url: URL.createObjectURL(file) })
        ),
      ])
    }
  }, [])

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles,
    maxSize: maxFileSize * 1024 * 1024, // MB
  })

  // Update files selection
  useEffect(() => {
    onFilesChange(files)
  }, [files, onFilesChange])

  // Remove file
  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  // Revoke the data uris on unmount to avoid memory leaks
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        {...getRootProps({
          className:
            'min-h-[160px] flex flex-wrap gap-2 items-center justify-center border-2 border-dashed border-light-200 cursor-pointer p-4 rounded-md focus:outline-none focus-visible:border-primary-200/50',
        })}
      >
        <Input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p className="flex flex-col items-center gap-2">
            <Upload className="size-8" />
            <span>Drag and Drop here</span>
            <span>Or</span>
            <span className="text-primary-200">Browse image files</span>
          </p>
        )}
      </div>

      {/* Preview Files */}
      {files?.length > 0 && (
        <ul className="flex flex-wrap gap-4 !mt-5">
          {files.map((file, index) => (
            <li key={index} className="relative">
              <Image
                src={file.url}
                alt={file.name}
                width={120}
                height={120}
                title={file.name}
                className="rounded-md aspect-square object-cover border"
              />
              <button
                onClick={() => {
                  removeFile(file.name)
                  URL.revokeObjectURL(file.url)
                }}
                type="button"
                className="absolute -top-[12px] -right-[12px] size-6 flex items-center justify-center bg-red-400 rounded-full"
              >
                <X className="size-4 text-white" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
