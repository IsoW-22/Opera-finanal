import sparkle1 from './assets/sparkle-1.svg'
import sparkle2 from './assets/sparkle-2.svg'
import arrow from './assets/arrow.svg'
import heroProduct from './assets/hero-product.png'
import heroWatermark from './assets/hero-watermark.svg'
import frameCorners from './assets/frame-corners.svg'
import iconVolumeBadge from './assets/icon-volume-badge.svg'
import iconDeepBlack from './assets/icon-deep-black.svg'
import mascaraTube from './assets/mascara-tube.png'
import iconVolume from './assets/icon-volume.svg'
import iconDefinition from './assets/icon-definition.svg'
import iconBuildable from './assets/icon-buildable.svg'
import iconPackaging from './assets/icon-packaging.svg'
import ritualProduct from './assets/ritual-product.png'
import ritualWatermark from './assets/ritual-watermark.svg'
import aboutArch from './assets/about-arch.png'
import statOrders from './assets/stat-orders.svg'
import statVisitors from './assets/stat-visitors.svg'
import statSatisfaction from './assets/stat-satisfaction.svg'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import { btnWithIcon } from './styles'

const notes = [
  {
    title: 'Volume',
    copy: 'Coats every lash from root to tip for a fuller, bolder look.',
    icon: iconVolume,
  },
  {
    title: 'Definition',
    copy: 'Separates lashes for a fanned-out, defined finish.',
    icon: iconDefinition,
  },
  {
    title: 'Buildable',
    copy: 'One coat for daytime, layer up for the evening.',
    icon: iconBuildable,
  },
  {
    title: 'Statement Packaging',
    copy: 'An ivory and gold tube, made to be seen on your vanity.',
    icon: iconPackaging,
  },
]

const acts = [
  {
    num: '01',
    act: 'ACT I',
    title: 'Prepare',
    copy: 'Start with clean, dry lashes. Curl first for extra lift.',
  },
  {
    num: '02',
    act: 'ACT II',
    title: 'Apply',
    copy: 'Place the brush at the base of your lashes and sweep upward in a gentle zigzag.',
  },
  {
    num: '03',
    act: 'ACT III',
    title: 'Build',
    copy: 'Add another coat for more drama, then finish with the lower lashes.',
  },
]

const stats = [
  { value: '12K+', label: 'Orders delivered', icon: statOrders },
  { value: '56K+', label: 'Monthly visitors', icon: statVisitors },
  { value: '4.9/5', label: 'Customer satisfaction', icon: statSatisfaction },
]

/* ——— Reusable motion compositions ——— */
const reveal = 'animate-rise'
const revealDelay = 'animate-rise [animation-delay:0.12s]'
const revealDelay2 = 'animate-rise [animation-delay:0.28s]'
const revealProduct =
  'animate-rise [animation-duration:1.1s] [animation-delay:0.18s]'

/* Shared hover motion: 350ms ease-out, applied to cards. */
const smoothHover = 'transition duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
const smoothHoverColors =
  'transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]'

const actPosition = [
  'col-span-full',
  'col-start-2 justify-self-start',
  'col-start-1',
]
const actResponsive =
  'max-[1100px]:col-span-1 max-[1100px]:col-start-1 max-[1100px]:max-w-none max-[1100px]:justify-self-auto'

