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

    // Validate the payment method and transaction ID
    if (!body.paymentMethod || !body.transactionId) {
      return NextResponse.json({ error: 'Invalid payment information' }, { status: 400 });
    }

    // In a real application, you would process the payment here
    // For now, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: `Payment received for transaction ${body.transactionId} using ${body.paymentMethod}.`
    });
  } catch (error) {
    console.error('Card payment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

