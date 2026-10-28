export type UserRole = 'super_admin' | 'school_counselor' | 'hub_coordinator' | 'mentor' | 'donor';

export interface Hub {
  id: string;
  school_name: string;
  location: string;
  county: string;
  mou_signed_date: string;
  active_status: boolean;
  coordinator_name: string;
  student_count: number;
  mentor_count: number;
}

export interface Student {
  id: string;
  hub_id: string;
  student_code: string; // Anonymous identifier to protect minor data
  age: number;
  grade_level: string;
  counselor_referred: boolean;
  sector_focus: 'Agriculture' | 'Education' | 'Entrepreneurship';
  guardian_consent: boolean;
  baseline_self_efficacy: number;
  endline_self_efficacy: number;
  baseline_resilience: number;
  endline_resilience: number;
  baseline_goal_clarity: number;
  endline_goal_clarity: number;
  status: 'active' | 'graduated' | 'alumni';
  created_at: string;
}

export interface Mentor {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  profession: string;
  background_check_passed: boolean;
  safeguarding_cert_date: string;
  assigned_hub_id: string;
  assigned_students_count: number;
  active: boolean;
}

export interface SundaySessionLog {
  id: string;
  hub_id: string;
  session_date: string;
  student_id: string;
  student_code: string;
  mentor_id: string;
  mentor_name: string;
  hour1_empowerment_attended: boolean;
  hour2_self_authoring_completed: boolean;
  hour3_skills_completed: boolean;
  hour4_1on1_notes: string;
  safeguarding_flag: boolean;
  safeguarding_severity?: 'low' | 'medium' | 'critical';
  safeguarding_notes?: string;
  synced_to_cloud: boolean;
  created_at: string;
}

export interface MEAssessment {
  id: string;
  student_id: string;
  student_code: string;
  hub_id: string;
  hub_name: string;
  assessment_type: 'baseline' | 'endline' | 'quarterly';
  self_efficacy_score: number;
  resilience_score: number;
  goal_clarity_score: number;
  assessed_at: string;
}

export interface EndowmentAllocation {
  id: string;
  student_id: string;
  student_code: string;
  institution_name: string;
  degree_program: string;
  sponsorship_amount: number;
  disbursement_status: 'pending' | 'approved' | 'disbursed';
  grant_type: 'University Tuition' | 'Vocational Grant' | 'Living Stipend' | 'Agribusiness Venture Grant';
  approved_by: string;
  created_at: string;
}

export interface ExperientialEvent {
  id: string;
  title: string;
  type: 'retreat' | 'field_trip' | 'campus_tour' | 'networking_mixer';
  date: string;
  location: string;
  hub_participants: string[];
  registered_count: number;
  capacity: number;
  consent_collected: number;
  partner_sponsors: string[];
  description: string;
  emergency_lead: string;
  status: 'upcoming' | 'completed' | 'in_progress';
}

