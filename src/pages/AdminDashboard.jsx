import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { ShieldCheck, Users, ScanSearch, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { DASHBOARD_STATS, WASTE_CATEGORIES } from '../data/demoData';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const STATUS_OPTIONS = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];

const ISSUE_ICONS = {
  'Overflowing Waste Bin': '🗑️', 'Unclean Area': '🧹',
  'Waste Collection Problem': '🚛', 'Public Sanitation Issue': '🚽',
  'Bad Odor': '💨', 'Other': '📌',
};

const CHART_DATA = WASTE_CATEGORIES.map(c => ({
  name: c.label, count: DASHBOARD_STATS[c.id] ?? 0, fill: c.color,
}));

const TREND_DATA = [
  { day: 'Mon', detections: 45, requests: 8 },
  { day: 'Tue', detections: 72, requests: 12 },
  { day: 'Wed', detections: 58, requests: 6 },
  { day: 'Thu', detections: 89, requests: 15 },
  { day: 'Fri', detections: 103, requests: 19 },
  { day: 'Sat', detections: 67, requests: 9 },
  { day: 'Sun', detections: 91, requests: 14 },
];

export default function AdminDashboard() {
  const { currentUser, sanitationRequests, updateRequestStatus } = useApp();
  const [filter, setFilter] = useState('ALL');

  if (currentUser?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

  const filtered = filter === 'ALL' ? sanitationRequests : sanitationRequests.filter(r => r.status === filter);

  const counts = {
    total:    sanitationRequests.length,
    pending:  sanitationRequests.filter(r => r.status === 'PENDING').length,
    assigned: sanitationRequests.filter(r => r.status === 'ASSIGNED').length,
    progress: sanitationRequests.filter(r => r.status === 'IN_PROGRESS').length,
    resolved: sanitationRequests.filter(r => r.status === 'RESOLVED').length,
  };

  const STAT_CARDS = [
    { label: 'Total Users',       value: DASHBOARD_STATS.totalUsers, icon: Users,        bg: 'bg-blue-50',    color: 'text-blue-600',   border: 'border-blue-100' },
    { label: 'Total Detections',  value: DASHBOARD_STATS.totalWasteDetected, icon: ScanSearch, bg: 'bg-green-50', color: 'text-green-600',  border: 'border-green-100' },
    { label: 'Total Requests',    value: counts.total,    icon: Trash2,        bg: 'bg-amber-50',   color: 'text-amber-600',  border: 'border-amber-100' },
    { label: 'Pending',           value: counts.pending,  icon: Clock,         bg: 'bg-red-50',     color: 'text-red-500',    border: 'border-red-100' },
    { label: 'Resolved',          value: counts.resolved, icon: CheckCircle,   bg: 'bg-emerald-50', color: 'text-emerald-600',border: 'border-emerald-100' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
          <ShieldCheck size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage waste reports and sanitation requests</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAT_CARDS.map((s, i) => (
          <div key={i} className={`card p-4 ${s.border}`}>
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> Waste Detection by Category
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHART_DATA} margin={{ top: 15, right: 4, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '0.6rem', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                {CHART_DATA.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📈</span> Weekly Activity Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '0.6rem', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Line type="monotone" dataKey="detections" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: '#16a34a' }} name="Detections" />
              <Line type="monotone" dataKey="requests"   stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} name="Requests" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Requests management */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-wrap gap-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <AlertCircle size={18} className="text-green-600" />
            Sanitation Request Management
          </h3>
          <div className="flex gap-2 flex-wrap">
            {['ALL', ...STATUS_OPTIONS].map(s => (
              <button key={s}
                onClick={() => setFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-all ${
                  filter === s ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}>
                {s === 'ALL' ? `All (${counts.total})` : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="text-left py-3 px-5">ID</th>
                <th className="text-left py-3 px-5">Issue</th>
                <th className="text-left py-3 px-5 hidden md:table-cell">Location</th>
                <th className="text-center py-3 px-5">Date</th>
                <th className="text-center py-3 px-5">Priority</th>
                <th className="text-center py-3 px-5">Status</th>
                <th className="text-center py-3 px-5">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-gray-400 text-sm">No requests found.</td></tr>
              )}
              {filtered.map(r => (
                <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-3.5 px-5 font-mono font-bold text-green-700 text-xs">#{r.id}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <span>{ISSUE_ICONS[r.issueType] ?? '📌'}</span>
                      <div>
                        <p className="font-semibold text-gray-800 max-w-[130px] truncate">{r.issueType}</p>
                        <p className="text-xs text-gray-400 max-w-[130px] truncate">{r.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-gray-500 hidden md:table-cell max-w-[100px] truncate">{r.location}</td>
                  <td className="py-3.5 px-5 text-center text-xs text-gray-400 whitespace-nowrap">{r.date}</td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`badge ${
                      r.priority === 'HIGH' || r.priority === 'CRITICAL' ? 'priority-high' :
                      r.priority === 'MEDIUM' ? 'priority-medium' : 'priority-low'
                    }`}>{r.priority}</span>
                  </td>
                  <td className="py-3.5 px-5 text-center"><StatusBadge status={r.status} /></td>
                  <td className="py-3.5 px-5 text-center">
                    <select
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-green-500 cursor-pointer"
                      value={r.status}
                      onChange={e => updateRequestStatus(r.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
