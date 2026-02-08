import { NextRequest, NextResponse } from "next/server";
import {
  sendSubmissionReceipt,
  sendContributionApproved,
  sendContributionRejected,
  sendJoinRequestSubmission,
  sendJoinRequestApproved,
  sendJoinRequestRejected,
  sendIdeaApproved,
  sendIdeaRejected,
} from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    const { email, type, data } = await req.json();

    if (!email || !type) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing email or type" 
      });
    }

    if (type === "submission") {
      await sendSubmissionReceipt(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
        contributionType: data.contributionType,
      });
    } else if (type === "approved") {
      await sendContributionApproved(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
      });
    } else if (type === "rejected") {
      await sendContributionRejected(email, {
        name: data.name,
        projectName: data.projectName,
        title: data.title,
      });
    } else if (type === "join-request-submission") {
      await sendJoinRequestSubmission(email, {
        name: data.name,
        ideaTitle: data.ideaTitle,
        techStack: data.techStack,
      });
    } else if (type === "join-request-approved") {
      await sendJoinRequestApproved(email, {
        name: data.name,
        ideaTitle: data.ideaTitle,
      });
    } else if (type === "join-request-rejected") {
      await sendJoinRequestRejected(email, {
        name: data.name,
        ideaTitle: data.ideaTitle,
      });
    } else if (type === "idea-approved") {
      await sendIdeaApproved(email, {
        name: data.name,
        ideaTitle: data.ideaTitle,
      });
    } else if (type === "idea-rejected") {
      await sendIdeaRejected(email, {
        name: data.name,
        ideaTitle: data.ideaTitle,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
