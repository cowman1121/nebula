 import { collection, addDoc, query, where, onSnapshot, Unsubscribe, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type moduleDoc = {
  id: string;
  classId: string;
  name: string;
  createdAt: Timestamp;
};

export const addModule = async (classId: string, name: string = "New Unit") => {
  const newDoc = await addDoc(collection(db, "modules"), {
    classId,
    name,
    createdAt: serverTimestamp(),
  });

  return {
    id: newDoc.id,
    classId,
    name,
    createdAt: Timestamp.now(),
  } as moduleDoc;
};

export function subscribeToClassModules(
  classId: string,
  callback: (modules: moduleDoc[]) => void
): Unsubscribe {
  const q = query(collection(db, "modules"), where("classId", "==", classId));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as moduleDoc)));
  });
}