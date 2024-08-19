import {PasskeyModal} from '@/components/PasskeyModal'
import PaientsForm from '@/components/forms/PatientForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
export default function Home(props:SearchParamProps) {
  
  const {searchParams}:any = props
  const isAdmin = searchParams?.admin === 'true'
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && (
        <PasskeyModal/>
      )}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            className="mb-12 w-fit h-10"
            height={1000}
            width={1000}
            alt={'patient'}
          />

          <PaientsForm />
    
          <p className="copyright justify-items-end text-dark-500 xl:text-left">
          © 2024 CarePluse
          </p>
          <div className="text-14-regular mt-20 flex justify-between">
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        className="side-img max-w-[50%]"
        width={1000}
        height={1000}
        src="/assets/images/onboarding-img.png"
        alt={'doctor'}
      />
    </div>
  )
}
