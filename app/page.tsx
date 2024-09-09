// import SigninForm from "@/components/SigninForm";
import { Toaster } from "@/components/ui/toaster"
import SignInForm from "./(auth)/sign-in/page";


export default function Home() {
  return (
    <div>
        <p>Hello from home </p>
        <SignInForm />
    </div>
  );
}
