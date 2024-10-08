import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider"; // Import QueryProvider


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {/* {children} */}
    {/*this for auth sigin signup */}
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>


{/*this for home of each user after his login his result this */}

     
      </body>
    </html>
  );
}
