import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

export function renderOg(title: string, subtitle: string, tags: string[] = []) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 72, color: 'white', background: 'linear-gradient(135deg, #0b1120 0%, #0f2a26 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#00d9a5' }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: '#00a67e' }} />
          faizramdhann.vercel.app
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: title.length > 24 ? 72 : 92, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.65)' }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {tags.slice(0, 5).map((t) => (
            <div key={t} style={{ fontSize: 24, padding: '8px 20px', borderRadius: 14, background: 'rgba(0,166,126,0.2)', color: '#00d9a5' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize
  );
}
