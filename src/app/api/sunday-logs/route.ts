import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hubId = searchParams.get('hubId');
    const flaggedOnly = searchParams.get('flagged') === 'true';

    let sql = 'SELECT * FROM sunday_session_logs WHERE 1=1';
    const params: any[] = [];

    if (hubId && hubId !== 'all') {
      sql += ' AND hub_id = $' + (params.length + 1);
      params.push(hubId);
    }

    if (flaggedOnly) {
      sql += ' AND safeguarding_flag = true';
    }

    sql += ' ORDER BY session_date DESC, created_at DESC;';

    const res = await query(sql, params);
    return NextResponse.json({
      success: true,
      logs: res.rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const l = await req.json();
    const id = l.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const res = await query(
      `
      INSERT INTO sunday_session_logs (
        id, hub_id, session_date, student_id, student_code, mentor_id, mentor_name,
        hour1_empowerment_attended, hour2_self_authoring_completed, hour3_skills_completed,
        hour4_1on1_notes, safeguarding_flag, safeguarding_severity, safeguarding_notes, synced_to_cloud
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true)
      RETURNING *;
      `,
      [
        id,
        l.hub_id,
        l.session_date || new Date().toISOString().split('T')[0],
        l.student_id,
        l.student_code,
        l.mentor_id,
        l.mentor_name,
        Boolean(l.hour1_empowerment_attended),
        Boolean(l.hour2_self_authoring_completed),
        Boolean(l.hour3_skills_completed),
        l.hour4_1on1_notes || '',
        Boolean(l.safeguarding_flag),
        l.safeguarding_severity || null,
        l.safeguarding_notes || null,
      ]
    );

    return NextResponse.json({
      success: true,
      log: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
