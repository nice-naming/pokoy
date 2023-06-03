import { User } from "@firebase/auth"
import { Firestore, doc, getDoc } from "firebase/firestore"

export const getUserStats = async (user: User, firestoreDB: Firestore) => {
  const userStatsRef = doc(firestoreDB, "users", user.uid)
  const userStatsDoc = await getDoc(userStatsRef)
  const userStatsData = userStatsDoc.data()
  return userStatsData
}
