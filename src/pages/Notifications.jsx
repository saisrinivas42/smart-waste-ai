const NOTIFICATIONS = [
  { id: 1, title: 'Waste detection completed',      body: 'Your image analysis (WD003) is ready to view.',       time: '10 min ago',  read: false, icon: '🔍' },
  { id: 2, title: 'Sanitation request updated',     body: 'Request #SR002 status changed to IN_PROGRESS.',        time: '1 hr ago',    read: false, icon: '📋' },
  { id: 3, title: 'Request assigned',               body: 'Your request #SR003 has been assigned to a team.',     time: '3 hrs ago',   read: false, icon: '✅' },
  { id: 4, title: 'New disposal guidance available',body: 'Updated guidelines for plastic waste disposal.',        time: '1 day ago',   read: true,  icon: '📖' },
  { id: 5, title: 'Request resolved',               body: 'Your sanitation request #SR001 has been resolved.',    time: '2 days ago',  read: true,  icon: '🎉' },
];

export default function Notifications() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">Stay updated on your requests and detections</p>
        </div>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-xl font-bold">
          3 unread
        </span>
      </div>

      <div className="space-y-2.5">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`card p-4 flex items-start gap-4 ${!n.read ? 'border-green-200 bg-green-50/30' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0">
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-800 text-sm">{n.title}</p>
                {!n.read && <span className="w-2 h-2 rounded-full bg-green-500" />}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{n.body}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
