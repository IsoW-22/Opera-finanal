import logo from '../assets/logo.svg'
import cart from '../assets/cart.svg'
import { btnDark } from '../styles'
import { Link } from '../router'

export type NavKey = 'home' | 'about' | 'contact'

const links: { key: NavKey; label: string; href: string }[] = [
  { key: 'home', label: 'home', href: '/' },
  { key: 'about', label: 'about us', href: '/about' },
  { key: 'contact', label: 'contact us', href: '/contact' },
]

const desktopActive =
  "relative text-xl font-medium capitalize text-ink after:absolute after:bottom-[-1.35rem] after:left-1/2 after:h-[0.35rem] after:w-[4.5rem] after:-translate-x-1/2 after:rounded-[2rem] after:bg-ink after:content-['']"
const desktopIdle =
  'relative text-xl capitalize text-ink-soft transition-colors duration-200 hover:font-medium hover:text-ink'

const navMobileLink =
  'relative block whitespace-nowrap text-[14px] capitalize transition-colors duration-200'
const navMobileActive =
  "font-medium text-ink after:absolute after:-bottom-[11px] after:left-1/2 after:h-[3px] after:w-[38px] after:-translate-x-1/2 after:rounded-full after:bg-ink after:content-['']"

export default function SiteNav({ active }: { active: NavKey }) {
  return (
    <div className="sticky top-0 z-50 px-(--pad) pt-[1.6875rem] max-[780px]:px-4 max-[780px]:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-[84.5rem] rounded-[3.2rem] bg-nav pb-[0.7rem] pl-[2rem] pr-[1.25rem] pt-[0.7rem] max-[780px]:max-w-none max-[780px]:rounded-[1.5rem] max-[780px]:p-0"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-[780px]:flex max-[780px]:items-center max-[780px]:justify-between max-[780px]:gap-2 max-[780px]:pl-[18px] max-[780px]:pr-[30px] max-[780px]:pt-3">
          <Link href="/" aria-label="OPÉRA home">
            <img src={logo} alt="OPÉRA" className="h-[2.4rem] w-auto max-[480px]:h-[2.1rem]" />
          </Link>

          <ul className="flex justify-center gap-10 max-[780px]:hidden">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={link.key === active ? desktopActive : desktopIdle}
                  aria-current={link.key === active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3 max-[780px]:gap-2">
            <button
              type="button"
              aria-label="Cart"
              className="grid h-[3.4rem] w-[3.4rem] place-items-center rounded-[2.2rem] border-[0.5px] border-[rgba(43,43,43,0.33)] bg-white max-[780px]:h-11 max-[780px]:w-11"
            >
              <img src={cart} alt="" className="w-5" />
            </button>
            <Link
              className={`${btnDark} max-[780px]:h-11 max-[780px]:gap-0 max-[780px]:px-4 max-[780px]:py-0 max-[780px]:text-base max-[480px]:px-3`}
              href="/#formula"
            >
              <span className="max-[780px]:hidden">shop now</span>
              <span className="hidden max-[780px]:inline">Discover</span>
            </Link>
          </div>
        </div>

        <ul className="hidden max-[780px]:flex max-[780px]:items-start max-[780px]:gap-[44px] max-[780px]:pl-[62px] max-[780px]:pr-6 max-[780px]:pb-[15px] max-[780px]:pt-[22px] max-[480px]:gap-5 max-[480px]:pl-6">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`${navMobileLink} ${link.key === active ? navMobileActive : 'text-ink-soft'}`}
                aria-current={link.key === active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
