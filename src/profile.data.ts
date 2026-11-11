import type { ProfileData } from './types.ts';

export const profileData: ProfileData = {
  name: 'Mukul Mogha',
  eyebrow: 'MUKUL MOGHA  ·  AI ENGINEER  ·  MSC CLOUD COMPUTING',
  heroTitleLine1: 'Multi-agent intelligence.',
  heroTitleLine2: 'Engineered for production.',
  heroSubtitle:
    'AI Engineer (Application Manager) at ENGIE UK — architecting autonomous workflows, resilient cloud systems, and zero-trust AI supply chains.',
  dynamicIslandText: 'ENGIE UK  ·  Application Manager  ·  London, UK',
  location: 'London, United Kingdom',
  education: {
    degree: 'MSc Cloud Computing',
    institution: 'University of East London',
    shortLabel: 'MSc Cloud Computing · UEL'
  },
  links: {
    github: 'https://github.com/Mukul2601',
    linkedin: 'https://www.linkedin.com/in/mukul-mogha/',
    username: 'Mukul2601'
  },
  dockStats: [
    {
      eyebrow: 'CURRENT ROLE',
      value: 'ENGIE UK · App Manager',
      icon: 'spark'
    },
    {
      eyebrow: 'CORE ARCHITECTURE',
      value: 'Multi-Agent & RAG',
      icon: 'nodes'
    },
    {
      eyebrow: 'CLOUD & DELIVERY',
      value: 'Azure · AWS · GitOps IaC',
      icon: 'cloud'
    },
    {
      eyebrow: 'TRUST & SAFETY',
      value: 'SBOM & AI Guardrails',
      icon: 'shield'
    }
  ],
  agentWorkflow: {
    eyebrow: 'LIVE SYSTEM  ·  ENGIE UK',
    title: 'Autonomous KYC Verification Engine',
    subtitle:
      'Microsoft Agentic Framework + GitOps IaC automating compliance checks.',
    stages: [
      {
        step: '01 · INGEST',
        title: 'Intake Node',
        subtitle: 'Doc Parsing',
        detail: 'Normalizes unstructured KYC filings and validates schema integrity.'
      },
      {
        step: '02 · EXTRACT',
        title: 'Entity Agent',
        subtitle: 'Signal Synthesis',
        detail: 'Extracts corporate entities, registries, and risk indicators autonomously.'
      },
      {
        step: '03 · VERIFY',
        title: 'Policy Agent',
        subtitle: 'Cross-Check',
        detail: 'Evaluates extracted evidence against compliance rules with deterministic checks.'
      },
      {
        step: '04 · AUDIT',
        title: 'IaC Gate',
        subtitle: 'Verified Output',
        detail: 'Produces auditable verification dossiers deployed via GitOps infrastructure.'
      }
    ]
  },
  impactMetrics: [
    {
      figure: '+30%',
      title: 'Pipeline & Query Speed',
      context: 'K3-Innovations · AWS & Django ETL',
      fillPercent: 84,
      tone: 'blue'
    },
    {
      figure: '-20%',
      title: 'Enterprise Ticket Backlog',
      context: 'Accenture · Azure & ServiceNow Ops',
      fillPercent: 74,
      tone: 'green'
    }
  ],
  securityPillars: [
    'SBOM & Container Signing',
    'Agentic Policy Guardrails',
    'Quantum & BCI Threat Models'
  ],
  stackRows: [
    {
      category: 'AI',
      items: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'MS Agentic']
    },
    {
      category: 'CLOUD',
      items: ['Azure', 'AWS', 'Django', 'Flask', 'REST & ETL', 'n8n · Zapier']
    },
    {
      category: 'OPS',
      items: ['Docker', 'GitHub Actions', 'Jenkins', 'GitOps IaC', 'SBOM', 'Linux']
    }
  ],
  experiences: [
    {
      period: 'Jan 2026 – Present',
      shortPeriod: '2026 — NOW',
      company: 'ENGIE UK',
      roleLine1: 'AI Engineer',
      roleLine2: 'Application Manager',
      fullRole: 'AI Engineer (Application Manager)',
      location: 'London, UK · On-site',
      badge: 'KYC Agentic AI',
      active: true,
      summary:
        'Architecting an autonomous KYC background verification tool using the Microsoft Agentic Framework and Git workflows for Infrastructure as Code (IaC).'
    },
    {
      period: 'Jan 2025 – Dec 2025',
      shortPeriod: 'JAN – DEC 2025',
      company: 'HireMeHub',
      roleLine1: 'AI Engineer',
      roleLine2: 'Freelance',
      fullRole: 'AI Engineer (Freelance)',
      location: 'London, UK · Remote',
      badge: 'AI Career Platform',
      summary:
        'Built an AI-driven career platform optimizing technical application materials through automated n8n, Zapier, and Pipedream orchestration.'
    },
    {
      period: 'Nov 2023 – Jun 2025',
      shortPeriod: '2023 — 2025',
      company: 'K3-Innovations',
      roleLine1: 'Software Engineer',
      roleLine2: 'Agentic Consultant',
      fullRole: 'Software Engineer — AI Agentic Consultant (Contract)',
      location: 'United States · Remote',
      badge: '+30% Perf · AWS',
      summary:
        'Engineered AWS + REST ETL pipelines and a full-stack Python (Django) analytics platform, boosting data-processing and query performance by 30%.'
    },
    {
      period: 'Nov 2022 – Sep 2023',
      shortPeriod: '2022 — 2023',
      company: 'Accenture',
      roleLine1: 'Software Engineer',
      roleLine2: 'Microsoft Azure',
      fullRole: 'Software Engineer — Azure',
      location: 'Hybrid',
      badge: '-20% Backlog',
      summary:
        'Automated ServiceNow request and escalation workflows (reducing ticket backlog by 20%) and led zero-downtime MSSQL patching & migrations on Azure.'
    },
    {
      period: 'Feb 2022 – Jul 2022',
      shortPeriod: 'FEB – JUL 2022',
      company: 'Birlasoft',
      roleLine1: 'Graduate Trainee',
      roleLine2: 'ServiceNow & BI',
      fullRole: 'Graduate Engineering Trainee — ServiceNow Analyst',
      location: 'Noida, India · Remote',
      badge: 'Cloud Monitoring',
      summary:
        'Developed cloud monitoring utilities and executive Power BI, SQL, and Python reporting dashboards for enterprise client operations.'
    }
  ],
  projects: [
    {
      slug: 'supply-chain',
      eyebrow: 'DEVSECOPS  ·  CONTAINER SECURITY',
      title: 'Secure Docker Supply Chain',
      line1: 'End-to-end hardened container delivery blueprint combining',
      line2: 'Docker, Flask, GitHub Actions CI gates, and SBOM provenance.',
      url: 'https://github.com/Mukul2601/secure-docker-supply-chain-demo',
      tags: ['Docker', 'Flask', 'GitHub Actions', 'SBOM'],
      accent: 'blue'
    },
    {
      slug: 'quantum',
      eyebrow: 'FRONTIER RESEARCH  ·  THREAT MODELING',
      title: 'Quantum Brain Cybersecurity',
      line1: 'Speculative security research exploring threat surfaces where',
      line2: 'quantum computing meets brain-computer neural interfaces.',
      url: 'https://github.com/Mukul2601/QuantumBrainCybersecurity',
      tags: ['Quantum', 'BCI', 'AI Security', 'Python'],
      accent: 'violet'
    }
  ]
};
