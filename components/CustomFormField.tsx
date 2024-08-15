'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import Image from 'next/image'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js/core'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

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
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    showTimeSelect,
    dateFormat,
    name,
    label,
    renderSkeleton,
  } = props

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

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {
            <Image
              src={iconSrc || '/assets/icons/calendar.svg'}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          }
          <FormControl>
            <DatePicker
              selected={field.value}
              showTimeSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              onChange={(date) => {
                field.onChange(date)
              }}
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className="shad-textArea"
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      )

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {label}
            </label>
          </div>
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
