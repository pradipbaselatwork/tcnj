"use client";

import Loader from '@/components/Loader';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AppProviderType {
  isLoading: boolean,
  authToken: string | null,
  login: (username: string, password: string) => Promise<void>,
  register: (
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string,
  ) => Promise<void>
  logout  : () => void
}

const AppContext = createContext<AppProviderType|undefined>(undefined)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string|null>(null);
    const router = useRouter();

    useEffect( () => {
       const token = Cookies.get("authToken");
       if(token){
         setAuthToken(token)
       }else{
         router.push("/auth");
       }
       setIsLoading(false)
    })

    const login = async(username:string, password:string) =>{debugger;
        setIsLoading(true);
        try {debugger;
           const response = await axios.post(`${API_URL}/login`,{
            username,
            password
           });

           if(response.data.success){debugger;
             Cookies.set("authToken",response.data.data.token)
             toast.success("Your account have been Login Successfuly")
             setAuthToken(response.data.data.token)
             router.push('/dashboard')
           }else{
            toast.error("Invalid email or password!")
           }

           console.log(response)

        } finally {debugger;
          setIsLoading(false);
        }
    }

    const register = async(username:string, email:string, password:string, first_name:string, last_name:string, phone:string) =>{debugger;
        setIsLoading(true);debugger;
        try {
            const response = await axios.post(`${API_URL}/register`,{
                username,
                password,
                email,
                first_name,
                last_name,
                phone
            });

            if(response.data.success){debugger;
              toast.success("Account registered Successfuly")
            }else{
             toast.error("Error account registed!")
            }
            console.log(response)
        } finally {
          setIsLoading(false);
        }
    }

    const logout = () =>{
      setAuthToken(null)
      Cookies.remove("authToken")
      setIsLoading(false)
      toast.success("Logged out successfully!")
      router.push('/auth')
    }

    return (
        <AppContext.Provider value={{ isLoading, login, register, authToken, logout}}>
         {isLoading ? <Loader /> :children}
        </AppContext.Provider>
      );
  }

  export const myAppHook = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("Context must be used within an AppProvider");
    }
    return context;
  };

  

