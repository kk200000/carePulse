import * as sdk from 'node-appwrite'


const client = new sdk.Client()

// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   APPOINTMENT_COLLECTION_ID,
//   PATIENT_Collection_ID,
//   DOCTOR_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
// } = process.env



// client.setEndpoint(ENDPOINT!).setKey(API_KEY!).setProject(PROJECT_ID!)
client.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
      .setKey(process.env.API_KEY!)
      .setProject(process.env.PROJECT_ID!)

export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)

export const PROJECT_ID = process.env.PROJECT_ID
export const DATABASE_ID = process.env.DATABASE_ID
export const APPOINTMENT_COLLECTION_ID = process.env.APPOINTMENT_COLLECTION_ID
export const PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID
export const DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT