import { useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

const PRIORITY_STYLES = {
  HIGH:     'priority-high badge',
  MEDIUM:   'priority-medium badge',
  LOW:      'priority-low badge',
  CRITICAL: 'priority-critical badge',
};

const STATUS_FILTERS = ['ALL', 'PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];

const ISSUE_ICONS = {
  'Overflowing Waste Bin':    '🗑️',
  'Unclean Area':             '🧹',
  'Waste Collection Problem': '🚛',
  'Public Sanitation Issue':  '🚽',
  'Bad Odor':                 '💨',
  'Other':                    '📌',
};

export default function MyRequests() {
  const { sanitationRequests, currentUser } = useApp();
  const [filter, setFilter] = useState('ALL');

  const myRequests =
    currentUser?.role === 'ADMIN'
      ? sanitationRequests
      : sanitationRequests.filter(r => r.userId === currentUser?.id);

  const filtered = filter === 'ALL' ? myRequests : myRequests.filter(r => r.status === filter);

  // Counts per status
  const counts = STATUS_FILTERS.reduce((acc, s) => {
    acc[s] = s === 'ALL' ? myRequests.length : myRequests.filter(r => r.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your submitted sanitation requests</p>
        </div>
        <Link to="/sanitization-request" className="btn-primary rounded-xl gap-1.5">
          <Plus size={16} /> New Request
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { s: 'PENDING',     label: 'Pending',     bg: 'bg-yellow-50', color: 'text-yellow-700', border: 'border-yellow-200' },
          { s: 'ASSIGNED',    label: 'Assigned',    bg: 'bg-blue-50',   color: 'text-blue-700',   border: 'border-blue-200' },
          { s: 'IN_PROGRESS', label: 'In Progress', bg: 'bg-orange-50', color: 'text-orange-700', border: 'border-orange-200' },
          { s: 'RESOLVED',    label: 'Resolved',    bg: 'bg-green-50',  color: 'text-green-700',  border: 'border-green-200' },
        ].map(({ s, label, bg, color, border }) => (
          <div key={s} className={`card p-4 ${bg} ${border} cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => setFilter(filter === s ? 'ALL' : s)}>
            <p className={`text-2xl font-bold ${color}`}>{counts[s]}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              filter === s
                ? 'bg-green-600 text-white border-green-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
            }`}
          >
            {s === 'ALL' ? `All (${counts.ALL})` : `${s.replace('_', ' ')} (${counts[s]})`}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <ClipboardList size={48} className="mx-auto mb-3 text-gray-200" />
          <p className="font-semibold">No requests found.</p>
          <p className="text-sm mt-1">
            {filter === 'ALL'
              ? 'Submit your first sanitation request.'
              : `No ${filter.replace('_', ' ').toLowerCase()} requests.`}
          </p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-5">Request ID</th>
                  <th className="text-left py-3 px-5">Issue</th>
                  <th className="text-left py-3 px-5 hidden md:table-cell">Location</th>
                  <th className="text-left py-3 px-5 hidden lg:table-cell">Description</th>
                  <th className="text-center py-3 px-5">Date</th>
                  <th className="text-center py-3 px-5">Priority</th>
                  <th className="text-center py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-mono font-bold text-green-700 text-xs">#{r.id}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{ISSUE_ICONS[r.issueType] ?? '📌'}</span>
                        <span className="font-semibold text-gray-800 max-w-[140px] truncate">{r.issueType}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 hidden md:table-cell max-w-[120px] truncate">{r.location}</td>
                    <td className="py-3.5 px-5 text-gray-400 hidden lg:table-cell max-w-[180px] truncate text-xs">{r.description}</td>
                    <td className="py-3.5 px-5 text-center text-gray-500 text-xs whitespace-nowrap">{r.date}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={PRIORITY_STYLES[r.priority] ?? 'badge'}>{r.priority}</span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
