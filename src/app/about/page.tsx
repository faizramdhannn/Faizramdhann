export default function About() {
  return (
    <section className="min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center text-center gap-5 py-12 px-6">
        <h1 className="text-5xl font-bold text-center mb-8">
          About <span className="text-[#00a67e]">Me</span>
        </h1>
        
        <div className="space-y-6 text-lg leading-relaxed max-w-3xl">
          <p>
            Hello! I&apos;m <span className="text-[#00a67e] font-semibold">Faiz Ramdhan Azmalia</span>, <br />
            I love learning new things, creating something useful, and finding joy in every challenge. <br />
            For me, every project is a chance to make an impact and share creativity with others.
          </p>
          
          <div className="pt-4 space-y-4">
            <p>
              <span className="text-[#00a67e] font-semibold">Born:</span> Ciamis, 2001
            </p>
            <p>
              <span className="text-[#00a67e] font-semibold">Currently based in:</span> Bandung
            </p>
          </div>

          <div className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">
              <span className="text-[#00a67e]">Skills</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Spreadsheet', 'HTML', 'CSS', 'Next.js'].map((skill) => (
                <span
                  key={skill}
                  className="bg-[#00a67e]/20 text-[#00a67e] px-4 py-2 rounded-lg font-medium
                           border border-[#00a67e]/30 hover:bg-[#00a67e]/30 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}