import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'

import * as Sentry from '@sentry/nextjs'
const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)

  Sentry.metrics.set("user_view_register",user?.name) // Sentry 监听用户注册
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <Image
            src="/assets/icons/logo-full.svg"
            className="mb-12 w-fit h-10"
            height={1000}
            width={1000}
            alt={'CarePulse'}
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
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
