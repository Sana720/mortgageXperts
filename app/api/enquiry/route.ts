/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { getClientIp, isRateLimited } from '@/lib/rateLimiter';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    if (isRateLimited(ip, 10, 1000 * 60 * 60)) { // 10 attempts per hour
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    // 1. Basic Security: Block direct API access (Open API protection)
    // Most legitimate browser requests will include either an Origin or Referer header.
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    if (!origin && !referer) {
      console.warn('Blocked direct API access attempt (missing Origin and Referer headers).');
      return NextResponse.json({ error: 'Direct API access is forbidden for security reasons.' }, { status: 403 });
    }

    const body = await request.json();
    const { type, name, email, phone, savings, income, state, message, details } = body;

    // 2. Input Validation
    if (type === 'newsletter') {
      if (!email) {
        return NextResponse.json({ error: 'Missing required field (email)' }, { status: 400 });
      }
    } else {
      if (!name || !email || !phone) {
        return NextResponse.json({ error: 'Missing required fields (name, email, phone)' }, { status: 400 });
      }
    }

    const resolvedName = name || (type === 'newsletter' ? 'Newsletter Subscriber' : '');
    const resolvedPhone = phone || '';

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO enquiries (id, type, name, email, phone, savings, income, state, status, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        type || 'callback',
        resolvedName,
        email,
        resolvedPhone,
        savings || null,
        income || null,
        state || null,
        'new',
        message || details || null
      ]
    );

    // Fetch dynamic SMTP settings from database
    const settings: Record<string, string> = {};
    try {
      const rows = await executeQuery('SELECT `key`, `value` FROM global_settings');
      if (Array.isArray(rows)) {
        rows.forEach((row: { key: string; value: string }) => {
          settings[row.key] = row.value;
        });
      }
    } catch (dbErr) {
      console.error('Failed to retrieve SMTP settings from DB:', dbErr);
    }

    const smtpHost = process.env.SMTP_HOST || settings.smtp_host;
    const smtpPort = process.env.SMTP_PORT || settings.smtp_port;
    const smtpUser = process.env.SMTP_USER || settings.smtp_user;
    const smtpPass = process.env.SMTP_PASS || settings.smtp_pass;

    // If SMTP credentials are configured, send the notification email
    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort) || 587,
          secure: parseInt(smtpPort) === 465,
          auth: {
            user: smtpUser,  // SMTP sender credential
            pass: smtpPass,
          },
        });

        // Notification is sent TO the mortgage business email, FROM the SMTP sender
        const recipientEmail = settings.support_email || 'mortgagexperts.au@gmail.com';
        const senderLabel = `"Mortgage Xperts Notifications" <${smtpUser}>`;

        const mailSubject = `New ${type === 'calculator' ? 'Calculator Lead' : 'Callback Enquiry'}: ${name}`;
        const mailText = `You have received a new lead submission on Mortgage Xperts.

Details:
------------------------------------------
Type: ${type || 'callback'}
Name: ${name}
Email: ${email}
Phone: ${phone}
Savings: ${savings || 'N/A'}
Income: ${income || 'N/A'}
State: ${state || 'N/A'}
Message/Details: ${message || details || 'N/A'}
------------------------------------------
Manage this enquiry in the admin dashboard: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://mortgagexperts.com.au'}/admin`;

        await transporter.sendMail({
          from: senderLabel,          // Sent via imageoptimizer SMTP but labelled as Mortgage Xperts
          to: recipientEmail,         // Delivered to the mortgage business email
          subject: mailSubject,
          text: mailText,
        });
        console.log(`Lead notification sent via SMTP to ${recipientEmail}`);
      } catch (mailErr) {
        console.error('Failed to send SMTP notification email:', mailErr);
      }
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Failed to submit enquiry:', error);
    return NextResponse.json({ error: 'Database submission failed' }, { status: 500 });
  }
}
