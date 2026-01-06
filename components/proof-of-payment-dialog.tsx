'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as LucideImage, CheckCircle } from 'lucide-react'
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

export function ProofOfPaymentDialog({
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
      <DialogContent className='sm:max-w-md bg-gray-900 text-white border border-gray-800'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-white'>
            Upload Proof of Payment
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Please upload a clear image of your payment receipt
          </DialogDescription>
        </DialogHeader>

        <div className='mt-6 space-y-6'>
          <div
            className={cn(
              'border-2 border-dashed rounded-xl p-8 transition-all duration-200',
              'bg-gray-800/50 hover:bg-gray-800',
              isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700',
              'hover:border-blue-500'
            )}
            onDragOver={e => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className='relative aspect-video group'>
                <Image
                  src={preview}
                  alt='Payment proof preview'
                  fill
                  className='object-cover rounded-lg'
                />
                <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg' />
                <button
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                  className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ) : (
              <div className='text-center'>
                <LucideImage className='mx-auto h-12 w-12 text-gray-500' />
                <div className='mt-4 flex flex-col items-center gap-2'>
                  <label className='cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors'>
                    <Upload className='w-4 h-4 mr-2' />
                    <span className='text-sm font-medium'>Choose a file</span>
                    <input
                      ref={fileInputRef}
                      type='file'
                      className='sr-only'
                      accept='image/*'
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className='text-sm text-gray-400'>or drag and drop here</p>
                  <p className='text-xs text-gray-500 mt-2'>
                    Supported: PNG, JPG, GIF (Max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className='border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || isLoading}
              className={cn(
                'bg-gradient-to-r from-blue-600 to-purple-600',
                'hover:from-blue-700 hover:to-purple-700',
                'text-white font-medium px-6',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200'
              )}
            >
              {isLoading ? (
                <>
                  <div className='animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2' />
                  Uploading...
                </>
              ) : (
                <>
                  Submit
                  <Upload className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
