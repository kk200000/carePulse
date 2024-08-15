import AppointmentForm from '@/components/forms/AppointmentForm'
import PaientsForm from '@/components/forms/PatientForm'
import { Button } from '@/components/ui/button'
import { getPatient } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            className="mb-12 w-fit h-10"
            height={1000}
            width={1000}
            alt={'patient'}
          />

          <AppointmentForm type="create" userId={userId}  patientId={patient?.$id} />

          <p className="copyright mt-10 py-12 ">© 2024 CarePluse</p>
        </div>
      </section>
      <Image
        className="side-img max-w-[390px] bg-bottom"
        width={1000}
        height={1000}
        src="/assets/images/appointment-img.png"
        alt={'doctor'}
      />
    </div>
  )
}

export default NewAppointment
