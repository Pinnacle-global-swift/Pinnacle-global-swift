import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProofOfPaymentUploadProps {
  onUpload: (file: File) => void
  onClose: () => void
}

export function ProofOfPaymentUpload({ onUpload, onClose }: ProofOfPaymentUploadProps) {
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Upload Proof of Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={cn(
              "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
              "bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600",
              file ? "border-green-500" : "border-gray-300",
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file ? (
                <Check className="w-10 h-10 mb-3 text-green-500" />
              ) : (
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
              )}
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG or PDF (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {file && <p className="mt-2 text-sm text-gray-300">Selected file: {file.name}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file}
          className={cn(
            "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
            "rounded-xl px-4 py-2 text-lg font-medium transition-all duration-300",
            "hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400",
          )}
        >
          Upload
        </Button>
      </CardFooter>
    </Card>
  )
}

