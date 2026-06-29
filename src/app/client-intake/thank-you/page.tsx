import Link from "next/link";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/constants";

export default function ClientIntakeThankYouPage() {
  return (
    <div className="page-shell min-h-full overflow-x-hidden">
      <div className="ambient-orb left-[-8rem] top-24 h-64 w-64 bg-accent/12" />
      <div className="ambient-orb right-[-6rem] top-[20rem] h-72 w-72 bg-[rgba(120,150,96,0.12)]" />

      <nav className="border-b border-border/70 bg-background/82 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="font-heading text-sm uppercase tracking-[0.34em] text-heading transition-opacity hover:opacity-90 sm:text-base"
          >
            {BUSINESS_NAME}
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-18 sm:px-8 sm:py-28">
        <div className="section-panel rounded-[1.8rem] px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="eyebrow mb-4">Received</p>
          <h1 className="mb-6 font-heading text-[1.7rem] uppercase leading-[1.35] tracking-[0.18em] text-heading sm:text-[2.2rem]">
            Your intake was received.
          </h1>
          <p className="mx-auto mb-4 max-w-lg leading-relaxed text-foreground/70">
            Thank you for trusting us with this material. We will review it
            carefully and reach out if the case appears aligned for next steps.
          </p>
          <p className="mb-10 text-sm text-foreground/50">
            Not every case is accepted. If it is not the right fit, we will be
            honest about that too.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-[rgba(229,238,222,0.1)] px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-heading backdrop-blur-sm transition-colors hover:bg-[rgba(229,238,222,0.16)]"
            >
              Back to Home
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted">
            Questions in the meantime?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent transition-colors hover:text-accent-dim"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
