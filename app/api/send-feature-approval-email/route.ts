import { NextRequest, NextResponse } from 'next/server';
import { sendFeatureIdeaApproved } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const { email, data } = await request.json();

    if (!email || !data) {
      return NextResponse.json(
        { error: 'Email and data are required' },
        { status: 400 }
      );
    }

    await sendFeatureIdeaApproved(email, data);

    return NextResponse.json(
      { message: 'Feature idea approval email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending feature idea approval email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
