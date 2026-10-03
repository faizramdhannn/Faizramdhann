import { renderOg, ogSize } from '@/lib/og';

export const alt = 'Faiz Ramdhan - Web Developer';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOg('Faiz Ramdhan', 'Web developer building practical business tools, dashboards and web apps.', ['Next.js', 'TypeScript', 'Dashboards']);
}
