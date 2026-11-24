import logoLockup from '../assets/logo-footer.svg'
import sparkle1 from '../assets/sparkle-1.svg'
import sparkle2 from '../assets/sparkle-2.svg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

type Section = {
  title: string
  lines?: string[]
  body?: string
}

const sections: Section[] = [
  {
    title: 'Product details',
    lines: [
      'Product: N° 01 – Ultra Volume Mascara',
      'Product Type: Washable Mascara',
      'Shade: Black',
      'Claim Direction: Volumizing + Lengthening',
      'Pilot Formula Size: 1,000 Kg Pilot Batch (R&D Document)',
    ],
  },
  {
    title: 'A note on formula & product claims',
    body:
      'The Supplied R&D Sheet Identifies This As A Washable Volumizing And Lengthening Mascara Pilot Formula. It Is Marked “NOT FOR PRODUCTION RELEASE” And Lists Factory Validation Requirements, Including Microbiological Testing, Preservative Challenge Testing, Stability, Packaging Compatibility And Cosmetic Safety Assessment. Do Not Publish Claims Such As Waterproof, Sweat-Resistant, Long-Wear, Ophthalmologist-Tested, Hypoallergenic, Or Suitable For Sensitive Eyes Unless Supported By Appropriate Product Testing And Documentation.',
  },
  {
    title: 'For international partners',
    body:
      'For A Brand-Introduction Website Focused On International Visibility And Business Enquiries, Use A Clear Contact Invitation Rather Than A Direct Shopping Prompt.',
  },
  {
    title: 'Business & distribution enquiries',
    body:
      'Country Of Manufacture, Brand Origin, Certifications, Distributor Terms And Contact Details: To Be Added Only After Confirmation By The Brand.',
  },
]

const sectionHeading =
  'm-0 text-[13px] uppercase tracking-[0.12em] text-ink max-[780px]:text-[11px] max-[780px]:tracking-[0.14em]'
const sectionCopy =
  'text-[13px] leading-[1.32] text-ink max-[780px]:text-[13px] max-[780px]:leading-[1.45]'

function About() {
  return (
    <div className="min-h-screen bg-white" id="top">
      <SiteNav active="about" />

      <main className="relative mx-auto max-w-(--max) overflow-hidden px-(--pad) pb-[7rem] pt-[7.5rem] max-[1100px]:pb-24 max-[780px]:px-6 max-[780px]:pb-16 max-[780px]:pt-8">
        <div className="grid grid-cols-[minmax(0,42.5rem)_minmax(0,1fr)] gap-x-20 max-[1100px]:grid-cols-1">
          {/* ——— Title ——— */}
          <div>
            <p className="m-0 text-[24px] leading-[1.2] text-ink/55 max-[780px]:text-[0.8125rem]">
              About Us
            </p>
            <h1 className="m-0 mt-[0.15rem] text-[5rem] font-normal leading-[1.24] text-ink-deep max-[780px]:mt-2 max-[780px]:text-[2.25rem] max-[780px]:leading-[1.15]">
              Beauty,
              <span className="block text-gold-deep">On Stage</span>
            </h1>
          </div>

          {/* ——— Brand lockup ——— */}
          <div className="row-span-2 mt-14 flex items-start justify-center max-[1100px]:row-span-1 max-[1100px]:mt-12 max-[780px]:mt-9">
            <img
              src={logoLockup}
              alt="OPÉRA Eyes Paris"
              className="w-full max-w-[27.75rem] max-[1100px]:w-[19rem] max-[780px]:w-[13.5rem]"
            />
          </div>

          {/* ——— Product / legal information ——— */}
          <div className="mt-[0.8rem] max-w-[42.5rem] space-y-[1.3rem] max-[1100px]:mt-10 max-[780px]:mt-8 max-[780px]:space-y-5">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className={sectionHeading}>{section.title}</h2>
                {section.lines ? (
                  <ul
                    className={`m-0 mt-[0.35rem] list-none space-y-[0.18rem] p-0 max-[780px]:mt-2 ${sectionCopy}`}
                  >
                    {section.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={`m-0 mt-[0.35rem] max-[780px]:mt-2 ${sectionCopy}`}>{section.body}</p>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* ——— Watermark ——— */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-[4.3rem] select-none whitespace-nowrap text-center text-[clamp(3rem,8.6vw,8.125rem)] uppercase leading-none tracking-[0.34em] text-cream max-[780px]:mt-12 max-[780px]:text-[2.25rem] max-[780px]:tracking-[0.3em]"
        >
          About Us
        </p>

        {/* ——— Decorative sparkles ——— */}
        <img
          src={sparkle1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[2.6rem] left-[7.7rem] w-6 max-[1100px]:hidden"
        />
        <img
          src={sparkle2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[2.9rem] left-1/2 w-5 -translate-x-1/2 max-[1100px]:hidden"
        />
      </main>

      <SiteFooter />
    </div>
  )
}

export default About
