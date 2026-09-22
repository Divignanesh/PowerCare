import CredentialBadges from './CredentialBadges';
import Reveal from './Reveal';

/**
 * The credential row, shown once per page.
 *
 * This replaced a thin strip welded under each hero — the same marks read
 * twice on a page, once too small to take in. One fuller row, lower down,
 * does the job better.
 */
const CredentialBand = () => (
  <section className="bg-white pt-5 pb-7 lg:pt-6 lg:pb-8">
    <div className="container-custom">
      <Reveal>
        <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500 mb-4 text-center">
          Credentials &amp; coverage on every placement
        </h2>
        <CredentialBadges variant="band" useFull />
      </Reveal>
    </div>
  </section>
);

export default CredentialBand;
