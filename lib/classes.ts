import {collection, addDoc, serverTimestamp, query, where, onSnapshot, Unsubscribe} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";


export type classDoc ={
id: string;
name: string;
teacherID: string;
published: boolean;
subject: string;
templateID: string | null;
studentsID: string[];
};

export const addClass = async (name:string = "New Class") =>{
 const newClass = await addDoc(collection(db, "classes"), {
    name,
    teacherId: auth.currentUser?.uid,
    published: false,
    subject: "",
    templateId: null,
    studentIds: [],
    createdAt: serverTimestamp(),
  });
  return newClass.id;
};

export function subscribeToTeacherClasses(
  teacherId: string,
  callback: (classes: classDoc[]) => void
): Unsubscribe {
  const q = query(collection(db, "classes"), where("teacherId", "==", teacherId));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as classDoc)));
  });
}