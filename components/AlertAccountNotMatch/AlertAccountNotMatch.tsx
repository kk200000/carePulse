'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from '@/components/ui/alert-dialog'
import { Dispatch, SetStateAction } from 'react'

const AlertAccountNotMatch = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogOverlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[8px] bg-gray-900 p-[25px] shadow-lg border border-gray-700 focus:outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white m-0 text-[17px] font-medium">
            Please Confirm Your Information
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 mt-4 mb-5 text-[15px] leading-normal">
            Your email address or phone number does not match your full name.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-[#24AE7C] hover:text-[#1e9c67]">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertAccountNotMatch
