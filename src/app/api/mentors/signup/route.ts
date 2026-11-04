import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * Public mentor signup — no auth required.
 * Creates a pending mentor record awaiting admin vetting.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.full_name || !body.email || !body.assigned_hub_id) {
      return NextResponse.json(
        { success: false, error: 'Name, email and school are required.' },
        { status: 400 }
      );
    }

    const id = `men-${Date.now().toString(36)}`;
    const res = await query(
      `INSERT INTO mentors (
         id, full_name, email, phone, profession, assigned_hub_id,
         background_check_passed, active
       )
       VALUES ($1, $2, $3, $4, $5, $6, false, false)
       RETURNING id, full_name, email, assigned_hub_id, created_at;`,
      [id, body.full_name, body.email, body.phone || null, body.profession || null, body.assigned_hub_id]
    );

    return NextResponse.json({
      success: true,
      message: `Thank you, ${body.full_name}! Your application has been received. The GKF team will reach out within 3–5 days.`,
      mentor: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
