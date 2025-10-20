export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-12 py-10 text-center mt-auto">
      <p className="text-sm opacity-70">
        &copy; {currentYear} Faiz Ramdhan Azmalia. All rights reserved.
      </p>
    </footer>
  );
}