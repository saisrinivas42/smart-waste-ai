import { WASTE_CATEGORIES } from '../data/demoData';

const TIPS = {
  plastic:   ['Rinse containers before recycling.', 'Remove caps and labels if possible.', 'Do NOT recycle plastic bags in regular bins.'],
  paper:     ['Keep paper dry — wet paper cannot be recycled.', 'Remove staples and plastic covers.', 'Shred confidential documents before recycling.'],
  glass:     ['Remove lids and rinse containers.', 'Separate by color where required.', 'Never dispose of broken glass without wrapping.'],
  metal:     ['Crush cans to save space.', 'Clean food residue before disposal.', 'Aluminium and steel are both recyclable.'],
  organic:   ['Keep organic waste in a separate green bin.', 'Avoid mixing with plastics or metals.', 'Home composting is ideal for kitchen waste.'],
  cardboard: ['Flatten all boxes before disposal.', 'Remove tape and plastic packaging.', 'Wet cardboard cannot be recycled.'],
};

const BIN_COLOR = {
  plastic: 'Blue', paper: 'Yellow', glass: 'Green', metal: 'Grey', organic: 'Brown', cardboard: 'Yellow',
};

export default function DisposalGuidance() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disposal Guidance</h1>
        <p className="text-sm text-gray-500 mt-0.5">Proper disposal methods for each waste category</p>
      </div>

      {/* Quick reference */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h3 className="font-bold text-gray-800">Quick Reference</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="text-left py-3 px-6">Category</th>
                <th className="text-left py-3 px-6">Disposal Method</th>
                <th className="text-center py-3 px-6 hidden md:table-cell">Bin</th>
              </tr>
            </thead>
            <tbody>
              {WASTE_CATEGORIES.map(c => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2.5 font-semibold text-gray-800">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.icon} {c.label}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-gray-600 max-w-xs">{c.disposal}</td>
                  <td className="py-3.5 px-6 text-center hidden md:table-cell">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: c.color }}>
                      {BIN_COLOR[c.id]} Bin
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {WASTE_CATEGORIES.map(c => (
          <div key={c.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: c.color + '18' }}>
                {c.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{c.label}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: c.color }}>
                  {BIN_COLOR[c.id]} Bin
                </span>
              </div>
            </div>

            <div className="text-sm px-3 py-2.5 rounded-xl mb-4 font-semibold"
              style={{ backgroundColor: c.color + '14', color: c.color }}>
              {c.disposal}
            </div>

            <div className="space-y-2">
              {TIPS[c.id]?.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
