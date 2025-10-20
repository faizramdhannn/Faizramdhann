export default function About() {
  return (
    <section className="min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center text-center gap-5 py-12">
        <h1 className="text-5xl font-bold text-center mb-8">
          About <span className="text-[#00a67e]">Me</span>
        </h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Hello! I&apos;m <span className="text-[#00a67e] font-semibold">Faiz Ramdhan Azmalia</span>, <br />
            I love learning new things, creating something useful, and finding joy in every challenge. <br />
            For me, every project is a chance to make an impact and share creativity with others.
          </p>          
        </div>
      
      </div>
    </section>
  );
}