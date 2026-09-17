import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      login();
      navigate('/profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout noFooter>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 sm:px-6 py-12 bg-[#FAF7F2]">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-stone-900 tracking-tight">
              Log in to SHILPSETU
            </h1>
            <p className="text-xs text-stone-500 font-sans">
              Enter your details to access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200/80 rounded-xl p-7 sm:p-8 space-y-5 shadow-xs"
          >
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-stone-700 font-sans">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] text-[#8C3B1E] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs font-sans px-3.5 py-2.5 rounded-md border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-md bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors shadow-xs disabled:opacity-50 mt-2"
            >
              {loading ? 'Continuing…' : 'Continue'}
            </button>

            <div className="pt-2 text-center">
              <p className="text-xs text-stone-500 font-sans">
                New to SHILPSETU?{' '}
                <Link
                  to="/signup"
                  className="text-[#8C3B1E] font-medium hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
