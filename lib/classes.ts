import {collection, addDoc, serverTimestamp, query, where, onSnapshot, Unsubscribe, Timestamp} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type classDoc = {
  id: string;
  name: string;
  teacherID: string;
  published: boolean;
  subject: string;
  templateID: string | null;
  studentsID: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export const addClass = async (name: string = "New Class") => {
  const teacherID = auth.currentUser?.uid ?? "";

  const baseData = {
    name,
    teacherID,
    published: false,
    subject: "",
    templateID: null,
    studentsID: [],
  };

  const newDoc = await addDoc(collection(db, "classes"), {
    ...baseData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const newClass: classDoc = {
    id: newDoc.id,
    ...baseData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  return newClass;
};

export function subscribeToTeacherClasses(
  teacherId: string,
  callback: (classes: classDoc[]) => void
): Unsubscribe {
  const q = query(collection(db, "classes"), where("teacherID", "==", teacherId));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as classDoc)));
  });
}