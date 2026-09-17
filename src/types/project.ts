export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  technologies: string[] | string;
  image: string;
  link?: string;
  status?: string;
  features?: string[];
  /** Optional separate screenshot for the detail page (e.g. inside-the-app view), falls back to `image`. */
  detailImage?: string;
}