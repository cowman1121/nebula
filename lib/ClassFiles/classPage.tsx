"use client"
import React, { useState } from "react"
import { classDoc } from "@/lib/ClassFiles/classes";
import {FileChooser } from "@/lib/FileProcessing/fileChooser";
import { School, GraduationCap, BookOpen, ScrollText, Users, MessageSquare, Settings } from "lucide-react";

type ClassNavTab = "home" | "grades" | "modules" | "syllabus" | "roster" | "discussion";

type ClassPageProps = {
  classData: classDoc;
};

export const ClassPage = ({ classData }: ClassPageProps) => {
  const [classNavTab, setClassNavTab] = useState<ClassNavTab>("home");
  const [editMode, setEditMode] = useState(true);
  const navItems: { id: ClassNavTab; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: School },
    { id: "syllabus", label: "Syllabus", icon: ScrollText },
    { id: "modules", label: "Modules", icon: BookOpen },
    { id: "discussion", label: "Discussion", icon: MessageSquare },
    { id: "grades", label: "Grades", icon: GraduationCap },
    { id: "roster", label: "Roster", icon: Users },
    
  ];

  const renderContent = () => {
    if (classNavTab === "home") { return ( 
      <div className="flex flex-col items-center gap-8 p-2">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Announcements</h2>
             <p className="text-gray text-center">No announcements yet.</p>
          </div>
        <h1 className="text-center text-bold text-6xl underline">
          {classData.name}
        </h1>
      </div>
    );
  }

    if (classNavTab === "syllabus") return <div className="flex flex-col justify-center items-center underline text-bold text-4xl gap-16">
      <FileChooser classId={classData.id} onUploaded={(file) => console.log("uploaded:", file)} />
    </div>;
  


    if (classNavTab === "modules") return <div className="flex flex-col justify-center items-center"> No Modules Found </div>;



    if (classNavTab === "grades") return <div>Grades content</div>;







    






    




    if (classNavTab === "roster") return <div>Roster content</div>;



    if (classNavTab === "discussion") return <div>Discussion content</div>;

    return null;
  };




  
  return (
  <div className="flex h-full">
    <button
    onClick={() => {setEditMode(!editMode); console.log(!editMode)}}
    className="fixed bottom-6 right-6 bg-steel-blue text-white p-4 rounded-full shadow-lg shadow-steel-blue/30 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
    >
  <Settings className="w-5 h-5" />
    </button>
      <div className="w-56 flex flex-col gap-1 border-r border-gray py-6 px-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setClassNavTab(id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              classNavTab === id ? "bg-steel-blue text-white" : "hover:bg-white/40"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};