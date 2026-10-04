import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { ChevronRight, Recycle, Trash2, Clock, CheckCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { DASHBOARD_STATS, WASTE_CATEGORIES } from '../data/demoData';
import { useApp } from '../context/AppContext';

/* ── Bar chart data ─────────────────────────────────────────────────────── */
const BAR_DATA = WASTE_CATEGORIES.map((c) => ({
  name:  c.label,
  count: DASHBOARD_STATS[c.id] ?? 0,
  fill:  c.color,
  icon:  c.icon,
}));

/* ── Pie chart data ─────────────────────────────────────────────────────── */
const PIE_DATA = WASTE_CATEGORIES.map((c) => ({
  name:  c.label,
  value: DASHBOARD_STATS[c.id] ?? 0,
  color: c.color,
}));

/* ── Stat cards config ──────────────────────────────────────────────────── */
const STAT_CARDS = [
  {
    label:  'Total Waste Detected',
    value:  '847',
    trend:  '+12% from last week',
    up:     true,
    icon:   <Recycle size={28} className="text-green-600" />,
    bg:     'bg-green-50',
    border: 'border-green-100',
  },
  {
    label:  'Sanitization Requests',
    value:  '43',
    trend:  '+5% from last week',
    up:     true,
    icon:   <Trash2 size={28} className="text-blue-500" />,
    bg:     'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label:  'Pending Requests',
    value:  '12',
    trend:  '+2% from last week',
    up:     false,
    icon:   <Clock size={28} className="text-orange-500" />,
    bg:     'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    label:  'Resolved Requests',
    value:  '28',
    trend:  '+18% from last week',
    up:     true,
    icon:   <CheckCircle size={28} className="text-green-500" />,
    bg:     'bg-emerald-50',
    border: 'border-emerald-100',
  },
];

/* ── Quick actions ──────────────────────────────────────────────────────── */
const QUICK_ACTIONS = [
  { label: 'Classify Waste',          sub: 'Upload image to detect waste',        to: '/waste-detection',      bg: 'bg-green-50',  icon: '🔍', iconBg: 'bg-green-100' },
  { label: 'Report Sanitization Issue', sub: 'Report unclean areas or problems',  to: '/sanitization-request', bg: 'bg-blue-50',   icon: '📋', iconBg: 'bg-blue-100' },
  { label: 'View My Requests',         sub: 'Track your submitted requests',       to: '/my-requests',          bg: 'bg-purple-50', icon: '📄', iconBg: 'bg-purple-100' },
  { label: 'Disposal Guidance',        sub: 'Learn how to segregate & dispose',    to: '/disposal-guidance',    bg: 'bg-amber-50',  icon: '📖', iconBg: 'bg-amber-100' },
];

/* ── Custom bar label ───────────────────────────────────────────────────── */
function CustomBarLabel({ x, y, width, value }) {
  return (
    <text x={x + width / 2} y={y - 4} textAnchor="middle" fontSize={11} fill="#374151" fontWeight={600}>
      {value}
    </text>
  );
}

/* ── Custom X-axis tick with emoji ─────────────────────────────────────── */
function CustomXTick({ x, y, payload }) {
  const cat = WASTE_CATEGORIES.find(c => c.label === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fontSize={11} fill="#6b7280">{payload.value}</text>
      <text x={0} y={0} dy={24} textAnchor="middle" fontSize={14}>{cat?.icon}</text>
    </g>
  );
}

/* ── Priority badge ─────────────────────────────────────────────────────── */
function PriorityBadge({ priority }) {
  const map = {
    HIGH:     'priority-high badge',
    MEDIUM:   'priority-medium badge',
    LOW:      'priority-low badge',
    CRITICAL: 'priority-critical badge',
  };
  return <span className={map[priority] ?? 'badge'}>{priority}</span>;
}

export default function Dashboard() {
  const { wasteHistory, sanitationRequests, currentUser } = useApp();

  /* ── Recent activity rows ─────────────────────────────────────────────── */
  const recentActivity = [
    ...wasteHistory.slice(0, 4).map((w) => ({
      type: 'detection',
      desc: `Detected ${w.totalItems} items (${w.detectedItems.map(d => d.name).join(', ')})`,
      time: w.date,
      tag:  'Detection',
    })),
    ...sanitationRequests.slice(0, 3).map((r) => ({
      type: 'sanitation',
      desc: `Sanitization: ${r.issueType} at ${r.location}`,
      time: r.date,
      tag:  'Sanitation',
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5);

  /* ── Latest requests for status table ────────────────────────────────── */
  const latestRequests = sanitationRequests.slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Welcome banner */}
      <div
        className="relative rounded-2xl overflow-hidden px-7 py-6"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
          border: '1px solid #86efac',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, {currentUser?.name}! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Let's make our surroundings cleaner and greener together.</p>
        </div>
        {/* Decorative bins illustration */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-1.5 text-3xl opacity-80 pointer-events-none select-none">
          <span title="Blue">🗑️</span>
          <span title="Yellow">🗑️</span>
          <span title="Red">🗑️</span>
          <span title="Green" className="text-4xl">♻️</span>
          <span className="text-4xl">🌱</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((s, i) => (
          <div key={i} className={`card p-5 ${s.border}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                {s.icon}
              </div>
              {/* Sparkline placeholder – decorative wave */}
              <svg width="64" height="28" viewBox="0 0 64 28" fill="none" className="opacity-40">
                <polyline
                  points={i % 2 === 0
                    ? "0,20 10,15 20,18 30,10 40,12 50,6 64,8"
                    : "0,18 10,22 20,14 30,18 40,10 50,15 64,12"}
                  stroke={i === 2 ? '#ef4444' : '#16a34a'}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
            <p className={`text-xs mt-1.5 font-semibold flex items-center gap-1 ${s.up ? 'text-green-600' : 'text-red-500'}`}>
              {s.up ? '↑' : '↓'} {s.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>📊</span> Waste by Category
            </h3>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BAR_DATA} margin={{ top: 20, right: 4, left: -20, bottom: 30 }}>
              <XAxis dataKey="name" tick={<CustomXTick />} interval={0} height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v, n) => [v, 'Count']}
                contentStyle={{ borderRadius: '0.6rem', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} label={<CustomBarLabel />}>
                {BAR_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>🔵</span> Waste Distribution
            </h3>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none">
              <option>This Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="40%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                paddingAngle={2}
              >
                {PIE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              {/* Centre label */}
              <text x="40%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-800">
                <tspan x="40%" dy="-6" fontSize="20" fontWeight="700">847</tspan>
                <tspan x="40%" dy="18" fontSize="10" fill="#6b7280">Total Items</tspan>
              </text>
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={8}
                formatter={(v, e) => (
                  <span style={{ fontSize: '11px', color: '#4b5563' }}>
                    {v}{' '}
                    <span style={{ color: '#9ca3af' }}>
                      {Math.round((e.payload.value / 847) * 100)}%
                    </span>
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h3>
          <div className="space-y-2.5">
            {QUICK_ACTIONS.map((qa, i) => (
              <Link key={i} to={qa.to} className={`quick-action ${qa.bg} border border-transparent hover:border-gray-200`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${qa.iconBg} flex items-center justify-center text-lg flex-shrink-0`}>
                    {qa.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{qa.label}</p>
                    <p className="text-xs text-gray-500">{qa.sub}</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Recent Activity + Sanitation Request Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>🕐</span> Recent Activity
            </h3>
            <Link to="/waste-history" className="text-xs text-green-600 font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Thumbnail placeholder */}
                <div className="w-12 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-200 flex-shrink-0 flex items-center justify-center text-lg">
                  {a.type === 'detection' ? '🗑️' : '🧹'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium truncate">{a.desc}</p>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                  a.type === 'detection'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-orange-50 text-orange-700 border border-orange-200'
                }`}>
                  {a.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sanitation Request Status */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>📋</span> Sanitation Request Status
            </h3>
            <Link to="/my-requests" className="text-xs text-green-600 font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-2 px-2">Request ID</th>
                  <th className="text-left py-2 px-2">Issue</th>
                  <th className="text-left py-2 px-2 hidden md:table-cell">Location</th>
                  <th className="text-center py-2 px-2">Priority</th>
                  <th className="text-center py-2 px-2">Status</th>
                  <th className="text-center py-2 px-2 hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestRequests.map((r) => (
                  <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-2 font-mono font-semibold text-green-700">#{r.id}</td>
                    <td className="py-2 px-2 text-gray-700 max-w-[100px] truncate">{r.issueType}</td>
                    <td className="py-2 px-2 text-gray-500 hidden md:table-cell max-w-[80px] truncate">{r.location}</td>
                    <td className="py-2 px-2 text-center">
                      <PriorityBadge priority={r.priority} />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="py-2 px-2 text-center text-gray-400 hidden lg:table-cell whitespace-nowrap">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
