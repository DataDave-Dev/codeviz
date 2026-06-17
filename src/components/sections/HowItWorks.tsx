import type { ReactNode } from "react";

const svgProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: ReactNode[] = [
  <svg key="paste" {...svgProps}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>,
  <svg key="parse" {...svgProps}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="18" cy="12" r="2.2" />
    <path d="M8 6h4a4 4 0 0 1 4 4v0M8 18h4a4 4 0 0 0 4-4v0" />
  </svg>,
  <svg key="graph" {...svgProps}>
    <circle cx="6" cy="18" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <circle cx="12" cy="5" r="2.4" />
    <path d="M11 7 7 16M13 7l4 9" />
  </svg>,
];

type Step = { title: string; desc: string };

export default function HowItWorks({
  heading,
  steps,
}: {
  heading: string;
  steps: Step[];
}) {
  return (
    <section
      id="how"
      className="relative isolate flex min-h-screen items-center overflow-hidden border-y border-white/[0.07] bg-[#0c0e14]"
    >
      {/* Soft glow keeps the band from reading as a flat fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(198,206,219,0.20),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1100px] px-6 py-28 max-[620px]:py-16">
        <h2 className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold tracking-[-0.01em] text-center mb-16">
          {heading}
        </h2>

        <ol className="relative grid grid-cols-3 gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-12">
          <div
            aria-hidden="true"
            className="js-draw hidden md:block absolute top-7 left-[16.6%] right-[16.6%] border-t border-dashed border-white/20"
          />

          {steps.map((step, i) => (
            <li
              key={step.title}
              className="js-reveal group relative flex flex-col items-center text-center"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl border border-white/15 bg-[#0c0d12] text-[#e6e9ef] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/40 group-hover:bg-[#14161d] group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]">
                {ICONS[i]}
              </span>
              <span className="metallic mt-5 font-mono text-sm">
                {`0${i + 1}`}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-[32ch] text-[15px] leading-[1.65] text-muted">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
