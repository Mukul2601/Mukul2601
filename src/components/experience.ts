import type { ProfileData, ThemeMode } from '../types.ts';
import { FONT_MONO, FONT_SANS, esc, themes } from '../theme.ts';

export function renderExperienceSvg(data: ProfileData, mode: ThemeMode): string {
  const t = themes[mode];

  const cardW = 176;
  const gap = 14;
  const startX = 32;
  const trackY = 114;
  const cardY = 140;
  const cardH = 190;

  const nodesAndCards = data.experiences
    .map((exp, idx) => {
      const x = startX + idx * (cardW + gap);
      const cx = x + cardW / 2;
      const isCurrent = Boolean(exp.active);
      const borderStroke = isCurrent ? t.accentBlue : t.cardBorder;
      const badgeColor = isCurrent ? t.accentBlue : idx === 2 ? t.accentGreen : t.textSecondary;
      const badgeBg = isCurrent
        ? mode === 'dark'
          ? 'rgba(41, 151, 255, 0.14)'
          : 'rgba(0, 102, 204, 0.10)'
        : t.pillBg;

      return `
      <g>
        <!-- Timeline Node -->
        ${
          isCurrent
            ? `<circle cx="${cx}" cy="${trackY}" r="7" fill="${t.accentBlue}">
                <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.55;0;0.55" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="${cx}" cy="${trackY}" r="5.5" fill="${t.accentBlue}" stroke="${t.cardBg}" stroke-width="2"/>`
            : `<circle cx="${cx}" cy="${trackY}" r="5" fill="${t.cardBgElevated}" stroke="${t.accentViolet}" stroke-width="2"/>`
        }

        <!-- Role Card -->
        <rect x="${x}" y="${cardY}" width="${cardW}" height="${cardH}" rx="16" fill="${t.cardBgElevated}" stroke="${borderStroke}" stroke-width="${isCurrent ? '1.5' : '1'}"/>
        <text x="${x + 14}" y="${cardY + 26}" font-family="${FONT_MONO}" font-size="9.5" font-weight="600" letter-spacing="0.9" fill="${isCurrent ? t.accentBlue : t.textMuted}">${esc(exp.shortPeriod)}</text>
        <text x="${x + 14}" y="${cardY + 54}" font-family="${FONT_SANS}" font-size="16" font-weight="700" letter-spacing="-0.3" fill="${t.textPrimary}">${esc(exp.company)}</text>
        <text x="${x + 14}" y="${cardY + 79}" font-family="${FONT_SANS}" font-size="12.5" font-weight="500" fill="${t.textSecondary}">${esc(exp.roleLine1)}</text>
        <text x="${x + 14}" y="${cardY + 97}" font-family="${FONT_SANS}" font-size="12.5" font-weight="500" fill="${t.textSecondary}">${esc(exp.roleLine2)}</text>

        <line x1="${x + 14}" y1="${cardY + 124}" x2="${x + cardW - 14}" y2="${cardY + 124}" stroke="${t.divider}" stroke-width="1"/>

        <rect x="${x + 14}" y="${cardY + 142}" width="${cardW - 28}" height="28" rx="9" fill="${badgeBg}" stroke="${t.pillBorder}" stroke-width="1"/>
        <text x="${x + cardW / 2}" y="${cardY + 160}" text-anchor="middle" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" fill="${badgeColor}">${esc(exp.badge)}</text>
      </g>`;
    })
    .join('\n');

  const firstCenter = startX + cardW / 2;
  const lastCenter = startX + 4 * (cardW + gap) + cardW / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="360" viewBox="0 0 1000 360" fill="none" role="img" aria-label="Career Trajectory Timeline">
  <defs>
    <linearGradient id="timeline-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentViolet}"/>
      <stop offset="100%" stop-color="${t.textMuted}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>

  <rect x="0.75" y="0.75" width="998.5" height="358.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>

  <text x="32" y="39" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.accentBlue}">CAREER TRAJECTORY  ·  2022 — PRESENT</text>
  <text x="32" y="69" font-family="${FONT_SANS}" font-size="22" font-weight="700" letter-spacing="-0.5" fill="${t.textPrimary}">Five chapters of shipping resilient software.</text>

  <!-- Education Pill -->
  <rect x="698" y="31" width="270" height="38" rx="19" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
  <circle cx="718" cy="50" r="4" fill="${t.accentViolet}"/>
  <text x="840" y="54.5" text-anchor="middle" font-family="${FONT_SANS}" font-size="12.5" font-weight="600" fill="${t.textPrimary}">${esc(data.education.shortLabel)}</text>

  <!-- Timeline Spine -->
  <rect x="${firstCenter}" y="${trackY - 1}" width="${lastCenter - firstCenter}" height="2" rx="1" fill="url(#timeline-grad)"/>
  <circle cx="${lastCenter}" cy="${trackY}" r="3.5" fill="${t.accentCyan}">
    <animate attributeName="cx" values="${lastCenter};${firstCenter}" dur="5.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="5.5s" repeatCount="indefinite"/>
  </circle>

  ${nodesAndCards}
</svg>`;
}
