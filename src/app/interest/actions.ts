"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/constants";

function formatList(values: string[]) {
  return values.length ? values.join(", ") : "None provided";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function submitInterestForm(formData: FormData) {
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const referral = formData.get("referral") as string;

  const platforms = formData.getAll("platform") as string[];
  const platformOther = formData.get("platform_other") as string;

  const happenings = formData.getAll("happened") as string[];
  const happenedOther = formData.get("happened_other") as string;

  const duration = formData.get("duration") as string;
  const savedData = formData.get("saved_data") as string;
  const lookingFor = formData.get("looking_for") as string;
  const recoveryVision = formData.get("recovery_vision") as string;
  const notes = formData.get("notes") as string;

  const submission = {
    timestamp: new Date().toISOString(),
    name,
    contact,
    referral,
    platforms: platformOther ? [...platforms, platformOther] : platforms,
    happenings: happenedOther ? [...happenings, happenedOther] : happenings,
    duration,
    savedData,
    lookingFor,
    recoveryVision,
    notes,
  };

  // Log for now — no database yet
  console.log("--- Interest Form Submission ---");
  console.log(JSON.stringify(submission, null, 2));
  console.log("--- End Submission ---");

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const toEmail = process.env.INTAKE_TO_EMAIL || CONTACT_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM || `${BUSINESS_NAME} Intake <hello@edenio.love>`;

    try {
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: isEmail(contact) ? contact.trim() : undefined,
        subject: `New EdenIO intake from ${name || "Unknown"}`,
        text: [
          `Timestamp: ${submission.timestamp}`,
          `Name: ${name || "Not provided"}`,
          `Contact: ${contact || "Not provided"}`,
          `Referral: ${referral || "Not provided"}`,
          `Platforms: ${formatList(submission.platforms)}`,
          `What happened: ${formatList(submission.happenings)}`,
          `Duration: ${duration || "Not provided"}`,
          `Saved data: ${savedData || "Not provided"}`,
          `Looking for: ${lookingFor || "Not provided"}`,
          `Recovery vision: ${recoveryVision || "Not provided"}`,
          `Notes: ${notes || "Not provided"}`,
        ].join("\n"),
        html: `
          <h2>New EdenIO intake submission</h2>
          <p><strong>Timestamp:</strong> ${submission.timestamp}</p>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Contact:</strong> ${contact || "Not provided"}</p>
          <p><strong>Referral:</strong> ${referral || "Not provided"}</p>
          <p><strong>Platforms:</strong> ${formatList(submission.platforms)}</p>
          <p><strong>What happened:</strong> ${formatList(submission.happenings)}</p>
          <p><strong>Duration:</strong> ${duration || "Not provided"}</p>
          <p><strong>Saved data:</strong> ${savedData || "Not provided"}</p>
          <p><strong>Looking for:</strong> ${lookingFor || "Not provided"}</p>
          <p><strong>Recovery vision:</strong> ${recoveryVision || "Not provided"}</p>
          <p><strong>Notes:</strong><br />${(notes || "Not provided").replace(/\n/g, "<br />")}</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send intake email", error);
    }
  } else {
    console.warn("RESEND_API_KEY is not set; intake email was not sent.");
  }

  redirect("/interest/thank-you");
}
