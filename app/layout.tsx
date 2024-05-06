import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Navigation } from "@/components/navigation/navigation";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Progreso Licenciatura Informática",
  description:
    "Aplicación web para controlar fácilmente tu progreso académico, registrando tus calificaciones y avances.",
  icons: {
    icon: "/logo-unahur.webp", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <Navigation>{children}</Navigation>
              <Toaster richColors />
            </TRPCReactProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
