"use server";

import { redirect } from "next/navigation";
import {
  escapeLineBreaks,
  formatList,
  isEmail,
  sendIntakeEmail,
} from "@/lib/send-intake-email";

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

  try {
    await sendIntakeEmail({
      subject: `New EdenIO intake from ${name || "Unknown"}`,
      replyTo: isEmail(contact) ? contact.trim() : undefined,
      textLines: [
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
      ],
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
        <p><strong>Notes:</strong><br />${escapeLineBreaks(notes)}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send intake email", error);
  }

  redirect("/interest/thank-you");
}
