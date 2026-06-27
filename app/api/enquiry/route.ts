/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, savings, income, state, message, details } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields (name, email, phone)' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await executeQuery(
      'INSERT INTO enquiries (id, type, name, email, phone, savings, income, state, status, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        type || 'callback',
        name,
        email,
        phone,
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

    // If SMTP credentials are configured, send the notification email
    if (settings.smtp_host && settings.smtp_user && settings.smtp_pass) {
      try {
        const transporter = nodemailer.createTransport({
          host: settings.smtp_host,
          port: parseInt(settings.smtp_port) || 587,
          secure: parseInt(settings.smtp_port) === 465,
          auth: {
            user: settings.smtp_user,  // SMTP sender credential (imageoptimizer account)
            pass: settings.smtp_pass,
          },
        });

        // Notification is sent TO the mortgage business email, FROM the SMTP sender
        const recipientEmail = settings.support_email || 'mortgage@mortgagexperts.com.au';
        const senderLabel = `"Mortgage Xperts Notifications" <${settings.smtp_user}>`;

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
