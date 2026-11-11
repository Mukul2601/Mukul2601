import type { ProjectItem, ThemeMode } from '../types.ts';
import { FONT_MONO, FONT_SANS, esc, estimatePillWidth, themes } from '../theme.ts';

export function renderProjectCardSvg(project: ProjectItem, mode: ThemeMode): string {
  const t = themes[mode];
  const accent = project.accent === 'blue' ? t.accentBlue : t.accentViolet;
  const secondaryAccent = project.accent === 'blue' ? t.accentCyan : t.accentMagenta;

  let cursorX = 28;
  const tagMarkup = project.tags
    .map((tag) => {
      const pw = estimatePillWidth(tag, 11.5, 20);
      const x = cursorX;
      cursorX += pw + 8;
      return `
      <g>
        <rect x="${x}" y="194" width="${pw}" height="28" rx="8.5" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
        <text x="${x + pw / 2}" y="212" text-anchor="middle" font-family="${FONT_SANS}" font-size="11.5" font-weight="500" fill="${t.textSecondary}">${esc(tag)}</text>
      </g>`;
    })
    .join('\n');

  const visualBadge =
    project.slug === 'supply-chain'
      ? `<g transform="translate(422, 26)">
          <rect width="40" height="40" rx="12" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
          <path d="M20 10L29 14.5V24.5L20 29L11 24.5V14.5L20 10Z" stroke="${accent}" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M11 14.5L20 19L29 14.5M20 19V29" stroke="${accent}" stroke-width="1.4" stroke-opacity="0.7"/>
          <circle cx="29" cy="12" r="3" fill="${t.accentGreen}">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
          </circle>
        </g>`
      : `<g transform="translate(422, 26)">
          <rect width="40" height="40" rx="12" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
          <ellipse cx="20" cy="20" rx="12" ry="5.5" stroke="${accent}" stroke-width="1.4" transform="rotate(30 20 20)">
            <animateTransform attributeName="transform" type="rotate" from="30 20 20" to="390 20 20" dur="12s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="20" cy="20" rx="12" ry="5.5" stroke="${secondaryAccent}" stroke-width="1.4" transform="rotate(-30 20 20)">
            <animateTransform attributeName="transform" type="rotate" from="-30 20 20" to="-390 20 20" dur="12s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="20" cy="20" r="2.5" fill="${accent}"/>
        </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="490" height="250" viewBox="0 0 490 250" fill="none" role="img" aria-label="${esc(project.title)}">
  <defs>
    <radialGradient id="proj-glow-${project.slug}" cx="90%" cy="10%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="${mode === 'dark' ? '0.18' : '0.09'}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect x="0.75" y="0.75" width="488.5" height="248.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
  <rect x="0.75" y="0.75" width="488.5" height="248.5" rx="23.25" fill="url(#proj-glow-${project.slug})"/>

  ${visualBadge}

  <text x="28" y="42" font-family="${FONT_MONO}" font-size="10" font-weight="600" letter-spacing="1.6" fill="${accent}">${esc(project.eyebrow)}</text>
  <text x="28" y="76" font-family="${FONT_SANS}" font-size="22" font-weight="700" letter-spacing="-0.5" fill="${t.textPrimary}">${esc(project.title)}</text>

  <text x="28" y="112" font-family="${FONT_SANS}" font-size="13.5" fill="${t.textSecondary}">${esc(project.line1)}</text>
  <text x="28" y="134" font-family="${FONT_SANS}" font-size="13.5" fill="${t.textSecondary}">${esc(project.line2)}</text>

  <line x1="28" y1="170" x2="462" y2="170" stroke="${t.divider}" stroke-width="1"/>

  ${tagMarkup}

  <text x="462" y="212" text-anchor="end" font-family="${FONT_SANS}" font-size="12.5" font-weight="600" fill="${accent}">Explore ↗</text>
</svg>`;
}

export function renderFooterSvg(mode: ThemeMode): string {
  const t = themes[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="136" viewBox="0 0 1000 136" fill="none" role="img" aria-label="Connect Footer">
  <defs>
    <linearGradient id="footer-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentBlue}" stop-opacity="0"/>
      <stop offset="30%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentViolet}"/>
      <stop offset="70%" stop-color="${t.accentMagenta}"/>
      <stop offset="100%" stop-color="${t.accentMagenta}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect x="0.75" y="0.75" width="998.5" height="134.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
  <rect x="160" y="0.5" width="680" height="1.5" fill="url(#footer-line)"/>

  <text x="500" y="56" text-anchor="middle" font-family="${FONT_SANS}" font-size="24" font-weight="700" letter-spacing="-0.6" fill="${t.textPrimary}">Let&apos;s build what&apos;s next.</text>
  <text x="500" y="84" text-anchor="middle" font-family="${FONT_SANS}" font-size="13.5" fill="${t.textSecondary}">Open to conversations on multi-agent systems, cloud architecture, and AI security.</text>
  <text x="500" y="111" text-anchor="middle" font-family="${FONT_MONO}" font-size="10" letter-spacing="1.4" fill="${t.textMuted}">DESIGNED IN LONDON  ·  COMPILED WITH TYPESCRIPT  ·  ADAPTIVE VECTOR ENGINE</text>
</svg>`;
}