// Initial Mock Data Sets
export const INITIAL_HUBS: Hub[] = [
  {
    id: 'hub-01',
    school_name: 'Murang\'a High School Hub',
    location: 'Murang\'a Town',
    county: 'Murang\'a County',
    mou_signed_date: '2025-01-15',
    active_status: true,
    coordinator_name: 'David Mwangi',
    student_count: 85,
    mentor_count: 14,
  },
  {
    id: 'hub-02',
    school_name: 'Ihura Secondary Hub',
    location: 'Ihura Sub-County',
    county: 'Murang\'a County',
    mou_signed_date: '2025-01-20',
    active_status: true,
    coordinator_name: 'Faith Njeri',
    student_count: 78,
    mentor_count: 12,
  },
  {
    id: 'hub-03',
    school_name: 'Kigumo Youth Empowerment Hub',
    location: 'Kigumo Center',
    county: 'Murang\'a County',
    mou_signed_date: '2025-06-10',
    active_status: true,
    coordinator_name: 'James Kamau',
    student_count: 112,
    mentor_count: 18,
  },
  {
    id: 'hub-04',
    school_name: 'Kangema Girls Secondary Hub',
    location: 'Kangema Hills',
    county: 'Murang\'a County',
    mou_signed_date: '2025-07-04',
    active_status: true,
    coordinator_name: 'Beatrice Wanjiku',
    student_count: 96,
    mentor_count: 15,
  },
  {
    id: 'hub-05',
    school_name: 'Maragua Community Academic Hub',
    location: 'Maragua Ridge',
    county: 'Murang\'a County',
    mou_signed_date: '2025-09-12',
    active_status: true,
    coordinator_name: 'Peter Njoroge',
    student_count: 84,
    mentor_count: 13,
  },
  {
    id: 'hub-06',
    school_name: 'Gatanga Technical Secondary Hub',
    location: 'Gatanga South',
    county: 'Murang\'a County',
    mou_signed_date: '2025-10-01',
    active_status: true,
    coordinator_name: 'Esther Muthoni',
    student_count: 70,
    mentor_count: 11,
  },
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'men-01',
    user_id: 'usr-m1',
    full_name: 'Dr. Samuel Kariuki',
    email: 'samuel.kariuki@gkf-network.org',
    phone: '+254 712 345 678',
    profession: 'Clinical Psychologist & CBT Practitioner',
    background_check_passed: true,
    safeguarding_cert_date: '2025-01-10',
    assigned_hub_id: 'hub-01',
    assigned_students_count: 6,
    active: true,
  },
  {
    id: 'men-02',
    user_id: 'usr-m2',
    full_name: 'Ann Wachira, CPA',
    email: 'ann.wachira@gkf-network.org',
    phone: '+254 722 890 123',
    profession: 'Financial Literacy & Micro-Enterprise Lead',
    background_check_passed: true,
    safeguarding_cert_date: '2025-01-12',
    assigned_hub_id: 'hub-01',
    assigned_students_count: 7,
    active: true,
  },
  {
    id: 'men-03',
    user_id: 'usr-m3',
    full_name: 'Eng. George Kibet',
    email: 'george.kibet@gkf-network.org',
    phone: '+254 733 456 789',
    profession: 'Agricultural Engineer & Value Chain Consultant',
    background_check_passed: true,
    safeguarding_cert_date: '2025-02-05',
    assigned_hub_id: 'hub-02',
    assigned_students_count: 5,
    active: true,
  },
  {
    id: 'men-04',
    user_id: 'usr-m4',
    full_name: 'Mercy Achieng',
    email: 'mercy.achieng@gkf-network.org',
    phone: '+254 740 678 901',
    profession: 'Adolescent Counselor & Social Worker',
    background_check_passed: true,
    safeguarding_cert_date: '2025-02-18',
    assigned_hub_id: 'hub-03',
    assigned_students_count: 6,
    active: true,
  },
  {
    id: 'men-05',
    user_id: 'usr-m5',
    full_name: 'Vincent Omondi',
    email: 'vincent.o@gkf-network.org',
    phone: '+254 755 234 567',
    profession: 'Software Developer & Tech Mentor',
    background_check_passed: true,
    safeguarding_cert_date: '2025-03-01',
    assigned_hub_id: 'hub-04',
    assigned_students_count: 5,
    active: true,
  },
  {
    id: 'men-06',
    user_id: 'usr-m6',
    full_name: 'Tabitha Nyambura',
    email: 'tabitha.n@gkf-network.org',
    phone: '+254 766 890 345',
    profession: 'Agronomist & Horticulture Specialist',
    background_check_passed: false, // In vetting review
    safeguarding_cert_date: '2025-09-15',
    assigned_hub_id: 'hub-02',
    assigned_students_count: 0,
    active: false,
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-01',
    hub_id: 'hub-01',
    student_code: 'GKF-MRG-001',
    age: 16,
    grade_level: 'Form 3',
    counselor_referred: true,
    sector_focus: 'Agriculture',
    guardian_consent: true,
    baseline_self_efficacy: 56,
    endline_self_efficacy: 82,
    baseline_resilience: 52,
    endline_resilience: 80,
    baseline_goal_clarity: 48,
    endline_goal_clarity: 88,
    status: 'active',
    created_at: '2025-02-01',
  },
  {
    id: 'stu-02',
    hub_id: 'hub-01',
    student_code: 'GKF-MRG-002',
    age: 17,
    grade_level: 'Form 4',
    counselor_referred: false,
    sector_focus: 'Education',
    guardian_consent: true,
    baseline_self_efficacy: 60,
    endline_self_efficacy: 84,
    baseline_resilience: 55,
    endline_resilience: 81,
    baseline_goal_clarity: 52,
    endline_goal_clarity: 89,
    status: 'active',
    created_at: '2025-02-01',
  },
  {
    id: 'stu-03',
    hub_id: 'hub-01',
    student_code: 'GKF-MRG-003',
    age: 15,
    grade_level: 'Form 2',
    counselor_referred: true,
    sector_focus: 'Entrepreneurship',
    guardian_consent: true,
    baseline_self_efficacy: 49,
    endline_self_efficacy: 78,
    baseline_resilience: 46,
    endline_resilience: 75,
    baseline_goal_clarity: 41,
    endline_goal_clarity: 82,
    status: 'active',
    created_at: '2025-02-05',
  },
  {
    id: 'stu-04',
    hub_id: 'hub-02',
    student_code: 'GKF-MRG-014',
    age: 16,
    grade_level: 'Form 3',
    counselor_referred: false,
    sector_focus: 'Agriculture',
    guardian_consent: true,
    baseline_self_efficacy: 58,
    endline_self_efficacy: 83,
    baseline_resilience: 53,
    endline_resilience: 78,
    baseline_goal_clarity: 50,
    endline_goal_clarity: 87,
    status: 'active',
    created_at: '2025-02-10',
  },
  {
    id: 'stu-05',
    hub_id: 'hub-02',
    student_code: 'GKF-MRG-015',
    age: 17,
    grade_level: 'Form 4',
    counselor_referred: true,
    sector_focus: 'Education',
    guardian_consent: true,
    baseline_self_efficacy: 54,
    endline_self_efficacy: 79,
    baseline_resilience: 51,
    endline_resilience: 77,
    baseline_goal_clarity: 45,
    endline_goal_clarity: 85,
    status: 'active',
    created_at: '2025-02-12',
  },
  {
    id: 'stu-06',
    hub_id: 'hub-03',
    student_code: 'GKF-MRG-028',
    age: 16,
    grade_level: 'Form 3',
    counselor_referred: false,
    sector_focus: 'Entrepreneurship',
    guardian_consent: true,
    baseline_self_efficacy: 61,
    endline_self_efficacy: 85,
    baseline_resilience: 57,
    endline_resilience: 83,
    baseline_goal_clarity: 53,
    endline_goal_clarity: 90,
    status: 'active',
    created_at: '2025-03-01',
  },
  {
    id: 'stu-07',
    hub_id: 'hub-04',
    student_code: 'GKF-MRG-039',
    age: 18,
    grade_level: 'Form 4',
    counselor_referred: false,
    sector_focus: 'Education',
    guardian_consent: true,
    baseline_self_efficacy: 63,
    endline_self_efficacy: 86,
    baseline_resilience: 59,
    endline_resilience: 82,
    baseline_goal_clarity: 56,
    endline_goal_clarity: 92,
    status: 'active',
    created_at: '2025-03-10',
  },
  {
    id: 'stu-08',
    hub_id: 'hub-04',
    student_code: 'GKF-MRG-040',
    age: 15,
    grade_level: 'Form 2',
    counselor_referred: true,
    sector_focus: 'Agriculture',
    guardian_consent: true,
    baseline_self_efficacy: 52,
    endline_self_efficacy: 77,
    baseline_resilience: 48,
    endline_resilience: 74,
    baseline_goal_clarity: 44,
    endline_goal_clarity: 81,
    status: 'active',
    created_at: '2025-03-15',
  },
];

