import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        body[key] = value.toString();
      });
    } else {
      body = await req.json().catch(() => ({}));
    }

    const formType = body['form-name'] || body.form_type || 'general_message';
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Anti-spam bot field check (Netlify Honeypot)
    if (body['bot-field']) {
      return NextResponse.json({ success: true, message: 'Submission ignored.' });
    }

    const res = await query(
      `
      INSERT INTO form_submissions (
        form_type,
        name,
        email,
        profession,
        availability,
        motivation,
        org_name,
        contact_name,
        contact_email,
        partner_type,
        details,
        message,
        raw_payload,
        ip_address
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id, created_at;
      `,
      [
        formType,
        body.name || body.contactName || null,
        body.email || body.contactEmail || null,
        body.profession || null,
        body.availability || null,
        body.motivation || null,
        body.orgName || null,
        body.contactName || null,
        body.contactEmail || null,
        body.partnerType || null,
        body.details || null,
        body.message || null,
        JSON.stringify(body),
        clientIp,
      ]
    );

    return NextResponse.json({
      success: true,
      submissionId: res.rows[0].id,
      timestamp: res.rows[0].created_at,
      message: 'Form submission successfully received and recorded in database pipeline.',
    });
  } catch (error: any) {
    console.error('[Forms Pipeline Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process form submission',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const formType = searchParams.get('type');

    let sql = 'SELECT * FROM form_submissions';
    const params: any[] = [];

    if (formType) {
      sql += ' WHERE form_type = $1';
      params.push(formType);
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
    params.push(limit);

    const res = await query(sql, params);
    return NextResponse.json({
      success: true,
      count: res.rowCount,
      submissions: res.rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
