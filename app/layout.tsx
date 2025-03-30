import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react'; // Import Analytics
import { SpeedInsights } from '@vercel/speed-insights/next'; // Import SpeedInsights

const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'SnipX - Create beautiful code snippets in seconds',
  description:
    'Create and share beautiful code snippets with syntax highlighting',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SnipX - Create beautiful code snippets in seconds</title>
      </head>
      <body className={`${inter.className} ${firaCode.variable}`}>
        {children}
        <Analytics /> {/* Add Analytics component */}
        <SpeedInsights /> {/* Add SpeedInsights component */}
      </body>
    </html>
  );
}
