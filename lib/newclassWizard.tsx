"use client"
import React, { useState } from "react"
import { updateClass, classDoc } from "./classes"

type NewClassWizard = {
  classData: classDoc;
};

export const ClassWizard = ({ classData }: NewClassWizard) => {
  const [step, setStep] = useState<"name" | "subject" | "layout" | "editor">("name");
  const [nameInput, setNameInput] = useState(classData.name);
  const [subjectInput, setSubjectInput] = useState(classData.subject);
  const [customSubject, setCustomSubject] = useState("");

  const confirmName = async () => {
    await updateClass(classData.id, { name: nameInput });
    setStep("subject");
  };

  const confirmSubject = async () => {
    const finalSubject = subjectInput === "Other" ? customSubject : subjectInput;
    await updateClass(classData.id, { subject: finalSubject });
    setStep("layout");
  };

  if (step === "name") {
    return (
      <div>
        <h2>Name your class</h2>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="border px-2 py-1"
        />
        <button onClick={confirmName}>Confirm</button>
      </div>
    );
  }
if (step === "subject") {
  const subjects = ["World Language", "Music", "Arts", "Math", "Science", "English", "Social Studies", "Computer Science", "Other"];

  return (
    <div>
      <h2>Choose a subject</h2>
      <div className="flex flex-wrap gap-2">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSubjectInput(s)}
            className={`px-3 py-1 border rounded ${subjectInput === s ? "bg-cream" : ""}`}
          >
            {s}
          </button>
        ))}
      </div>

      {subjectInput === "Other" && (
        <input
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
          placeholder="Enter subject"
          className="border px-2 py-1"
        />
      )}

      <button onClick={confirmSubject}>Confirm</button>
    </div>
  );
}    
  return <div>Next step: {step}</div>;
};