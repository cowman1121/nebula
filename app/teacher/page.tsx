"use client"
import React, { useState, useEffect} from "react"
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User, Home, Calendar, Mail, Plus, NotepadText } from "lucide-react";
import {doc, getDoc} from "firebase/firestore";
import{ onAuthStateChanged} from "firebase/auth";




const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [shrinkSidebar, setShrinkSidebar] = useState(false);
  const tabStruct = (tab: string) => `px-2 py-2 cursor-pointer ${activeTab === tab ? "bg-cream" : "hover:bg-white/40 hover:rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all"}`
  const router = useRouter();
  const divider = "w-px h-4 bg-gray "
  const sidebarCSS = "block w-full pl-8 pr-4 py-2 text-xl whitespace-nowrap hover:bg-white/10 cursor-pointer underline";
  const sidebarShrink = `flex flex-col bg-steel-blue h-screen transition-all duration-300 overflow-hidden ${
     shrinkSidebar ? "w-60" : "w-16"}`

  
   
  useEffect(() => {
    const lock = onAuthStateChanged(auth, async (user) =>{
      if (!user){
        router.push("/educator-login");
        return;
      } 
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const roles = userDoc.data()?.roles;

      if (!roles?.includes("teacher") && !roles?.includes("admin")){
        router.push("/educator-login");
        return;
      } 
    })
    return () => lock();
  }, []);

    
  return (
    <main className="flex">

    <div
    onMouseEnter={() => setShrinkSidebar(true)} 
    onMouseLeave={() => setShrinkSidebar(false)} 
    className={sidebarShrink}>
        <div className="flex items-center gap-2 cursor-pointer text-3xl px-4 py-8">
            <div className="p-2 rounded-full bg-white/20 ring-2">
              <User className="w-6 h-6"/> 
            </div>
            <span className="">
            Name Here
            </span>
       </div>
       
        {/* published class list */}
        <details className="cursor-pointer py-16">
          <summary className="px-4 text-3xl">
             Published
          </summary>
            <button className={(sidebarCSS)}>
              French 101  
            </button>
        </details>
           
        {/* unpublushed class list */}
        <details className="cursor-pointer py-16">
             <summary className="px-4 text-3xl"> 
                Unpublished
             </summary>   
            <button className={(sidebarCSS)}>
             Spanish 101
            </button>
        </details>        
        <button className="flex gap-2 mt-auto font-black mb-4 justify-center cursor-pointer">
           <Plus /> Add Class
        </button>
    </div>

    {/* Main Start*/}
    <div className="flex-1 bg-cream h-screen flex flex-col">   
      <div className="flex items-center border-t-2 border-baby-blue bg-blue-gray ">
        <button 
        onClick={() => setActiveTab("home")} 
        className={tabStruct("home")}
        title="Home">
          <Home className="w-6 h-6"/>
        </button>

          <div className={divider} />

        <button 
        onClick={() => setActiveTab("inbox")} 
        className={tabStruct("inbox")} 
        title="Inbox">
            <Mail className="w-6 h-6"/>
        </button>
       
         <div className={divider} />

        <button 
        onClick={() => setActiveTab("calendar")}
         className={tabStruct("calendar")}
         title="Calendar">
            <Calendar className="w-6 h-6" />
        </button>

         <div className={divider} />

        <button 
        onClick={() => setActiveTab("todo")} 
        className={tabStruct("todo")} 
        title="To-do" >
            <NotepadText className="w-6 h-6"/>
        </button>
        
          <div className={divider} />

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