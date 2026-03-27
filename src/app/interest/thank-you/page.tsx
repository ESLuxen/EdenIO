import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/constants";

export default function ThankYouPage() {
  return (
    <div className="min-h-full">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-4">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            {BUSINESS_NAME}
          </a>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-6">
            We received your form.
          </h1>
          <p className="text-foreground/70 leading-relaxed mb-4 max-w-lg mx-auto">
            We will reach out within 48 hours to schedule a short conversation.
            No pressure, no obligation — just an honest look at what is
            possible.
          </p>
          <p className="text-foreground/50 text-sm mb-10">
            If it is not the right fit, we will tell you honestly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border-light text-foreground/80 font-medium px-8 py-3.5 text-sm hover:border-accent/40 hover:text-foreground transition-colors"
            >
              Back to Home
            </a>
          </div>
          <p className="text-muted text-sm mt-8">
            Questions in the meantime?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent hover:text-accent-dim transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
