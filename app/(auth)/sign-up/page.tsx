"use client";
import * as z from "zod";
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
import { SignupValidation } from "@/lib/validation";
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signInAccount } from "@/lib/appwrite/api";
import Loader from "@/components/shared/Loader";
import { useState } from "react";

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to track loading status

  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount } = useCreateUserAccount();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    setLoading(true); // Start loading

    try {
      const newUser = await createUserAccount(user);

      if (newUser) {
        toast({
          title: "Signup Error",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive", // Or any other variant you use
        });
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({
          title: "Signin Error",
          description: "There was an error signing in. Please check your credentials and try again.",
          variant: "destructive", // Or any other variant you use
        });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        router.push("/");
      } else {
        toast({
          title: "Signin Failed",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive", // Or any other variant you use
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later.",
        variant: "destructive", // Or any other variant you use
      });
    } finally {
      setLoading(false); // Stop loading
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
            To use snapgram, please enter your details
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
                    <Input
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
              className="shad-button_primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                "Signup"
              )}
            </Button>

            <p className="text-sm text-light-2 text-center mt-2">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-red-400 font-semibold ml-1"
              >
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
