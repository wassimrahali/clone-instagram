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

import { SignInValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();
  
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {
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
      router.push("/");
    } else {
      toast({
        title: "Signin Failed",
      });
    }
    return;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Sign in to your account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use snapgram, please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-5 w-full mt-4"
          >
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

            <Button type="submit" className="shad-button_primary">
              {isPending || isUserLoading ? (
                <div className="flex-center gap-2">Loading...</div>
              ) : (
                "Log in"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              I don't have an account!
              <Link
                href="/sign-up"
                className="text-red-400 text-small-semibold ml-1"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
