/**
 * GKF — Seed Kangema Constituency Primary Schools
 * Adds public and community primary schools across Kangema, Murang'a County
 * Run: node scripts/seed-kangema-primary-schools.mjs
 */
import { Client } from 'pg';

const connectionString =
  process.env.DATABASE_SESSION_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.xkpdtpfpycnafcbmjxjf:xQkjZDcN7L%235e%232@aws-1-eu-west-3.pooler.supabase.com:5432/postgres';

const ALTER_TABLE = `
  ALTER TABLE hubs ADD COLUMN IF NOT EXISTS school_level VARCHAR(20) DEFAULT 'Secondary';
  UPDATE hubs SET school_level = 'Secondary' WHERE school_level IS NULL;
`;

const KANGEMA_PRIMARY_SCHOOLS = [
  // ── Kangema Town & Central ──
  {
    id: 'pri-k01',
    school_name: 'Kangema Primary School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k02',
    school_name: 'Kangema Highway Primary School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k03',
    school_name: 'Kibutha Boarding Primary School',
    location: 'Kibutha, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Boarding Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k04',
    school_name: 'Kiruri Primary School',
    location: 'Kiruri, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k05',
    school_name: "St. John's Kiruri Primary School",
    location: 'Kiruri, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },

  // ── Kanyenyaini Ward ──
  {
    id: 'pri-k06',
    school_name: 'Kanyenyaini Primary School',
    location: 'Kanyenyaini, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k07',
    school_name: 'Kanyenyaini Township Primary School',
    location: 'Kanyenyaini Center',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k08',
    school_name: 'Githiga Primary School',
    location: 'Githiga, Kanyenyaini',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k09',
    school_name: 'Holy Rosary Primary School',
    location: 'Kanyenyaini, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k10',
    school_name: 'Kahiti Primary School',
    location: 'Kahiti, Kanyenyaini',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k11',
    school_name: 'Joseph Allamano Primary School',
    location: 'Kanyenyaini, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },

  // ── Rwathia Ward ──
  {
    id: 'pri-k12',
    school_name: 'Gachogi Primary School',
    location: 'Rwathia, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k13',
    school_name: 'Karurumo Primary School',
    location: 'Rwathia, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k14',
    school_name: 'Kayu Primary School',
    location: 'Kayu, Rwathia',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k15',
    school_name: 'Kenyanjeru Primary School',
    location: 'Rwathia, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k16',
    school_name: 'Kiawairegi Primary School',
    location: 'Rwathia, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },

  // ── Muguru & Other Wards ──
  {
    id: 'pri-k17',
    school_name: 'Kiangunyi Primary School',
    location: 'Kiangunyi, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k18',
    school_name: 'Nduini Primary School',
    location: 'Nduini, Kiruri',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k19',
    school_name: 'Tuthu Primary School',
    location: 'Tuthu, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k20',
    school_name: 'Watuha Primary School',
    location: 'Watuha, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k21',
    school_name: 'Thirikwa Primary School',
    location: 'Muguru, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k22',
    school_name: 'Gacharaigu Primary School',
    location: 'Gacharaigu, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k23',
    school_name: 'Gitugi Primary School',
    location: 'Gitugi, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k24',
    school_name: 'Githambo Primary School',
    location: 'Githambo, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k25',
    school_name: 'Kiairathe Primary School',
    location: 'Kiairathe, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k26',
    school_name: 'Kiawambogo Primary School',
    location: 'Kiawambogo, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k27',
    school_name: 'Kihoya Primary School',
    location: 'Kihoya, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k28',
    school_name: 'Gatara Primary School',
    location: 'Muguru, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k29',
    school_name: 'Gatunduini Primary School',
    location: 'Gatunduini, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },
  {
    id: 'pri-k30',
    school_name: "A.C.K St. Peter's Muguru Primary School",
    location: 'Muguru, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Public Primary',
    school_level: 'Primary',
  },

  // ── Academy / Junior Schools ──
  {
    id: 'pri-k31',
    school_name: 'Kanini Memorial Academy Primary School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Junior Academy',
    school_level: 'Primary',
  },
  {
    id: 'pri-k32',
    school_name: 'St. Perpetua Primary School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Junior Academy',
    school_level: 'Primary',
  },
  {
    id: 'pri-k33',
    school_name: 'Pioneer Academy Primary School',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Junior Academy',
    school_level: 'Primary',
  },
  {
    id: 'pri-k34',
    school_name: 'Diligent Academy Primary School',
    location: 'Muguru, Kangema',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Junior Academy',
    school_level: 'Primary',
  },
  {
    id: 'pri-k35',
    school_name: 'Faith Junior Academy',
    location: 'Kangema Town',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    county: "Murang'a County",
    school_category: 'Junior Academy',
    school_level: 'Primary',
  },
];

async function seedKangemaPrimarySchools() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('✓ Connected to Supabase');

  // 1. Alter table
  await client.query(ALTER_TABLE);
  console.log('✓ Schema updated — school_level column added and default updated');

  // 2. Upsert primary schools
  let added = 0;
  for (const school of KANGEMA_PRIMARY_SCHOOLS) {
    await client.query(
      `INSERT INTO hubs (
         id, school_name, location, county, sub_county, constituency, school_category, school_level,
         active_status, student_count, mentor_count
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, 0, 0)
       ON CONFLICT (id) DO UPDATE SET
         school_name = EXCLUDED.school_name,
         location = EXCLUDED.location,
         sub_county = EXCLUDED.sub_county,
         constituency = EXCLUDED.constituency,
         school_category = EXCLUDED.school_category,
         school_level = EXCLUDED.school_level;`,
      [
        school.id,
        school.school_name,
        school.location,
        school.county,
        school.sub_county,
        school.constituency,
        school.school_category,
        school.school_level,
      ]
    );
    added++;
    console.log(`  → [Primary] ${school.school_name}`);
  }

  console.log(`\n✓ Done — ${added} Kangema primary schools seeded into database`);
  await client.end();
}

seedKangemaPrimarySchools().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
