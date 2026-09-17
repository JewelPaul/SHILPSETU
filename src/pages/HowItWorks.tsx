import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface } from '@/components/ui';
import { Link } from 'react-router-dom';
import {
  Search,
  Compass,
  ShoppingBag,
  PackageCheck,
  UserPlus,
  Camera,
  LayoutGrid,
  BadgeIndianRupee,
  ArrowRight,
} from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const buyerSteps: Step[] = [
  {
    number: '01',
    title: 'Browse',
    description:
      'Explore curated collections, categories, and regional craft traditions from across India.',
    icon: <Search className="w-6 h-6" />,
  },
  {
    number: '02',
    title: 'Discover',
    description:
      "Read the artisan's story, see workshop photographs, and understand the craft behind each piece.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    number: '03',
    title: 'Purchase',
    description:
      'Add to cart and check out with transparent pricing—no hidden markups, fair artisan margins.',
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    number: '04',
    title: 'Receive',
    description:
      'Your order is carefully packed by the artisan and shipped directly to your doorstep.',
    icon: <PackageCheck className="w-6 h-6" />,
  },
];

const sellerSteps: Step[] = [
  {
    number: '01',
    title: 'Sign Up',
    description:
      'Create your artisan profile—tell the world about your craft, your village, and your journey.',
    icon: <UserPlus className="w-6 h-6" />,
  },
  {
    number: '02',
    title: 'Photograph',
    description:
      'Use our mobile-friendly guide to capture stunning product images with just your phone.',
    icon: <Camera className="w-6 h-6" />,
  },
  {
    number: '03',
    title: 'Catalogue',
    description:
      'List your products with dimensions, materials, and crafting time. We help with descriptions.',
    icon: <LayoutGrid className="w-6 h-6" />,
  },
  {
    number: '04',
    title: 'Sell',
    description:
      'Receive orders, get paid directly, and grow your customer base across the country.',
    icon: <BadgeIndianRupee className="w-6 h-6" />,
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
        {step.icon}
      </div>
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-1">
          Step {step.number}
        </p>
        <h3 className="font-serif text-xl text-charcoal mb-2">{step.title}</h3>
        <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">
            The Process
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
            How SHILPSETU Works
          </h1>
          <p className="font-sans text-charcoal/60 mt-5 text-[15px] leading-relaxed max-w-xl mx-auto">
            A transparent bridge connecting India's finest artisans with conscious
            buyers—no middlemen, no markups, just craft.
          </p>
        </div>
      </section>

      {/* Two Tracks */}
      <section className="bg-linen py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Buyers */}
            <div>
              <GlassSurface variant="light" className="p-8 md:p-10 h-full">
                <p className="text-[11px] tracking-[0.2em] uppercase text-terracotta mb-6">
                  For Buyers
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 leading-tight">
                  Find &amp; own authentic Indian craft
                </h2>
                <div className="space-y-10">
                  {buyerSteps.map((step) => (
                    <StepCard key={step.number} step={step} />
                  ))}
                </div>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 mt-10 font-sans text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors group"
                >
                  Start Browsing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassSurface>
            </div>

            {/* Sellers */}
            <div>
              <GlassSurface variant="light" className="p-8 md:p-10 h-full">
                <p className="text-[11px] tracking-[0.2em] uppercase text-forest mb-6">
                  For Sellers
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 leading-tight">
                  Share your craft with the world
                </h2>
                <div className="space-y-10">
                  {sellerSteps.map((step) => (
                    <StepCard key={step.number} step={step} />
                  ))}
                </div>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 mt-10 font-sans text-sm font-medium text-forest hover:text-forest/80 transition-colors group"
                >
                  Join as an Artisan
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassSurface>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-ivory leading-tight mb-5">
            Ready to Begin?
          </h2>
          <p className="font-sans text-ivory/50 text-[15px] leading-relaxed mb-10">
            Whether you want to discover India's rich craft heritage or share your own
            artistry with the world, SHILPSETU is your platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-terracotta text-white text-sm font-medium hover:bg-terracotta-light transition-colors"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-ivory text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
