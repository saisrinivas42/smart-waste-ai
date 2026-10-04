// ─── Demo / Dummy Data ────────────────────────────────────────────────────────
// Used when the Spring Boot backend and Python AI service are not connected.
// Replace these with real API calls in production.

export const DEMO_USERS = [
  { id: 1, email: 'admin@smartwaste.com', password: 'admin123', role: 'ADMIN',  name: 'Admin User' },
  { id: 2, email: 'user@smartwaste.com',  password: 'user123',  role: 'USER',   name: 'Rahul Sharma' },
];

export const WASTE_CATEGORIES = [
  { id: 'plastic',   label: 'Plastic',   color: '#3b82f6', icon: '🧴', disposal: 'Place in the blue recycling bin. Rinse containers before disposal.' },
  { id: 'paper',     label: 'Paper',     color: '#f59e0b', icon: '📄', disposal: 'Place in the paper recycling bin. Keep dry and free from food contamination.' },
  { id: 'glass',     label: 'Glass',     color: '#8b5cf6', icon: '🫙', disposal: 'Place in the glass recycling bin. Remove lids and rinse thoroughly.' },
  { id: 'metal',     label: 'Metal',     color: '#6b7280', icon: '🥫', disposal: 'Place in the metal recycling bin. Crush cans to save space.' },
  { id: 'organic',   label: 'Organic',   color: '#16a34a', icon: '🍂', disposal: 'Place in the compost/organic bin. Avoid mixing with recyclables.' },
  { id: 'cardboard', label: 'Cardboard', color: '#92400e', icon: '📦', disposal: 'Flatten boxes and place in the paper/cardboard recycling bin.' },
];

export const DEMO_WASTE_HISTORY = [
  {
    id: 'WD001',
    date: '2026-10-01 10:30',
    imageUrl: null,
    detectedItems: [
      { name: 'Plastic Bottle', category: 'plastic',   count: 3, confidence: 94 },
      { name: 'Paper',          category: 'paper',     count: 2, confidence: 88 },
      { name: 'Metal Can',      category: 'metal',     count: 1, confidence: 91 },
    ],
    totalItems: 6,
    status: 'COMPLETED',
  },
  {
    id: 'WD002',
    date: '2026-10-02 14:15',
    imageUrl: null,
    detectedItems: [
      { name: 'Glass Bottle',   category: 'glass',     count: 2, confidence: 96 },
      { name: 'Organic Waste',  category: 'organic',   count: 4, confidence: 87 },
    ],
    totalItems: 6,
    status: 'COMPLETED',
  },
  {
    id: 'WD003',
    date: '2026-10-03 09:00',
    imageUrl: null,
    detectedItems: [
      { name: 'Cardboard Box',  category: 'cardboard', count: 2, confidence: 92 },
      { name: 'Plastic Bag',    category: 'plastic',   count: 5, confidence: 85 },
    ],
    totalItems: 7,
    status: 'COMPLETED',
  },
];

export const DEMO_SANITATION_REQUESTS = [
  {
    id: 'SR001',
    issueType: 'Overflowing Waste Bin',
    location: 'Block A - Ground Floor',
    description: 'The waste bin near the entrance is overflowing and needs immediate attention.',
    priority: 'HIGH',
    status: 'RESOLVED',
    date: '2026-09-28',
    userId: 2,
  },
  {
    id: 'SR002',
    issueType: 'Unclean Area',
    location: 'Cafeteria',
    description: 'Waste scattered around the cafeteria tables after lunch hours.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    date: '2026-10-01',
    userId: 2,
  },
  {
    id: 'SR003',
    issueType: 'Bad Odor',
    location: 'Parking Lot B',
    description: 'Strong odor coming from the waste storage area near parking lot B.',
    priority: 'HIGH',
    status: 'ASSIGNED',
    date: '2026-10-03',
    userId: 2,
  },
  {
    id: 'SR004',
    issueType: 'Waste Collection Problem',
    location: 'Hostel Block C',
    description: 'Waste has not been collected for 3 days.',
    priority: 'MEDIUM',
    status: 'PENDING',
    date: '2026-10-04',
    userId: 2,
  },
];

export const DASHBOARD_STATS = {
  totalWasteDetected: 847,
  plastic: 234,
  paper: 198,
  glass: 112,
  metal: 145,
  organic: 158,
  sanitizationRequests: 43,
  pendingRequests: 12,
  resolvedRequests: 28,
  totalUsers: 156,
};

// Simulated AI prediction results for demo
export const MOCK_PREDICTIONS = [
  {
    detectedItems: [
      { name: 'Plastic Bottle', category: 'plastic',   count: 3, confidence: 94 },
      { name: 'Paper Sheet',    category: 'paper',     count: 2, confidence: 88 },
      { name: 'Metal Can',      category: 'metal',     count: 1, confidence: 91 },
    ],
  },
  {
    detectedItems: [
      { name: 'Glass Bottle',   category: 'glass',     count: 2, confidence: 96 },
      { name: 'Organic Waste',  category: 'organic',   count: 4, confidence: 87 },
      { name: 'Plastic Bag',    category: 'plastic',   count: 1, confidence: 82 },
    ],
  },
  {
    detectedItems: [
      { name: 'Cardboard Box',  category: 'cardboard', count: 2, confidence: 92 },
      { name: 'Plastic Cup',    category: 'plastic',   count: 5, confidence: 85 },
      { name: 'Paper Napkin',   category: 'paper',     count: 3, confidence: 89 },
    ],
  },
  {
    detectedItems: [
      { name: 'Metal Can',      category: 'metal',     count: 2, confidence: 93 },
      { name: 'Glass Jar',      category: 'glass',     count: 1, confidence: 97 },
      { name: 'Plastic Wrapper',category: 'plastic',   count: 4, confidence: 86 },
      { name: 'Organic Peel',   category: 'organic',   count: 3, confidence: 84 },
    ],
  },
];
