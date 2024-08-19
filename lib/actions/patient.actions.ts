'use server'
import { ID, Query } from 'node-appwrite'
import {
  // BUCKET_ID,
  // DATABASE_ID,
  // ENDPOINT,
  // PATIENT_COLLECTION_ID,
  // PROJECT_ID,
  database,
  storage,
  users,
} from '../appwrite.config'
import { parseStringify } from '../utils'
import { InputFile } from 'node-appwrite/file'

 const {
  PROJECT_ID,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env

console.log('测试输出:',{BUCKET_ID,PROJECT_ID,PATIENT_COLLECTION_ID,DATABASE_ID},'结束测试');

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined, // 没有密码
      user.name
    )

    return parseStringify(newUser)
  } catch (error: any) {
    console.log({ error })

    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', user.email)])

      return documents?.users[0]
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error: any) {
    console.log({ error })
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('file') as Blob,
        identificationDocument?.get('name') as string
      )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await database.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    )
    return newPatient
  } catch (error: any) {
    console.log({ error })
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await database.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    )

    return parseStringify(patients.documents[0])
  } catch (error: any) {
    console.log({ error })
  }
}



