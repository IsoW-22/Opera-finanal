import arrow from '../assets/arrow.svg'
import iconMailBadge from '../assets/icon-mail-badge.svg'
import iconMail from '../assets/icon-mail.svg'
import iconPhone from '../assets/icon-phone.svg'
import iconInstagram from '../assets/icon-instagram.svg'
import iconClock from '../assets/icon-clock.svg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const channels = [
  { label: 'Email', value: 'To be confirmed by the brand', icon: iconMail },
  { label: 'Phone', value: 'To be confirmed by the brand', icon: iconPhone },
  { label: 'Instagram', value: 'To be confirmed by the brand', icon: iconInstagram },
  { label: 'Distributor terms', value: 'To be confirmed by the brand', icon: iconClock },
]

const fieldLabel = 'text-xs font-light tracking-[1px] text-clay'
const fieldInput =
  'h-[54px] w-full rounded-[14px] border border-sand-line bg-white px-[18px] text-sm text-ink-deep placeholder:text-muted-warm transition-colors duration-200 focus:border-gold-deep focus:outline-none'

function Contact() {
  return (
    <div className="min-h-screen bg-white" id="top">
      <SiteNav active="contact" />

      <main className="mx-auto grid max-w-(--max) grid-cols-[minmax(0,652px)_minmax(0,620px)] items-start justify-between gap-x-20 gap-y-12 px-(--pad) pb-[6.5rem] pt-[7.5rem] max-[1100px]:grid-cols-1 max-[780px]:px-6 max-[780px]:pb-16 max-[780px]:pt-8">
        {/* ——— Contact introduction ——— */}
        <section aria-labelledby="contact-title">
          <p className="m-0 text-[24px] font-medium uppercase text-ink/55 max-[780px]:text-[0.8125rem]">
            Contact Us
          </p>
          <h1
            id="contact-title"
            className="m-0 mt-[0.45rem] text-[clamp(2.5rem,5.3vw,5rem)] font-normal leading-[1.1] text-ink-deep max-[780px]:mt-2 max-[780px]:text-[1.75rem]"
          >
            International
            <span className="block text-gold-deep">Partners</span>
          </h1>
          <p className="m-0 mt-[1.125rem] max-w-[652px] text-base font-medium leading-[31px] text-clay max-[780px]:mt-3 max-[780px]:text-[0.875rem] max-[780px]:leading-[1.5]">
            <span className="block uppercase">Business &amp; distribution enquiries</span>
            <span className="block">For international partners and business enquiries.</span>
          </p>

          <ul className="m-0 mt-10 list-none border-b border-sand p-0 max-[780px]:mt-7">
            {channels.map((channel) => (
              <li
                key={channel.label}
                className="flex items-start gap-4 border-t border-sand pb-5 pt-[21px] max-[780px]:gap-[0.875rem] max-[780px]:py-[1.125rem]"
              >
                <span className="relative block h-[46px] w-[46px] shrink-0 max-[780px]:h-10 max-[780px]:w-10">
                  <img src={iconMailBadge} alt="" className="absolute inset-0 h-full w-full" />
                  <img
                    src={channel.icon}
                    alt=""
                    className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
                  />
                </span>
                <span className="block">
                  <span className="block text-xs font-light uppercase tracking-[2.7px] text-bronze max-[780px]:tracking-[2px]">
                    {channel.label}
                  </span>
                  <span className="mt-[0.45rem] block text-lg font-light text-ink-deep max-[780px]:text-[0.9375rem]">
                    {channel.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Message form ——— */}
        <section
          aria-labelledby="message-title"
          className="w-full rounded-[36px] bg-cream-soft px-12 pb-12 pt-[45px] max-[1100px]:max-w-[620px] max-[780px]:rounded-[1.5rem] max-[780px]:px-6 max-[780px]:pb-8 max-[780px]:pt-8"
        >
          <h2
            id="message-title"
            className="m-0 text-[40px] font-normal leading-[1.2] text-ink-deep max-[780px]:text-[2rem]"
          >
            Send a <span className="text-gold-deep">Message</span>
          </h2>

          <form className="mt-8 max-[780px]:mt-6" onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-2 gap-[18px] max-[780px]:grid-cols-1">
              <label className="flex flex-col gap-2">
                <span className={fieldLabel}>Full name</span>
                <input
                  className={fieldInput}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={fieldLabel}>Email</span>
                <input
                  className={fieldInput}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="mt-[26px] flex flex-col gap-2 max-[780px]:mt-[18px]">
              <span className={fieldLabel}>Subject</span>
              <input
                className={fieldInput}
                type="text"
                name="subject"
                placeholder="Business & distribution enquiries"
              />
            </label>

            <label className="mt-[26px] flex flex-col gap-2 max-[780px]:mt-[18px]">
              <span className={fieldLabel}>Message</span>
              <textarea
                className="h-[163px] w-full resize-none rounded-[14px] border border-sand-line bg-white px-[18px] py-4 text-sm text-ink-deep placeholder:text-muted-warm transition-colors duration-200 focus:border-gold-deep focus:outline-none max-[780px]:h-[140px]"
                name="message"
                placeholder="Write your message here"
              />
            </label>

            <button
              type="submit"
              className="mt-[31px] inline-flex h-[59px] items-center justify-center gap-[14px] rounded-[32px] bg-ink-deep px-[27px] text-base font-medium text-white transition-colors duration-200 hover:bg-dark max-[780px]:mt-6 max-[780px]:w-full"
            >
              Send Message
              <img src={arrow} alt="" className="h-[15px] w-[15px] rotate-180" />
            </button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Contact
