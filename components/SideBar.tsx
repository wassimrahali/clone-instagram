"use client";
import { HomeIcon, LogOut, SearchIcon, UserIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const SideBar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <div className="hidden md:block w-64 h-screen bg-white border-r border-gray-200  flex-col items-center py-6">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="w-12 h-12 rounded-full mb-4"
        />
        <h2 className="text-lg font-semibold">Username</h2>
      </div>

      <ul className="w-full">
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
          <HomeIcon className="text-gray-600 text-xl mr-3" />
          <span className="text-gray-700">Home</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
          <SearchIcon className="text-gray-600 text-xl mr-3" />
          <span className="text-gray-700">Search</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
          <UserIcon className="text-gray-600 text-xl mr-3" />
          <span className="text-gray-700">Profile</span>
        </li>

        <div className="mt-96">
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
            <LogOut className="text-gray-600 text-xl mr-3" />
            <Button onClick={() => signOut()}>Logout</Button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
