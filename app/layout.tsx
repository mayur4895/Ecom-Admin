import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";


const font = Poppins({ weight: ['100','200','300', '400', '500', '600', '700', '800',], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Admin-Store ",
  description:  "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>  
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
    

     <ModalProvider/>
     <Toaster />
         </body>
    </html>
    </ClerkProvider>
  );
}
