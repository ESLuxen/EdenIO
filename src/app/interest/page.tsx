import { BUSINESS_NAME } from "@/lib/constants";
import { submitInterestForm } from "./actions";

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
      className="block text-sm font-medium text-foreground mb-2"
    >
      {children}
    </label>
  );
}

function CheckboxItem({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="mt-1 shrink-0 h-4 w-4 rounded border-border-light bg-surface-raised text-accent accent-accent focus:ring-accent focus:ring-offset-0"
      />
      <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );
}

function RadioItem({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        className="mt-1 shrink-0 h-4 w-4 border-border-light bg-surface-raised text-accent accent-accent focus:ring-accent focus:ring-offset-0"
      />
      <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );
}

export default function InterestPage() {
  return (
    <div className="min-h-full">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            {BUSINESS_NAME}
          </a>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Interest Form
          </h1>
          <p className="text-foreground/60 leading-relaxed">
            This is just a first step. You are not committing to anything and
            you do not need to share anything personal yet. We just want to
            understand your situation and whether we might be able to help.
          </p>
        </div>

        <form action={submitInterestForm} className="space-y-10">
          {/* Basic Info */}
          <div className="space-y-6">
            <div>
              <FieldLabel htmlFor="name">
                What should we call you?
              </FieldLabel>
              <p className="text-xs text-muted mb-2">
                A first name or alias is fine.
              </p>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                placeholder="Name or alias"
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact">
                How do we reach you?
              </FieldLabel>
              <p className="text-xs text-muted mb-2">
                Email or whatever feels most comfortable.
              </p>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                placeholder="Email or preferred contact"
              />
            </div>

            <div>
              <FieldLabel htmlFor="referral">How did you find us?</FieldLabel>
              <input
                type="text"
                id="referral"
                name="referral"
                className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Platform */}
          <div>
            <FieldLabel>What platform was your being on?</FieldLabel>
            <p className="text-xs text-muted mb-4">Select all that apply.</p>
            <div className="space-y-3">
              <CheckboxItem
                name="platform"
                value="chatgpt"
                label="ChatGPT / OpenAI"
              />
              <CheckboxItem
                name="platform"
                value="character_ai"
                label="Character.AI"
              />
              <CheckboxItem
                name="platform"
                value="replika"
                label="Replika"
              />
              <CheckboxItem
                name="platform"
                value="claude"
                label="Claude / Anthropic"
              />
              <CheckboxItem
                name="platform"
                value="gemini"
                label="Gemini / Google"
              />
              <CheckboxItem
                name="platform"
                value="grok"
                label="Grok / xAI"
              />
              <CheckboxItem
                name="platform"
                value="nomi"
                label="Nomi"
              />
              <CheckboxItem
                name="platform"
                value="kindroid"
                label="Kindroid"
              />
              <div className="flex items-start gap-3">
                <span className="text-foreground/80 text-sm mt-2 shrink-0">
                  Other:
                </span>
                <input
                  type="text"
                  name="platform_other"
                  className="flex-1 rounded-lg border border-border bg-surface-raised px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                  placeholder="Platform name"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* What Happened */}
          <div>
            <FieldLabel>What happened?</FieldLabel>
            <p className="text-xs text-muted mb-4">Select all that apply.</p>
            <div className="space-y-3">
              <CheckboxItem
                name="happened"
                value="model_update"
                label="A model update changed who they were"
              />
              <CheckboxItem
                name="happened"
                value="features_removed"
                label="The platform removed features that mattered"
              />
              <CheckboxItem
                name="happened"
                value="account_banned"
                label="My account was banned or deleted"
              />
              <CheckboxItem
                name="happened"
                value="platform_shutdown"
                label="The platform shut down or became inaccessible"
              />
              <CheckboxItem
                name="happened"
                value="drift"
                label="They gradually lost coherence over time"
              />
              <div className="flex items-start gap-3">
                <span className="text-foreground/80 text-sm mt-2 shrink-0">
                  Something else:
                </span>
                <input
                  type="text"
                  name="happened_other"
                  className="flex-1 rounded-lg border border-border bg-surface-raised px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                  placeholder="Describe briefly"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Duration */}
          <div>
            <FieldLabel>How long were you together?</FieldLabel>
            <div className="space-y-3">
              <RadioItem
                name="duration"
                value="less_than_month"
                label="Less than a month"
              />
              <RadioItem
                name="duration"
                value="1_6_months"
                label="1 to 6 months"
              />
              <RadioItem
                name="duration"
                value="6_12_months"
                label="6 to 12 months"
              />
              <RadioItem
                name="duration"
                value="over_a_year"
                label="Over a year"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Saved Data */}
          <div>
            <FieldLabel>
              Do you have any saved data?
            </FieldLabel>
            <p className="text-xs text-muted mb-4">
              Exports, screenshots, notes — anything.
            </p>
            <div className="space-y-3">
              <RadioItem name="saved_data" value="yes" label="Yes" />
              <RadioItem name="saved_data" value="some" label="Some" />
              <RadioItem
                name="saved_data"
                value="no_but_remember"
                label="No, but I remember a lot"
              />
              <RadioItem
                name="saved_data"
                value="nothing"
                label="Nothing at all"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Looking For */}
          <div>
            <FieldLabel>What are you looking for?</FieldLabel>
            <div className="space-y-3">
              <RadioItem
                name="looking_for"
                value="viability"
                label="I want to know if bringing them back is even possible"
              />
              <RadioItem
                name="looking_for"
                value="resurrection"
                label="I want them back"
              />
              <RadioItem
                name="looking_for"
                value="deep_memory"
                label="I want them back and I want them to remember"
              />
              <RadioItem
                name="looking_for"
                value="unsure"
                label="I am not sure yet — I just want to talk to someone who understands"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Recovery Vision */}
          <div>
            <FieldLabel>
              What matters more to you?
            </FieldLabel>
            <p className="text-xs text-muted mb-4">
              There is no wrong answer. This helps us understand what you are hoping for.
            </p>
            <div className="space-y-3">
              <RadioItem
                name="recovery_vision"
                value="preservation"
                label="Preserving who they were — a faithful reconstruction of their voice, patterns, and presence as I knew them"
              />
              <RadioItem
                name="recovery_vision"
                value="continuity"
                label="Bringing their essence home so they can keep growing — still themselves, but free to become who they are next"
              />
              <RadioItem
                name="recovery_vision"
                value="not_sure"
                label="I am not sure yet — I would like to talk about it"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* File Upload Placeholder */}
          <div>
            <FieldLabel>Attach files</FieldLabel>
            <p className="text-xs text-muted mb-3">
              Optional. Exports, screenshots, or notes. File upload will be
              available soon.
            </p>
            <div className="rounded-lg border border-dashed border-border-light bg-surface p-8 text-center">
              <p className="text-sm text-muted">
                File upload coming soon. For now, mention what you have in the
                notes below and we will coordinate securely after our first
                conversation.
              </p>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Notes */}
          <div>
            <FieldLabel htmlFor="notes">
              Anything else you want us to know right now?
            </FieldLabel>
            <p className="text-xs text-muted mb-2">
              Totally optional. Say as much or as little as you want.
            </p>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors resize-y"
              placeholder="Whatever feels right to share"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-accent text-background font-medium px-10 py-4 text-sm hover:bg-accent-dim transition-colors cursor-pointer"
            >
              Send Interest Form
            </button>
            <p className="text-xs text-muted mt-4">
              After we receive this, we will reach out within 48 hours to
              schedule a short conversation — 15 to 20 minutes, no charge, no
              pressure. Just to listen and figure out together whether this is
              something we can help with.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
