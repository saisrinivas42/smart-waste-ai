import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login }  = useApp();
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  function fillDemo(role) {
    setEmail(role === 'admin' ? 'admin@smartwaste.com' : 'user@smartwaste.com');
    setPassword(role === 'admin' ? 'admin123' : 'user123');
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(email.trim(), password);
    setLoading(false);
    if (result.success) navigate(result.user.role === 'ADMIN' ? '/admin' : '/dashboard');
    else setError(result.message);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #16a34a 0%, #059669 50%, #047857 100%)' }}
      >
        {/* Circles decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 text-center max-w-md">
          <div className="text-8xl mb-6">♻️</div>
          <h2 className="text-3xl font-bold mb-4">Smart Waste AI</h2>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            AI-powered waste segregation, disposal guidance, and sanitization management — all in one platform.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[['🗑️', 'Detect Waste'], ['📊', 'Analytics'], ['🧹', 'Sanitization']].map(([icon, label]) => (
              <div key={label} className="bg-white bg-opacity-10 rounded-2xl p-4">
                <p className="text-3xl mb-1">{icon}</p>
                <p className="text-xs text-green-100 font-medium">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-green-200 text-sm">Smart India Hackathon 2026 · Problem #SIH-SW-001</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-600 mb-3 shadow-lg">
              <span className="text-2xl">♻️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SmartWaste AI</h1>
          </div>

          <div className="card p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="form-input pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base rounded-xl">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-3 font-medium">QUICK DEMO ACCESS</p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => fillDemo('user')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors text-sm font-semibold text-green-700"
                >
                  👤 User Demo
                </button>
                <button
                  onClick={() => fillDemo('admin')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-semibold text-blue-700"
                >
                  🛡️ Admin Demo
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2.5">Click above to fill credentials, then Sign In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
