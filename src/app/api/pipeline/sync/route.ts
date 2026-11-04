import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logs = Array.isArray(body.logs) ? body.logs : [body];

    if (logs.length === 0) {
      return NextResponse.json({
        success: true,
        syncedCount: 0,
        message: 'No records to synchronize.',
      });
    }

    const batchId = `sync-batch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const syncedResults = await withTransaction(async (client) => {
      let count = 0;

      for (const log of logs) {
        // Ensure student and hub exists or fall back to defaults
        await client.query(
          `
          INSERT INTO sunday_session_logs (
            id,
            hub_id,
            session_date,
            student_id,
            student_code,
            mentor_id,
            mentor_name,
            hour1_empowerment_attended,
            hour2_self_authoring_completed,
            hour3_skills_completed,
            hour4_1on1_notes,
            safeguarding_flag,
            safeguarding_severity,
            safeguarding_notes,
            synced_to_cloud,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true, NOW())
          ON CONFLICT (id) DO UPDATE SET
            hour1_empowerment_attended = EXCLUDED.hour1_empowerment_attended,
            hour2_self_authoring_completed = EXCLUDED.hour2_self_authoring_completed,
            hour3_skills_completed = EXCLUDED.hour3_skills_completed,
            hour4_1on1_notes = EXCLUDED.hour4_1on1_notes,
            safeguarding_flag = EXCLUDED.safeguarding_flag,
            safeguarding_severity = EXCLUDED.safeguarding_severity,
            safeguarding_notes = EXCLUDED.safeguarding_notes,
            synced_to_cloud = true;
          `,
          [
            log.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            log.hub_id || 'hub-01',
            log.session_date || new Date().toISOString().split('T')[0],
            log.student_id || null,
            log.student_code || 'GKF-MRG-UNKNOWN',
            log.mentor_id || null,
            log.mentor_name || 'Vetted Mentor',
            Boolean(log.hour1_empowerment_attended),
            Boolean(log.hour2_self_authoring_completed),
            Boolean(log.hour3_skills_completed),
            log.hour4_1on1_notes || '',
            Boolean(log.safeguarding_flag),
            log.safeguarding_severity || null,
            log.safeguarding_notes || null,
          ]
        );
        count++;
      }

      // Record sync event in audit log
      await client.query(
        `
        INSERT INTO sync_queue_logs (batch_id, record_count, status, details)
        VALUES ($1, $2, 'success', $3);
        `,
        [batchId, count, JSON.stringify({ source: 'client_offline_sync', count })]
      );

      return count;
    });

    return NextResponse.json({
      success: true,
      batchId,
      syncedCount: syncedResults,
      message: `Reconciled and synced ${syncedResults} record(s) directly to Supabase PostgreSQL.`,
    });
  } catch (error: any) {
    console.error('[Sync Pipeline Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Sync pipeline failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const res = await query('SELECT * FROM sync_queue_logs ORDER BY synced_at DESC LIMIT 20;');
    return NextResponse.json({
      success: true,
      batches: res.rows,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
