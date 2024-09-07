'use client'
import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export const INIAL_USER = {
  id: "",
  name: "",
  email: "",
  password: "",
  username: "",
  bio: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

  const [user, setUser] = useState<IUser>(INIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuthUser() {
    try {
      const { $id, name, email, username, bio, imageUrl } =
        await getCurrentUser();

      if (!$id) {
        setUser({
          id: $id,
          name,
          email,
          username,
          bio,
          imageUrl,
        });
      }
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      return false; 
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const cookieFallBack = localStorage.getItem('cookieFallBack');
    if (cookieFallBack === '[]'|| cookieFallBack===null) {
      router.push('/sign-in'); 
      checkAuthUser();
    }
  }, []);


  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext =()=> useContext(AuthContext)