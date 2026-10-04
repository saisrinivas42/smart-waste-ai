import { useApp } from '../context/AppContext';

export default function Profile() {
  const { currentUser } = useApp();
  const initials = currentUser?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'U';

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      <div className="card p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
            <p className="text-gray-500">{currentUser?.email}</p>
            <span className="mt-1.5 inline-flex items-center text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold">
              {currentUser?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Full Name', currentUser?.name],
            ['Email', currentUser?.email],
            ['Role', currentUser?.role],
            ['Account Status', 'Active'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl px-3 py-2.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
