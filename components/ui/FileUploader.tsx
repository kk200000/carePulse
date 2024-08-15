'use client'
import { convertFileToUrl } from '@/lib/utils'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
type FileUploaderProps = {
  files: File[]
  onChnage: (files: File[]) => void
}
const FileUpload = ({ files, onChnage }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(files, acceptedFiles)

    onChnage(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="upload image"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <div>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={40}
            height={40}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drage
              and drop
            </p>
            <p>SVG, PNG,JPG or GIF (max 800*400)</p>
          </div>
        </div>
      )}

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default FileUpload
