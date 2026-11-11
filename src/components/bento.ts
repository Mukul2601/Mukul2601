import type { ProfileData, ThemeMode } from '../types.ts';
import { FONT_MONO, FONT_SANS, esc, estimatePillWidth, themes } from '../theme.ts';

export function renderBentoSvg(data: ProfileData, mode: ThemeMode): string {
  const t = themes[mode];

  // Card 1: Multi-Agent Pipeline (x=0, y=0, w=612, h=252)
  const stageNodes = data.agentWorkflow.stages
    .map((stage, idx) => {
      const nodeW = 122;
      const gap = 22;
      const x = 28 + idx * (nodeW + gap);
      const y = 118;
      const isFinal = idx === 3;
      const accent = isFinal ? t.accentGreen : idx === 1 ? t.accentViolet : t.accentBlue;
      const pulseBegin = `${(idx * 1.15).toFixed(2)}s`;

      return `
      <g>
        <rect x="${x}" y="${y}" width="${nodeW}" height="106" rx="14" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1">
          <animate attributeName="stroke" values="${t.cardBorder};${accent};${t.cardBorder}" dur="4.6s" begin="${pulseBegin}" repeatCount="indefinite"/>
        </rect>
        <text x="${x + 12}" y="${y + 24}" font-family="${FONT_MONO}" font-size="9.5" font-weight="600" letter-spacing="0.8" fill="${accent}">${esc(stage.step)}</text>
        <text x="${x + 12}" y="${y + 49}" font-family="${FONT_SANS}" font-size="14" font-weight="600" fill="${t.textPrimary}">${esc(stage.title)}</text>
        <text x="${x + 12}" y="${y + 69}" font-family="${FONT_SANS}" font-size="11.5" fill="${t.textSecondary}">${esc(stage.subtitle)}</text>
        <rect x="${x + 12}" y="${y + 85}" width="98" height="4" rx="2" fill="${t.trackBg}"/>
        <rect x="${x + 12}" y="${y + 85}" width="32" height="4" rx="2" fill="${accent}">
          <animate attributeName="width" values="24;98;24" dur="4.6s" begin="${pulseBegin}" repeatCount="indefinite"/>
        </rect>
      </g>`;
    })
    .join('\n');

  const connectors = [0, 1, 2]
    .map((idx) => {
      const x1 = 28 + idx * 144 + 122;
      const x2 = x1 + 22;
      return `<line x1="${x1}" y1="171" x2="${x2}" y2="171" stroke="${t.accentBlue}" stroke-opacity="0.38" stroke-width="1.8" stroke-dasharray="3 3"/>`;
    })
    .join('\n');

  // Card 2: Impact Metrics (x=628, y=0, w=372, h=252)
  const m1 = data.impactMetrics[0];
  const m2 = data.impactMetrics[1];
  const barFullW = 316;
  const bar1W = Math.round((barFullW * m1.fillPercent) / 100);
  const bar2W = Math.round((barFullW * m2.fillPercent) / 100);

  // Card 3: Security Pillars (x=0, y=268, w=372, h=252)
  const securityRows = data.securityPillars
    .map((pillar, idx) => {
      const py = 358 + idx * 40;
      const dotColors = [t.accentGreen, t.accentBlue, t.accentViolet];
      const dotColor = dotColors[idx] ?? t.accentBlue;
      return `
      <g>
        <rect x="28" y="${py}" width="210" height="31" rx="9" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
        <circle cx="43" cy="${py + 15.5}" r="3.5" fill="${dotColor}"/>
        <text x="55" y="${py + 19.5}" font-family="${FONT_SANS}" font-size="11.2" font-weight="500" fill="${t.textPrimary}">${esc(pillar)}</text>
      </g>`;
    })
    .join('\n');

  // Card 4: Tech Stack Matrix (x=388, y=268, w=612, h=252)
  const stackMarkup = data.stackRows
    .map((row, rowIdx) => {
      const ry = 362 + rowIdx * 44;
      let cursorX = 468;
      const rowColors = [t.accentBlue, t.accentViolet, t.accentGreen];
      const catColor = rowColors[rowIdx] ?? t.accentBlue;

      const pills = row.items
        .map((item) => {
          const pw = estimatePillWidth(item, 11.5, 20);
          if (cursorX + pw > 978) {
            return '';
          }
          const x = cursorX;
          cursorX += pw + 7;
          return `
          <g>
            <rect x="${x}" y="${ry}" width="${pw}" height="31" rx="9.5" fill="${t.cardBgElevated}" stroke="${t.cardBorder}" stroke-width="1"/>
            <text x="${x + pw / 2}" y="${ry + 19.5}" text-anchor="middle" font-family="${FONT_SANS}" font-size="11.5" font-weight="500" fill="${t.textPrimary}">${esc(item)}</text>
          </g>`;
        })
        .join('');

      return `
      <g>
        <text x="416" y="${ry + 19.5}" font-family="${FONT_MONO}" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${catColor}">${esc(row.category)}</text>
        ${pills}
      </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520" fill="none" role="img" aria-label="Apple Bento Capabilities Grid">
  <defs>
    <linearGradient id="metric-blue" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>
    <linearGradient id="metric-green" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentGreen}"/>
      <stop offset="100%" stop-color="${t.accentCyan}"/>
    </linearGradient>
    <radialGradient id="card1-glow" cx="85%" cy="15%" r="55%">
      <stop offset="0%" stop-color="${t.accentBlue}" stop-opacity="${mode === 'dark' ? '0.18' : '0.10'}"/>
      <stop offset="100%" stop-color="${t.accentBlue}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="card3-glow" cx="82%" cy="68%" r="50%">
      <stop offset="0%" stop-color="${t.accentViolet}" stop-opacity="${mode === 'dark' ? '0.20' : '0.10'}"/>
      <stop offset="100%" stop-color="${t.accentViolet}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- CARD 1: Autonomous KYC Verification Engine -->
  <g>
    <rect x="0.75" y="0.75" width="610.5" height="250.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
    <rect x="0.75" y="0.75" width="610.5" height="250.5" rx="23.25" fill="url(#card1-glow)"/>

    <!-- Status Pill -->
    <rect x="468" y="22" width="116" height="26" rx="13" fill="${t.pillBg}" stroke="${t.pillBorder}" stroke-width="1"/>
    <circle cx="484" cy="35" r="3.5" fill="${t.accentGreen}">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <text x="533" y="38.5" text-anchor="middle" font-family="${FONT_MONO}" font-size="9.5" font-weight="600" letter-spacing="1" fill="${t.textSecondary}">AGENTIC</text>

    <text x="28" y="39" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.accentBlue}">${esc(data.agentWorkflow.eyebrow)}</text>
    <text x="28" y="68" font-family="${FONT_SANS}" font-size="22" font-weight="700" letter-spacing="-0.5" fill="${t.textPrimary}">${esc(data.agentWorkflow.title)}</text>
    <text x="28" y="92" font-family="${FONT_SANS}" font-size="13" fill="${t.textSecondary}">${esc(data.agentWorkflow.subtitle)}</text>

    ${connectors}
    ${stageNodes}

    <!-- Animated Data Packet -->
    <circle cx="89" cy="171" r="4.5" fill="${t.accentCyan}">
      <animate attributeName="cx" values="89;233;377;521;521" keyTimes="0;0.3;0.6;0.9;1" dur="4.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.08;0.5;0.9;1" dur="4.6s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- CARD 2: Measured Production Impact -->
  <g>
    <rect x="628.75" y="0.75" width="370.5" height="250.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
    <text x="656" y="39" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.textMuted}">PRODUCTION TELEMETRY</text>

    <!-- Metric 1 -->
    <text x="656" y="92" font-family="${FONT_SANS}" font-size="40" font-weight="700" letter-spacing="-1.5" fill="url(#metric-blue)">${esc(m1.figure)}</text>
    <text x="776" y="73" font-family="${FONT_SANS}" font-size="13.5" font-weight="600" fill="${t.textPrimary}">${esc(m1.title)}</text>
    <text x="776" y="92" font-family="${FONT_SANS}" font-size="11.5" fill="${t.textSecondary}">${esc(m1.context)}</text>
    <rect x="656" y="109" width="${barFullW}" height="7" rx="3.5" fill="${t.trackBg}"/>
    <rect x="656" y="109" width="${bar1W}" height="7" rx="3.5" fill="url(#metric-blue)">
      <animate attributeName="opacity" values="0.82;1;0.82" dur="3.2s" repeatCount="indefinite"/>
    </rect>

    <line x1="656" y1="136" x2="972" y2="136" stroke="${t.divider}" stroke-width="1"/>

    <!-- Metric 2 -->
    <text x="656" y="191" font-family="${FONT_SANS}" font-size="40" font-weight="700" letter-spacing="-1.5" fill="url(#metric-green)">${esc(m2.figure)}</text>
    <text x="776" y="172" font-family="${FONT_SANS}" font-size="13.5" font-weight="600" fill="${t.textPrimary}">${esc(m2.title)}</text>
    <text x="776" y="191" font-family="${FONT_SANS}" font-size="11.5" fill="${t.textSecondary}">${esc(m2.context)}</text>
    <rect x="656" y="208" width="${barFullW}" height="7" rx="3.5" fill="${t.trackBg}"/>
    <rect x="656" y="208" width="${bar2W}" height="7" rx="3.5" fill="url(#metric-green)">
      <animate attributeName="opacity" values="0.82;1;0.82" dur="3.2s" begin="0.8s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- CARD 3: Zero-Trust AI & Quantum Security -->
  <g>
    <rect x="0.75" y="268.75" width="370.5" height="250.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
    <rect x="0.75" y="268.75" width="370.5" height="250.5" rx="23.25" fill="url(#card3-glow)"/>

    <text x="28" y="306" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.accentViolet}">ZERO-TRUST POSTURE</text>
    <text x="28" y="335" font-family="${FONT_SANS}" font-size="20" font-weight="700" letter-spacing="-0.4" fill="${t.textPrimary}">Supply Chain &amp; BCI Security</text>

    ${securityRows}

    <!-- Animated Security Radar -->
    <g>
      <circle cx="305" cy="414" r="47" stroke="${t.accentViolet}" stroke-opacity="0.24" stroke-width="1.2" stroke-dasharray="5 5">
        <animateTransform attributeName="transform" type="rotate" from="0 305 414" to="360 305 414" dur="16s" repeatCount="indefinite"/>
      </circle>
      <circle cx="305" cy="414" r="33" stroke="${t.accentBlue}" stroke-opacity="0.35" stroke-width="1.4" stroke-dasharray="18 8">
        <animateTransform attributeName="transform" type="rotate" from="360 305 414" to="0 305 414" dur="10s" repeatCount="indefinite"/>
      </circle>
      <circle cx="305" cy="414" r="19" fill="${t.cardBgElevated}" stroke="${t.accentGreen}" stroke-opacity="0.55" stroke-width="1.4"/>
      <path d="M305 404L313 407.5V413.5C313 418.8 309.6 422.8 305 424.3C300.4 422.8 297 418.8 297 413.5V407.5L305 404Z" fill="none" stroke="${t.accentGreen}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M301.8 414L304.1 416.3L308.6 411.8" fill="none" stroke="${t.accentGreen}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- CARD 4: Core Architecture Stack -->
  <g>
    <rect x="388.75" y="268.75" width="610.5" height="250.5" rx="23.25" fill="${t.cardBg}" stroke="${t.cardBorder}" stroke-width="1.5"/>
    <text x="416" y="306" font-family="${FONT_MONO}" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.accentBlue}">ECOSYSTEM MATRIX</text>
    <text x="416" y="335" font-family="${FONT_SANS}" font-size="20" font-weight="700" letter-spacing="-0.4" fill="${t.textPrimary}">Built on Python, Modern AI &amp; Multi-Cloud</text>

    ${stackMarkup}
  </g>
</svg>`;
}
