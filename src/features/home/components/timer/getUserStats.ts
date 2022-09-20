import { User } from "@firebase/auth"
import { firestore } from "features/home/firebase-init"
import { doc, getDoc } from "firebase/firestore"

export const getUserStats = async (user: User) => {
  const userStatsRef = doc(firestore, "users", user.uid)
  const userStatsDoc = await getDoc(userStatsRef)
  const userStatsData = userStatsDoc.data()
  return userStatsData
}
