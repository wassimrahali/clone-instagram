// import SigninForm from "@/components/SigninForm";
import { Toaster } from "@/components/ui/toaster"
import SideBar from '../components/SideBar'
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

export default function Home() {
  return (
    <div>
      <SideBar />
      <TopBar />
      <BottomBar />
      <Toaster />

    </div>
  );
}
