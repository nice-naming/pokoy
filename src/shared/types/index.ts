import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore"
export * from "./chart.types"

export interface Coords {
  x: number
  y: number
}

export interface StatsData {
  [date: string]: number[]
}

export interface PokoySession {
  duration: number
  timestamp: string
  user?: string | DocumentReference<DocumentData>
  userId: string
}

export interface DayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef?: DocumentReference<DocumentData>
}

export interface UserStatsData {
  firstMeditationDate: Timestamp | null
  totalDuration: number
  count: number
  userId: string
}

export enum RequestStatus {
  NONE,
  REQUEST,
  SUCCESS,
  FAILURE,
}
