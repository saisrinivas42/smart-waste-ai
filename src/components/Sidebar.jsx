import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ScanSearch, History, BookOpen,
  Trash2, ClipboardList, BarChart2, Bell, User,
  ShieldCheck, LogOut, Leaf,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const USER_NAV = [
  { to: '/dashboard',            label: 'Dashboard',            icon: LayoutDashboard },
  { to: '/waste-detection',      label: 'Waste Detection',      icon: ScanSearch },
  { to: '/waste-history',        label: 'Waste History',        icon: History },
  { to: '/disposal-guidance',    label: 'Disposal Guidance',    icon: BookOpen },
  { to: '/sanitization-request', label: 'Sanitization Request', icon: Trash2 },
  { to: '/my-requests',          label: 'My Requests',          icon: ClipboardList },
  { to: '/analytics',            label: 'Analytics',            icon: BarChart2 },
  { to: '/notifications',        label: 'Notifications',        icon: Bell, badge: 3 },
  { to: '/profile',              label: 'Profile',              icon: User },
];

const ADMIN_EXTRA = [
  { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck },
];

export default function Sidebar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const links = currentUser?.role === 'ADMIN'
    ? [...USER_NAV, ...ADMIN_EXTRA]
    : USER_NAV;

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-sm">
          <Leaf size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">SmartWaste</p>
          <p className="text-[11px] text-gray-400">AI Waste Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          >
            <Icon size={17} />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Globe illustration + tagline */}
      <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-b from-green-50 to-emerald-100 p-4 text-center">
        <div className="text-5xl mb-2">🌍</div>
        <p className="text-xs font-bold text-green-800 leading-tight">Clean Environment</p>
        <p className="text-xs font-bold text-green-700">Better Tomorrow</p>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
