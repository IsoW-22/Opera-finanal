import logoFooter from '../assets/logo-footer.svg'
import divider from '../assets/divider.svg'
import social1 from '../assets/social-1.svg'
import social2 from '../assets/social-2.svg'
import social3 from '../assets/social-3.svg'
import social4 from '../assets/social-4.svg'
import { Link } from '../router'

const socials = [
  { label: 'WhatsApp', icon: social1 },
  { label: 'Instagram', icon: social2 },
  { label: 'LinkedIn', icon: social3 },
  { label: 'X', icon: social4 },
]

const footerLink =
  "relative inline-block text-footer-ink transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-deep after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] hover:text-ink-deep hover:after:scale-x-100"

export default function SiteFooter() {
  return (
    <footer
      className="bg-cream-soft px-(--pad) pb-10 pt-14 text-center max-[780px]:px-6 max-[780px]:pb-[2.125rem] max-[780px]:pt-6"
      id="footer"
    >
      <div className="relative mb-8 grid place-items-center max-[780px]:mb-[2.325rem]">
        <img
          className="w-[min(10rem,40vw)] opacity-95 max-[780px]:w-[min(8.23rem,44vw)]"
          src={logoFooter}
          alt=""
          aria-hidden="true"
        />
      </div>

      <nav
        aria-label="Footer"
        className="mb-7 flex justify-center gap-[clamp(2rem,6vw,5rem)] text-base text-footer-ink max-[780px]:mb-[2.06rem] max-[780px]:justify-between max-[780px]:px-6 max-[780px]:text-sm"
      >
        <Link href="/" className={footerLink}>
          Home
        </Link>
        <Link href="/about" className={footerLink}>
          About
        </Link>
        <Link href="/contact" className={footerLink}>
          Contact Us
        </Link>
      </nav>

      <div aria-label="Social" className="mb-8 flex justify-center gap-6 max-[780px]:mb-10 max-[780px]:gap-4">
        {socials.map((social) => (
          <a
            key={social.label}
            href="#"
            aria-label={social.label}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            <img src={social.icon} alt="" className="h-[1.1rem] w-[1.1rem] invert" />
          </a>
        ))}
      </div>

      <img
        className="mx-auto mb-6 h-px w-[min(77rem,100%)] max-[780px]:mb-[1.94rem]"
        src={divider}
        alt=""
      />
      <p className="m-0 text-base text-footer-ink max-[780px]:text-[0.8125rem]">
        Copyright Satyam Studio
      </p>
    </footer>
  )
}
