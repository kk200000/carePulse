import * as sdk from 'node-appwrite'

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  PATIENT_Collection_ID,
  DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env

const client = new sdk.Client()


client.setEndpoint(ENDPOINT!).setKey(API_KEY!).setProject(PROJECT_ID!)

export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)