function App() {
  return (
    <div className="overflow-x-clip" id="top">
      <SiteNav active="home" />

      {/* ——— Hero ——— */}
      <header className="relative isolate min-h-[calc(min(100vh,64rem)-6.6875rem)] overflow-hidden rounded-b-[4.8rem] bg-[linear-gradient(180deg,#ffffff_0%,#f2efec_100%)] px-(--pad) pb-14 max-[780px]:min-h-0 max-[780px]:rounded-b-[1.75rem] max-[780px]:px-6 max-[780px]:pb-[1.375rem]">
        <div className="relative z-[3] mt-[clamp(2rem,5vw,4.5rem)] text-center max-[780px]:mt-[2.06rem]">
          <p
            className={`${reveal} m-0 text-[clamp(1.1rem,2vw,1.5rem)] uppercase tracking-[0.04em] max-[780px]:text-base max-[780px]:tracking-normal`}
          >
            Make Every Blink a
          </p>
          <h1
            className={`${revealDelay} m-0 mt-[0.35rem] bg-[linear-gradient(82deg,#2b2b2b_0%,#282828_42%,#7f6844_66%,#3a3838_97%)] bg-clip-text text-[clamp(2.75rem,7vw,4.15rem)] font-medium uppercase leading-none text-transparent max-[780px]:mt-2 max-[780px]:text-[2.6875rem]`}
          >
            Performance
          </h1>
        </div>

        <img
          className="pointer-events-none absolute right-[22%] top-[12.5rem] z-[2] w-6 animate-twinkle max-[780px]:right-[2.1rem] max-[780px]:top-[9.94rem] max-[780px]:w-[0.9rem]"
          src={sparkle1}
          alt=""
        />
        <img
          className="pointer-events-none absolute left-[30%] top-[19rem] z-[2] w-5 animate-twinkle [animation-delay:1.1s] max-[780px]:left-[1.94rem] max-[780px]:top-[15.6rem] max-[780px]:w-[0.75rem]"
          src={sparkle2}
          alt=""
        />

        <div className="relative z-[2] mx-auto mt-[-1rem] grid w-[min(80rem,100%)] place-items-center max-[780px]:left-1/2 max-[780px]:mt-[1.375rem] max-[780px]:w-[177.3%] max-[780px]:-translate-x-1/2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[5%] aspect-square w-[min(48rem,90%)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(242,239,236,0.35)_45%,transparent_70%)] max-[780px]:w-[94%]"
          />
          <img
            className="pointer-events-none absolute w-[min(45rem,72%)] opacity-90 max-[780px]:hidden"
            src={frameCorners}
            alt=""
            aria-hidden="true"
          />
          <img
            className="pointer-events-none absolute hidden w-[73.9%] max-[780px]:left-1/2 max-[780px]:top-[44.8%] max-[780px]:block max-[780px]:-translate-x-1/2"
            src={heroWatermark}
            alt=""
            aria-hidden="true"
          />
          <img
            className={`${revealProduct} relative mt-4 w-[min(80rem,100%)] drop-shadow-[0_24px_40px_rgba(43,43,43,0.12)] max-[780px]:mt-0 max-[780px]:drop-shadow-[0_14px_24px_rgba(43,43,43,0.12)]`}
            src={heroProduct}
            alt="OPÉRA Ultra Volume mascara bottles on stone"
          />
        </div>

        <div
          className={`${revealDelay2} absolute left-(--pad) top-[48%] z-[4] max-w-[21rem] max-[1100px]:static max-[1100px]:mt-6 max-[1100px]:max-w-none max-[780px]:relative max-[780px]:z-10 max-[780px]:mt-[-1.7rem] max-[780px]:max-w-none`}
        >
          <p className="m-0 mb-6 text-xl capitalize leading-[1.45] text-ink-faint max-[780px]:mb-7 max-[780px]:text-lg max-[780px]:leading-[1.4]">
            A weightless, buildable formula that lifts and separates every lash
            for a gaze that feels like opening night.
          </p>
          <div className="flex flex-wrap items-center gap-5 max-[780px]:justify-start max-[780px]:gap-2">
            <a
              className={`${btnWithIcon} max-[780px]:h-[3.625rem] max-[780px]:px-[1.625rem] max-[780px]:py-0 max-[780px]:text-[0.875rem]`}
              href="#formula"
            >
              <span className="max-[780px]:hidden">shop now</span>
              <span className="hidden max-[780px]:inline">Discover Ultra Volume</span>
              <img src={arrow} alt="" />
            </a>
            <span className="hidden h-[3.125rem] w-[3.0625rem] items-center justify-center rounded-[1.125rem] border-[0.5px] border-[rgba(43,43,43,0.33)] px-3 text-sm capitalize text-ink max-[780px]:inline-flex max-[780px]:px-0">
              Black
            </span>
            <span className="text-base capitalize text-[rgba(43,43,43,0.8)] max-[780px]:hidden">
              32.99 EUR
            </span>
          </div>
        </div>

        <div
          className={`${revealDelay2} absolute right-(--pad) top-[42%] z-[4] grid max-w-[21rem] gap-3 max-[1100px]:static max-[1100px]:mt-6 max-[1100px]:max-w-none max-[1100px]:grid-cols-2 max-[780px]:mt-[1.375rem] max-[780px]:grid-cols-1 max-[780px]:gap-2.5`}
        >
          <article className="flex w-[16.875rem] items-start gap-2.5 rounded-[1.2rem] bg-white py-[0.95rem] pl-[0.8rem] pr-[1.9rem] shadow-[0_10px_30px_rgba(43,43,43,0.04)] max-[780px]:w-full max-[780px]:items-center max-[780px]:rounded-[1.1875rem] max-[780px]:py-[0.9375rem] max-[780px]:pl-[0.8125rem] max-[780px]:pr-[1.9375rem]">
            <img src={iconVolumeBadge} alt="" className="h-9 w-9 shrink-0" />
            <div>
              <strong className="block text-base font-medium capitalize">
                Full Volume
              </strong>
              <span className="mt-[0.15rem] block text-sm font-light capitalize">
                full-looking lashes
              </span>
            </div>
          </article>
          <article className="flex w-[16.875rem] items-start gap-2.5 rounded-[1.2rem] bg-white py-[0.95rem] pl-[0.8rem] pr-[1.9rem] shadow-[0_10px_30px_rgba(43,43,43,0.04)] max-[780px]:w-full max-[780px]:items-center max-[780px]:rounded-[1.1875rem] max-[780px]:py-[0.9375rem] max-[780px]:pl-[0.8125rem] max-[780px]:pr-[1.9375rem]">
            <img src={iconDeepBlack} alt="" className="h-9 w-9 shrink-0" />
            <div>
              <strong className="block text-base font-medium capitalize">
                Deep Black
              </strong>
              <span className="mt-[0.15rem] block text-sm font-light capitalize">
                A rich, intense colour
              </span>
            </div>
          </article>
        </div>

        <div className="relative z-[3] mx-auto mt-6 flex max-w-[84.5rem] justify-between gap-4 text-base capitalize text-ink-muted max-[1100px]:mt-8 max-[780px]:mt-[1.75rem] max-[780px]:text-[0.625rem]">
          <span>Maison Opéra · Paris</span>
          <span>N° 01 — Ultra Volume Mascara</span>
        </div>
      </header>

      {/* ——— Formula ——— */}
      <section
        className="relative mx-auto max-w-(--max) px-(--pad) pb-20 pt-24 max-[780px]:px-6 max-[780px]:pb-14 max-[780px]:pt-14"
        id="formula"
      >
        <p
          aria-hidden="true"
          className="m-0 overflow-hidden bg-[linear-gradient(180deg,rgba(43,43,43,0.11)_0%,rgba(145,145,145,0)_100%)] bg-clip-text text-[clamp(3.5rem,10vw,8rem)] font-medium uppercase leading-none tracking-[0.39em] text-transparent whitespace-nowrap max-[780px]:text-[2rem] max-[780px]:tracking-[4px]"
        >
          The Formula
        </p>

        <div className="mb-10 mt-[-1.5rem] flex flex-wrap items-end justify-between gap-8 max-[780px]:mb-5 max-[780px]:mt-5 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-5">
          <h2 className="m-0 text-[clamp(1.75rem,3vw,2.25rem)] font-medium uppercase leading-[1.15] max-[780px]:text-[1.75rem]">
            Four Notes,
            <br />
            <span className="text-gold">One Performance</span>
          </h2>
          <p className="m-0 mb-2 text-base uppercase max-[780px]:mb-0 max-[780px]:text-[0.875rem]">
            Everything Ultra Volume is made to do.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch gap-6 max-[1100px]:grid-cols-1 max-[780px]:gap-5">
          <article className="relative min-h-[30rem] overflow-hidden rounded-[3.4rem] bg-dark p-8 text-white before:pointer-events-none before:bottom-[-35%] before:left-[15%] before:right-[-10%] before:top-auto before:h-[70%] before:rounded-full before:bg-[radial-gradient(circle,rgba(168,131,74,0.35),transparent_65%)] before:content-[''] max-[780px]:h-[18.84rem] max-[780px]:min-h-0 max-[780px]:rounded-[2.13rem] max-[780px]:p-6 max-[780px]:pt-5">
            <p className="m-0 text-xl uppercase text-white/62 max-[780px]:text-[0.775rem]">
              N° 01
            </p>
            <h3 className="m-0 mt-[0.35rem] text-[clamp(2.5rem,5vw,4rem)] font-medium uppercase leading-none max-[780px]:-mt-1 max-[780px]:text-[2.48rem]">
              Ultra Volume
            </h3>
            <p className="absolute right-10 top-[8.5rem] m-0 text-xl font-light uppercase max-[780px]:right-[3.6rem] max-[780px]:top-[5.31rem] max-[780px]:text-[0.775rem]">
              Mascara
            </p>
            <img
              src={mascaraTube}
              alt="Ultra Volume mascara tube"
              className="relative mx-auto mt-6 w-[5.25rem] drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] max-[780px]:absolute max-[780px]:left-[10.62rem] max-[780px]:top-[3.57rem] max-[780px]:mt-0 max-[780px]:h-[14.61rem] max-[780px]:w-[3.26rem] max-[780px]:object-cover"
            />
            <div className="absolute bottom-8 right-8 rounded-[2.75rem] bg-white/10 px-[2.375rem] py-[1.875rem] text-2xl font-medium capitalize max-[780px]:bottom-[1.2rem] max-[780px]:right-[5.08rem] max-[780px]:rounded-[1.7rem] max-[780px]:px-[1.47rem] max-[780px]:py-[1.16rem] max-[780px]:text-[0.93rem]">
              <span className="max-[780px]:hidden">32.99 EUR</span>
              <span className="hidden max-[780px]:inline">Black</span>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-[1.1rem] max-[780px]:grid-cols-1 max-[780px]:gap-5">
            {notes.map((note) => (
              <article
                key={note.title}
                className={`group min-h-[14.3rem] rounded-[1.25rem] border-[0.5px] border-gold-soft bg-cream-soft px-4 pb-5 pt-[1.15rem] ${smoothHover} hover:scale-[1.03] hover:border-gold max-[780px]:h-[11.375rem] max-[780px]:min-h-0 max-[780px]:rounded-[1rem] max-[780px]:border-0 max-[780px]:px-5 max-[780px]:pb-5 max-[780px]:pt-5 max-[780px]:hover:scale-100`}
              >
                <div className="max-[780px]:flex max-[780px]:items-center max-[780px]:gap-[0.9375rem]">
                  <div className="mb-[1.35rem] grid h-[3.55rem] w-[3.55rem] place-items-center rounded-full bg-white shadow-[0_2px_23.5px_rgba(168,131,74,0.1)] max-[780px]:mb-0">
                    <img src={note.icon} alt="" className="h-8 w-8" />
                  </div>
                  <h3
                    className={`m-0 mb-[0.85rem] text-2xl font-medium uppercase text-ink ${smoothHoverColors} group-hover:text-gold max-[780px]:mb-0 max-[780px]:text-[1.25rem] max-[780px]:text-gold`}
                  >
                    {note.title}
                  </h3>
                </div>
                <p className="m-0 text-base uppercase leading-[1.4] text-ink-soft max-[780px]:mt-[1.5625rem] max-[780px]:text-[0.875rem] max-[780px]:leading-[1.45]">
                  {note.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Ritual ——— */}
      <section
        className="grid grid-cols-[1.15fr_0.85fr] items-center gap-x-8 gap-y-0 overflow-hidden bg-cream-deep px-(--pad) pb-14 pt-[2.5rem] max-[1100px]:grid-cols-1 max-[1100px]:gap-y-8 max-[780px]:gap-y-0 max-[780px]:px-6 max-[780px]:pb-12 max-[780px]:pt-8"
        id="ritual"
      >
        <div className="relative col-start-2 row-span-2 row-start-1 grid place-items-center max-[1100px]:col-start-auto max-[1100px]:row-span-1 max-[1100px]:row-start-auto max-[780px]:order-2 max-[780px]:mt-[2.2rem] max-[780px]:block max-[780px]:h-[21rem]">
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[min(36rem,100%)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),transparent_70%)] max-[780px]:right-[-1.5rem] max-[780px]:top-2 max-[780px]:w-[87%]"
          />
          <img
            src={ritualWatermark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute hidden w-full max-[780px]:-top-2 max-[780px]:block"
          />
          <img
            src={ritualProduct}
            alt="Open Ultra Volume mascara wand resting on stone"
            className="relative w-[min(34rem,100%)] drop-shadow-[0_20px_40px_rgba(43,43,43,0.15)] max-[780px]:absolute max-[780px]:right-0 max-[780px]:top-0 max-[780px]:w-[86.7%]"
          />
        </div>

        <div className="max-[780px]:order-1">
          <p className="m-0 mb-6 text-base font-medium uppercase max-[780px]:mb-7 max-[780px]:text-[0.8125rem]">
            How to Apply
          </p>
          <h2 className="m-0 mb-10 text-[clamp(1.75rem,3vw,2rem)] font-bold uppercase leading-[1.2] max-[780px]:mb-0 max-[780px]:text-[1.75rem]">
            The Ritual,
            <br />
            <span className="font-medium text-gold">in Three Acts</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-[1.1rem] max-[1100px]:grid-cols-1 max-[780px]:order-3 max-[780px]:mt-[1.1rem] max-[780px]:gap-[1.625rem]">
          {acts.map((act, i) => (
            <article
              key={act.num}
              className={`${actPosition[i]} ${actResponsive} group min-h-[10.5rem] max-w-[30.5rem] rounded-[1.625rem] bg-white p-[1.15rem] pb-5 text-ink ${smoothHover} hover:scale-[1.03] hover:bg-black hover:text-white max-[780px]:h-[9.375rem] max-[780px]:min-h-0 max-[780px]:max-w-none max-[780px]:rounded-[1rem] max-[780px]:p-5 max-[780px]:hover:scale-100`}
            >
              <div className="mb-[1.1rem] flex items-start justify-between gap-4 max-[780px]:mb-8">
                <div className="flex items-baseline gap-3 max-[780px]:gap-[1.5625rem]">
                  <span
                    className={`text-[2rem] uppercase text-ink-muted ${smoothHoverColors} group-hover:text-white/44 max-[780px]:text-[1.375rem]`}
                  >
                    {act.num}
                  </span>
                  <strong className="text-[2rem] font-medium uppercase max-[780px]:text-[1.375rem]">
                    {act.title}
                  </strong>
                </div>
                <span
                  className={`text-base uppercase text-ink-soft ${smoothHoverColors} group-hover:text-white/66 max-[780px]:text-[0.75rem]`}
                >
                  {act.act}
                </span>
              </div>
              <p
                className={`m-0 max-w-[28rem] text-base leading-[1.4] ${smoothHoverColors} max-[780px]:text-[0.875rem] max-[780px]:uppercase max-[780px]:leading-[1.45] max-[780px]:text-ink/60`}
              >
                {act.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ——— About ——— */}
      <section
        className="mx-auto grid max-w-(--max) grid-cols-[minmax(16rem,29rem)_minmax(0,1fr)] items-center gap-[clamp(2rem,5vw,5rem)] px-(--pad) pb-16 pt-20 max-[1100px]:grid-cols-1 max-[780px]:gap-6 max-[780px]:px-6 max-[780px]:pb-14 max-[780px]:pt-14"
        id="about"
      >
        <div>
          <img
            src={aboutArch}
            alt="OPÉRA mascara framed in an arched niche"
            className="w-full rounded-b-[12rem] max-[780px]:rounded-b-none"
          />
        </div>

        <div className="relative pt-8 max-[780px]:pt-2">
          <img
            className="pointer-events-none absolute right-[18%] top-0 w-6 animate-twinkle max-[780px]:hidden"
            src={sparkle1}
            alt=""
          />
          <img
            className="pointer-events-none absolute -left-4 top-[42%] w-6 animate-twinkle [animation-delay:0.8s] max-[780px]:hidden"
            src={sparkle1}
            alt=""
          />
          <img
            className="pointer-events-none absolute right-0 top-[18%] w-6 animate-twinkle [animation-delay:1.6s] max-[780px]:hidden"
            src={sparkle1}
            alt=""
          />

          <p className="m-0 mb-4 max-w-[46rem] text-xl uppercase leading-[1.45] max-[780px]:mb-6 max-[780px]:text-lg max-[780px]:leading-[1.4]">
            Born in Paris, Maison Opéra crafts beauty for the evening curtain
            call — and every glance that comes before it.
          </p>
          <p className="m-0 mb-7 max-w-[45rem] text-base uppercase leading-[1.5] text-ink-soft max-[780px]:mb-6 max-[780px]:text-[0.9375rem]">
            Ultra Volume is our opening number: a weightless black that builds
            from soft daylight to full stage drama, housed in ivory and gold
            made for the vanity.
          </p>
          <a
            className={`${btnWithIcon} max-[780px]:h-[3.625rem] max-[780px]:px-[1.625rem] max-[780px]:py-0 max-[780px]:text-[0.8125rem]`}
            href="#formula"
          >
            Shop Ultra Volume
            <img src={arrow} alt="" />
          </a>

          <div
            role="list"
            className="mt-12 grid grid-cols-3 gap-4 rounded-[1.2rem] border-[0.5px] border-gold-line px-[1.1rem] py-4 max-[780px]:mt-6 max-[780px]:grid-cols-1 max-[780px]:gap-0 max-[780px]:rounded-[1rem] max-[780px]:border max-[780px]:border-[#e8decf] max-[780px]:px-6 max-[780px]:py-5"
          >
            {stats.map((stat, i) => (
              <div
                role="listitem"
                key={stat.label}
                className={`flex items-center gap-[0.85rem] px-[0.5rem] py-[0.35rem] max-[780px]:gap-[1.125rem] max-[780px]:px-0 max-[780px]:py-[0.7rem] ${i < stats.length - 1 ? 'border-r border-[rgba(168,131,74,0.25)] max-[780px]:border-0' : ''}`}
              >
                <img src={stat.icon} alt="" className="h-[2.625rem] w-[2.625rem]" />
                <div>
                  <strong className="block text-[2rem] font-medium uppercase leading-[1.1] text-gold max-[780px]:text-[1.75rem]">
                    {stat.value}
                  </strong>
                  <span className="mt-[0.2rem] block text-base uppercase text-ink-soft max-[780px]:text-[0.8125rem]">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <SiteFooter />
    </div>
  )
}

export default App
