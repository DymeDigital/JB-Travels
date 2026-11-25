import 'server-only'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  // projectId,
  // dataset,
  // apiVersion,
  // useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation

 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: false,
  // Server-only read token so the dataset can be private (bookings hold customer data).
  token: process.env.SANITY_API_READ_TOKEN,
})
