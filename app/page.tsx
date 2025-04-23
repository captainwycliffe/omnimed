import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal }  from "@/components/PasskeyModal";

export default function Home({ searchParams}: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex items-center mb-12">
            <Image
              src="/assets/images/omnimed-logo.webp"
              height={3000}
              width={3000}
              alt="patient"
              className="h-10 w-fit"
            />
            <h1 className="ml-2 text-3xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">OmniMed</h1>
          </div>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 OmniMed
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/doctors.webp"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
