import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
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

    // In a real application, you would fetch this data from a database
    const accountInfo = {
      accountNumber: "12345678",
      balance: 0,
      currency: "USD",
      status: "active"
    };

    return NextResponse.json({
      success: true,
      data: accountInfo
    });
  } catch (error) {
    console.error('Account info error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

