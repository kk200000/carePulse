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
