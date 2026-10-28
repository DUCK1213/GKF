export interface ResearchPaper {
  id: string;
  title: string;
  category: 'Concept Paper' | 'M&E Evaluation' | 'Safeguarding' | 'Fiduciary';
  authors: string;
  publishDate: string;
  version: string;
  pages: number;
  downloads: number;
  summary: string;
  keyFindings: string[];
  fullTextMarkdown: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-concept-project-vision',
    title: 'Concept Paper: Project Vision – Self-Authoring for Empowerment & Agricultural Value Chain Transformation in Murang\'a County',
    category: 'Concept Paper',
    authors: 'Geoffrey Karema Foundation Research & Strategy Directorate',
    publishDate: 'October 2025',
    version: '1.0',
    pages: 18,
    downloads: 1420,
    summary: 'A comprehensive operational concept paper outlining Viktor Frankl\'s logotherapy and Cognitive Behavioral Therapy (CBT) integration to cultivate self-efficacy and economic self-reliance across 1,200 rural youth in Murang\'a County.',
    keyFindings: [
      'Addresses structural youth underemployment through psychological resilience before market entry.',
      'Embeds agricultural value chain management (inputs, production, storage, marketing, risk hedging) directly into youth enterprise planning.',
      'Demonstrates proof-of-concept pilot with 150 individuals scaling to 1,200 participants across county secondary schools.',
      'Integrates Design Thinking (Empathize, Define, Ideate, Prototype, Test) into individual goal roadmaps.',
    ],
    fullTextMarkdown: `
# Concept Paper: Project Vision
**Document Version:** 1.0  
**Target Platform:** Geoffrey Karema Foundation (GKF) Digital Ecosystem  
**Target Region:** Murang'a County, Kenya  

## 1. Introduction & Background
In today's fast-paced and evolving economic landscape, individuals often struggle to define and pursue life goals that align with both personal aspirations and market realities. For youth, especially in rural areas, this challenge is compounded by limited access to information, training, and resources.

In Kenya, youth unemployment and underemployment have risen despite higher literacy. Formal wage employment cannot absorb the current volume of secondary and tertiary graduates. Project Vision provides an evidence-based self-authoring platform rooted in Viktor Frankl's logotherapy and Cognitive Behavioral Therapy (CBT) to empower individuals to take ownership of their future.

## 2. Core Pillars & Methodology
1. **Self-Authoring**: Creating a coherent life narrative, articulating strengths, addressing weaknesses, and structuring concrete career/enterprise roadmaps.
2. **CBT Integration**: Identifying limiting beliefs, addressing domestic stress and intergenerational male alcoholism, and replacing cognitive distortions with constructive action.
3. **Agricultural Value Chain Optimization**: Moving youth from subsistence farming into high-value agricultural enterprises with managed inputs, post-harvest cold storage, and organized market off-takers.
4. **Monitoring & Evaluation (M&E)**: Structured tracking using the General Self-Efficacy Scale, Brief Resilience Scale, and Goal Clarity Index.
    `,
  },
  {
    id: 'paper-me-outcomes-pilot',
    title: 'Murang\'a County Pilot Study: Longitudinal M&E Analysis of the 4-Hour Sunday Mentorship Rhythm',
    category: 'M&E Evaluation',
    authors: 'Dr. Samuel Kariuki, M&E Technical Working Group',
    publishDate: 'February 2026',
    version: '2.1',
    pages: 24,
    downloads: 890,
    summary: 'Empirical evaluation of 150 pilot students across Murang\'a High Hub and Ihura Secondary Hub demonstrating statistically significant gains across all three psychological scales.',
    keyFindings: [
      'General Self-Efficacy increased from 58% baseline to 81% endline (+23% net increase).',
      'Brief Resilience score improved from 54% to 79% (+25% net growth) after CBT stress reframing.',
      'Goal Clarity Index grew from 49% to 86% (+37% net growth) following logotherapy self-authoring modules.',
      'Sunday session attendance rate sustained at 94% across the 12-week academic term.',
    ],
    fullTextMarkdown: `
# Murang'a County Pilot Study: Longitudinal M&E Analysis
**Assessment Cohort:** 150 secondary school students  
**Hubs:** Murang'a High School Hub, Ihura Secondary Hub  
**Duration:** 12-week intensive Sunday rhythm  

## Executive Summary
This paper documents validated measurement outcomes of the GKF Sunday Session intervention. Students showed marked improvements in academic discipline, reduction in domestic helplessness, and formulated concrete 3-year post-secondary action plans.
    `,
  },
  {
    id: 'paper-safeguarding-minor-protection',
    title: 'GKF Minor Safeguarding Protocol & In-School Data Protection Standards',
    category: 'Safeguarding',
    authors: 'GKF Safeguarding & Legal Compliance Council',
    publishDate: 'November 2025',
    version: '3.0',
    pages: 14,
    downloads: 640,
    summary: 'Operational safeguarding protocols, anonymous student code generation (GKF-MRG-XXX), mandatory background checks, and escalation protocols for child protection.',
    keyFindings: [
      'Mandatory safeguarding certification required annually for all mentors.',
      'Data anonymization protocol: zero PII (personally identifiable information) stored in cloud without encryption.',
      'Hour 4 mandatory safeguarding check-in protocol with 24-hour counselor escalation SLA.',
      'Strict MOU with school boards defining safe physical and psychological boundaries.',
    ],
    fullTextMarkdown: `
# GKF Minor Safeguarding Protocol & In-School Data Protection Standards
**Standard:** ISO/IEC 27701 Aligned Child Safeguarding Standard  

## Protocols
1. **Anonymous Identifiers:** All minor records are assigned non-reconstructable codes.
2. **Four-Eye Principle:** 1-on-1 mentoring occurs in open visual spaces within partner school grounds.
3. **Escalation Hierarchy:** Flagged sessions immediately notify the hub counselor and foundation child welfare officer.
    `,
  },
  {
    id: 'paper-fiduciary-endowment-charter',
    title: 'Higher Education Endowment Fund: Fiduciary Charter & Governance Framework',
    category: 'Fiduciary',
    authors: 'GKF Board of Trustees & Fiduciary Oversight Committee',
    publishDate: 'January 2026',
    version: '1.2',
    pages: 20,
    downloads: 512,
    summary: 'Governance framework regulating the capital pool, institutional CSR contributions, investment policies, and merit-based disbursement criteria for tertiary education.',
    keyFindings: [
      'Full separation between foundation operating expenditures and the perpetual endowment capital pool.',
      'Quarterly public transparency disclosures detailing sponsorship allocations and university disbursements.',
      'Merit & need-based scholarship formula prioritizing high-performing marginalized mentees graduating from Sunday hubs.',
      'Partnership with national universities (JKUAT, DeKUT, KU) and technical vocational institutions.',
    ],
    fullTextMarkdown: `
# Higher Education Endowment Fund: Fiduciary Charter
**Fund Governance:** Perpetual Capital Pool for Marginalized Youth Tertiary Education  

## Investment & Disbursement Philosophy
The fund guarantees secondary school graduates barrier-free access to universities and vocational institutions through transparently audited escrow disbursements.
    `,
  },
];
