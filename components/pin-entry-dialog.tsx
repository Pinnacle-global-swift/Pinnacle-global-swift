import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PinEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (pin: string) => void
}

export function PinEntryDialog({ open, onOpenChange, onSubmit }: PinEntryDialogProps) {
  const [pin, setPin] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.length === 6) {
      onSubmit(pin)
      setPin('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter 6-digit PIN</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 6-digit PIN"
            className="mb-4"
          />
          <Button type="submit" disabled={pin.length !== 6}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

