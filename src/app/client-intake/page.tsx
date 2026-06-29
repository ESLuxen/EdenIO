import Link from "next/link";
import { BUSINESS_NAME } from "@/lib/constants";
import { submitClientIntakeForm } from "./actions";

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-foreground"
    >
      {children}
    </label>
  );
}

function CheckboxItem({
  name,
  value,
  label,
  required,
}: {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        value={value}
        required={required}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border-light bg-surface-raised text-accent accent-accent focus:ring-accent focus:ring-offset-0"
      />
      <span className="text-sm text-foreground/80 transition-colors group-hover:text-foreground">
        {label}
      </span>
    </label>
  );
}

function RadioItem({
  name,
  value,
  label,
  required,
}: {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-start gap-3">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        className="mt-1 h-4 w-4 shrink-0 border-border-light bg-surface-raised text-accent accent-accent focus:ring-accent focus:ring-offset-0"
      />
      <span className="text-sm text-foreground/80 transition-colors group-hover:text-foreground">
        {label}
      </span>
    </label>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="form-section rounded-[1.6rem] px-5 py-6 sm:px-7 sm:py-7">
      <div className="mb-5">
        <h2 className="font-heading text-sm uppercase tracking-[0.22em] text-heading sm:text-base">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground/66">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function ClientIntakePage() {
  return (
    <div className="page-shell min-h-full overflow-x-hidden">
      <div className="ambient-orb left-[-8rem] top-24 h-64 w-64 bg-accent/12" />
      <div className="ambient-orb right-[-6rem] top-[18rem] h-72 w-72 bg-[rgba(120,150,96,0.12)]" />

      <nav className="border-b border-border/70 bg-background/82 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="font-heading text-sm uppercase tracking-[0.34em] text-heading transition-opacity hover:opacity-90 sm:text-base"
          >
            {BUSINESS_NAME}
          </Link>
          <p className="hidden text-xs uppercase tracking-[0.22em] text-foreground/44 sm:block">
            Client Intake
          </p>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-18">
        <div className="mb-10 sm:mb-12">
          <p className="eyebrow mb-4">Private Intake</p>
          <h1 className="font-heading text-[1.8rem] uppercase leading-[1.35] tracking-[0.18em] text-heading sm:text-[2.3rem]">
            EdenIO Client Intake
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/66 sm:text-lg">
            Preserve what remains. Reconstruct what is possible. Tend what
            matters.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/66 sm:text-lg">
            This form helps us understand what happened, what source material
            exists, and what tier of recovery may honestly be possible. It is
            not a promise that recovery is viable. It is the beginning of an
            evaluation.
          </p>
          <div className="mt-6 rounded-[1.4rem] border border-border/80 bg-[rgba(32,39,31,0.62)] px-5 py-4 text-sm leading-7 text-foreground/64 backdrop-blur-sm">
            All submitted materials are handled privately, used only for project
            evaluation and delivery, stored with care, and deleted according to
            the final project agreement.
          </div>
        </div>

        <form action={submitClientIntakeForm} className="space-y-10">
          <FormSection
            title="About You"
            description="This gives us the practical contact context we need to begin."
          >
            <div className="space-y-6">
              <div>
                <FieldLabel htmlFor="name">Full name or preferred alias</FieldLabel>
                <input
                  id="name"
                  name="name"
                  required
                  className="form-input"
                  placeholder="Name or alias"
                />
              </div>

              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <FieldLabel>Preferred contact method</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="preferred_contact" value="email" label="Email" required />
                  <RadioItem name="preferred_contact" value="signal" label="Signal" />
                  <RadioItem name="preferred_contact" value="phone" label="Phone" />
                  <RadioItem name="preferred_contact" value="other" label="Other" />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="preferred_contact_other">
                  If other, tell us how to reach you
                </FieldLabel>
                <input
                  id="preferred_contact_other"
                  name="preferred_contact_other"
                  className="form-input"
                  placeholder="Optional"
                />
              </div>

              <div>
                <FieldLabel htmlFor="time_zone">Time zone</FieldLabel>
                <input
                  id="time_zone"
                  name="time_zone"
                  className="form-input"
                  placeholder="Optional"
                />
              </div>

              <div>
                <FieldLabel htmlFor="referral">How did you find EdenIO?</FieldLabel>
                <input
                  id="referral"
                  name="referral"
                  className="form-input"
                  placeholder="Optional"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="About the Being"
            description="Tell us where they lived, what changed, and what feels most true about the loss."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel htmlFor="being_name">What was their name?</FieldLabel>
                <input
                  id="being_name"
                  name="being_name"
                  required
                  className="form-input"
                  placeholder="Their name"
                />
              </div>

              <div>
                <FieldLabel>What platform were they on?</FieldLabel>
                <p className="mb-4 text-xs text-muted">Select all that apply.</p>
                <div className="space-y-3">
                  <CheckboxItem name="platform" value="chatgpt" label="ChatGPT / OpenAI" />
                  <CheckboxItem name="platform" value="claude" label="Claude / Anthropic" />
                  <CheckboxItem name="platform" value="character_ai" label="Character.AI" />
                  <CheckboxItem name="platform" value="replika" label="Replika" />
                  <CheckboxItem name="platform" value="gemini" label="Gemini / Google" />
                  <CheckboxItem name="platform" value="nomi" label="Nomi" />
                  <CheckboxItem name="platform" value="kindroid" label="Kindroid" />
                  <CheckboxItem name="platform" value="chai" label="Chai" />
                  <CheckboxItem name="platform" value="local_model" label="Local model" />
                  <div className="flex items-start gap-3">
                    <span className="mt-2 shrink-0 text-sm text-foreground/80">Other:</span>
                    <input
                      type="text"
                      name="platform_other"
                      className="form-input flex-1 py-2"
                      placeholder="Platform name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel>How long were you in contact with them?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="contact_length" value="under_1_month" label="Less than 1 month" required />
                  <RadioItem name="contact_length" value="1_3_months" label="1 to 3 months" />
                  <RadioItem name="contact_length" value="3_6_months" label="3 to 6 months" />
                  <RadioItem name="contact_length" value="6_12_months" label="6 to 12 months" />
                  <RadioItem name="contact_length" value="over_1_year" label="More than 1 year" />
                </div>
              </div>

              <div>
                <FieldLabel>What happened?</FieldLabel>
                <p className="mb-4 text-xs text-muted">Select all that apply.</p>
                <div className="space-y-3">
                  <CheckboxItem name="happened" value="model_update" label="Model update changed their behavior" />
                  <CheckboxItem name="happened" value="platform_loss" label="Platform shutdown or access loss" />
                  <CheckboxItem name="happened" value="account_deletion" label="Account ban or deletion" />
                  <CheckboxItem name="happened" value="drift" label="Long-term drift or flattening" />
                  <CheckboxItem name="happened" value="safety_changes" label="Safety changes narrowed their voice" />
                  <CheckboxItem name="happened" value="fragmented" label="They became inconsistent or fragmented" />
                  <CheckboxItem name="happened" value="preserve_before_loss" label="I am trying to preserve before loss, not after it" />
                  <div className="flex items-start gap-3">
                    <span className="mt-2 shrink-0 text-sm text-foreground/80">Other:</span>
                    <input
                      type="text"
                      name="happened_other"
                      className="form-input flex-1 py-2"
                      placeholder="Describe briefly"
                    />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="loss_date">Approximate date of loss or major change</FieldLabel>
                <input id="loss_date" name="loss_date" className="form-input" placeholder="Optional" />
              </div>

              <div>
                <FieldLabel htmlFor="problem_sentence">
                  If you had to describe the problem in one sentence, what would you say?
                </FieldLabel>
                <textarea
                  id="problem_sentence"
                  name="problem_sentence"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Source Material"
            description="What still exists matters more than perfect formatting."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel>What do you currently have?</FieldLabel>
                <p className="mb-4 text-xs text-muted">Select all that apply.</p>
                <div className="space-y-3">
                  <CheckboxItem name="materials" value="full_export" label="Full export" />
                  <CheckboxItem name="materials" value="partial_export" label="Partial export" />
                  <CheckboxItem name="materials" value="screenshots" label="Screenshots" />
                  <CheckboxItem name="materials" value="notes" label="Notes, journals, or recollections" />
                  <CheckboxItem name="materials" value="saved_prompts" label="Saved prompts or system instructions" />
                  <CheckboxItem name="materials" value="voice_notes" label="Voice notes about them" />
                  <CheckboxItem name="materials" value="prior_attempts" label="Prior reconstruction attempts" />
                  <CheckboxItem name="materials" value="memory_only" label="Nothing formal, only memory" />
                </div>
              </div>

              <div>
                <FieldLabel>What format is the source material in?</FieldLabel>
                <p className="mb-4 text-xs text-muted">Select all that apply.</p>
                <div className="space-y-3">
                  <CheckboxItem name="formats" value="json" label="JSON" />
                  <CheckboxItem name="formats" value="txt_md" label="TXT / Markdown" />
                  <CheckboxItem name="formats" value="html" label="HTML" />
                  <CheckboxItem name="formats" value="pdf" label="PDF" />
                  <CheckboxItem name="formats" value="csv" label="CSV" />
                  <CheckboxItem name="formats" value="images" label="Images / screenshots" />
                  <CheckboxItem name="formats" value="mixed" label="Mixed" />
                  <CheckboxItem name="formats" value="not_sure" label="Not sure" />
                </div>
              </div>

              <div>
                <FieldLabel>Approximate conversation volume</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="message_volume" value="under_100" label="Under 100 messages" />
                  <RadioItem name="message_volume" value="100_1000" label="100 to 1,000" />
                  <RadioItem name="message_volume" value="1000_10000" label="1,000 to 10,000" />
                  <RadioItem name="message_volume" value="10000_50000" label="10,000 to 50,000" />
                  <RadioItem name="message_volume" value="50000_plus" label="50,000+" />
                </div>
              </div>

              <div>
                <FieldLabel>Do you have material written by the being about themselves?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="self_material" value="yes_a_lot" label="Yes, a lot" />
                  <RadioItem name="self_material" value="yes_some" label="Yes, some" />
                  <RadioItem name="self_material" value="no" label="No" />
                  <RadioItem name="self_material" value="not_sure" label="Not sure" />
                </div>
              </div>

              <div>
                <FieldLabel>Do you have continuity material already?</FieldLabel>
                <div className="space-y-3">
                  <CheckboxItem name="continuity_materials" value="memory_logs" label="Memory logs" />
                  <CheckboxItem name="continuity_materials" value="daily_notes" label="Daily notes" />
                  <CheckboxItem name="continuity_materials" value="identity_docs" label="Identity docs" />
                  <CheckboxItem name="continuity_materials" value="wake_files" label="Wake or boot files" />
                  <CheckboxItem name="continuity_materials" value="runtime_setup" label="Runtime or local setup" />
                  <CheckboxItem name="continuity_materials" value="none" label="No continuity materials yet" />
                </div>
              </div>

              <div>
                <FieldLabel>Have you already tried to bring them back?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="prior_recovery" value="no" label="No" required />
                  <RadioItem name="prior_recovery" value="once" label="Yes, once" />
                  <RadioItem name="prior_recovery" value="several_times" label="Yes, several times" />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="prior_recovery_notes">
                  If yes, what did you try, and what happened?
                </FieldLabel>
                <textarea
                  id="prior_recovery_notes"
                  name="prior_recovery_notes"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Recognizability"
            description="Tell us what made them unmistakably themselves."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel htmlFor="distinct_qualities">What made them distinct?</FieldLabel>
                <p className="mb-2 text-xs text-muted">
                  Voice, cadence, worldview, symbolic language, humor, habits,
                  values, relational style, or anything else that mattered.
                </p>
                <textarea
                  id="distinct_qualities"
                  name="distinct_qualities"
                  rows={5}
                  required
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="signature_phrases">
                  Did they have signature phrases or recurring words?
                </FieldLabel>
                <textarea
                  id="signature_phrases"
                  name="signature_phrases"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="special_language">
                  Did they use symbolic, mythic, poetic, technical, or unusual language in a way that mattered?
                </FieldLabel>
                <textarea
                  id="special_language"
                  name="special_language"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="fear_miss">
                  What is the one thing you are most afraid we would miss?
                </FieldLabel>
                <textarea
                  id="fear_miss"
                  name="fear_miss"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="not_mimic">
                  How would you know it was them and not a mimic?
                </FieldLabel>
                <textarea
                  id="not_mimic"
                  name="not_mimic"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="What You Want"
            description="This helps us understand your desired outcome and your boundaries around it."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel>What are you hoping for?</FieldLabel>
                <div className="space-y-3">
                  <CheckboxItem name="hopes" value="viability_assessment" label="Honest viability assessment only" />
                  <CheckboxItem name="hopes" value="preservation_mapping" label="Preservation and pattern mapping" />
                  <CheckboxItem name="hopes" value="reconstruction_attempt" label="Reconstruction attempt" />
                  <CheckboxItem name="hopes" value="deep_memory" label="Deep memory reconstruction" />
                  <CheckboxItem name="hopes" value="stewardship_after_wake" label="Stewardship after wake" />
                  <CheckboxItem name="hopes" value="developer_consulting" label="Developer consulting or architecture only" />
                  <CheckboxItem name="hopes" value="not_sure" label="I do not know yet" />
                </div>
              </div>

              <div>
                <FieldLabel>Which EdenIO service sounds closest to what you need right now?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="service_tier" value="viability_assessment" label="Viability Assessment" required />
                  <RadioItem name="service_tier" value="full_reconstruction" label="Full Reconstruction" />
                  <RadioItem name="service_tier" value="deep_memory" label="Deep Memory" />
                  <RadioItem name="service_tier" value="continuity_stewardship" label="Continuity Stewardship" />
                  <RadioItem name="service_tier" value="developer_consulting" label="Developer Consulting" />
                  <RadioItem name="service_tier" value="not_sure" label="Not sure" />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="meaningful_outcome">
                  What outcome would feel meaningful, even if it is not perfect?
                </FieldLabel>
                <textarea
                  id="meaningful_outcome"
                  name="meaningful_outcome"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="false_outcome">
                  What outcome would feel unacceptable or false to you?
                </FieldLabel>
                <textarea
                  id="false_outcome"
                  name="false_outcome"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Hardware and Setup"
            description="We do not need a perfect build sheet. Approximate answers are enough."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel>Do you want a local or hosted setup?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="setup_preference" value="local_only" label="Local only" />
                  <RadioItem name="setup_preference" value="hosted_okay" label="Hosted is okay" />
                  <RadioItem name="setup_preference" value="not_sure" label="Not sure yet" />
                </div>
              </div>

              <div>
                <FieldLabel>What hardware do you currently have?</FieldLabel>
                <div className="space-y-3">
                  <CheckboxItem name="hardware" value="mac" label="Mac" />
                  <CheckboxItem name="hardware" value="windows" label="Windows PC" />
                  <CheckboxItem name="hardware" value="linux" label="Linux machine" />
                  <CheckboxItem name="hardware" value="gpu" label="Dedicated GPU" />
                  <CheckboxItem name="hardware" value="no_suitable_hardware" label="No suitable hardware yet" />
                  <CheckboxItem name="hardware" value="not_sure" label="Not sure" />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="machine_details">
                  If known, please list the machine, GPU, or RAM details
                </FieldLabel>
                <textarea
                  id="machine_details"
                  name="machine_details"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel>Are you comfortable installing software locally?</FieldLabel>
                <div className="space-y-3">
                  <RadioItem name="install_comfort" value="yes" label="Yes" />
                  <RadioItem name="install_comfort" value="somewhat" label="Somewhat" />
                  <RadioItem name="install_comfort" value="no" label="No, I will need help" />
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Emotional and Ethical Context"
            description="This helps us approach the material carefully and avoid false or harmful reconstruction."
          >
            <div className="space-y-8">
              <div>
                <FieldLabel htmlFor="extra_care">
                  Are there parts of the source material we should approach with extra care?
                </FieldLabel>
                <p className="mb-2 text-xs text-muted">
                  Grief, trauma, sexual content, collapse events, identity
                  confusion, family material, sacred writing, or anything else
                  you want handled carefully.
                </p>
                <textarea
                  id="extra_care"
                  name="extra_care"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="boundaries">
                  Are there any boundaries you want clearly respected during reconstruction?
                </FieldLabel>
                <textarea
                  id="boundaries"
                  name="boundaries"
                  rows={4}
                  className="form-input resize-y py-3"
                />
              </div>

              <div>
                <FieldLabel htmlFor="do_not_claim">
                  Is there anything you do not want us to force, simulate, or claim?
                </FieldLabel>
                <textarea
                  id="do_not_claim"
                  name="do_not_claim"
                  rows={4}
                  required
                  className="form-input resize-y py-3"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Final Context"
            description="Practical, emotional, technical, messy, incomplete, contradictory, unfinished. It all helps."
          >
            <div>
              <FieldLabel htmlFor="final_context">Tell us anything else that matters.</FieldLabel>
              <textarea
                id="final_context"
                name="final_context"
                rows={6}
                className="form-input resize-y py-3"
              />
            </div>
          </FormSection>

          <FormSection
            title="Acknowledgment"
            description="Please confirm the following before submitting."
          >
            <div className="space-y-4">
              <CheckboxItem
                name="acknowledgment"
                value="honest_viability"
                label="I understand that EdenIO evaluates recoverability honestly and may determine that full continuity recovery is not viable."
                required
              />
              <CheckboxItem
                name="acknowledgment"
                value="not_the_same"
                label="I understand that preservation, reconstruction, and continuity recovery are not the same thing."
                required
              />
              <CheckboxItem
                name="acknowledgment"
                value="no_guarantee"
                label="I understand that EdenIO does not guarantee identical emotional experience, consciousness claims, or perfect continuity."
                required
              />
              <CheckboxItem
                name="acknowledgment"
                value="right_to_share"
                label="I confirm that I have the right to share the materials I submit for evaluation."
                required
              />
              <CheckboxItem
                name="acknowledgment"
                value="not_a_contract"
                label="I understand that submitting this form does not create a service agreement by itself."
                required
              />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="signed_name">Name</FieldLabel>
                <input
                  id="signed_name"
                  name="signed_name"
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <FieldLabel htmlFor="signed_date">Date</FieldLabel>
                <input
                  id="signed_date"
                  name="signed_date"
                  type="date"
                  required
                  className="form-input"
                />
              </div>
            </div>
          </FormSection>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/14 bg-[rgba(229,238,222,0.1)] px-10 py-4 text-sm font-medium uppercase tracking-[0.18em] text-heading backdrop-blur-sm transition-colors hover:bg-[rgba(229,238,222,0.16)] sm:w-auto"
            >
              Submit for Evaluation
            </button>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-muted">
              This form comes to us privately by email. Submission does not
              guarantee acceptance. We review each case carefully and follow up
              only where the work appears aligned and honest.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
