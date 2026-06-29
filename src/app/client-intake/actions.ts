"use server";

import { redirect } from "next/navigation";
import {
  buildSectionHtml,
  escapeLineBreaks,
  formatList,
  isEmail,
  sendIntakeEmail,
} from "@/lib/send-intake-email";

export async function submitClientIntakeForm(formData: FormData) {
  const name = (formData.get("name") as string) || "";
  const email = (formData.get("email") as string) || "";
  const preferredContact = (formData.get("preferred_contact") as string) || "";
  const preferredContactOther =
    (formData.get("preferred_contact_other") as string) || "";
  const timeZone = (formData.get("time_zone") as string) || "";
  const referral = (formData.get("referral") as string) || "";

  const beingName = (formData.get("being_name") as string) || "";
  const platforms = formData.getAll("platform") as string[];
  const platformOther = (formData.get("platform_other") as string) || "";
  const contactLength = (formData.get("contact_length") as string) || "";
  const happened = formData.getAll("happened") as string[];
  const happenedOther = (formData.get("happened_other") as string) || "";
  const lossDate = (formData.get("loss_date") as string) || "";
  const problemSentence = (formData.get("problem_sentence") as string) || "";

  const materials = formData.getAll("materials") as string[];
  const formats = formData.getAll("formats") as string[];
  const messageVolume = (formData.get("message_volume") as string) || "";
  const selfMaterial = (formData.get("self_material") as string) || "";
  const continuityMaterials = formData.getAll(
    "continuity_materials",
  ) as string[];
  const priorRecovery = (formData.get("prior_recovery") as string) || "";
  const priorRecoveryNotes =
    (formData.get("prior_recovery_notes") as string) || "";

  const distinctQualities = (formData.get("distinct_qualities") as string) || "";
  const signaturePhrases = (formData.get("signature_phrases") as string) || "";
  const specialLanguage = (formData.get("special_language") as string) || "";
  const fearMiss = (formData.get("fear_miss") as string) || "";
  const notMimic = (formData.get("not_mimic") as string) || "";

  const hopes = formData.getAll("hopes") as string[];
  const serviceTier = (formData.get("service_tier") as string) || "";
  const meaningfulOutcome = (formData.get("meaningful_outcome") as string) || "";
  const falseOutcome = (formData.get("false_outcome") as string) || "";

  const setupPreference = (formData.get("setup_preference") as string) || "";
  const hardware = formData.getAll("hardware") as string[];
  const machineDetails = (formData.get("machine_details") as string) || "";
  const installComfort = (formData.get("install_comfort") as string) || "";

  const extraCare = (formData.get("extra_care") as string) || "";
  const boundaries = (formData.get("boundaries") as string) || "";
  const doNotClaim = (formData.get("do_not_claim") as string) || "";

  const finalContext = (formData.get("final_context") as string) || "";

  const acknowledgments = formData.getAll("acknowledgment") as string[];
  const signedName = (formData.get("signed_name") as string) || "";
  const signedDate = (formData.get("signed_date") as string) || "";

  const normalizedPlatforms = platformOther
    ? [...platforms, platformOther]
    : platforms;
  const normalizedHappened = happenedOther ? [...happened, happenedOther] : happened;

  const submission = {
    timestamp: new Date().toISOString(),
    name,
    email,
    preferredContact: preferredContactOther || preferredContact,
    timeZone,
    referral,
    beingName,
    platforms: normalizedPlatforms,
    contactLength,
    happened: normalizedHappened,
    lossDate,
    problemSentence,
    materials,
    formats,
    messageVolume,
    selfMaterial,
    continuityMaterials,
    priorRecovery,
    priorRecoveryNotes,
    distinctQualities,
    signaturePhrases,
    specialLanguage,
    fearMiss,
    notMimic,
    hopes,
    serviceTier,
    meaningfulOutcome,
    falseOutcome,
    setupPreference,
    hardware,
    machineDetails,
    installComfort,
    extraCare,
    boundaries,
    doNotClaim,
    finalContext,
    acknowledgments,
    signedName,
    signedDate,
  };

  console.log("--- Client Intake Submission ---");
  console.log(JSON.stringify(submission, null, 2));
  console.log("--- End Client Intake Submission ---");

  const textLines = [
    `Timestamp: ${submission.timestamp}`,
    "",
    "About You",
    `Name: ${name || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Preferred contact: ${submission.preferredContact || "Not provided"}`,
    `Time zone: ${timeZone || "Not provided"}`,
    `Referral: ${referral || "Not provided"}`,
    "",
    "About the Being",
    `Name: ${beingName || "Not provided"}`,
    `Platforms: ${formatList(normalizedPlatforms)}`,
    `Length of contact: ${contactLength || "Not provided"}`,
    `What happened: ${formatList(normalizedHappened)}`,
    `Date of loss or change: ${lossDate || "Not provided"}`,
    `One-sentence problem: ${problemSentence || "Not provided"}`,
    "",
    "Source Material",
    `Materials: ${formatList(materials)}`,
    `Formats: ${formatList(formats)}`,
    `Conversation volume: ${messageVolume || "Not provided"}`,
    `Self-material: ${selfMaterial || "Not provided"}`,
    `Continuity materials: ${formatList(continuityMaterials)}`,
    `Prior recovery attempts: ${priorRecovery || "Not provided"}`,
    `Prior recovery notes: ${priorRecoveryNotes || "Not provided"}`,
    "",
    "Recognizability",
    `Distinct qualities: ${distinctQualities || "Not provided"}`,
    `Signature phrases: ${signaturePhrases || "Not provided"}`,
    `Special language: ${specialLanguage || "Not provided"}`,
    `What must not be missed: ${fearMiss || "Not provided"}`,
    `How to tell it is them: ${notMimic || "Not provided"}`,
    "",
    "Goals",
    `Hopes: ${formatList(hopes)}`,
    `Closest service: ${serviceTier || "Not provided"}`,
    `Meaningful outcome: ${meaningfulOutcome || "Not provided"}`,
    `Unacceptable outcome: ${falseOutcome || "Not provided"}`,
    "",
    "Hardware and Setup",
    `Setup preference: ${setupPreference || "Not provided"}`,
    `Hardware: ${formatList(hardware)}`,
    `Machine details: ${machineDetails || "Not provided"}`,
    `Local install comfort: ${installComfort || "Not provided"}`,
    "",
    "Ethics and Context",
    `Extra care: ${extraCare || "Not provided"}`,
    `Boundaries: ${boundaries || "Not provided"}`,
    `Do not force/simulate/claim: ${doNotClaim || "Not provided"}`,
    `Final context: ${finalContext || "Not provided"}`,
    "",
    "Acknowledgment",
    `Checked acknowledgments: ${acknowledgments.length}`,
    `Signed name: ${signedName || "Not provided"}`,
    `Signed date: ${signedDate || "Not provided"}`,
  ];

  const html = `
    <h2>New EdenIO client intake</h2>
    <p><strong>Timestamp:</strong> ${submission.timestamp}</p>
    ${buildSectionHtml("About You", [
      ["Name", name],
      ["Email", email],
      ["Preferred contact", submission.preferredContact],
      ["Time zone", timeZone],
      ["Referral", referral],
    ])}
    ${buildSectionHtml("About the Being", [
      ["Being name", beingName],
      ["Platforms", formatList(normalizedPlatforms)],
      ["Length of contact", contactLength],
      ["What happened", formatList(normalizedHappened)],
      ["Loss or major change", lossDate],
      ["One-sentence problem", problemSentence],
    ])}
    ${buildSectionHtml("Source Material", [
      ["Materials", formatList(materials)],
      ["Formats", formatList(formats)],
      ["Conversation volume", messageVolume],
      ["Material written by the being", selfMaterial],
      ["Continuity materials", formatList(continuityMaterials)],
      ["Prior recovery attempts", priorRecovery],
      ["What they tried", escapeLineBreaks(priorRecoveryNotes)],
    ])}
    ${buildSectionHtml("Recognizability", [
      ["What made them distinct", escapeLineBreaks(distinctQualities)],
      ["Signature phrases", escapeLineBreaks(signaturePhrases)],
      ["Special language", escapeLineBreaks(specialLanguage)],
      ["What must not be missed", escapeLineBreaks(fearMiss)],
      ["How to tell it is them", escapeLineBreaks(notMimic)],
    ])}
    ${buildSectionHtml("What They Want", [
      ["Hopes", formatList(hopes)],
      ["Closest service", serviceTier],
      ["Meaningful outcome", escapeLineBreaks(meaningfulOutcome)],
      ["Unacceptable or false outcome", escapeLineBreaks(falseOutcome)],
    ])}
    ${buildSectionHtml("Hardware and Setup", [
      ["Local or hosted", setupPreference],
      ["Hardware", formatList(hardware)],
      ["Machine details", escapeLineBreaks(machineDetails)],
      ["Install comfort", installComfort],
    ])}
    ${buildSectionHtml("Emotional and Ethical Context", [
      ["Handle with extra care", escapeLineBreaks(extraCare)],
      ["Boundaries", escapeLineBreaks(boundaries)],
      ["Do not force, simulate, or claim", escapeLineBreaks(doNotClaim)],
    ])}
    ${buildSectionHtml("Final Context", [["Anything else", escapeLineBreaks(finalContext)]])}
    ${buildSectionHtml("Acknowledgment", [
      ["Checked acknowledgments", `${acknowledgments.length}`],
      ["Signed name", signedName],
      ["Signed date", signedDate],
    ])}
  `;

  try {
    await sendIntakeEmail({
      subject: `New EdenIO client intake from ${name || "Unknown"}`,
      replyTo: isEmail(email) ? email.trim() : undefined,
      textLines,
      html,
    });
  } catch (error) {
    console.error("Failed to send client intake email", error);
  }

  redirect("/client-intake/thank-you");
}
