'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Control, useForm } from 'react-hook-form'
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'



const PaientsForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)
    try {
      const userData = { name, email, phone }
      const user = await createUser(userData)

      if (user!) {
        router.push(`/patients/${user.$id}/register`)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there ...</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Hugo Boss"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="emailAddress"
          placeholder="kayouka1255@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="(555) 555-5555"
        />

        <SubmitButton isLoading={isLoading}>Get Started!</SubmitButton>
      </form>
    </Form>
  )
}

export default PaientsForm
