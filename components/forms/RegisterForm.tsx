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
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { PatientFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser, registerPatient } from '@/lib/actions/patient.actions'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constatns'
import { Label } from '../ui/label'
import { SelectItem } from '@/components/ui/select'
import Image from 'next/image'
import FileUpload from '../ui/FileUploader'
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true)
    let formData
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      })
      formData = new FormData()
      formData.append('blobFile', blobFile)
      formData.append('fileName', values.identificationDocument[0].name)
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        birthDate: new Date(values.birthDate),
      }
      console.log({ patientData })

      // @ts-ignore
      const newPaient = await registerPatient(patientData)
      if (newPaient) {
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Infomation.</h2>
          </div>
        </section>

        {/* NAME */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Hugo Boss"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* EMAIL & PHONE */}
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        {/* BirthDate & Gender */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birthday"
            iconAlt="calendar"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex gap-6 xl:justify-between h-11"
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {GenderOptions.map((option, i) => (
                    <div className="radio-group" key={option + i}>
                      <RadioGroupItem
                        value={option}
                        id={option}></RadioGroupItem>
                      <Label
                        className={`cursor-pointer ${
                          i === 2 ? '' : ''
                        }`} /**其他性别特殊处理 */
                        htmlFor={option}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="Your address"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Your occupation"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="emergency ContactName"
            placeholder="Gardian's Name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(555) 555-5555"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Infomation.</h2>
          </div>
        </section>

        {/* PRIMARY CARE PHYSICIAN */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician">
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BlueCross BlueShield"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts,Mongo,Pollen"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current Medication(if any)"
            placeholder="Ibuprofen 200mg, Aspirin 325mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother had heart disease"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Add"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification.</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="IdentificationType"
          label="Identification Type"
          placeholder="Select an indentification type">
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="12345678"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Scanned copy of identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUpload files={field.value} onChnage={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy.</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health
            information for treatment purposes."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the
            privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started!</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
