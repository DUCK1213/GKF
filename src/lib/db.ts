import { Pool, QueryResult, QueryResultRow, PoolClient } from 'pg';

// Connection strings
const connectionString =
  process.env.DATABASE_URL ||
  process.env.DATABASE_SESSION_URL ||
  process.env.DATABASE_DIRECT_URL ||
  'postgresql://postgres.xkpdtpfpycnafcbmjxjf:xQkjZDcN7L%235e%232@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?sslmode=require';

// Sanitize connection string to ensure ssl options work without libpq conflicts
const cleanUrl = connectionString.replace(/\?sslmode=[^&]+/, '').replace(/&sslmode=[^&]+/, '');

// Global pool instance across Next.js hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __gkf_db_pool__: Pool | undefined;
}

export function getPool(): Pool {
  if (!global.__gkf_db_pool__) {
    global.__gkf_db_pool__ = new Pool({
      connectionString: cleanUrl,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    global.__gkf_db_pool__.on('error', (err) => {
      console.error('[GKF Database Pool Error]:', err.message);
    });
  }
  return global.__gkf_db_pool__;
}

/**
 * Execute a parameterized query against the Supabase PostgreSQL database
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  const pool = getPool();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('[GKF DB Query]', { text: text.slice(0, 80), duration: `${duration}ms`, rows: res.rowCount });
    }
    return res;
  } catch (error: any) {
    console.error('[GKF DB Query Error]', { text, error: error.message });
    throw error;
  }
}

/**
 * Run operations within a managed database transaction
 */
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Check database connection status and metrics
 */
export async function checkDatabaseHealth() {
  const start = Date.now();
  try {
    const res = await query(`
      SELECT 
        current_database() as database,
        current_user as user,
        version() as version,
        (SELECT count(*) FROM hubs) as hubs_count,
        (SELECT count(*) FROM students) as students_count,
        (SELECT count(*) FROM mentors) as mentors_count,
        (SELECT count(*) FROM sunday_session_logs) as logs_count,
        (SELECT count(*) FROM form_submissions) as submissions_count
    `);
    const latency = Date.now() - start;
    return {
      connected: true,
      latency: `${latency}ms`,
      data: res.rows[0],
    };
  } catch (err: any) {
    return {
      connected: false,
      error: err.message,
    };
  }
}
