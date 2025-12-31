export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  technologies: string[] | string;
  image: string;
  link?: string;
  status?: string;
}