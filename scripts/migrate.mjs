import { Client } from 'pg';

const connectionString =
  process.env.DATABASE_SESSION_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.xkpdtpfpycnafcbmjxjf:xQkjZDcN7L%235e%232@aws-1-eu-west-3.pooler.supabase.com:5432/postgres?sslmode=require';

async function migrate() {
  console.log('Connecting to PostgreSQL database...');
  let cleanUrl = connectionString.replace(/\?sslmode=[^&]+/, '').replace(/&sslmode=[^&]+/, '');
  const client = new Client({
    connectionString: cleanUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✓ Connected to PostgreSQL database.');

    console.log('Running GKF schema migrations...');

    // 1. Hubs
    await client.query(`
      CREATE TABLE IF NOT EXISTS hubs (
        id TEXT PRIMARY KEY,
        school_name TEXT NOT NULL,
        location TEXT NOT NULL,
        county TEXT NOT NULL,
        mou_signed_date DATE NOT NULL,
        active_status BOOLEAN DEFAULT TRUE,
        coordinator_name TEXT,
        student_count INT DEFAULT 0,
        mentor_count INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "hubs" ready.');

    // 2. Students
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        hub_id TEXT REFERENCES hubs(id) ON DELETE CASCADE,
        student_code VARCHAR(50) UNIQUE NOT NULL,
        age INT NOT NULL,
        grade_level VARCHAR(20) NOT NULL,
        counselor_referred BOOLEAN DEFAULT FALSE,
        sector_focus TEXT,
        guardian_consent BOOLEAN DEFAULT TRUE,
        baseline_self_efficacy NUMERIC(5,2),
        endline_self_efficacy NUMERIC(5,2),
        baseline_resilience NUMERIC(5,2),
        endline_resilience NUMERIC(5,2),
        baseline_goal_clarity NUMERIC(5,2),
        endline_goal_clarity NUMERIC(5,2),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "students" ready.');

    // 3. Mentors
    await client.query(`
      CREATE TABLE IF NOT EXISTS mentors (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        full_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        profession TEXT,
        background_check_passed BOOLEAN DEFAULT FALSE,
        safeguarding_cert_date DATE,
        assigned_hub_id TEXT REFERENCES hubs(id),
        assigned_students_count INT DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "mentors" ready.');

    // 4. Sunday Session Logs
    await client.query(`
      CREATE TABLE IF NOT EXISTS sunday_session_logs (
        id TEXT PRIMARY KEY,
        hub_id TEXT REFERENCES hubs(id),
        session_date DATE NOT NULL,
        student_id TEXT REFERENCES students(id),
        student_code VARCHAR(50),
        mentor_id TEXT REFERENCES mentors(id),
        mentor_name TEXT,
        hour1_empowerment_attended BOOLEAN DEFAULT FALSE,
        hour2_self_authoring_completed BOOLEAN DEFAULT FALSE,
        hour3_skills_completed BOOLEAN DEFAULT FALSE,
        hour4_1on1_notes TEXT,
        safeguarding_flag BOOLEAN DEFAULT FALSE,
        safeguarding_severity VARCHAR(20),
        safeguarding_notes TEXT,
        synced_to_cloud BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "sunday_session_logs" ready.');

    // 5. M&E Assessments
    await client.query(`
      CREATE TABLE IF NOT EXISTS me_assessments (
        id TEXT PRIMARY KEY,
        student_id TEXT REFERENCES students(id),
        student_code VARCHAR(50),
        hub_id TEXT REFERENCES hubs(id),
        hub_name TEXT,
        assessment_type VARCHAR(20) CHECK (assessment_type IN ('baseline', 'endline', 'quarterly')),
        self_efficacy_score NUMERIC(5,2),
        resilience_score NUMERIC(5,2),
        goal_clarity_score NUMERIC(5,2),
        assessed_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "me_assessments" ready.');

    // 6. Endowment Allocations
    await client.query(`
      CREATE TABLE IF NOT EXISTS endowment_allocations (
        id TEXT PRIMARY KEY,
        student_id TEXT REFERENCES students(id),
        student_code VARCHAR(50),
        institution_name TEXT NOT NULL,
        degree_program TEXT NOT NULL,
        sponsorship_amount NUMERIC(10,2) NOT NULL,
        disbursement_status VARCHAR(20) DEFAULT 'pending',
        grant_type VARCHAR(50),
        approved_by TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "endowment_allocations" ready.');

    // 7. Experiential Events
    await client.query(`
      CREATE TABLE IF NOT EXISTS experiential_events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type VARCHAR(50),
        date DATE NOT NULL,
        location TEXT NOT NULL,
        hub_participants TEXT[],
        registered_count INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "experiential_events" ready.');

    // 8. Form Submissions Pipeline
    await client.query(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        form_type VARCHAR(50) NOT NULL,
        name TEXT,
        email TEXT,
        profession TEXT,
        availability TEXT,
        motivation TEXT,
        org_name TEXT,
        contact_name TEXT,
        contact_email TEXT,
        partner_type TEXT,
        details TEXT,
        message TEXT,
        raw_payload JSONB,
        processed_status VARCHAR(20) DEFAULT 'pending',
        ip_address TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "form_submissions" ready.');

    // 9. Sync Queue Logs
    await client.query(`
      CREATE TABLE IF NOT EXISTS sync_queue_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        batch_id TEXT NOT NULL,
        record_count INT NOT NULL,
        status VARCHAR(20) DEFAULT 'success',
        details JSONB,
        synced_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✓ Table "sync_queue_logs" ready.');

    // Create Indexes for high-performance data querying
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_students_hub ON students(hub_id);
      CREATE INDEX IF NOT EXISTS idx_mentors_hub ON mentors(assigned_hub_id);
      CREATE INDEX IF NOT EXISTS idx_sunday_logs_hub ON sunday_session_logs(hub_id);
      CREATE INDEX IF NOT EXISTS idx_sunday_logs_date ON sunday_session_logs(session_date);
      CREATE INDEX IF NOT EXISTS idx_sunday_logs_flag ON sunday_session_logs(safeguarding_flag);
      CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type);
      CREATE INDEX IF NOT EXISTS idx_form_submissions_created ON form_submissions(created_at DESC);
    `);
    console.log('✓ Database performance indexes created.');

    console.log('🎉 All PostgreSQL schema migrations successfully completed!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
