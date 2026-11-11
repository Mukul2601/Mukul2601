import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderBentoSvg } from './components/bento.ts';
import { renderExperienceSvg } from './components/experience.ts';
import { renderActionPillSvg, renderHeroSvg } from './components/hero.ts';
import { renderFooterSvg, renderProjectCardSvg } from './components/projects.ts';
import { profileData } from './profile.data.ts';
import { renderReadmeMarkdown } from './readme.ts';
import type { ThemeMode } from './types.ts';

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(currentDir, '..');
const assetsDir = resolve(rootDir, 'assets');

mkdirSync(assetsDir, { recursive: true });

const modes: ThemeMode[] = ['dark', 'light'];

for (const mode of modes) {
  writeFileSync(resolve(assetsDir, `hero-${mode}.svg`), renderHeroSvg(profileData, mode), 'utf8');
  writeFileSync(resolve(assetsDir, `bento-${mode}.svg`), renderBentoSvg(profileData, mode), 'utf8');
  writeFileSync(
    resolve(assetsDir, `experience-${mode}.svg`),
    renderExperienceSvg(profileData, mode),
    'utf8'
  );
  writeFileSync(resolve(assetsDir, `footer-${mode}.svg`), renderFooterSvg(mode), 'utf8');

  writeFileSync(
    resolve(assetsDir, `pill-linkedin-${mode}.svg`),
    renderActionPillSvg('Connect on LinkedIn ↗', 'primary', mode, 204),
    'utf8'
  );
  writeFileSync(
    resolve(assetsDir, `pill-architecture-${mode}.svg`),
    renderActionPillSvg('Agent Architecture ↓', 'secondary', mode, 192),
    'utf8'
  );
  writeFileSync(
    resolve(assetsDir, `pill-trajectory-${mode}.svg`),
    renderActionPillSvg('Career Trajectory ↓', 'secondary', mode, 184),
    'utf8'
  );
  writeFileSync(
    resolve(assetsDir, `pill-projects-${mode}.svg`),
    renderActionPillSvg('Featured Work ↓', 'secondary', mode, 164),
    'utf8'
  );

  for (const project of profileData.projects) {
    writeFileSync(
      resolve(assetsDir, `project-${project.slug}-${mode}.svg`),
      renderProjectCardSvg(project, mode),
      'utf8'
    );
  }
}

const readmeContent = renderReadmeMarkdown(profileData);
writeFileSync(resolve(rootDir, 'README.md'), readmeContent, 'utf8');

console.log('Generated 20 adaptive dark/light Apple-style SVGs in ./assets and updated README.md');
