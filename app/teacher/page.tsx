"use client"
import React, { useState } from "react"
import { User, Home, Calendar, Mail, Plus, NotepadText } from "lucide-react";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const tabStruct = (tab:string) => 'px-2 py-2 cursor-pointer ${activeTab === "home" ? "bg-nebula-text" : "hover:bg-white/40 hover:rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all"}'
  
  return (
    <main className="flex">

    <div className="flex flex-col w-64 bg-zinc-500 h-screen">
        <h1 className="flex items-center gap-2 justify-center cursor-pointer">
            <User /> Name Here
       </h1>
       
       <h2 className="text-center font-black">
            Class List
        </h2> 
        {/* published class list */}
        <details className="cursor-pointer">
          <summary>
             Published
          </summary>
            <p>
              French 101  
            </p>
        </details>
           
        {/* unpublushed class list */}
        <details className="cursor-pointer">
             <summary>
                Unpublished
             </summary>   
            <p>
             Spanish 101
            </p>
        </details>        
        <button className="flex gap-2 mt-auto font-black mb-4 justify-center cursor-pointer">
           <Plus /> Add Class
        </button>
    </div>

    <div className="flex-1 bg-nebula-text h-screen flex flex-col">   
      <div className="flex items-center border-t-2 border-gray-600 bg-[#E4E4E7] ">
        <button 
        onClick={() => setActiveTab("home")} 
        className={tabStruct("home")}
        title="Home">
          <Home className="w-6 h-6"/>
        </button>

          <div className="w-px h-4 bg-gray-400" />

        <button 
        onClick={() => setActiveTab("inbox")} 
        className={tabStruct("inbox")} 
        title="Inbox">
            <Mail className="w-6 h-6"/>
        </button>
       
         <div className="w-px h-4 bg-gray-400" />

        <button 
        onClick={() => setActiveTab("calendar")}
         className={tabStruct("calendar")}
         title="Calendar">
            <Calendar className="w-6 h-6" />
        </button>

         <div className="w-px h-4 bg-gray-400" />

        <button 
        onClick={() => setActiveTab("todo")} 
        className={tabStruct("todo")} 
        title="To-do" >
            <NotepadText className="w-6 h-6"/>
        </button>
        
          <div className="w-px h-4 bg-gray-400" />

        <button 
        className="px-1 py-2 cursor-pointer hover:bg-white/40 hover:rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all" 
        title="Assignment Search">
        <Plus className="w-4 h-4"/>
        </button>
        
        </div>
    </div>

    </main>
  )
}

export default TeacherDashboard