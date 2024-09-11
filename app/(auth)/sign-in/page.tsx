"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { checkActiveSession, deleteSessions } from "@/lib/appwrite/api"; // Ensure these functions are properly imported
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import sideImg from "../../../public/assets/images/img.jpg";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

const SignInForm = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const router = useRouter();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {
    setLoading(true); // Start loading

    try {
      // Check for an active session and delete it if it exists
      const activeSession = await checkActiveSession();
      if (activeSession) {
        await deleteSessions();
      }

      // Proceed with sign-in
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Login failed. Please try again." });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        router.push("/home");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({ title: "An error occurred. Please try again." });
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  return (
    <div className="flex flex-row">
      <div className="hidden md:block flex-shrink-0">
        <Image
          className="h-full w-[600px] object-cover"
          src={sideImg}
          alt="Sign-in Side Image"
        />
      </div>
      <div className="flex-1 max-w-md w-full mx-auto mb-96 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 text-center md:text-left dark:text-neutral-200">
          Welcome Back to Instap
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center md:text-left dark:text-neutral-300">
          Sign in to your account and continue where you left off.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)} className="my-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="shad-form_label">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="youremail@example.com"
                      type="email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-gradient-to-br relative group/btn from-cyan-900 dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                "Sign in"
              )}
              <BottomGradient />
            </Button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Sign in with GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Sign in with Google
                </span>
                <BottomGradient />
              </button>
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  <Link href="/sign-up" className="text-small-semibold ml-1">
                    I dont have an account{" "}
                    <span className="text-blue-700">sign up</span>
                  </Link>
                </span>
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default SignInForm;