export const INITIAL_SUNDAY_LOGS: SundaySessionLog[] = [
  {
    id: 'log-01',
    hub_id: 'hub-01',
    session_date: '2026-10-25',
    student_id: 'stu-01',
    student_code: 'GKF-MRG-001',
    mentor_id: 'men-01',
    mentor_name: 'Dr. Samuel Kariuki',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: true,
    hour4_1on1_notes: 'Reviewed logotherapy goals. Student committed to daily study blocks. Discussed domestic stress mitigation through cognitive reframing.',
    safeguarding_flag: false,
    synced_to_cloud: true,
    created_at: '2026-10-25T14:30:00Z',
  },
  {
    id: 'log-02',
    hub_id: 'hub-01',
    session_date: '2026-10-25',
    student_id: 'stu-02',
    student_code: 'GKF-MRG-002',
    mentor_id: 'men-02',
    mentor_name: 'Ann Wachira, CPA',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: true,
    hour4_1on1_notes: 'Explored university applications for agribusiness management. Strong motivation in farm finance module.',
    safeguarding_flag: false,
    synced_to_cloud: true,
    created_at: '2026-10-25T14:40:00Z',
  },
  {
    id: 'log-03',
    hub_id: 'hub-01',
    session_date: '2026-10-25',
    student_id: 'stu-03',
    student_code: 'GKF-MRG-003',
    mentor_id: 'men-01',
    mentor_name: 'Dr. Samuel Kariuki',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: false,
    hour4_1on1_notes: 'Student displayed signs of severe domestic stress and chronic anxiety due to male relative alcohol relapse at home. Needs counselor follow-up.',
    safeguarding_flag: true,
    safeguarding_severity: 'medium',
    safeguarding_notes: 'Referred to school counselor Sister Jane for domestic welfare check. Student provided with safe contact protocol.',
    synced_to_cloud: true,
    created_at: '2026-10-25T15:00:00Z',
  },
  {
    id: 'log-04',
    hub_id: 'hub-02',
    session_date: '2026-10-25',
    student_id: 'stu-04',
    student_code: 'GKF-MRG-014',
    mentor_id: 'men-03',
    mentor_name: 'Eng. George Kibet',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: true,
    hour4_1on1_notes: 'Completed Value Chain Module on avocado grafting and post-harvest cold storage. High engagement.',
    safeguarding_flag: false,
    synced_to_cloud: true,
    created_at: '2026-10-25T15:15:00Z',
  },
  {
    id: 'log-05',
    hub_id: 'hub-02',
    session_date: '2026-10-25',
    student_id: 'stu-05',
    student_code: 'GKF-MRG-015',
    mentor_id: 'men-03',
    mentor_name: 'Eng. George Kibet',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: true,
    hour4_1on1_notes: 'Set 6-month goal to apply for GKF Tertiary Endowment scholarship for Agricultural Engineering degree.',
    safeguarding_flag: false,
    synced_to_cloud: true,
    created_at: '2026-10-25T15:20:00Z',
  },
];

