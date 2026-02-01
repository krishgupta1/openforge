import { NextRequest, NextResponse } from 'next/server';
import { sendFeatureIdeaRejected } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const { email, data } = await request.json();

    if (!email || !data) {
      return NextResponse.json(
        { error: 'Email and data are required' },
        { status: 400 }
      );
    }

    await sendFeatureIdeaRejected(email, data);

    return NextResponse.json(
      { message: 'Feature idea rejection email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending feature idea rejection email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
