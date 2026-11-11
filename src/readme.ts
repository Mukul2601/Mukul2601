import type { ProfileData } from './types.ts';

function pictureBlock(assetBaseName: string, alt: string, widthAttr = 'width="100%"'): string {
  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/${assetBaseName}-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/${assetBaseName}-light.svg">
  <img alt="${alt}" src="./assets/${assetBaseName}-dark.svg" ${widthAttr}>
</picture>`;
}

function linkedPictureBlock(
  href: string,
  assetBaseName: string,
  alt: string,
  widthAttr = ''
): string {
  const w = widthAttr ? ` ${widthAttr}` : '';
  return `<a href="${href}"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/${assetBaseName}-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/${assetBaseName}-light.svg"><img alt="${alt}" src="./assets/${assetBaseName}-dark.svg"${w}></picture></a>`;
}

export function renderReadmeMarkdown(data: ProfileData): string {
  const [proj1, proj2] = data.projects;

  const stageRows = data.agentWorkflow.stages
    .map(
      (s) =>
        `| \`${s.step}\` | **${s.title}** _(${s.subtitle})_ | ${s.detail} |`
    )
    .join('\n');

  const expRows = data.experiences
    .map(
      (e) =>
        `| **${e.period}** | **${e.company}** — _${e.fullRole}_<br><sub>${e.location}</sub> | ${e.summary} |`
    )
    .join('\n');

  return `<div align="center">

${pictureBlock('hero', `${data.name} — Multi-agent intelligence, engineered for production.`)}

<br>

${linkedPictureBlock(data.links.linkedin, 'pill-linkedin', 'Connect on LinkedIn', 'height="38"')}&nbsp;&nbsp;${linkedPictureBlock('#system-architecture', 'pill-architecture', 'Explore Architecture', 'height="38"')}&nbsp;&nbsp;${linkedPictureBlock('#career-trajectory', 'pill-trajectory', 'Career Trajectory', 'height="38"')}&nbsp;&nbsp;${linkedPictureBlock('#featured-engineering', 'pill-projects', 'Featured Work', 'height="38"')}

</div>

<br>

<a id="system-architecture"></a>

${pictureBlock('bento', 'Bento Grid — Agentic AI Workflows, Measured Impact, Supply Chain Security, and Ecosystem Matrix')}

<details>
<summary><b>⊕ Interactive Spec 01 — Multi-Agent Architecture (Reference Pattern)</b> &nbsp;<sub>Click to expand overview</sub></summary>

<br>

> A general multi-agent pattern: specialised agents, deterministic checks and auditable, version-controlled delivery.

| Stage | Subsystem | Responsibility |
| :--- | :--- | :--- |
${stageRows}

- **Orchestration & Tooling:** Microsoft Agentic Framework · GitOps Workflow for IaC · AI-Assisted Specification & Verification
- **Active Research:** Secure AI/Container Supply Chains (SBOM provenance) · Quantum Computing & Brain-Computer Interface (BCI) threat surfaces

</details>

<br>

<a id="career-trajectory"></a>

${pictureBlock('experience', 'Career Trajectory — ENGIE UK, HireMeHub, K3-Innovations, Accenture, Birlasoft')}

<details>
<summary><b>⊕ Interactive Spec 02 — Career Telemetry &amp; Production Deliverables (2022 – Present)</b> &nbsp;<sub>Click to expand role history</sub></summary>

<br>

| Timeline | Organization &amp; Role | Key Engineering Outcome |
| :--- | :--- | :--- |
${expRows}

- **Academic Foundation:** **${data.education.degree}**, ${data.education.institution} _(London, United Kingdom)_

</details>

<br>

<a id="featured-engineering"></a>

<div align="center">
${linkedPictureBlock(proj1.url, `project-${proj1.slug}`, proj1.title, 'width="49%"')}&nbsp;${linkedPictureBlock(proj2.url, `project-${proj2.slug}`, proj2.title, 'width="49%"')}
</div>

<details>
<summary><b>⊕ Interactive Spec 03 — Full Engineering &amp; Cloud Specifications</b> &nbsp;<sub>Click to expand complete stack</sub></summary>

<br>

| Domain | Technologies &amp; Practices |
| :--- | :--- |
| **Applied AI &amp; Agents** | Multi-Agent Systems · Microsoft Agentic Framework · LangChain · PyTorch · TensorFlow · RAG &amp; Evaluation · n8n · Zapier · Pipedream |
| **Backend &amp; Data** | Python · Django · Flask · REST APIs · ETL Pipelines · MSSQL · SQL · Power BI |
| **Cloud &amp; MLOps** | Microsoft Azure · AWS · Docker · GitHub Actions · Jenkins · GitOps IaC · Linux · ServiceNow Automation |
| **Security &amp; Resilience** | Container Hardening · SBOM &amp; Dependency Provenance · Agentic Guardrails · Quantum / BCI Threat Modeling |
| **Profile Engine** | Built in **TypeScript** (\`src/\`) — run \`npm run generate\` to recompile all adaptive Dark/Light SVG scenes and \`README.md\`. |

</details>

<br>

<div align="center">

${linkedPictureBlock(data.links.linkedin, 'footer', "Let's build what's next — Connect on LinkedIn", 'width="100%"')}

<br><br>

![Profile Views](https://komarev.com/ghpvc/?username=${data.links.username}&label=Profile%20Views&color=0071e3&style=flat-square)

</div>
`;
}
