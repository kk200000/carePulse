import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scollbar container my-auto">
        <div className="sub-container max-w-[496px] ">
          <Image
            src="/assets/icons/logo-full.svg"
            className="mb-12 w-fit h-10"
            height={1000}
            width={1000}
            alt={'CarePulse'}
          />

          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-500 xl:text-left">
              @2024 CarePulse.
            </p>
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
        src="/assets/images/register-img.png"
        alt={'patient'}
      />
    </div>
  )
}

export default Register
