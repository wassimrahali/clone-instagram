"use client";

import { HomeIcon, LogOut, SearchIcon, UserIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { sidebarLinks } from "@/data/constants.index";
import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";

const SideBar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/sign-up");
    }
  }, [isSuccess, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user?.id) {
    return <div>No user data available</div>;
  }
  
  return (
    
 <div>

    <div className="hidden md:block w-64 h-screen bg-white border-r border-gray-200 flex-col items-center py-6">
      <div className="flex flex-col items-center mb-8">
          <Link href={`/profile/${user.id}`}>
          <img src={user.imageUrl} />
          <p>{user.email}</p>
          <p>{user.name}</p>
          </Link>
      </div>

      <ul className="w-full">
        {sidebarLinks.map((link) => (
          <li
            key={link.label}
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          >
            <Link href={link.route} className="flex items-center w-full">
              <img src={link.imgURL} alt={link.label} className="w-6 h-6 mr-3" />
              <span className="text-gray-700">{link.label}</span>
            </Link>
          </li>
        ))}

        <div className="mt-auto">
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
            <LogOut className="text-gray-600 text-xl mr-3" />
            <Button onClick={() => signOut()} className="w-full text-center">
              Logout
            </Button>
          </li>
        </div>
      </ul>
      
    </div>
    
 </div>
  );
};

export default SideBar;

