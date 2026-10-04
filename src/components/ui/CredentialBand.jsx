import CredentialBadges from './CredentialBadges';
import Reveal from './Reveal';

/**
 * The credential row, shown once per page.
 *
 * This replaced a thin strip welded under each hero — the same marks read
 * twice on a page, once too small to take in. One fuller row, lower down,
 * does the job better.
 */
// The four checks every placement carries.
const BAND = ['cno', 'wsib', 'vsc', 'police'];

/** `eager` skips the scroll reveal, for a band that sits in the first screen. */
const CredentialBand = ({ eager = false }) => {
  const Wrap = eager ? 'div' : Reveal;
  return (
    <section className={`bg-white ${eager ? 'pt-6 pb-2 lg:pt-7 lg:pb-3' : 'pt-5 pb-7 lg:pt-6 lg:pb-8'}`}>
      <div className="container-custom">
        <Wrap>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-500 mb-4 text-center">
            Credentials &amp; coverage on every placement
          </h2>
          <CredentialBadges variant="band" only={BAND} useFull />
        </Wrap>
      </div>
    </section>
  );
};

export default CredentialBand;
