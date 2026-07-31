"use client"
import React, { useState } from "react"
import { updateClass, classDoc } from "./classes"

type NewClassWizard = {
  classData: classDoc;
};

export const ClassWizard = ({ classData }: NewClassWizard) => {
  const [step, setStep] = useState<"name" | "subject"  | "editor">("name");
  const [nameInput, setNameInput] = useState(classData.name);
  const [subjectInput, setSubjectInput] = useState(classData.subject);
  const [customSubject, setCustomSubject] = useState("");

  const confirmName = async () => {
    await updateClass(classData.id, { name: nameInput });
    setStep("subject");
    
  };

  const confirmSubject = async () => {
    const finalSubject = subjectInput === "Other" ? customSubject : subjectInput;
    await updateClass(classData.id, { subject: finalSubject, setupComplete: true });
  };

  if (step === "name") {
    return (
      <div className="flex flex-col items-center justify-center gap-48">
        <h1 className="text-center tracking-tight text-foreground text-8xl font-semibold">
          Name your class
          </h1>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="e.g French 101"
          className="border border-gray rounded-xl px-5 py-3 text-lg w-80 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-steel-blue focus:scale-105 transition-all"
        />
        <button onClick={confirmName} className="bg-linear-to-br from-steel-blue from-60% to-violet hover:from-violet text-white px-10 py-3 rounded-full text-4xl font-medium shadow-lg shadow-steel-blue/30 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
          Confirm
          </button>
      </div>
    );
  }
if (step === "subject") {
  const subjects = ["World Language", "Music", "Arts", "Math", "Science", "English", "Social Studies", "Computer Science", "Other"];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-center tracking-tight text-foreground text-6xl font-semibold mb-8">Choose a subject</h2>
      <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSubjectInput(s)}
            className={`px-5 py-2 rounded-full border cursor-pointer shadow-lg shadow-steel-blue/30 hover:scale-105 active:scale-95 transition-transform ${
        subjectInput === s
          ? "bg-steel-blue text-white border-steel-blue"
          : "border-gray text-foreground hover:border-steel-blue"
      }`}
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
          className="border border-gray rounded-xl px-5 py-3 text-lg w-80 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-steel-blue transition-all mt-4"
        />
      )}

      <button onClick={confirmSubject}
      className="bg-linear-to-br from-steel-blue from-60% to-violet hover:from-violet text-white px-10 py-3 rounded-full text-2xl font-medium shadow-lg shadow-steel-blue/30 hover:scale-105 active:scale-95 transition-transform cursor-pointer mt-4">
        Confirm
        </button>
    </div>
  );
}    
  return <div>Next step: {step}</div>;
};