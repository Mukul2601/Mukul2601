import type { ProfileData, ThemeMode } from '../types.ts';
import { FONT_MONO, FONT_SANS, esc, renderDockIcon, themes } from '../theme.ts';

export function renderHeroSvg(data: ProfileData, mode: ThemeMode): string {
  const t = themes[mode];
  const subtitleParts = [
    'AI Engineer (Application Manager) at ENGIE UK — architecting autonomous workflows,',
    'resilient cloud infrastructure, and zero-trust AI supply chains.'
  ];

  const dockCards = data.dockStats
    .map((stat, idx) => {
      const cardW = 224;
      const gap = 12;
      const x = 34 + idx * (cardW + gap);
      const y = 304;
      const iconColors = [t.accentBlue, t.accentViolet, t.accentCyan, t.accentGreen];
      const iconColor = iconColors[idx] ?? t.accentBlue;
      const pulseDelay = `${(idx * 1.4).toFixed(1)}s`;

      return `
      <g>
        <rect x="${x}" y="${y}" width="${cardW}" height="64" rx="16" fill="${t.cardBgElevated}" fill-opacity="${mode === 'dark' ? '0.82' : '0.90'}" stroke="${t.cardBorder}" stroke-width="1">
          <animate attributeName="stroke" values="${t.cardBorder};${iconColor};${t.cardBorder}" dur="5.6s" begin="${pulseDelay}" repeatCount="indefinite"/>
        </rect>
        <line x1="${x + 16}" y1="${y + 0.5}" x2="${x + cardW - 16}" y2="${y + 0.5}" stroke="${t.cardHighlight}" stroke-width="1" stroke-opacity="0.5"/>
        ${renderDockIcon(stat.icon, x + 16, y + 14, iconColor)}
        <text x="${x + 38}" y="${y + 26}" font-family="${FONT_MONO}" font-size="10" font-weight="600" letter-spacing="1.2" fill="${t.textMuted}">${esc(stat.eyebrow)}</text>
        <text x="${x + 18}" y="${y + 48}" font-family="${FONT_SANS}" font-size="13.5" font-weight="600" fill="${t.textPrimary}">${esc(stat.value)}</text>
      </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="396" viewBox="0 0 1000 396" fill="none" role="img" aria-label="${esc(data.name)} — Apple-style Profile Hero">
  <defs>
    <style>
      @keyframes barWave1 {
        0%, 100% { height: 6px; y: 40px; }
        50% { height: 14px; y: 36px; }
      }
      @keyframes barWave2 {
        0%, 100% { height: 13px; y: 36.5px; }
        50% { height: 5px; y: 40.5px; }
      }
      @keyframes barWave3 {
        0%, 100% { height: 8px; y: 39px; }
        50% { height: 15px; y: 35.5px; }
      }
      .eq-1 { animation: barWave1 1.4s ease-in-out infinite; }
      .eq-2 { animation: barWave2 1.1s ease-in-out infinite; }
      .eq-3 { animation: barWave3 1.6s ease-in-out infinite; }
      .eq-4 { animation: barWave1 1.25s ease-in-out 0.3s infinite; }
    </style>

    <linearGradient id="apple-intel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}">
        <animate attributeName="stop-color" values="${t.accentBlue};${t.accentViolet};${t.accentMagenta};${t.accentBlue}" dur="9s" repeatCount="indefinite"/>
      </stop>
      <stop offset="48%" stop-color="${t.accentViolet}">
        <animate attributeName="stop-color" values="${t.accentViolet};${t.accentMagenta};${t.accentAmber};${t.accentViolet}" dur="9s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="${t.accentMagenta}">
        <animate attributeName="stop-color" values="${t.accentMagenta};${t.accentAmber};${t.accentBlue};${t.accentMagenta}" dur="9s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>

    <linearGradient id="top-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentBlue}" stop-opacity="0"/>
      <stop offset="30%" stop-color="${t.accentBlue}" stop-opacity="0.65"/>
      <stop offset="50%" stop-color="${t.accentViolet}" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="${t.accentMagenta}" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="${t.accentMagenta}" stop-opacity="0"/>
    </linearGradient>

    <filter id="aura-blur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="56"/>
    </filter>

    <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${t.textPrimary}" fill-opacity="${t.gridOpacity}"/>
    </pattern>

    <radialGradient id="grid-mask-grad" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <mask id="grid-mask">
      <rect width="1000" height="396" fill="url(#grid-mask-grad)"/>
    </mask>

    <clipPath id="hero-clip">
      <rect width="1000" height="396" rx="28"/>
    </clipPath>
  </defs>

  <g clip-path="url(#hero-clip)">
    <rect width="1000" height="396" rx="28" fill="${t.canvasBg}"/>

    <g filter="url(#aura-blur)" opacity="${t.orbOpacity}">
      <ellipse cx="260" cy="95" rx="190" ry="110" fill="${t.accentBlue}">
        <animateTransform attributeName="transform" type="translate" values="0,0; 70,25; 0,0" dur="14s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="730" cy="115" rx="200" ry="115" fill="${t.accentViolet}">
        <animateTransform attributeName="transform" type="translate" values="0,0; -65,30; 0,0" dur="16s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="510" cy="240" rx="180" ry="95" fill="${t.accentMagenta}" opacity="0.7">
        <animateTransform attributeName="transform" type="translate" values="0,0; 35,-30; 0,0" dur="12s" repeatCount="indefinite"/>
      </ellipse>
    </g>

    <rect width="1000" height="396" fill="url(#dot-grid)" mask="url(#grid-mask)"/>

    <rect x="120" y="0.5" width="760" height="1.5" fill="url(#top-sheen)"/>

    <!-- Apple Dynamic Island Live Pill -->
    <g>
      <rect x="275" y="25" width="450" height="36" rx="18" fill="${t.islandBg}" stroke="${t.islandBorder}" stroke-width="1"/>
      <circle cx="300" cy="43" r="4" fill="#30D158">
        <animate attributeName="r" values="4;9;4" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.65;0;0.65" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="300" cy="43" r="4" fill="#30D158"/>
      <text x="492" y="47.5" text-anchor="middle" font-family="${FONT_SANS}" font-size="12.5" font-weight="500" fill="${t.islandText}" letter-spacing="0.1">${esc(data.dynamicIslandText)}</text>

      <!-- Live Activity Equalizer -->
      <rect class="eq-1" x="688" y="40" width="2.5" height="6" rx="1.25" fill="${t.accentBlue}"/>
      <rect class="eq-2" x="693" y="36.5" width="2.5" height="13" rx="1.25" fill="${t.accentViolet}"/>
      <rect class="eq-3" x="698" y="39" width="2.5" height="8" rx="1.25" fill="${t.accentMagenta}"/>
      <rect class="eq-4" x="703" y="40" width="2.5" height="6" rx="1.25" fill="${t.accentAmber}"/>
    </g>

    <!-- Keynote Headline -->
    <g class="hero-title">
      <text x="500" y="96" text-anchor="middle" font-family="${FONT_MONO}" font-size="11" font-weight="600" letter-spacing="2.8" fill="${t.textMuted}">${esc(data.eyebrow)}</text>
      <text x="500" y="152" text-anchor="middle" font-family="${FONT_SANS}" font-size="52" font-weight="700" letter-spacing="-1.6" fill="${t.textPrimary}">${esc(data.heroTitleLine1)}</text>
      <text x="500" y="210" text-anchor="middle" font-family="${FONT_SANS}" font-size="52" font-weight="700" letter-spacing="-1.6" fill="url(#apple-intel)">${esc(data.heroTitleLine2)}</text>
    </g>

    <g class="hero-sub">
      <text x="500" y="250" text-anchor="middle" font-family="${FONT_SANS}" font-size="15.5" font-weight="400" fill="${t.textSecondary}">${esc(subtitleParts[0] ?? '')}</text>
      <text x="500" y="273" text-anchor="middle" font-family="${FONT_SANS}" font-size="15.5" font-weight="400" fill="${t.textSecondary}">${esc(subtitleParts[1] ?? '')}</text>
    </g>

    <!-- Bottom Spec Dock -->
    ${dockCards}

    <rect x="0.75" y="0.75" width="998.5" height="394.5" rx="27.25" stroke="${t.cardBorder}" stroke-width="1.5"/>
  </g>
</svg>`;
}

export function renderActionPillSvg(
  label: string,
  variant: 'primary' | 'secondary',
  mode: ThemeMode,
  width: number
): string {
  const t = themes[mode];
  const isPrimary = variant === 'primary';
  const bg = isPrimary ? (mode === 'dark' ? '#0071E3' : '#0071E3') : t.cardBg;
  const textFill = isPrimary ? '#FFFFFF' : t.textPrimary;
  const border = isPrimary ? 'rgba(255,255,255,0.22)' : t.cardBorder;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40" fill="none" role="img" aria-label="${esc(label)}">
  <rect x="0.75" y="0.75" width="${width - 1.5}" height="38.5" rx="19.25" fill="${bg}" stroke="${border}" stroke-width="1.2"/>
  <text x="${width / 2}" y="24.5" text-anchor="middle" font-family="${FONT_SANS}" font-size="13.5" font-weight="600" letter-spacing="-0.1" fill="${textFill}">${esc(label)}</text>
</svg>`;
}
