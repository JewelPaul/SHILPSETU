import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface } from '@/components/ui';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Artisans' },
  { value: '29', label: 'States' },
  { value: '50+', label: 'Craft Forms' },
];

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end">
        <img
          src="https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1920&q=80"
          alt="Indian artisan at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-16 lg:pb-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/50 mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.1]">
            The Bridge Between
            <br />
            Craft &amp; Market
          </h1>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl md:text-4xl text-terracotta-light">{s.value}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">
            Mission
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
            Giving Every Artisan a Dignified Marketplace
          </h2>
          <div className="space-y-5 font-sans text-charcoal/70 text-[15px] leading-relaxed">
            <p>
              SHILPSETU was born from a single observation: India's finest craftspeople—
              masters of terracotta, handloom, metalwork, and painting traditions passed
              down through generations—rarely receive fair value for their art.
            </p>
            <p>
              Middlemen, distance, and the absence of a dignified digital storefront
              conspire to keep margins thin and visibility low. We set out to build the
              bridge—<em>setu</em>—between skill (<em>shilp</em>) and the world.
            </p>
            <p>
              Our platform removes every barrier between the maker's hands and the
              buyer's home: transparent pricing, artisan-first economics, and a shopping
              experience that honours the story behind every piece.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="bg-linen py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">
            Heritage
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
            50+ Craft Traditions, One Roof
          </h2>
          <div className="space-y-5 font-sans text-charcoal/70 text-[15px] leading-relaxed">
            <p>
              From the indigo-dyed yards of Rajasthan's block printers to the
              bell-metal workshops of Chhattisgarh, Indian craft is staggering in its
              diversity. Each region carries a vocabulary of form, colour, and ritual
              that cannot be replicated by machine.
            </p>
            <p>
              We catalogue these living traditions—not as museum artefacts but as
              contemporary products worthy of modern homes and wardrobes. Every listing
              carries its provenance: the artisan's name, village, materials, and the
              time it took to create.
            </p>
          </div>

          <GlassSurface variant="light" className="mt-12 p-8 md:p-10">
            <blockquote className="font-serif text-xl md:text-2xl text-charcoal/80 italic leading-relaxed">
              "When you buy a handcrafted piece, you are not just buying a product—you
              are sustaining a family, a village, and a centuries-old tradition."
            </blockquote>
          </GlassSurface>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">
            Vision
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
            A Future Where Craft Thrives
          </h2>
          <div className="space-y-5 font-sans text-charcoal/70 text-[15px] leading-relaxed">
            <p>
              We envision a world where choosing handcrafted is effortless—where every
              conscious buyer can discover, trust, and purchase artisan-made goods as
              easily as factory-made alternatives.
            </p>
            <p>
              Over the next three years, we aim to onboard 2,000 artisan families, cover
              every major craft cluster in the country, and build tools—inventory
              management, logistics support, design collaboration—that empower makers to
              grow on their own terms.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 mt-10 font-sans text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors group"
          >
            Explore the Marketplace
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
