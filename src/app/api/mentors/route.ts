import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hubId = searchParams.get('hubId');

    let sql = 'SELECT m.*, h.school_name as hub_name FROM mentors m LEFT JOIN hubs h ON m.assigned_hub_id = h.id';
    const params: any[] = [];

    if (hubId && hubId !== 'all') {
      sql += ' WHERE m.assigned_hub_id = $1';
      params.push(hubId);
    }

    sql += ' ORDER BY m.full_name ASC;';

    const res = await query(sql, params);
    return NextResponse.json({
      success: true,
      mentors: res.rows,
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
    const m = await req.json();
    const id = m.id || `men-${Date.now().toString(36)}`;
    const res = await query(
      `
      INSERT INTO mentors (
        id, full_name, email, phone, profession,
        background_check_passed, safeguarding_cert_date, assigned_hub_id,
        assigned_students_count, active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
      `,
      [
        id,
        m.full_name,
        m.email || null,
        m.phone || null,
        m.profession || 'Professional Mentor',
        Boolean(m.background_check_passed),
        m.safeguarding_cert_date || new Date().toISOString().split('T')[0],
        m.assigned_hub_id || null,
        m.assigned_students_count || 0,
        m.active !== false,
      ]
    );

    return NextResponse.json({
      success: true,
      mentor: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
