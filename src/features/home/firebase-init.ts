import "firebase/firestore"
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createUserStats } from "./createUserStats"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pokoy-1bf7f.firebaseapp.com",
  projectId: "pokoy-1bf7f",
  storageBucket: "pokoy-1bf7f.appspot.com",
  messagingSenderId: "550756523308",
  appId: "1:550756523308:web:adfbe8e9b9157844f2a089",
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
}

const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

onAuthStateChanged(auth, createUserStats)

enableIndexedDbPersistence(firestore).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error(
      "Multiple tabs open, persistence can only be enabled in one tab at a a time."
    )
  } else if (err.code === "unimplemented") {
    console.error(
      "The current browser does not support all of the features required to enable persistence"
    )
  }

  throw new Error("Unexpected Firebase error: ", err)
})
