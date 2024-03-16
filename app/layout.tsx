import type { Metadata } from 'next';
import { Open_Sans as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import './globals.css';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';
import { Navigation } from '@/components/navigation/navigation';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Progreso Licenciatura Informática',
  description:
    'Aplicación web para controlar fácilmente tu progreso académico, registrando tus calificaciones y avances.',
  icons: {
    icon: '/logo-unahur.webp', // /public path
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <Navigation>{children}</Navigation>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
