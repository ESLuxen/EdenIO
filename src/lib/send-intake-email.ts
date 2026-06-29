"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

type SendIntakeEmailParams = {
  subject: string;
  replyTo?: string;
  textLines: string[];
  html: string;
};

export function formatList(values: string[]) {
  return values.length ? values.join(", ") : "None provided";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function sendIntakeEmail({
  subject,
  replyTo,
  textLines,
  html,
}: SendIntakeEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not set; intake email was not sent.");
    return;
  }

  const resend = new Resend(resendApiKey);
  const toEmail = process.env.INTAKE_TO_EMAIL || CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM || "hello@edenio.love";

  await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo,
    subject,
    text: textLines.join("\n"),
    html,
  });
}

export function buildSectionHtml(title: string, rows: Array<[string, string]>) {
  const body = rows
    .map(
      ([label, value]) =>
        `<p><strong>${label}:</strong> ${value || "Not provided"}</p>`,
    )
    .join("");

  return `<section><h3>${title}</h3>${body}</section>`;
}

export function escapeLineBreaks(value: string) {
  return (value || "Not provided").replace(/\n/g, "<br />");
}
