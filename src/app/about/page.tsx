export default function About() {
  const skills = ['Spreadsheet', 'HTML', 'CSS', 'JavaScript', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'];
  
  return (
    <section className="min-h-[calc(100vh-300px)] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          About <span className="text-[#00a67e]">Me</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-8 rounded-2xl border border-[#00a67e]/20
                        hover:border-[#00a67e]/50 transition-all duration-300 shadow-xl">
            <h2 className="text-2xl font-bold text-[#00a67e] mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed opacity-90">
              Hello! I&apos;m <span className="text-[#00a67e] font-semibold">Faiz Ramdhan Azmalia</span>. 
              I&apos;m passionate about learning new technologies, creating useful solutions, and finding joy in every challenge. 
              For me, every project is an opportunity to make an impact and share creativity with others.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-8 rounded-2xl border border-[#00a67e]/20
                        hover:border-[#00a67e]/50 transition-all duration-300 shadow-xl">
            <h2 className="text-2xl font-bold text-[#00a67e] mb-4">Background</h2>
            <div className="space-y-3 text-lg">
              <div className="flex items-center gap-3">
                <span className="text-[#00a67e]">📍</span>
                <span><span className="font-semibold">Born:</span> Ciamis, 2001</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00a67e]">🏠</span>
                <span><span className="font-semibold">Based in:</span> Bandung, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00a67e]">💼</span>
                <span><span className="font-semibold">Role:</span> Web Developer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-8 rounded-2xl border border-[#00a67e]/20
                      shadow-xl">
          <h2 className="text-3xl font-bold text-[#00a67e] mb-6 text-center">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gradient-to-r from-[#00a67e]/20 to-[#00b894]/20 text-[#00a67e] 
                         px-5 py-3 rounded-xl font-semibold text-lg
                         border-2 border-[#00a67e]/30 hover:border-[#00a67e] 
                         hover:shadow-[0_0_20px_rgba(0,166,126,0.3)]
                         transition-all duration-300 transform hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}