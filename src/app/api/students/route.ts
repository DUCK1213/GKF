import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hubId = searchParams.get('hubId');

    let sql = 'SELECT * FROM students';
    const params: any[] = [];

    if (hubId && hubId !== 'all') {
      sql += ' WHERE hub_id = $1';
      params.push(hubId);
    }

    sql += ' ORDER BY student_code ASC;';

    const res = await query(sql, params);
    return NextResponse.json({
      success: true,
      students: res.rows,
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
    const s = await req.json();
    const id = s.id || `stu-${Date.now().toString(36)}`;
    const res = await query(
      `
      INSERT INTO students (
        id, hub_id, student_code, age, grade_level, counselor_referred,
        sector_focus, guardian_consent, baseline_self_efficacy, endline_self_efficacy,
        baseline_resilience, endline_resilience, baseline_goal_clarity, endline_goal_clarity, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
      `,
      [
        id,
        s.hub_id,
        s.student_code,
        s.age,
        s.grade_level,
        Boolean(s.counselor_referred),
        s.sector_focus || 'Agriculture',
        s.guardian_consent !== false,
        s.baseline_self_efficacy || 50,
        s.endline_self_efficacy || 80,
        s.baseline_resilience || 50,
        s.endline_resilience || 80,
        s.baseline_goal_clarity || 50,
        s.endline_goal_clarity || 85,
        s.status || 'active',
      ]
    );

    return NextResponse.json({
      success: true,
      student: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
