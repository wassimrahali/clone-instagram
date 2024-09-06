'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserAccount } from "./../lib/appwrite/api";

import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
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
import Link from 'next/link';

import { SignupValidation } from "@/lib/validation";

const SignupForm = () => {
  const { toast } = useToast();
  const isLoading = false;
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user); 
  
      if (newUser) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
          action: (
            <ToastAction altText="Dismiss">OK</ToastAction>
          ),
        });
      } else {
        toast({
          title: "Signup Error",
          description: "An error occurred while creating your account.",
          action: (
            <ToastAction altText="Retry">Retry</ToastAction>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Unable to create your account. Please try again later.",
        action: (
          <ToastAction altText="Retry">Retry</ToastAction>
        ),
      });
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use snapgram, Please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-purple-800">
              {isLoading ? (
                <div>Loading ...</div>
              ) : 'Signup'}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link href="/sign-in" className="text-red-400 text-small-semibold ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
