/* ——— Shared utility compositions ——— */

/**
 * One motion language for every button: 350ms ease-out on the full
 * transition list (`translate` / `scale` / shadow included, so the lift never
 * snaps), with a softer, faster press state.
 */
const btnMotion = 'transition duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]'

export const btn = `inline-flex items-center justify-center gap-2.5 rounded-[2.1875rem] px-[1.625rem] py-[1.0625rem] text-base font-normal capitalize ${btnMotion}`

export const btnDark = `${btn} bg-ink text-white hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#1b1610] hover:shadow-[0_14px_28px_-10px_rgba(168,131,74,0.5)] active:translate-y-0 active:scale-[0.99] active:shadow-none active:duration-150`

export const btnWithIcon = `${btnDark} [&>img]:h-6 [&>img]:w-6 [&>img]:rotate-180 [&>img]:transition [&>img]:duration-[350ms] [&>img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>img]:translate-x-1`
