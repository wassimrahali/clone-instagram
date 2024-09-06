// import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import { Toaster } from "@/components/ui/toaster"


export default function Home() {
  return (
    <div>
      <SignupForm />
      <Toaster />

      {/* <SigninForm /> */}
    </div>
  );
}
