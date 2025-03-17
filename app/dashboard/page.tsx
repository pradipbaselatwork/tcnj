"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { myAppHook } from "@/context/AppProvider";

const Dashboard: React.FC = () => {

      // Use the context hook
      const {authToken, isLoading} = myAppHook();
      const router = useRouter();

      useEffect( () =>{
         if(!authToken){
             router.push("/auth")
             return
         }
      },[authToken])
      
    return<>
            <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: "400px" }}>
            <h3 className="text-center">Welcome To Dashboard</h3>
        </div>
    </div>
    </>
}

export default Dashboard;