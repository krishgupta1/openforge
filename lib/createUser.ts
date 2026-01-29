import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function createUserIfNotExists(user: any) {
  const userRef = doc(db, "users", user.id);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      email: user.emailAddresses[0]?.emailAddress,
      createdAt: new Date(),
    });
  }
}
