import { ENV } from "./_core/env";

/**
 * Email templates for enrollment confirmations and course updates
 * Uses Manus built-in notification API for sending emails
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EnrollmentData {
  name: string;
  email: string;
  batch: string;
  batchStartDate: string;
  batchEndDate: string;
  enrollmentId: string;
  price: number;
}

export interface CourseUpdateData {
  name: string;
  email: string;
  updateTitle: string;
  updateContent: string;
  updateDate: string;
}

/**
 * Generate enrollment confirmation email template
 */
export function generateEnrollmentConfirmationEmail(data: EnrollmentData): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
          .header { background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 25px; }
          .section-title { color: #2563EB; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e7ff; }
          .detail-label { color: #7a7a7a; font-weight: 600; }
          .detail-value { color: #2c2c2c; font-weight: bold; }
          .cta-button { display: inline-block; background: #2563EB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 15px; font-weight: bold; }
          .cta-button:hover { background: #1E40AF; }
          .footer { background: #f0f9ff; padding: 20px; text-align: center; color: #7a7a7a; font-size: 12px; border-radius: 0 0 8px 8px; margin-top: 20px; }
          .success-badge { display: inline-block; background: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Welcome to Educators Point!</h1>
            <p>Your Journey to Becoming an Exceptional Teacher Starts Now</p>
          </div>
          
          <div class="content">
            <div class="success-badge">✓ Enrollment Confirmed</div>
            
            <p>Dear <strong>${data.name}</strong>,</p>
            
            <p>Congratulations! Your enrollment in the Educators Point teacher training program has been confirmed. We're excited to have you join our community of passionate educators.</p>
            
            <div class="section">
              <div class="section-title">📋 Enrollment Details</div>
              <div class="detail-row">
                <span class="detail-label">Enrollment ID:</span>
                <span class="detail-value">${data.enrollmentId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Batch:</span>
                <span class="detail-value">${data.batch}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Program Duration:</span>
                <span class="detail-value">${data.batchStartDate} to ${data.batchEndDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Program Fee:</span>
                <span class="detail-value">₹${data.price.toLocaleString()}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">📚 What's Next?</div>
              <p>1. <strong>Payment Confirmation:</strong> Please complete your payment within 48 hours to secure your seat.</p>
              <p>2. <strong>Access Course Materials:</strong> Once payment is confirmed, you'll receive login credentials for our learning platform.</p>
              <p>3. <strong>Pre-Program Orientation:</strong> Join our orientation session to meet mentors and fellow teachers.</p>
              <p>4. <strong>Start Learning:</strong> Begin your 8-week transformation journey!</p>
            </div>
            
            <div class="section">
              <div class="section-title">💡 Program Highlights</div>
              <ul style="color: #2c2c2c; padding-left: 20px;">
                <li>NEP 2020 aligned curriculum</li>
                <li>Expert mentorship from 10+ year educators</li>
                <li>Real classroom simulations</li>
                <li>100% placement assistance</li>
                <li>International pedagogy training</li>
              </ul>
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team at support@educatorspoint.com or reply to this email.</p>
            
            <p>We look forward to supporting your journey to become an exceptional educator!</p>
            
            <p>Best regards,<br><strong>The Educators Point Team</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2026 Educators Point. All rights reserved.</p>
            <p>Master Teaching. Meet Global Standards. Get Placed.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome to Educators Point!

Dear ${data.name},

Congratulations! Your enrollment has been confirmed.

ENROLLMENT DETAILS:
- Enrollment ID: ${data.enrollmentId}
- Batch: ${data.batch}
- Duration: ${data.batchStartDate} to ${data.batchEndDate}
- Fee: ₹${data.price.toLocaleString()}

WHAT'S NEXT:
1. Complete payment within 48 hours
2. Receive platform login credentials
3. Join orientation session
4. Start your 8-week journey

For support, contact: support@educatorspoint.com

Best regards,
The Educators Point Team
  `;

  return {
    subject: `Welcome to Educators Point - Enrollment Confirmed (${data.batch})`,
    html,
    text
  };
}

/**
 * Generate course update email template
 */
export function generateCourseUpdateEmail(data: CourseUpdateData): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
          .header { background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .update-badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-bottom: 15px; }
          .update-title { color: #2563EB; font-size: 20px; font-weight: bold; margin: 20px 0 10px 0; }
          .update-content { background: #f0f9ff; padding: 20px; border-left: 4px solid #2563EB; border-radius: 4px; margin: 15px 0; }
          .footer { background: #f0f9ff; padding: 20px; text-align: center; color: #7a7a7a; font-size: 12px; border-radius: 0 0 8px 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📢 Course Update</h1>
          </div>
          
          <div class="content">
            <div class="update-badge">New Update Available</div>
            
            <p>Dear <strong>${data.name}</strong>,</p>
            
            <p>We have an important update for your Educators Point program:</p>
            
            <div class="update-title">${data.updateTitle}</div>
            
            <div class="update-content">
              ${data.updateContent}
            </div>
            
            <p><strong>Update Date:</strong> ${data.updateDate}</p>
            
            <p>Please log in to your dashboard to view complete details and any related resources.</p>
            
            <p>If you have any questions, please contact our support team at support@educatorspoint.com</p>
            
            <p>Best regards,<br><strong>The Educators Point Team</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2026 Educators Point. All rights reserved.</p>
            <p>Master Teaching. Meet Global Standards. Get Placed.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Course Update from Educators Point

Dear ${data.name},

${data.updateTitle}

${data.updateContent}

Update Date: ${data.updateDate}

Please log in to your dashboard for complete details.

For support, contact: support@educatorspoint.com

Best regards,
The Educators Point Team
  `;

  return {
    subject: `Educators Point Update: ${data.updateTitle}`,
    html,
    text
  };
}

/**
 * Send email using Manus built-in notification API
 */
export async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  try {
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      console.error('[Email Service] Missing API credentials');
      return false;
    }

    const response = await fetch(`${ENV.forgeApiUrl}/notification/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.forgeApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!response.ok) {
      console.error('[Email Service] Failed to send email:', response.statusText);
      return false;
    }

    console.log(`[Email Service] Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending email:', error);
    return false;
  }
}

/**
 * Send enrollment confirmation email
 */
export async function sendEnrollmentConfirmation(data: EnrollmentData): Promise<boolean> {
  const template = generateEnrollmentConfirmationEmail(data);
  return sendEmail(data.email, template);
}

/**
 * Send course update email
 */
export async function sendCourseUpdate(data: CourseUpdateData): Promise<boolean> {
  const template = generateCourseUpdateEmail(data);
  return sendEmail(data.email, template);
}
