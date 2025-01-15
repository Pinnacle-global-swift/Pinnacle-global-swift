'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export function NewToaster({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "mb-4 rounded-lg shadow-lg overflow-hidden",
              toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            )}
            role="alert"
          >
            <div className="flex items-center px-4 py-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
              {toast.type === 'info' && <Info className="w-5 h-5 mr-2" />}
              <div className="flex-1">
                <p className="font-medium">{toast.title}</p>
                {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => toast.onClose()}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

