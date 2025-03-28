'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProofOfPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (file: File) => Promise<void>
}

export function ProofOfPaymentDialog ({
  open,
  onOpenChange,
  onSubmit
}: ProofOfPaymentDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    setIsLoading(true)
    try {
      await onSubmit(file)
      onOpenChange(false)
    } catch (error) {
      console.error('Error uploading proof:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Upload Proof of Payment</DialogTitle>
          <DialogDescription>
            Please upload a clear image of your payment receipt
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4'>
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-6 transition-colors',
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
              'hover:border-blue-500 hover:bg-blue-50'
            )}
            onDragOver={e => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className='relative aspect-video'>
                <Image
                  src={preview}
                  alt='Payment proof preview'
                  fill
                  className='object-cover rounded-lg'
                />
                <button
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ) : (
              <div className='text-center'>
                <ImageIcon className='mx-auto h-12 w-12 text-gray-400' />
                <div className='mt-4 flex text-sm text-gray-600'>
                  <label className='relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500'>
                    <span>Upload a file</span>
                    <input
                      ref={fileInputRef}
                      type='file'
                      className='sr-only'
                      accept='image/*'
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500 mt-2'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>

          <div className='mt-4 flex justify-end gap-3'>
            <Button
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || isLoading}
              className='bg-gradient-to-r from-blue-500 to-purple-500'
            >
              {isLoading ? 'Uploading...' : 'Submit'}
              {!isLoading && <Upload className='ml-2 h-4 w-4' />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
