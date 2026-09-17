import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/context/AuthContext';

type UsageIntent = 'shop' | 'sell' | 'both';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usage, setUsage] = useState<UsageIntent>('shop');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      login();
      navigate(usage === 'sell' ? '/seller' : '/profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout noFooter>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 sm:px-6 py-12 bg-[#FAF7F2]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-stone-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-stone-500 font-sans">
              Discover handmade India or bring your own craft to the world
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200/80 rounded-xl p-7 sm:p-8 space-y-5 shadow-xs"
          >
            <div>
              <label className="block text-xs font-medium text-stone-700 font-sans mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full name"
                className="w-full text-xs font-sans px-3.5 py-2.5 rounded-md border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 font-sans mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs font-sans px-3.5 py-2.5 rounded-md border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 font-sans mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full text-xs font-sans px-3.5 py-2.5 rounded-md border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
              />
            </div>

            {/* How will you use SHILPSETU? */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-stone-700 font-sans mb-2">
                How will you use SHILPSETU?
              </label>
              <div className="grid grid-cols-3 gap-2 text-center">
                {(
                  [
                    { id: 'shop', label: 'Shop', desc: 'Discover crafts' },
                    { id: 'sell', label: 'Sell', desc: 'List your work' },
                    { id: 'both', label: 'Both', desc: 'Shop & sell' },
                  ] as const
                ).map(opt => {
                  const isSelected = usage === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setUsage(opt.id)}
                      className={`p-3 rounded-md border text-left transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.label}</p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-stone-400 mt-2 text-center font-sans">
                One account can be both buyer and seller anytime.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-md bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs disabled:opacity-50 mt-3"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>

            <div className="pt-2 text-center">
              <p className="text-xs text-stone-500 font-sans">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#8C3B1E] font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
