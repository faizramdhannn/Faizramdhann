import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors theme="system" />
    </>
  );
}
