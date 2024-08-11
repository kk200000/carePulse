'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { FormFieldType } from './forms/PaientsForm'
import Image from 'next/image'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js/core'

interface CustomProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType: FormFieldType
}
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              className="border-0 shad-input"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="CN"
            international
            withCountryCallingCode
            placeholder={placeholder}
            value={(field.value as E164Number) || undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )
    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const {
    label,
    control,
    name,
    placeholder,
    fieldType,
    iconAlt,
    iconSrc,
    disabled,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
  }: any = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
