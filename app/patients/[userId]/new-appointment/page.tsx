import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Link from "next/link";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2025 OmniMed</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;