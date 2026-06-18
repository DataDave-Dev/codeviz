"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  postTestimonial,
  type TestimonialFormState,
} from "@/lib/testimonials";

const INITIAL: TestimonialFormState = { ok: false };

type Props = {
  placeholder: string;
  submit: string;
  thanks: string;
};

export default function TestimonialForm({ placeholder, submit, thanks }: Props) {
  const router = useRouter();
  const [state, action, pending] = useActionState(postTestimonial, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
      <textarea
        name="body"
        required
        minLength={3}
        maxLength={1000}
        rows={3}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-[#e2e8f0] dark:border-[#232a36] bg-white dark:bg-[#12151c] px-4 py-3 text-[15px] text-[#0f172a] dark:text-[#e6e9ef] outline-none focus-visible:border-[#4f46e5]"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#4f46e5] dark:bg-[#6366f1] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-px disabled:opacity-50"
        >
          {submit}
        </button>
        {state.ok && (
          <span className="text-[13px] text-emerald-600 dark:text-emerald-400">
            {thanks}
          </span>
        )}
      </div>
    </form>
  );
}
