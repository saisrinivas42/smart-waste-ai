export default function StatCard({ label, value, icon: Icon, color = '#16a34a', bg = '#dcfce7' }) {
  return (
    <div className="card flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: bg }}
      >
        {typeof Icon === 'string' ? (
          <span>{Icon}</span>
        ) : (
          <Icon size={24} style={{ color }} />
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
