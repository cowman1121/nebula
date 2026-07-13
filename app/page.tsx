    "use client";
    import React, { useState } from "react";
    import {signInWithEmailAndPassword} from "firebase/auth";
    import  {auth, db}  from "@/lib/firebase";
    import {doc, getDoc} from "firebase/firestore";
    import Link from "next/link";

    
    
    const Login = () => {
        const[email, setEmail] = useState("");
        const[password, setPassword] = useState("");
        const[error, setError] = useState("");
    
        


        const handleLogin = async () => {
            setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, "users", uid));
            if (!userDoc.exists()) {
                setError("No user found");
                return;
            }
            
            const roles = userDoc.data().roles;
            if (roles.includes("student")) {
                console.log("Student Access Granted");
            } else {
                console.log("This Account Does Not Have Student Access");
            }
        } catch (err) {
            setError("Invalid Email or Password");
        }
    };
    
    
    
        //HTML/CSS
        return (
        <main className="min-h-screen flex items-start justify-center pt-48 overflow-hidden">    
        <div className="flex items-center gap-16">
            <div className="flex flex-col self-start">
                <h1 className= "flex items-center text-nebula-login-button text-8xl font-black my-8">
                    <img 
                    src = "sparkle.png"
                    alt = "Nebula Logo"
                    className="w-24 mr-1 filter-nebula-login-button"
                    />
                        <span className="inline-flex items-center justify-center bg-nebula-login-button text-background rounded-lg leading-none w-16 h-20 overflow-hidden">
                    N   
                        </span>
                    ebula
                </h1>
            </div>        
             <div className="bg-nebula-background rounded-2xl p-8  w-120">   
                <input 
                id="email"
                className="w-full bg-foreground px-4 h-12 text-nebula-text mt-6 focus:outline-none rounded-lg focus-within:ring-2  ring-nebula-hover" 
                placeholder="E-mail" 
                type="email"
                autoComplete='username'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
                 />
                <input 
                id="password"
                className="w-full bg-foreground px-4 h-12 text-nebula-text mt-6 focus:outline-none rounded-lg focus-within:ring-2 ring-nebula-hover" 
                placeholder="Password" 
                type="password"
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                />
                    <button onClick={handleLogin} className="w-full rounded-full text-nebula-text text-center text-3xl bg-nebula-login-button hover:bg-nebula-hover py-4 mt-8 cursor-pointer font-black shadow-2xl">
                     Log in
                    </button>

                        <Link href="/educator-login" className="block text-center text-foreground text-sm mt-4 underline cursor-pointer"> 
                         For Educators  
                         </Link>
            </div>
        </div>
        </main>

    )
    }

    export default Login