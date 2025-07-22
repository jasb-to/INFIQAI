import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

export const logScan = async (uid: string) => {
  const scansRef = collection(db, "scans");
  await addDoc(scansRef, {
    uid,
    timestamp: Timestamp.now()
  });
};

export const getTodayScanCount = async (uid: string) => {
  const scansRef = collection(db, "scans");

  const startOfDay = Timestamp.fromDate(new Date(new Date().setHours(0, 0, 0, 0)));
  const q = query(scansRef, where("uid", "==", uid), where("timestamp", ">=", startOfDay));
  const snapshot = await getDocs(q);
  return snapshot.size;
};
