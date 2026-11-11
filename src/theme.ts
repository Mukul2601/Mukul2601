import type { ThemeMode, ThemeTokens } from './types.ts';

export const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', Inter, Arial, sans-serif";

export const FONT_MONO =
  "'SF Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

export const themes: Record<ThemeMode, ThemeTokens> = {
  dark: {
    mode: 'dark',
    canvasBg: '#06070B',
    cardBg: '#11131A',
    cardBgElevated: '#181B24',
    cardBorder: 'rgba(255, 255, 255, 0.10)',
    cardHighlight: 'rgba(255, 255, 255, 0.22)',
    pillBg: 'rgba(255, 255, 255, 0.06)',
    pillBorder: 'rgba(255, 255, 255, 0.12)',
    textPrimary: '#F5F5F7',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    accentBlue: '#2997FF',
    accentViolet: '#AF52DE',
    accentMagenta: '#FF375F',
    accentAmber: '#FF9F0A',
    accentGreen: '#30D158',
    accentCyan: '#64D2FF',
    islandBg: '#0B0C10',
    islandBorder: 'rgba(255, 255, 255, 0.16)',
    islandText: '#F5F5F7',
    divider: 'rgba(255, 255, 255, 0.08)',
    trackBg: 'rgba(255, 255, 255, 0.09)',
    orbOpacity: 0.42,
    gridOpacity: 0.06
  },
  light: {
    mode: 'light',
    canvasBg: '#F5F5F7',
    cardBg: '#FFFFFF',
    cardBgElevated: '#F8F8FA',
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    cardHighlight: 'rgba(255, 255, 255, 0.90)',
    pillBg: 'rgba(0, 0, 0, 0.04)',
    pillBorder: 'rgba(0, 0, 0, 0.09)',
    textPrimary: '#1D1D1F',
    textSecondary: '#515154',
    textMuted: '#86868B',
    accentBlue: '#0066CC',
    accentViolet: '#8944AB',
    accentMagenta: '#D70040',
    accentAmber: '#C96900',
    accentGreen: '#1E9E44',
    accentCyan: '#0077ED',
    islandBg: '#1D1D1F',
    islandBorder: 'rgba(0, 0, 0, 0.20)',
    islandText: '#F5F5F7',
    divider: 'rgba(0, 0, 0, 0.07)',
    trackBg: 'rgba(0, 0, 0, 0.07)',
    orbOpacity: 0.22,
    gridOpacity: 0.045
  }
};

export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function estimatePillWidth(label: string, fontSize = 12.5, horizontalPad = 24): number {
  const avgChar = fontSize * 0.61;
  return Math.round(label.length * avgChar + horizontalPad);
}

export function renderDockIcon(
  icon: 'spark' | 'nodes' | 'cloud' | 'shield',
  x: number,
  y: number,
  color: string
): string {
  switch (icon) {
    case 'spark':
      return `<g transform="translate(${x}, ${y})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 1.5L9.8 6.2L14.5 8L9.8 9.8L8 14.5L6.2 9.8L1.5 8L6.2 6.2Z"/>
      </g>`;
    case 'nodes':
      return `<g transform="translate(${x}, ${y})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="4" cy="8" r="2.2"/>
        <circle cx="12" cy="4" r="2.2"/>
        <circle cx="12" cy="12" r="2.2"/>
        <path d="M6 7L10 5M6 9L10 11"/>
      </g>`;
    case 'cloud':
      return `<g transform="translate(${x}, ${y})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.5 12.5H11.8C13.6 12.5 15 11.1 15 9.3C15 7.6 13.7 6.2 12 6.1C11.5 3.8 9.5 2.2 7.1 2.2C4.3 2.2 2.1 4.4 2.1 7.2C2.1 7.5 2.1 7.8 2.2 8.1C1.4 8.6 1 9.5 1 10.4C1 11.6 2 12.5 3.2 12.5H4.5Z"/>
      </g>`;
    case 'shield':
      return `<g transform="translate(${x}, ${y})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 1.5L13.5 3.8V7.8C13.5 11.2 11.2 13.8 8 14.8C4.8 13.8 2.5 11.2 2.5 7.8V3.8L8 1.5Z"/>
        <path d="M5.8 8.1L7.3 9.6L10.4 6.5"/>
      </g>`;
  }
}
