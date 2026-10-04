import { useState } from 'react';
import { CheckCircle, MapPin, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ISSUE_TYPES = [
  { value: 'Overflowing Waste Bin',     icon: '🗑️' },
  { value: 'Unclean Area',              icon: '🧹' },
  { value: 'Waste Collection Problem',  icon: '🚛' },
  { value: 'Public Sanitation Issue',   icon: '🚽' },
  { value: 'Bad Odor',                  icon: '💨' },
  { value: 'Other',                     icon: '📌' },
];

const PRIORITIES = [
  { value: 'LOW',      color: 'text-gray-600 bg-gray-100 border-gray-200',       dot: 'bg-gray-400' },
  { value: 'MEDIUM',   color: 'text-amber-700 bg-amber-50 border-amber-200',     dot: 'bg-amber-400' },
  { value: 'HIGH',     color: 'text-orange-700 bg-orange-50 border-orange-200',  dot: 'bg-orange-500' },
  { value: 'CRITICAL', color: 'text-red-700 bg-red-50 border-red-200',           dot: 'bg-red-500' },
];

const EMPTY = { issueType: '', location: '', description: '', priority: 'MEDIUM' };

export default function SanitizationRequest() {
  const { addSanitationRequest, currentUser } = useApp();
  const [form,      setForm]      = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [lastId,    setLastId]    = useState('');

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const req = { id: 'SR' + Date.now(), ...form, status: 'PENDING', date: new Date().toLocaleDateString(), userId: currentUser?.id };
    addSanitationRequest(req);
    setLastId(req.id);
    setSubmitted(true);
    setForm(EMPTY);
  }

  if (submitted) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Sanitization Request</h1>
        <div className="card max-w-lg mx-auto p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Request Submitted!</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            Your request <span className="font-bold text-green-700">#{lastId}</span> has been submitted
            and is now <span className="font-bold">PENDING</span> review by the admin team.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary mt-6 px-8 py-2.5 rounded-xl">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sanitization Request</h1>
        <p className="text-sm text-gray-500 mt-0.5">Report sanitation issues for prompt resolution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 space-y-5">
            {/* Issue type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ISSUE_TYPES.map(({ value, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, issueType: value }))}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-sm ${
                      form.issueType === value
                        ? 'border-green-500 bg-green-50 text-green-800 font-semibold'
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="leading-tight text-xs font-semibold">{value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  className="form-input pl-9"
                  placeholder="e.g. Block A – Ground Floor, Near Gate 2"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Priority</label>
              <div className="flex flex-wrap gap-2.5">
                {PRIORITIES.map(({ value, color, dot }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, priority: value }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${color} ${
                      form.priority === value ? 'ring-2 ring-offset-1 ring-green-500' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                className="form-input resize-none"
                rows={4}
                placeholder="Describe the issue in detail…"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 rounded-xl text-base">
              Submit Request
            </button>
          </form>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" /> Issue Types Guide
            </p>
            <div className="space-y-2.5">
              {ISSUE_TYPES.map(({ value, icon }) => (
                <div key={value} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span>{icon}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <p className="text-sm font-bold text-gray-700 mb-3">Priority Guide</p>
            {[
              ['🟢', 'LOW',      'Non-urgent issues'],
              ['🟡', 'MEDIUM',   'Requires attention soon'],
              ['🟠', 'HIGH',     'Immediate action needed'],
              ['🔴', 'CRITICAL', 'Emergency situation'],
            ].map(([dot, p, desc]) => (
              <div key={p} className="mb-2 last:mb-0">
                <p className="text-xs font-bold text-gray-700">{dot} {p}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
