import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className='w-[300px] bg-primary-800/70 rounded-lg flex backdrop-blur-xl
      border border-primary-200/50 shadow-xl shadow-primary-800/40 overflow-hidden p-2'
    >
      {children}
    </div>
  );
}
