import { auth } from "@/auth";
import { listTestimonials } from "@/lib/testimonials";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import SectionHeading from "./SectionHeading";
import TestimonialForm from "./TestimonialForm";

export default async function Testimonials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const [session, items] = await Promise.all([auth(), listTestimonials()]);

  return (
    <section id="testimonials" className="bg-white dark:bg-[#0b0d12]">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 max-[620px]:py-16">
        <SectionHeading index="08" title={t.auth.testimonialsTitle} />
        <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-[#475569] dark:text-[#9aa6b8]">
          {t.auth.testimonialsSubtitle}
        </p>

        <div className="mt-10 max-w-2xl">
          {session?.user ? (
            <TestimonialForm
              placeholder={t.auth.testimonialPlaceholder}
              submit={t.auth.testimonialSubmit}
              thanks={t.auth.testimonialThanks}
            />
          ) : (
            <p className="text-[15px] text-[#475569] dark:text-[#9aa6b8]">
              {t.auth.testimonialSignIn}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-[15px] text-[#94a3b8]">
            {t.auth.testimonialsEmpty}
          </p>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-6 max-[620px]:grid-cols-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] dark:border-[#232a36] bg-white dark:bg-[#12151c] p-6"
              >
                <p className="text-[15px] leading-[1.65] text-[#0f172a] dark:text-[#e6e9ef]">
                  {item.body}
                </p>
                <div className="flex items-center gap-3">
                  {item.userImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.userImage}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : null}
                  <span className="text-[13px] font-medium text-[#475569] dark:text-[#9aa6b8]">
                    {item.userName ?? "—"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
