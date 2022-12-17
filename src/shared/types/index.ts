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
  timestamp: DateString
  user?: string | DocumentReference<DocumentData>
  userId: string
}

export type FirestoreRefPath = Flavor<string, "FirestoreRefPath">

export interface DayData {
  timestamp: Milliseconds
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef?: FirestoreRefPath
}

export interface ServerDayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef: DocumentReference<DocumentData>
}

export interface MockDayData {
  timestamp: Milliseconds
  totalDuration: number
}

interface Flavoring<FlavorT> {
  _type?: FlavorT
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>

export type Milliseconds = Flavor<number, "Miliseconds">
export type Minutes = Flavor<number, "Minutes">

export type DateString = Flavor<string, "DateString">

interface BasicUserStatsData {
  streak: number
  count: number
  userId: string
  totalDuration: Minutes
}

export interface UserStatsData extends BasicUserStatsData {
  firstMeditationDate: Milliseconds
}

export interface ServerUserStatsData extends BasicUserStatsData {
  firstMeditationDate: Timestamp
}

export enum RequestStatus {
  NONE,
  REQUEST,
  SUCCESS,
  FAILURE
}

export interface PseudoDayData {
  timestamp: Milliseconds
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
}

export interface PseudoServerDayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
}
