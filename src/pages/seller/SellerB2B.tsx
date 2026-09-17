import { useState } from 'react';
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassButton } from '@/components/ui';
import { b2bOpportunities as initialOpportunities } from '@/data/b2bOpportunities';
import type { B2BOpportunity } from '@/data/types';

export default function SellerB2B() {
  const [opportunities, setOpportunities] = useState<B2BOpportunity[]>(initialOpportunities);
  const [selectedOpp, setSelectedOpp] = useState<B2BOpportunity | null>(null);
  const [proposalNotes, setProposalNotes] = useState('');
  const [sampleAvailable, setSampleAvailable] = useState(true);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleApply = (opp: B2BOpportunity) => {
    setSelectedOpp(opp);
    setQuotedPrice(opp.budget.split('–')[0].trim());
    setProposalNotes('');
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    setOpportunities(prev =>
      prev.map(item =>
        item.id === selectedOpp.id ? { ...item, status: 'applied' as const } : item
      )
    );
    setSubmittedId(selectedOpp.id);
    setSelectedOpp(null);
  };

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Header banner */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-sans font-medium text-white/90">
              <Sparkles size={12} className="text-[#E0A96D]" />
              Direct Institutional Sourcing
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
              B2B & Bulk Corporate Opportunities
            </h1>
            <p className="text-sm text-stone-300 font-sans leading-relaxed">
              Fulfill bulk orders for luxury hotels, corporate sustainability programs, and export retailers. Fair minimum pricing and verified buyers guaranteed.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <Briefcase size={220} />
          </div>
        </div>

        {/* Success toast */}
        {submittedId && (
          <div className="p-4 bg-[#2E4033]/10 border border-[#2E4033]/20 rounded-xl flex items-center justify-between text-sm text-[#2E4033]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} />
              <span>Your institutional proposal has been sent to the buyer! They will review your artisan profile within 48 hours.</span>
            </div>
            <button
              onClick={() => setSubmittedId(null)}
              className="text-xs font-medium underline hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Opportunities grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Verified Open Tenders ({opportunities.length})
            </h2>
            <span className="text-xs text-stone-500 font-sans">
              Curated based on your craft profile
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <GlassSurface
                key={opp.id}
                className="p-5 flex flex-col justify-between rounded-xl border border-stone-200/80 hover:border-stone-400/80 transition-all bg-white/70"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-sans font-medium tracking-wide bg-[#8C3B1E]/10 text-[#8C3B1E]">
                      {opp.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#2E4033] bg-[#2E4033]/10 px-2 py-0.5 rounded-full">
                      <Sparkles size={11} />
                      {opp.matchPercentage}% Match
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                      {opp.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <Building2 size={13} className="shrink-0" />
                      <span className="font-medium text-stone-700">{opp.buyerName}</span>
                      <ShieldCheck size={13} className="text-[#2E4033] shrink-0" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed line-clamp-3">
                    {opp.buyerRequirement}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs font-sans">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Required Volume</span>
                      <span className="font-semibold text-stone-800">{opp.quantity} Units</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Budget Allocation</span>
                      <span className="font-semibold text-[#8C3B1E]">{opp.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Calendar size={12} />
                    <span>Needed by {opp.requiredBy}</span>
                  </div>

                  {opp.status === 'applied' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2E4033] bg-[#2E4033]/10 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 size={13} />
                      Proposal Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(opp)}
                      className="inline-flex items-center gap-1 text-xs font-medium bg-stone-900 text-white px-3 py-1.5 rounded-lg hover:bg-[#8C3B1E] transition-colors"
                    >
                      <span>Submit Proposal</span>
                      <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>

        {/* Modal Proposal Dialog */}
        {selectedOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-[#FAF7F2] border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C3B1E]">Institutional Tender</span>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">{selectedOpp.title}</h3>
                  <p className="text-xs text-stone-500 font-sans">Buyer: {selectedOpp.buyerName}</p>
                </div>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Your Total Proposed Quotation (₹)</label>
                  <input
                    type="text"
                    value={quotedPrice}
                    onChange={(e) => setQuotedPrice(e.target.value)}
                    required
                    placeholder="e.g. ₹6,80,000"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">Buyer indicative range: {selectedOpp.budget}</p>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Production & Crafting Notes</label>
                  <textarea
                    rows={3}
                    value={proposalNotes}
                    onChange={(e) => setProposalNotes(e.target.value)}
                    placeholder="Describe your capacity, master craftsman team size, and packaging readiness..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sampleCheck"
                    checked={sampleAvailable}
                    onChange={(e) => setSampleAvailable(e.target.checked)}
                    className="rounded text-[#8C3B1E] focus:ring-[#8C3B1E]"
                  />
                  <label htmlFor="sampleCheck" className="text-stone-700 text-xs cursor-pointer">
                    We can dispatch a physical inspection prototype/sample within 5 days
                  </label>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOpp(null)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8C3B1E] text-white rounded-lg font-medium hover:bg-[#722F17] transition-colors"
                  >
                    <Send size={13} />
                    Confirm & Send Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
