'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NavItems } from '@/config';
import { Heart, InstagramIcon, User } from 'lucide-react';
import BottomBar from '@/components/shared/BottomBar';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'; // Import AlertDialog components

export default function Header() {
  const { user } = useUserContext();
  const router = useRouter();
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
  const { mutateAsync: signOut, isSuccess, isLoading } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      router.push("/sign-up");
    }
  }, [isSuccess, router]);

  const handleSignOut = async () => {
    setIsDialogOpen(false);
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <header className="md:hidden flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}
        >
          <span className="flex items-center space-x-4">
            <InstagramIcon />
            <span>Instagram</span>
          </span>
        </Link>

        <div className="ml-4 flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage src={user.imageUrl} alt="@shadcn" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:text-red-600"
                onClick={() => setIsDialogOpen(true)} // Open dialog on click
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Visible only on small screens */}
          <button onClick={() => setIsOpen(true)} className="block sm:hidden">
            <Heart size={24} />
          </button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="right" className="block md:hidden">
              <div className="pt-4 overflow-y-auto h-fit w-full flex flex-col gap-1">
                {navItems.map((navItem, idx) => (
                  <Link
                    key={idx}
                    href={navItem.href}
                    onClick={() => setIsOpen(false)}
                    className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                      navItem.active
                        ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
                        : 'hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                  >
                    <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                      {navItem.icon}
                      <span>{navItem.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <BottomBar />
      </header>

      {/* Compact Alert Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          {/* This trigger is hidden, but required for AlertDialog to work */}
        </AlertDialogTrigger>
        <AlertDialogContent className="p-4 ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between mt-2">
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className="text-xs"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              disabled={isLoading}
              className="text-xs"
            >
              {isLoading ? <span>Loading...</span> : 'Logout'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
