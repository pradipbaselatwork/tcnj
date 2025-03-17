"use client";

import Loader from '@/components/Loader';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AppProviderType {
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string,
  ) => Promise<void>;
}

const AppContext = createContext<AppProviderType|undefined>(undefined)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string|null>(null);
    const router = useRouter();

    const login = async(username:string, password:string) =>{debugger;
        setIsLoading(true);
        try {debugger;
           const response = await axios.post(`${API_URL}/login`,{
            username,
            password
           });

           if(response.data.status){debugger;
             Cookies.set("authToken",response.data.token)
             toast.success("Your account have been Login Successfuly")
             setAuthToken(response.data.token)
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
    
            console.log(response)
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <AppContext.Provider value={{ isLoading, login, register }}>
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

  

