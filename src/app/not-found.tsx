import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-6 py-28 text-center space-y-5">
      <p className="font-mono text-primary text-sm">404</p>
      <h1 className="text-3xl md:text-4xl font-bold">Page not found</h1>
      <p className="text-foreground/55">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="inline-flex px-6 py-3 bg-primary text-white font-semibold rounded-2xl">Back to home</Link>
    </div>
  );
}
