import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Get the token from the Authorization header
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify the token
    const userId = await verifyToken(token);

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();

    // Validate the card type
    if (!['virtual_debit', 'premium_credit'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid card type' }, { status: 400 });
    }

    // In a real application, you would process the card application here
    // For now, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: `Application for ${body.type} card received and is being processed.`
    });
  } catch (error) {
    console.error('Card application error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

