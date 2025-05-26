"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import doctors from "@/data/doctors.json"; 
import { Doctors as FallbackDoctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{JSON.stringify(appointment.patient?.name)}
</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctorFromJson = doctors.find(
        (doc) =>
          doc.name.toLowerCase() === appointment.primaryPhysician?.toLowerCase()
      );
      
      const fallbackDoctor = FallbackDoctors.find(
        (doc) =>
          doc.name.toLowerCase() === appointment.primaryPhysician?.toLowerCase()
      );
      
      const doctor = {
        ...fallbackDoctor,
        ...doctorFromJson, // override fallback with json data
      };

      return (
        <div className="flex items-center gap-3">
          {doctor?.image ? (
            <Image
              src={doctor.image}
              alt={doctor.name!}
              width={32}
              height={32}
              className="rounded-full border border-gray-300"
            />
          ) : (
            <div className="size-8 bg-gray-200 rounded-full" />
          )}
          <p className="whitespace-nowrap">
             {doctor?.name || appointment.primaryPhysician}
          </p>
        </div>
      );
    }
    },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patient?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];