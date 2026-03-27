"use server";

import { redirect } from "next/navigation";

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
    notes,
  };

  // Log for now — no database yet
  console.log("--- Interest Form Submission ---");
  console.log(JSON.stringify(submission, null, 2));
  console.log("--- End Submission ---");

  redirect("/interest/thank-you");
}