export const INITIAL_ENDOWMENT_ALLOCATIONS: EndowmentAllocation[] = [
  {
    id: 'endow-01',
    student_id: 'stu-02',
    student_code: 'GKF-MRG-002',
    institution_name: 'Jomo Kenyatta University of Agriculture & Tech (JKUAT)',
    degree_program: 'B.Sc. Agribusiness Management & Enterprise',
    sponsorship_amount: 180000,
    disbursement_status: 'disbursed',
    grant_type: 'University Tuition',
    approved_by: 'Board of Trustees - Fiduciary Audit Committee',
    created_at: '2025-08-15',
  },
  {
    id: 'endow-02',
    student_id: 'stu-07',
    student_code: 'GKF-MRG-039',
    institution_name: 'Dedan Kimathi University of Technology (DeKUT)',
    degree_program: 'B.Sc. Mechanical Engineering & Mechatronics',
    sponsorship_amount: 220000,
    disbursement_status: 'approved',
    grant_type: 'University Tuition',
    approved_by: 'Board of Trustees - Fiduciary Audit Committee',
    created_at: '2025-09-02',
  },
  {
    id: 'endow-03',
    student_id: 'stu-06',
    student_code: 'GKF-MRG-028',
    institution_name: 'Murang\'a University of Technology',
    degree_program: 'Diploma in Horticulture & Post-Harvest Processing',
    sponsorship_amount: 95000,
    disbursement_status: 'disbursed',
    grant_type: 'Vocational Grant',
    approved_by: 'Murang\'a County CSR Allocation Board',
    created_at: '2025-09-20',
  },
  {
    id: 'endow-04',
    student_id: 'stu-01',
    student_code: 'GKF-MRG-001',
    institution_name: 'Kenyatta University',
    degree_program: 'B.Ed. Science & Agricultural Education',
    sponsorship_amount: 150000,
    disbursement_status: 'pending',
    grant_type: 'University Tuition',
    approved_by: 'Pending Final Verification',
    created_at: '2026-02-14',
  },
  {
    id: 'endow-05',
    student_id: 'stu-04',
    student_code: 'GKF-MRG-014',
    institution_name: 'Kirinyaga University Technical Institute',
    degree_program: 'Smart Irrigation & Water Management Certification',
    sponsorship_amount: 60000,
    disbursement_status: 'approved',
    grant_type: 'Living Stipend',
    approved_by: 'Endowment Governance Committee',
    created_at: '2026-03-01',
  },
];

