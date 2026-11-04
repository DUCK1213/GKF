/**
 * GKF — Seed Kangema Constituency Schools
 * Adds all secondary schools in Kangema, Murang'a County
 * Run: node scripts/seed-kangema-schools.mjs
 */
import { Client } from 'pg';

const connectionString =
  process.env.DATABASE_SESSION_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.xkpdtpfpycnafcbmjxjf:xQkjZDcN7L%235e%232@aws-1-eu-west-3.pooler.supabase.com:5432/postgres';

// First add sub_county column if it doesn't exist
const ALTER_TABLE = `
  ALTER TABLE hubs ADD COLUMN IF NOT EXISTS sub_county TEXT;
  ALTER TABLE hubs ADD COLUMN IF NOT EXISTS school_category TEXT DEFAULT 'Sub-County';
  ALTER TABLE hubs ADD COLUMN IF NOT EXISTS constituency TEXT DEFAULT 'Kangema';
  ALTER TABLE hubs ALTER COLUMN mou_signed_date DROP NOT NULL;
`;

const KANGEMA_SCHOOLS = [
  // ── Already seeded but cleaned up ──
  {
    id: 'hub-04',
    school_name: "Kangema Girls' Secondary School",
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'County',
    mou_signed_date: '2025-07-04',
    active_status: true,
    coordinator_name: 'Beatrice Wanjiku',
    student_count: 96,
    mentor_count: 15,
  },
  // ── Prominent extra-county / county schools ──
  {
    id: 'sch-k01',
    school_name: 'Kangema High School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Extra-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k02',
    school_name: "Kibutha Girls' Secondary School",
    location: 'Kibutha, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k03',
    school_name: 'Nyagatugu Boys Secondary School',
    location: 'Nyagatugu, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k04',
    school_name: "Kiangunyi Girls' Secondary School",
    location: 'Kiangunyi, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k05',
    school_name: "Murang'a High School",
    location: "Kanyenyaini, Murang'a",
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'National',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  // ── Sub-county & day schools ──
  {
    id: 'sch-k06',
    school_name: 'Iyego Secondary School',
    location: 'Iyego, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k07',
    school_name: 'Gacharaigu Secondary School',
    location: 'Gacharaigu, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k08',
    school_name: 'Kiairathe Secondary School',
    location: 'Kiairathe, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k09',
    school_name: 'Nyakahura Secondary School',
    location: 'Nyakahura, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k10',
    school_name: 'Ihiga Secondary School',
    location: 'Ihiga, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k11',
    school_name: 'Muguru Secondary School',
    location: 'Muguru, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k12',
    school_name: 'Watuha Secondary School',
    location: 'Watuha, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k13',
    school_name: 'Gitugu Secondary School',
    location: 'Gitugu, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k14',
    school_name: 'Kaganda Secondary School',
    location: 'Kaganda, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k15',
    school_name: 'Kanorero Secondary School',
    location: 'Kanorero, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k16',
    school_name: 'Kiawambogo Secondary School',
    location: 'Kiawambogo, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k17',
    school_name: 'Kihoya Secondary School',
    location: 'Kihoya, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k18',
    school_name: 'Gatunduini Secondary School',
    location: 'Gatunduini, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
  {
    id: 'sch-k19',
    school_name: 'Kiruri Boys Secondary School',
    location: 'Kiruri, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Sub-County',
    mou_signed_date: null,
    active_status: true,
    coordinator_name: null,
    student_count: 0,
    mentor_count: 0,
  },
];

async function seedKangemaSchools() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('✓ Connected to Supabase');

  // 1. Add new columns
  await client.query(ALTER_TABLE);
  console.log('✓ Schema updated — sub_county, school_category, constituency columns added');

  // 2. Upsert all schools
  let added = 0;
  for (const school of KANGEMA_SCHOOLS) {
    await client.query(
      `INSERT INTO hubs (
         id, school_name, location, county, sub_county, constituency, school_category,
         mou_signed_date, active_status, coordinator_name, student_count, mentor_count
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET
         school_name = EXCLUDED.school_name,
         location = EXCLUDED.location,
         sub_county = EXCLUDED.sub_county,
         constituency = EXCLUDED.constituency,
         school_category = EXCLUDED.school_category;`,
      [
        school.id,
        school.school_name,
        school.location,
        school.county,
        school.sub_county,
        school.constituency,
        school.school_category,
        school.mou_signed_date,
        school.active_status,
        school.coordinator_name,
        school.student_count,
        school.mentor_count,
      ]
    );
    added++;
    console.log(`  → ${school.school_name}`);
  }

  console.log(`\n✓ Done — ${added} Kangema schools seeded`);
  await client.end();
}

seedKangemaSchools().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
