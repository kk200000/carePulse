import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'w-full shad-primary-btn '}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            className="animate-spin"
            src="/assets/icons/loader.svg"
            alt={'loader'}
            width={24}
            height={24}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
