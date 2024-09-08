'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { Input } from './input'
import { ArrowDownToLine, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'

type FileUploaderProps = {
  maxFiles?: number
  maxFileSize?: number
  onFilesChange: (files: File[]) => void
}

export const FileUploader = ({
  maxFiles = 1,
  maxFileSize = 5, // Default 5MB
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

  // Revoke the data uris on unmount to avoid memory leaks
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Remove file
  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* File Selector */}
      {files.length < maxFiles && (
        <div
          {...getRootProps({
            className:
              'shrink-0 size-[160px] flex gap-2 items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer p-4 rounded-md focus:outline-none focus-visible:bg-light-100 hover:bg-light-100',
          })}
        >
          <Input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex flex-col gap-1 items-center justify-center">
              <ArrowDownToLine className="stroke-1 size-10 animate-bounce" />
              <span>Drop here</span>
            </div>
          ) : (
            <div className="text-muted/70">
              <ImagePlus className="size-10 stroke-1 mb-2 mx-auto" />
              <p className="flex flex-col items-center">
                <span>Drag and drop</span>
                <span>or</span>
                <span className="text-primary-200">Browse</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Files Preview */}
      {files?.length > 0 && (
        <>
          {files.map((file, index) => (
            <div
              key={index}
              className="size=[160px] relative group rounded-md overflow-hidden"
            >
              <Image
                src={file.url}
                alt={file.name}
                width={160}
                height={160}
                title={file.name}
                className="aspect-square object-cover"
              />

              {/* Remove Image */}
              <div className="absolute inset-0 w-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <button
                  onClick={() => {
                    removeFile(file.name)
                    URL.revokeObjectURL(file.url)
                  }}
                  type="button"
                  className="size-[80px] flex items-center justify-center bg-red-500/70 rounded-full scale-95 group-hover:scale-100 transition-transform delay-75 ease-in-out"
                >
                  <X className="size-[40px] stroke-[1.5] text-white" />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
