export interface GKFPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: 'BookOpen' | 'Compass' | 'Sparkles' | 'Lightbulb' | 'Heart' | 'Shield' | 'Scale';
  color: string;
  bgLight: string;
}

export const GKF_PILLARS: GKFPillar[] = [
  {
    id: 'knowledge',
    number: '01',
    title: 'Knowledge',
    tagline: 'Pursuit, preservation, and democratization of learning.',
    description:
      'We believe access to quality learning is an unconditional right. Through rigorous curricula, digital literacy, and community study centers, we democratize foundational and vocational education for all rural youth.',
    iconName: 'BookOpen',
    color: '#EF9332',
    bgLight: '#FFF6ED',
  },
  {
    id: 'wisdom',
    number: '02',
    title: 'Wisdom',
    tagline: 'Ethical reasoning and sound judgment.',
    description:
      'Knowledge without moral clarity is incomplete. We integrate Frankl’s logotherapy, philosophy, and reflective discourse to guide youth in making prudent, compassionate decisions in life and leadership.',
    iconName: 'Compass',
    color: '#114C5A',
    bgLight: '#EBF2EE',
  },
  {
    id: 'discovery',
    number: '03',
    title: 'Discovery',
    tagline: 'Continuous pursuit of truth through observation and research.',
    description:
      'Truth is uncovered through open inquiry, scientific curiosity, and field-based observation. We teach students to question dogma, test hypotheses, and discover solutions grounded in observable facts.',
    iconName: 'Sparkles',
    color: '#FFC801',
    bgLight: '#FEF9E7',
  },
  {
    id: 'innovation',
    number: '04',
    title: 'Innovation',
    tagline: 'Translating ideas into practical, life-changing solutions.',
    description:
      'Ideas matter when they alleviate real-world hardship. From solar drip irrigation and agricultural value-addition to community technology hubs, we bridge theory and tangible enterprise.',
    iconName: 'Lightbulb',
    color: '#EF9332',
    bgLight: '#FFF6ED',
  },
  {
    id: 'humanity',
    number: '05',
    title: 'Humanity',
    tagline: 'Applying resources directly to human well-being.',
    description:
      'Every shilling, volunteer hour, and institutional partnership is directed squarely at elevating the dignity, psychological health, and economic independence of vulnerable youth and families.',
    iconName: 'Heart',
    color: '#E05A47',
    bgLight: '#FDF2F0',
  },
  {
    id: 'stewardship',
    number: '06',
    title: 'Stewardship',
    tagline: 'Preserving culture, environment, and institutions across generations.',
    description:
      'We are custodians of the soil, the indigenous community heritage, and the educational ecosystems we build. We plan not in quarters, but across decades to protect generational continuity.',
    iconName: 'Shield',
    color: '#1B5E20',
    bgLight: '#E8F5E9',
  },
  {
    id: 'integrity',
    number: '07',
    title: 'Integrity',
    tagline: 'Uncompromising commitment to transparency and moral conduct.',
    description:
      'Total institutional honesty in our monitoring, fiscal governance, and community relationships. We publish validated outcome data and operate with unwavering moral rectitude.',
    iconName: 'Scale',
    color: '#172B36',
    bgLight: '#EEF2F6',
  },
];
