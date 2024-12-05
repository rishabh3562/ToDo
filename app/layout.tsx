import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js To-Do App | Manage Tasks Effectively',
  description: 'A mobile-friendly To-Do App for managing daily tasks.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://neumotask.vercel.app',
    title: 'Next.js To-Do App',
    description: 'Organize, edit, and track tasks efficiently.',
    images: '/android-chrome-512x512.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js To-Do App',
    description: 'Manage your daily tasks effortlessly.',
    images: '/android-chrome-512x512.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
