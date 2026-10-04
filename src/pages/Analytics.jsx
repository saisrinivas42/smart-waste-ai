import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid, AreaChart, Area,
} from 'recharts';
import { WASTE_CATEGORIES, DASHBOARD_STATS } from '../data/demoData';

const MONTHLY = [
  { month: 'Jun', plastic: 40, paper: 35, glass: 20, metal: 28, organic: 30 },
  { month: 'Jul', plastic: 55, paper: 42, glass: 25, metal: 32, organic: 38 },
  { month: 'Aug', plastic: 48, paper: 38, glass: 22, metal: 30, organic: 35 },
  { month: 'Sep', plastic: 62, paper: 50, glass: 30, metal: 38, organic: 45 },
  { month: 'Oct', plastic: 70, paper: 55, glass: 35, metal: 42, organic: 50 },
];

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Waste detection and sanitation trends over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4">Monthly Waste Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '0.6rem', fontSize: '12px' }} />
              <Area type="monotone" dataKey="plastic"  stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
              <Area type="monotone" dataKey="organic"  stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
              <Area type="monotone" dataKey="paper"    stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {WASTE_CATEGORIES.map(c => {
              const val = DASHBOARD_STATS[c.id] ?? 0;
              const pct = Math.round((val / DASHBOARD_STATS.totalWasteDetected) * 100);
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{c.icon} {c.label}</span>
                    <span className="font-bold" style={{ color: c.color }}>{val} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
