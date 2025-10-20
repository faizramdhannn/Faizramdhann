export default function About() {
  return (
    <section className="min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center text-center gap-5 py-12">
        <h1 className="text-5xl font-bold">
          <span className="text-[#00a67e]">About</span> Me
        </h1>
        <div className="max-w-3xl px-5 mt-8">
          <p className="text-lg leading-relaxed">
            Hello! I&apos;m Faiz Ramdhan Azmalia, a passionate developer who loves 
            creating innovative solutions and bringing ideas to life through code.
          </p>
        </div>
      </div>
    </section>
  );
}