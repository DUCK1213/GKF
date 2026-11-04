import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const withMentorsOnly = searchParams.get('mentorsOnly') === 'true';
    const constituency = searchParams.get('constituency');

    let sql = `
      SELECT
        h.*,
        COALESCE((SELECT count(*) FROM students s WHERE s.hub_id = h.id), 0)::int as live_student_count,
        COALESCE((SELECT count(*) FROM mentors m WHERE m.assigned_hub_id = h.id AND m.active = true), 0)::int as live_mentor_count
      FROM hubs h
      WHERE 1=1
    `;
    const params: any[] = [];

    if (withMentorsOnly) {
      sql += ` AND EXISTS (SELECT 1 FROM mentors m WHERE m.assigned_hub_id = h.id AND m.active = true)`;
    }

    if (constituency) {
      sql += ` AND h.constituency = $${params.length + 1}`;
      params.push(constituency);
    }

    sql += ' ORDER BY h.school_name ASC;';

    const res = await query(sql, params);
    return NextResponse.json({ success: true, hubs: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id || `sch-${Date.now().toString(36)}`;
    const res = await query(
      `INSERT INTO hubs (
         id, school_name, location, county, sub_county, constituency, school_category,
         active_status, coordinator_name, student_count, mentor_count
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *;`,
      [
        id,
        body.school_name,
        body.location || body.sub_county || 'Kangema',
        body.county || "Murang'a County",
        body.sub_county || 'Kangema',
        body.constituency || 'Kangema',
        body.school_category || 'Sub-County',
        body.active_status !== false,
        body.coordinator_name || null,
        0,
        0,
      ]
    );
    return NextResponse.json({ success: true, school: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
