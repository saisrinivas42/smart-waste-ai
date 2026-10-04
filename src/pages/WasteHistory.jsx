import { useState } from 'react';
import { ChevronDown, ChevronUp, History } from 'lucide-react';
import { WASTE_CATEGORIES } from '../data/demoData';
import { useApp } from '../context/AppContext';

function getCat(id) {
  return WASTE_CATEGORIES.find(c => c.id === id) ?? { label: id, color: '#6b7280', icon: '♻️' };
}

function HistoryRow({ record }) {
  const [open, setOpen] = useState(false);
  const categories = [...new Set(record.detectedItems.map(d => d.category))];

  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🗑️</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-800 text-sm">{record.id}</p>
            <span className="badge badge-resolved">COMPLETED</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{record.date}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex gap-1.5">
            {categories.map(cId => {
              const c = getCat(cId);
              return (
                <span key={cId} className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                  style={{ backgroundColor: c.color }}>
                  {c.icon} {c.label}
                </span>
              );
            })}
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-green-700">
            {record.totalItems}
          </div>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-2.5 px-5">Waste Item</th>
                  <th className="text-left py-2.5 px-5">Category</th>
                  <th className="text-center py-2.5 px-5">Count</th>
                  <th className="text-center py-2.5 px-5">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {record.detectedItems.map((item, i) => {
                  const cat = getCat(item.category);
                  return (
                    <tr key={i} className="border-t border-gray-100 bg-white">
                      <td className="py-3 px-5 font-semibold text-gray-700">{item.name}</td>
                      <td className="py-3 px-5">
                        <span className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                          style={{ backgroundColor: cat.color }}>
                          {cat.icon} {cat.label}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-center font-bold text-gray-800">{item.count}</td>
                      <td className="py-3 px-5 text-center">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.confidence >= 90 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {item.confidence}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-gray-200 bg-white">
                  <td colSpan={2} className="py-3 px-5 font-bold text-gray-700">Total Items Detected</td>
                  <td className="py-3 px-5 text-center font-bold text-green-600 text-base">{record.totalItems}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WasteHistory() {
  const { wasteHistory } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste History</h1>
          <p className="text-sm text-gray-500 mt-0.5">Previous waste detection analysis records</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-sm font-semibold">
          <History size={15} /> {wasteHistory.length} records
        </div>
      </div>

      {wasteHistory.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <History size={48} className="mx-auto mb-3 text-gray-200" />
          <p className="font-semibold">No detection records yet.</p>
          <p className="text-sm mt-1">Go to Waste Detection to analyze your first image.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wasteHistory.map(r => <HistoryRow key={r.id} record={r} />)}
        </div>
      )}
    </div>
  );
}
