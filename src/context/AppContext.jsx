import { createContext, useContext, useState } from 'react';
import {
  DEMO_USERS,
  DEMO_WASTE_HISTORY,
  DEMO_SANITATION_REQUESTS,
} from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [wasteHistory, setWasteHistory]  = useState(DEMO_WASTE_HISTORY);
  const [sanitationRequests, setSanitationRequests] = useState(DEMO_SANITATION_REQUESTS);

  // ── Auth ──────────────────────────────────────────────────────────────────
  function login(email, password) {
    const user = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password.' };
  }

  function logout() {
    setCurrentUser(null);
  }

  // ── Waste Detection ───────────────────────────────────────────────────────
  function addWasteDetection(record) {
    setWasteHistory((prev) => [record, ...prev]);
  }

  // ── Sanitation Requests ───────────────────────────────────────────────────
  function addSanitationRequest(req) {
    setSanitationRequests((prev) => [req, ...prev]);
  }

  function updateRequestStatus(id, newStatus) {
    setSanitationRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        wasteHistory,
        addWasteDetection,
        sanitationRequests,
        addSanitationRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
