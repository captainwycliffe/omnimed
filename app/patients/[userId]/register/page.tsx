import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/disease-prediction`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center">
            <Image
              src="/assets/images/omnimed-logo.webp"
              height={3000}
              width={3000}
              alt="patient"
              className="h-10 w-fit"
            />
            <h1 className="ml-2 text-3xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">OmniMed</h1>
          </div>
        </Link>

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2025 OmniMed</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;