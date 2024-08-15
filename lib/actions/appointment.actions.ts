'use server'
import { ID, Query } from 'node-appwrite'
import { parseStringify } from '../utils'
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  database,
} from '../appwrite.config'

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    )

    return parseStringify(newAppointment)
  } catch (error: any) {
    console.log({ error })
  }
}


// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};
