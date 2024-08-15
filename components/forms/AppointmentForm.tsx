'use client'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { getAppointmentSchema } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { SelectItem } from '../ui/select'
import { Doctors } from '@/constatns'
import Image from 'next/image'
import { createAppointment } from '@/lib/actions/appointment.actions'
const AppointmentForm = ({
  type,
  userId,
  patientId,
}: {
  type: 'create' | 'schedule' | 'cancel'
  userId: string
  patientId?: string
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(),
      reason: '',
      note: '',
      cancellationReason: '',
    },
  })

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
        const appointment = await createAppointment(appointmentData)
        console.log({ appointment })

        if (appointment) {
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          )
        }
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appoitnment in 10 seconds.
          </p>
        </section>

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
                disabled={type === 'schedule'}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'}
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
