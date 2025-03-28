import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Upload, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProofOfPaymentUploadProps {
  onUpload: (file: File) => void
  onClose: () => void
}

export function ProofOfPaymentUpload ({
  onUpload,
  onClose
}: ProofOfPaymentUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto bg-gray-900 border-gray-800'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-white'>
          Upload Proof of Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center w-full'>
          <label
            htmlFor='dropzone-file'
            className={cn(
              'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer',
              'bg-gray-800 border-gray-600 hover:border-blue-500 hover:bg-gray-700',
              'transition-all duration-200 ease-in-out',
              file ? 'border-green-500' : 'border-gray-600'
            )}
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              {file ? (
                <Check className='w-10 h-10 mb-3 text-green-400' />
              ) : (
                <Upload className='w-10 h-10 mb-3 text-blue-400' />
              )}
              <p className='mb-2 text-base text-white'>
                <span className='font-semibold text-blue-400 hover:text-blue-300'>
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className='text-sm text-gray-300'>
                PNG, JPG or PDF (MAX. 10MB)
              </p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={handleFileChange}
              accept='image/png,image/jpeg,image/jpg,application/pdf'
            />
          </label>
        </div>
        {file && (
          <div className='mt-4 p-3 bg-gray-800 rounded-lg'>
            <p className='text-sm text-white flex items-center gap-2'>
              <Check className='w-4 h-4 text-green-400' />
              Selected file: <span className='text-blue-400'>{file.name}</span>
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between gap-4'>
        <Button
          variant='outline'
          onClick={onClose}
          className='border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white'
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file}
          className={cn(
            'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
            'rounded-xl px-6 py-2 text-lg font-medium transition-all duration-300',
            'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          Upload
        </Button>
      </CardFooter>
    </Card>
  )
}
