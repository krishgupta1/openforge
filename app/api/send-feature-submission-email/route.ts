import { NextRequest, NextResponse } from 'next/server';
import {
  sendFeatureIdeaSubmission,
  sendFeatureIdeaApproved,
  sendFeatureIdeaRejected,
} from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const { email, type, data } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    if (type === "submission") {
      await sendFeatureIdeaSubmission(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
        category: data.category,
        difficulty: data.difficulty,
      });
    } else if (type === "approved") {
      await sendFeatureIdeaApproved(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
      });
    } else if (type === "rejected") {
      await sendFeatureIdeaRejected(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Feature idea email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending feature idea email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
