export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}