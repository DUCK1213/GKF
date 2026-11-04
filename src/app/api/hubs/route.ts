import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query(`
      SELECT 
        h.*,
        COALESCE((SELECT count(*) FROM students s WHERE s.hub_id = h.id), h.student_count) as live_student_count,
        COALESCE((SELECT count(*) FROM mentors m WHERE m.assigned_hub_id = h.id), h.mentor_count) as live_mentor_count
      FROM hubs h
      ORDER BY h.mou_signed_date ASC;
    `);

    return NextResponse.json({
      success: true,
      hubs: res.rows,
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
    const body = await req.json();
    const id = body.id || `hub-${Date.now().toString(36)}`;
    const res = await query(
      `
      INSERT INTO hubs (id, school_name, location, county, mou_signed_date, active_status, coordinator_name, student_count, mentor_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
      `,
      [
        id,
        body.school_name,
        body.location,
        body.county || "Murang'a County",
        body.mou_signed_date || new Date().toISOString().split('T')[0],
        body.active_status !== false,
        body.coordinator_name || null,
        body.student_count || 0,
        body.mentor_count || 0,
      ]
    );

    return NextResponse.json({
      success: true,
      hub: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
