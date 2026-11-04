import { Client } from 'pg';

const connectionString =
  process.env.DATABASE_SESSION_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.xkpdtpfpycnafcbmjxjf:xQkjZDcN7L%235e%232@aws-1-eu-west-3.pooler.supabase.com:5432/postgres';

const INITIAL_HUBS = [
  {
    id: 'hub-01',
    school_name: "Murang'a High School Hub",
    location: "Murang'a Town",
    county: "Murang'a County",
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
    county: "Murang'a County",
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
    county: "Murang'a County",
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
    county: "Murang'a County",
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
    county: "Murang'a County",
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
    county: "Murang'a County",
    mou_signed_date: '2025-10-01',
    active_status: true,
    coordinator_name: 'Esther Muthoni',
    student_count: 70,
    mentor_count: 11,
  },
];

const INITIAL_MENTORS = [
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
    background_check_passed: false,
    safeguarding_cert_date: '2025-09-15',
    assigned_hub_id: 'hub-02',
    assigned_students_count: 0,
    active: false,
  },
];

const INITIAL_STUDENTS = [
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

const INITIAL_SUNDAY_LOGS = [
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

const INITIAL_ENDOWMENT_ALLOCATIONS = [
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
    institution_name: "Murang'a University of Technology",
    degree_program: 'Diploma in Horticulture & Post-Harvest Processing',
    sponsorship_amount: 95000,
    disbursement_status: 'disbursed',
    grant_type: 'Vocational Grant',
    approved_by: "Murang'a County CSR Allocation Board",
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

const INITIAL_EVENTS = [
  {
    id: 'evt-01',
    title: 'Quarterly Aberdares Leadership & Resilience Retreat',
    type: 'retreat',
    date: '2026-11-14',
    location: 'Aberdare Outdoor Leadership Center, Nyeri',
    hub_participants: ["Murang'a High Hub", 'Ihura Secondary Hub'],
    registered_count: 65,
  },
  {
    id: 'evt-02',
    title: 'AgriTech & Manufacturing Innovation Field Tour',
    type: 'field_trip',
    date: '2026-11-28',
    location: 'Kakuzi Agribusiness Complex & Del Monte Processing Plant',
    hub_participants: ['Kigumo Youth Hub', 'Kangema Girls Hub'],
    registered_count: 58,
  },
  {
    id: 'evt-03',
    title: 'JKUAT & DeKUT University Campus Immersion Expedition',
    type: 'campus_tour',
    date: '2026-12-05',
    location: 'Juja Main Campus & Nyeri Science Park',
    hub_participants: ['All 6 Partner School Hubs'],
    registered_count: 120,
  },
  {
    id: 'evt-04',
    title: 'Annual GKF Corporate Networking & Mentorship Mixer',
    type: 'networking_mixer',
    date: '2026-12-18',
    location: 'Safari Park Hotel & Conference Center, Nairobi',
    hub_participants: ['Graduating Form 4 Cohorts & Alumni'],
    registered_count: 180,
  },
];

async function seed() {
  console.log('Connecting to seed GKF database...');
  let cleanUrl = connectionString.replace(/\?sslmode=[^&]+/, '').replace(/&sslmode=[^&]+/, '');
  const client = new Client({
    connectionString: cleanUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // 1. Seed Hubs
    for (const h of INITIAL_HUBS) {
      await client.query(`
        INSERT INTO hubs (id, school_name, location, county, mou_signed_date, active_status, coordinator_name, student_count, mentor_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          school_name = EXCLUDED.school_name,
          location = EXCLUDED.location,
          coordinator_name = EXCLUDED.coordinator_name;
      `, [h.id, h.school_name, h.location, h.county, h.mou_signed_date, h.active_status, h.coordinator_name, h.student_count, h.mentor_count]);
    }
    console.log(`✓ Seeded ${INITIAL_HUBS.length} hubs.`);

    // 2. Seed Mentors
    for (const m of INITIAL_MENTORS) {
      await client.query(`
        INSERT INTO mentors (id, user_id, full_name, email, phone, profession, background_check_passed, safeguarding_cert_date, assigned_hub_id, assigned_students_count, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          profession = EXCLUDED.profession,
          background_check_passed = EXCLUDED.background_check_passed;
      `, [m.id, m.user_id, m.full_name, m.email, m.phone, m.profession, m.background_check_passed, m.safeguarding_cert_date, m.assigned_hub_id, m.assigned_students_count, m.active]);
    }
    console.log(`✓ Seeded ${INITIAL_MENTORS.length} mentors.`);

    // 3. Seed Students
    for (const s of INITIAL_STUDENTS) {
      await client.query(`
        INSERT INTO students (id, hub_id, student_code, age, grade_level, counselor_referred, sector_focus, guardian_consent, baseline_self_efficacy, endline_self_efficacy, baseline_resilience, endline_resilience, baseline_goal_clarity, endline_goal_clarity, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO UPDATE SET
          student_code = EXCLUDED.student_code,
          grade_level = EXCLUDED.grade_level;
      `, [s.id, s.hub_id, s.student_code, s.age, s.grade_level, s.counselor_referred, s.sector_focus, s.guardian_consent, s.baseline_self_efficacy, s.endline_self_efficacy, s.baseline_resilience, s.endline_resilience, s.baseline_goal_clarity, s.endline_goal_clarity, s.status, s.created_at]);
    }
    console.log(`✓ Seeded ${INITIAL_STUDENTS.length} students.`);

    // 4. Seed Sunday Logs
    for (const l of INITIAL_SUNDAY_LOGS) {
      await client.query(`
        INSERT INTO sunday_session_logs (id, hub_id, session_date, student_id, student_code, mentor_id, mentor_name, hour1_empowerment_attended, hour2_self_authoring_completed, hour3_skills_completed, hour4_1on1_notes, safeguarding_flag, safeguarding_severity, safeguarding_notes, synced_to_cloud, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO UPDATE SET
          hour4_1on1_notes = EXCLUDED.hour4_1on1_notes;
      `, [l.id, l.hub_id, l.session_date, l.student_id, l.student_code, l.mentor_id, l.mentor_name, l.hour1_empowerment_attended, l.hour2_self_authoring_completed, l.hour3_skills_completed, l.hour4_1on1_notes, l.safeguarding_flag, l.safeguarding_severity || null, l.safeguarding_notes || null, l.synced_to_cloud, l.created_at]);
    }
    console.log(`✓ Seeded ${INITIAL_SUNDAY_LOGS.length} sunday logs.`);

    // 5. Seed Endowment Allocations
    for (const e of INITIAL_ENDOWMENT_ALLOCATIONS) {
      await client.query(`
        INSERT INTO endowment_allocations (id, student_id, student_code, institution_name, degree_program, sponsorship_amount, disbursement_status, grant_type, approved_by, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          disbursement_status = EXCLUDED.disbursement_status;
      `, [e.id, e.student_id, e.student_code, e.institution_name, e.degree_program, e.sponsorship_amount, e.disbursement_status, e.grant_type, e.approved_by, e.created_at]);
    }
    console.log(`✓ Seeded ${INITIAL_ENDOWMENT_ALLOCATIONS.length} endowment allocations.`);

    // 6. Seed Events
    for (const ev of INITIAL_EVENTS) {
      await client.query(`
        INSERT INTO experiential_events (id, title, type, date, location, hub_participants, registered_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title;
      `, [ev.id, ev.title, ev.type, ev.date, ev.location, ev.hub_participants, ev.registered_count]);
    }
    console.log(`✓ Seeded ${INITIAL_EVENTS.length} events.`);

    console.log('🎉 Database seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
