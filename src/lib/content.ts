export interface Content {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  skillsTitle: string;
  contactTitle: string;
  contactDescription: string;
}

export const DEFAULT_CONTENT: Content = {
  heroTitle: "Hi, I'm",
  heroSubtitle: "Faiz Ramdhan",
  heroDescription:
    "Welcome to my portfolio! I'm passionate about creating innovative solutions and bringing ideas to life through code. Explore my projects and let's connect!",
  aboutTitle: 'About Me',
  aboutDescription:
    "Hello! I'm Faiz Ramdhan Azmalia. I'm passionate about learning new technologies, creating useful solutions, and finding joy in every challenge. For me, every project is an opportunity to make an impact and share creativity with others.",
  skillsTitle: 'Technical Skills',
  contactTitle: 'Get In Touch',
  contactDescription: 'Have a project in mind or want to collaborate? Feel free to reach out!',
};
