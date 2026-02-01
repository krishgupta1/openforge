import nodemailer from 'nodemailer';

// Email configuration using environment variables
const EMAIL_USER = process.env.EMAIL_USER || 'krishgupta0072@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'fclr miob ical jesk'; // Using provided app password

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Email templates
const emailTemplates = {
  submissionReceipt: (data: {
    name: string;
    projectName: string;
    title: string;
    contributionType: string;
  }) => ({
    subject: `Contribution Received: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white;">
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">OpenForge</h1>
            <p style="color: #71717a; font-size: 14px; margin: 5px 0 0 0;">Contribution Platform</p>
          </div>
          
          <div style="background: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 20px 0;">🎉 Contribution Received!</h2>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Hi ${data.name}, thank you for your contribution to <strong>${data.projectName}</strong>!
            </p>
            
            <div style="background: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">Contribution Details:</h3>
              <ul style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Title:</strong> ${data.title}</li>
                <li style="margin-bottom: 8px;"><strong>Type:</strong> ${data.contributionType}</li>
                <li style="margin-bottom: 8px;"><strong>Project:</strong> ${data.projectName}</li>
              </ul>
            </div>
            
            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
              Your contribution is now under review. We'll notify you once the admin has reviewed your submission.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px; margin: 0;">
              This email was sent because you submitted a contribution to OpenForge.
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  contributionApproved: (data: {
    name: string;
    projectName: string;
    title: string;
  }) => ({
    subject: `🎉 Contribution Approved - ${data.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contribution Approved</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #09090b;
            border: 1px solid #27272a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #10b981;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .detail {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
          }
          .detail-label {
            color: #71717a;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .detail-value {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .footer {
            background-color: #18181b;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #27272a;
          }
          .footer p {
            margin: 0;
            color: #71717a;
            font-size: 14px;
          }
          .highlight {
            color: #10b981;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .celebration {
            font-size: 48px;
            text-align: center;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="celebration">🎉</div>
            <h1>Contribution Approved!</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Great news, <span class="highlight">${data.name}</span>!</h2>
              <p>Your contribution request for <strong>${data.projectName}</strong> has been <strong class="highlight">approved</strong> by our admin team!</p>
              <p>Welcome to the team! We're excited to have you on board.</p>
            </div>
            
            <div class="section">
              <h2>Contribution Details</h2>
              <div class="detail">
                <div class="detail-label">Project</div>
                <div class="detail-value">${data.projectName}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Contribution Title</div>
                <div class="detail-value">${data.title}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span class="status-badge">Approved</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>What's Next?</h2>
              <p>You can now start working on your contribution. Make sure to coordinate with the project team and follow the project guidelines.</p>
              <p>If you need any assistance or have questions, don't hesitate to reach out to the project maintainers.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Congratulations again and happy coding!<br>The OpenForge Team</p>
            <p style="margin-top: 10px; font-size: 12px;">This email was sent because your contribution request was approved on OpenForge.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  contributionRejected: (data: {
    name: string;
    projectName: string;
    title: string;
  }) => ({
    subject: `Contribution Review Update - ${data.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contribution Review Update</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #09090b;
            border: 1px solid #27272a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #ef4444;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .detail {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
          }
          .detail-label {
            color: #71717a;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .detail-value {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .footer {
            background-color: #18181b;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #27272a;
          }
          .footer p {
            margin: 0;
            color: #71717a;
            font-size: 14px;
          }
          .highlight {
            color: #ef4444;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            background-color: #ef4444;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .info-box {
            background-color: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: #92400e;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Contribution Review Update</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Update on your contribution</h2>
              <p>Hi <span class="highlight">${data.name}</span>,</p>
              <p>Thank you for your interest in contributing to <strong>${data.projectName}</strong>. After careful review, our team has decided not to move forward with your contribution at this time.</p>
            </div>
            
            <div class="info-box">
              <p><strong>Please don't be discouraged!</strong> This doesn't reflect on your skills or potential. Sometimes contributions don't align with current project needs or priorities.</p>
            </div>
            
            <div class="section">
              <h2>Contribution Details</h2>
              <div class="detail">
                <div class="detail-label">Project</div>
                <div class="detail-value">${data.projectName}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Contribution Title</div>
                <div class="detail-value">${data.title}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span class="status-badge">Not Approved</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>What's Next?</h2>
              <p>We encourage you to:</p>
              <ul style="margin-left: 20px; margin-bottom: 15px;">
                <li>Review other open projects on OpenForge</li>
                <li>Consider contributing to different areas of the project</li>
                <li>Reach out to project maintainers for feedback</li>
                <li>Keep building and improving your skills</li>
              </ul>
              <p>Your passion and willingness to contribute are valuable to the community!</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Keep contributing and growing!<br>The OpenForge Team</p>
            <p style="margin-top: 10px; font-size: 12px;">This email was sent because your contribution request was reviewed on OpenForge.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  joinRequestSubmission: (data: {
    name: string;
    ideaTitle: string;
    techStack: string;
  }) => ({
    subject: `🤝 Join Request Received: ${data.ideaTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white;">
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">OpenForge</h1>
            <p style="color: #71717a; font-size: 14px; margin: 5px 0 0 0;">Idea Collaboration Platform</p>
          </div>
          
          <div style="background: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 20px 0;">🤝 Join Request Received!</h2>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Hi ${data.name}, thank you for your interest in joining <strong>${data.ideaTitle}</strong>!
            </p>
            
            <div style="background: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">Request Details:</h3>
              <ul style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Idea:</strong> ${data.ideaTitle}</li>
                <li style="margin-bottom: 8px;"><strong>Your Tech Stack:</strong> ${data.techStack}</li>
              </ul>
            </div>
            
            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
              Your request to join this idea has been received and is under review. The idea owner will review your profile and get back to you soon.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px; margin: 0;">
              This email was sent because you requested to join an idea on OpenForge.
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  joinRequestApproved: (data: {
    name: string;
    ideaTitle: string;
  }) => ({
    subject: `🎉 Welcome to the Team: ${data.ideaTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white;">
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">OpenForge</h1>
            <p style="color: #71717a; font-size: 14px; margin: 5px 0 0 0;">Idea Collaboration Platform</p>
          </div>
          
          <div style="background: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #22c55e; font-size: 20px; margin: 0 0 20px 0;">🎉 Welcome to the Team!</h2>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Exciting news, ${data.name}! Your request to join <strong>${data.ideaTitle}</strong> has been approved!
            </p>
            
            <div style="background: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">Next Steps:</h3>
              <ul style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Connect with the idea owner and team members</li>
                <li style="margin-bottom: 8px;">Join the project communication channels</li>
                <li style="margin-bottom: 8px;">Start collaborating on the idea development</li>
                <li style="margin-bottom: 8px;">Share your skills and contribute to the project</li>
              </ul>
            </div>
            
            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
              Congratulations on becoming part of this innovative project! We're excited to see what you'll help create.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px; margin: 0;">
              This email was sent because your join request was approved on OpenForge.
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  joinRequestRejected: (data: {
    name: string;
    ideaTitle: string;
  }) => ({
    subject: `Join Request Update: ${data.ideaTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white;">
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">OpenForge</h1>
            <p style="color: #71717a; font-size: 14px; margin: 5px 0 0 0;">Idea Collaboration Platform</p>
          </div>
          
          <div style="background: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #ef4444; font-size: 20px; margin: 0 0 20px 0;">Join Request Update</h2>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Hi ${data.name}, your request to join <strong>${data.ideaTitle}</strong> has been reviewed.
            </p>
            
            <div style="background: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">Keep Exploring:</h3>
              <ul style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Browse other exciting ideas on OpenForge</li>
                <li style="margin-bottom: 8px;">Submit your own innovative ideas</li>
                <li style="margin-bottom: 8px;">Improve your profile and skills</li>
                <li style="margin-bottom: 8px;">Try joining other projects that match your expertise</li>
              </ul>
            </div>
            
            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
              Don't give up! There are many opportunities waiting for you. Keep exploring and contributing to the community.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px; margin: 0;">
              This email was sent because your join request was reviewed on OpenForge.
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  featureIdeaSubmission: (data: {
    name: string;
    projectName: string;
    title: string;
    category: string;
    difficulty: string;
  }) => ({
    subject: `🚀 Feature Idea Received: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white;">
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">OpenForge</h1>
            <p style="color: #71717a; font-size: 14px; margin: 5px 0 0 0;">Feature Ideas Platform</p>
          </div>
          
          <div style="background: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #f59e0b; font-size: 20px; margin: 0 0 20px 0;">💡 Feature Idea Received!</h2>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Hi ${data.name}, thank you for your feature idea for <strong>${data.projectName}</strong>!
            </p>
            
            <div style="background: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">Feature Details:</h3>
              <ul style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Title:</strong> ${data.title}</li>
                <li style="margin-bottom: 8px;"><strong>Category:</strong> ${data.category}</li>
                <li style="margin-bottom: 8px;"><strong>Difficulty:</strong> ${data.difficulty}</li>
                <li style="margin-bottom: 8px;"><strong>Project:</strong> ${data.projectName}</li>
              </ul>
            </div>
            
            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0;">
              Your feature idea has been submitted and is now under review by our admin team. We'll evaluate your proposal and notify you once a decision has been made.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px; margin: 0;">
              This email was sent because you submitted a feature idea on OpenForge.
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  featureIdeaApproved: (data: {
    name: string;
    projectName: string;
    title: string;
  }) => ({
    subject: `🎉 Feature Idea Approved - ${data.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Feature Idea Approved</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #09090b;
            border: 1px solid #27272a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #f59e0b;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .detail {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
          }
          .detail-label {
            color: #71717a;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .detail-value {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .footer {
            background-color: #18181b;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #27272a;
          }
          .footer p {
            margin: 0;
            color: #71717a;
            font-size: 14px;
          }
          .highlight {
            color: #f59e0b;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            background-color: #f59e0b;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .celebration {
            font-size: 48px;
            text-align: center;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="celebration">🎉</div>
            <h1>Feature Idea Approved!</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Exciting news, <span class="highlight">${data.name}</span>!</h2>
              <p>Your feature idea for <strong>${data.projectName}</strong> has been <strong class="highlight">approved</strong> by our admin team!</p>
              <p>Your innovative contribution will help make this project even better. Thank you for your creativity and insight!</p>
            </div>
            
            <div class="section">
              <h2>Feature Details</h2>
              <div class="detail">
                <div class="detail-label">Project</div>
                <div class="detail-value">${data.projectName}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Feature Title</div>
                <div class="detail-value">${data.title}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span class="status-badge">Approved</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>What's Next?</h2>
              <p>Your approved feature idea is now visible on the project page for other contributors to see. The project team may reach out to you for more details or collaboration opportunities.</p>
              <p>Keep contributing great ideas and helping shape the future of open source!</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Congratulations and thank you for your contribution!<br>The OpenForge Team</p>
            <p style="margin-top: 10px; font-size: 12px;">This email was sent because your feature idea was approved on OpenForge.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  featureIdeaRejected: (data: {
    name: string;
    projectName: string;
    title: string;
  }) => ({
    subject: `Feature Idea Review Update - ${data.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Feature Idea Review Update</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #09090b;
            border: 1px solid #27272a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #ef4444;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .detail {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
          }
          .detail-label {
            color: #71717a;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .detail-value {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .footer {
            background-color: #18181b;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #27272a;
          }
          .footer p {
            margin: 0;
            color: #71717a;
            font-size: 14px;
          }
          .highlight {
            color: #ef4444;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            background-color: #ef4444;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .info-box {
            background-color: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: #92400e;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Feature Idea Review Update</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Update on your feature idea</h2>
              <p>Hi <span class="highlight">${data.name}</span>,</p>
              <p>Thank you for your interest in contributing to <strong>${data.projectName}</strong>. After careful review, our team has decided not to move forward with your feature idea at this time.</p>
            </div>
            
            <div class="info-box">
              <p><strong>Please don't be discouraged!</strong> This doesn't reflect on your creativity or the quality of your idea. Sometimes feature ideas don't align with current project priorities, roadmap, or technical constraints.</p>
            </div>
            
            <div class="section">
              <h2>Feature Details</h2>
              <div class="detail">
                <div class="detail-label">Project</div>
                <div class="detail-value">${data.projectName}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Feature Title</div>
                <div class="detail-value">${data.title}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span class="status-badge">Not Approved</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>What's Next?</h2>
              <p>We encourage you to:</p>
              <ul style="margin-left: 20px; margin-bottom: 15px;">
                <li>Review other open projects on OpenForge</li>
                <li>Submit new feature ideas for this or other projects</li>
                <li>Reach out to project maintainers for feedback</li>
                <li>Consider contributing to existing features</li>
              </ul>
              <p>Your creativity and willingness to improve projects are valuable to the community!</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Keep innovating and contributing!<br>The OpenForge Team</p>
            <p style="margin-top: 10px; font-size: 12px;">This email was sent because your feature idea was reviewed on OpenForge.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Email sending functions
export async function sendSubmissionReceipt(email: string, data: {
  name: string;
  projectName: string;
  title: string;
  contributionType: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending submission receipt to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.submissionReceipt(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Submission receipt email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending submission receipt email:', error);
    throw error;
  }
}

export async function sendContributionApproved(email: string, data: {
  name: string;
  projectName: string;
  title: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending approval email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.contributionApproved(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contribution approved email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending contribution approved email:', error);
    throw error;
  }
}

export async function sendContributionRejected(email: string, data: {
  name: string;
  projectName: string;
  title: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending rejection email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.contributionRejected(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contribution rejected email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending contribution rejected email:', error);
    throw error;
  }
}

// Join request email functions
export async function sendJoinRequestSubmission(email: string, data: {
  name: string;
  ideaTitle: string;
  techStack: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending join request submission email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.joinRequestSubmission(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Join request submission email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending join request submission email:', error);
    throw error;
  }
}

export async function sendJoinRequestApproved(email: string, data: {
  name: string;
  ideaTitle: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending join request approval email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.joinRequestApproved(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Join request approval email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending join request approval email:', error);
    throw error;
  }
}

export async function sendJoinRequestRejected(email: string, data: {
  name: string;
  ideaTitle: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending join request rejection email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.joinRequestRejected(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Join request rejection email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending join request rejection email:', error);
    throw error;
  }
}

// Feature idea email functions
export async function sendFeatureIdeaSubmission(email: string, data: {
  name: string;
  projectName: string;
  title: string;
  category: string;
  difficulty: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending feature idea submission email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.featureIdeaSubmission(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Feature idea submission email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending feature idea submission email:', error);
    throw error;
  }
}

export async function sendFeatureIdeaApproved(email: string, data: {
  name: string;
  projectName: string;
  title: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending feature idea approval email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.featureIdeaApproved(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Feature idea approval email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending feature idea approval email:', error);
    throw error;
  }
}

export async function sendFeatureIdeaRejected(email: string, data: {
  name: string;
  projectName: string;
  title: string;
}) {
  // Validate email before sending
  if (!email || !email.includes("@") || email === "your@email.com") {
    throw new Error(`Invalid email address: ${email}`);
  }

  console.log("📨 Sending feature idea rejection email to:", email);
  
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      ...emailTemplates.featureIdeaRejected(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Feature idea rejection email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending feature idea rejection email:', error);
    throw error;
  }
}

// Test email configuration
export async function testEmailConfiguration() {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email server configuration error:', error);
    return false;
  }
}
