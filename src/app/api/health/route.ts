import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db';

export async function GET() {
  const health = await checkDatabaseHealth();
  if (health.connected) {
    return NextResponse.json({
      status: 'ok',
      database: 'PostgreSQL (Supabase)',
      connection: 'connected',
      latency: health.latency,
      metrics: health.data,
      timestamp: new Date().toISOString(),
    });
  } else {
    return NextResponse.json(
      {
        status: 'error',
        database: 'PostgreSQL (Supabase)',
        connection: 'disconnected',
        error: health.error,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