export const INITIAL_EVENTS: ExperientialEvent[] = [
  {
    id: 'evt-01',
    title: 'Quarterly Aberdares Leadership & Resilience Retreat',
    type: 'retreat',
    date: '2026-11-14',
    location: 'Aberdare Outdoor Leadership Center, Nyeri',
    hub_participants: ['Murang\'a High Hub', 'Ihura Secondary Hub'],
    registered_count: 65,
    capacity: 75,
    consent_collected: 63,
    partner_sponsors: ['Kenya Commercial Bank CSR', 'Equity Leaders Program'],
    description: 'Outdoor leadership, team building, logotherapy campfire reflections, and conflict resolution workshops across pilot hubs.',
    emergency_lead: 'Dr. Samuel Kariuki (+254 712 345 678)',
    status: 'upcoming',
  },
  {
    id: 'evt-02',
    title: 'AgriTech & Manufacturing Innovation Field Tour',
    type: 'field_trip',
    date: '2026-11-28',
    location: 'Kakuzi Agribusiness Complex & Del Monte Processing Plant',
    hub_participants: ['Kigumo Youth Hub', 'Kangema Girls Hub'],
    registered_count: 58,
    capacity: 60,
    consent_collected: 56,
    partner_sponsors: ['Kakuzi PLC CSR', 'Murang\'a County Youth Directorate'],
    description: 'Live field tour analyzing avocado, macadamia, and fruit processing value chains, modern packaging, and agronomy careers.',
    emergency_lead: 'Eng. George Kibet (+254 733 456 789)',
    status: 'upcoming',
  },
  {
    id: 'evt-03',
    title: 'JKUAT & DeKUT University Campus Immersion Expedition',
    type: 'campus_tour',
    date: '2026-12-05',
    location: 'Juja Main Campus & Nyeri Science Park',
    hub_participants: ['All 6 Partner School Hubs'],
    registered_count: 120,
    capacity: 140,
    consent_collected: 115,
    partner_sponsors: ['GKF Higher Education Endowment Fund', 'Alumni Association'],
    description: 'Direct exposure to university admission requirements, engineering labs, computer science hubs, and meeting undergraduate mentors.',
    emergency_lead: 'David Mwangi (+254 720 112 233)',
    status: 'upcoming',
  },
  {
    id: 'evt-04',
    title: 'Annual GKF Corporate Networking & Mentorship Mixer',
    type: 'networking_mixer',
    date: '2026-12-18',
    location: 'Safari Park Hotel & Conference Center, Nairobi',
    hub_participants: ['Graduating Form 4 Cohorts & Alumni'],
    registered_count: 180,
    capacity: 200,
    consent_collected: 180,
    partner_sponsors: ['Safaricom Foundation', 'NCBA Group', 'Standard Chartered'],
    description: 'Connecting secondary school graduates with corporate sponsors, vocational grant allocators, and executive mentors.',
    emergency_lead: 'Geoffrey Karema (+254 700 000 001)',
    status: 'upcoming',
  },
];

// Validated M&E Scale Benchmark Data (Strictly matches Section 5 of document)
export const ME_SCALE_BENCHMARKS = [
  {
    metric: 'General Self-Efficacy',
    instrument: 'General Self-Efficacy Scale (Schwarzer & Jerusalem)',
    baseline: 58,
    endline: 81,
    growth: 23,
    target: 80,
    color: '#FF9932', // gkf-saffron
    description: 'Measures optimistic self-belief in coping with daily adversity, domestic stress, and persistent life goals.',
  },
  {
    metric: 'Brief Resilience Score',
    instrument: 'Brief Resilience Scale (BRS - Smith et al.)',
    baseline: 54,
    endline: 79,
    growth: 25,
    target: 75,
    color: '#114C5A', // gkf-nocturnal
    description: 'Assesses the psychological ability to bounce back from trauma, academic obstacles, and economic pressure.',
  },
  {
    metric: 'Goal Clarity Index',
    instrument: 'Goal Clarity & Logotherapy Alignment Scale (Frankl Model)',
    baseline: 49,
    endline: 86,
    growth: 37,
    target: 85,
    color: '#FFC801', // gkf-forsythia
    description: 'Evaluates the structured clarity of career roadmaps, academic priorities, and agricultural enterprise milestones.',
  },
];

// Historical Cohort Trends for Recharts
export const COHORT_M_AND_E_TRENDS = [
  { quarter: 'Q1 (Baseline)', selfEfficacy: 58, resilience: 54, goalClarity: 49, attendance: 78 },
  { quarter: 'Q2 (Midline 1)', selfEfficacy: 65, resilience: 62, goalClarity: 61, attendance: 85 },
  { quarter: 'Q3 (Midline 2)', selfEfficacy: 73, resilience: 71, goalClarity: 74, attendance: 91 },
  { quarter: 'Q4 (Endline)', selfEfficacy: 81, resilience: 79, goalClarity: 86, attendance: 94 },
];

export const SECTOR_DISTRIBUTION = [
  { name: 'Agricultural Enterprise & Value Chains', value: 45, students: 540, color: '#114C5A' },
  { name: 'Youth in Higher Education & STEM', value: 35, students: 420, color: '#FF9932' },
  { name: 'Micro-Enterprise & Vocational Skills', value: 20, students: 240, color: '#FFC801' },
];
