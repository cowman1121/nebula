import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";

export type fileDoc = {
  id: string;
  classId: string;
  name: string;
  url: string;
  fileType: string;
  uploadedAt: Timestamp;
};


export const fileToPDF = async (fileURL: string, fileName: string) => {
  const response = await fetch("/api/convert-to-pdf", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fileURL, fileName }),
});

const pdfData = await response.arrayBuffer();
return pdfData;
};

export const uploadFile = async (file: File, classId: string) => {
  const originalName = file.name;
  const fileType = file.name.split(".").pop() ?? "";

  const storageRef = ref(storage, `classes/${classId}/${Date.now()}_${originalName}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const newDoc = await addDoc(collection(db, "files"), {
    classId,
    name: originalName,
    url,
    fileType,
    uploadedAt: serverTimestamp(),
  });

  return {
    id: newDoc.id,
    classId,
    name: originalName,
    url,
    fileType,
    uploadedAt: Timestamp.now(),
  } as fileDoc;
};