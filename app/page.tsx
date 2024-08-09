import PaientsForm from '@/components/forms/PaientsForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (

    
    <div className="flex h-screen max-h-screen">
      <section className="remove-scollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="assets/icons/logo-full.svg"
            className="mb-12 w-fit h-10"
            height={1000}
            width={1000}
            alt={'patient'}
          />

          <PaientsForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-500 xl:text-left">
              @2024 CarePulse.
            </p>
            <Link href="/?admin=true" className="text-gray-500">
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
