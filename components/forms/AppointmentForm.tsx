'use client'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SubmitButton from '../SubmitButton'
import { Dispatch, SetStateAction, useState } from 'react'
import { getAppointmentSchema } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { SelectItem } from '../ui/select'
import { Doctors } from '@/constatns'
import Image from 'next/image'
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.actions'
import { Appointment } from '@/types/appwrite.types'
const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: 'create' | 'schedule' | 'cancel'
  userId: string
  patientId?: string
  appointment?: Appointment
  setOpen?: (open: boolean) => void
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician ?? '',
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment?.reason ?? '',
      note: appointment?.note ?? '',
      cancellationReason: appointment?.cancellationReason ?? '',
    },
  })
  let buttonLabel
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment'
      break
    case 'create':
      buttonLabel = 'Create Appointment'
      break
    case 'schedule':
      buttonLabel = 'Schedule Appointment'
      break
  }
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true)
    let status

    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break
      case 'create':
        status = 'pending'
        break
      case 'cancel':
        status = 'cancelled'
        break
    }
    const {
      primaryPhysician,
      schedule,
      reason,
      note,
      cancellationReason,
    }: any = values
    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician,
          schedule: new Date(schedule),
          reason,
          note,
          status: status as Status,
          cancellationReason,  
        }
        const newAppointment = await createAppointment(appointmentData)

        if (newAppointment) {
          form.reset()
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          )
        }
      } else {
        const appointmentToCancel = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(schedule),
            status: status as Status,
            cancellationReason,
          },
          type,
        }
        const newAppointment = await updateAppointment(appointmentToCancel)
        if (newAppointment) {
        setOpen && setOpen(false)
          form.reset()
        }
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appoitnment in 10 seconds.
            </p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor">
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="Schedule"
              label="Expect Appointment Date"
              dateFormat="MM/dd/yyyy - h:mm aa"
              showTimeSelect
            />

            <div className="flex gap-6 flex-col xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                // disabled={type === 'schedule'}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                // disabled={type === 'schedule'}
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancelationReason"
            label="Reason for cancellation"
            placeholder="Enter the reason for cancellation"
          />
        )}

        <SubmitButton
          className={`${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
          isLoading={isLoading}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
