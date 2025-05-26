import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import doctors from "@/data/doctors.json";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = doctors.find(
    (doc) => doc.name.toLowerCase() === appointment.primaryPhysician?.toLowerCase()
  );


  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <div className="flex items-center mb-6">
            <Image
              src="/assets/images/omnimed-logo.webp"
              height={3000}
              width={3000}
              alt="patient"
              className="h-10 w-fit"
            />
            <h1 className="ml-2 text-3xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              OmniMed
            </h1>
          </div>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || '/assets/images/default-doctor.png'}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
              <p className="font-semibold">{doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2025 OmniMed</p>
      </div>
    </div>
  );
};

export default RequestSuccess;