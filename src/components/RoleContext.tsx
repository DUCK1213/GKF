'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/data/mockData';
import { GKFDatabaseEngine } from '@/lib/supabaseMock';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleInfo: {
    label: string;
    description: string;
    badgeColor: string;
    allowedModules: string[];
  };
  isSimulatedOffline: boolean;
  toggleOfflineMode: () => void;
  offlineQueueCount: number;
  syncOfflineQueue: () => number;
}

const ROLE_DEFINITIONS: Record<
  UserRole,
  { label: string; description: string; badgeColor: string; allowedModules: string[] }
> = {
  super_admin: {
    label: 'Super Admin',
    description: 'Executive governance, full database RLS configuration & endowment trustee oversight.',
    badgeColor: 'bg-red-600 text-white',
    allowedModules: ['all', 'sunday-ledger', 'me-analytics', 'project-vision', 'experiential-events', 'endowment-fund', 'hubs-safeguarding'],
  },
  school_counselor: {
    label: 'School Counselor',
    description: 'Adolescent psychological welfare, domestic stress mitigation & safeguarding escalation flags.',
    badgeColor: 'bg-purple-600 text-white',
    allowedModules: ['hubs-safeguarding', 'sunday-ledger', 'me-analytics', 'project-vision'],
  },
  hub_coordinator: {
    label: 'Hub Coordinator',
    description: 'On-site partner school coordinator managing 4-Hour Sunday attendance and local offline sync.',
    badgeColor: 'bg-[#FF9932] text-[#172B36]',
    allowedModules: ['sunday-ledger', 'experiential-events', 'hubs-safeguarding', 'me-analytics'],
  },
  mentor: {
    label: 'Vetted Adult Mentor',
    description: 'Field mentor conducting Hour 4 1-on-1 coaching, CBT reframing, and logotherapy exercises.',
    badgeColor: 'bg-[#114C5A] text-white',
    allowedModules: ['sunday-ledger', 'project-vision', 'experiential-events'],
  },
  donor: {
    label: 'Donor / Institutional Partner',
    description: 'CSR committee & philanthropy partner reviewing validated M&E growth and endowment fiduciary metrics.',
    badgeColor: 'bg-[#FFC801] text-[#172B36]',
    allowedModules: ['me-analytics', 'endowment-fund', 'experiential-events'],
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('hub_coordinator');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);

  useEffect(() => {
    const db = GKFDatabaseEngine.getInstance();
    setRoleState(db.getActiveRole());
    setIsSimulatedOffline(db.isSimulatedOffline());
    setOfflineQueueCount(db.getOfflineQueueCount());

    const handleRoleChange = () => {
      setRoleState(db.getActiveRole());
    };

    const handleNetworkChange = () => {
      setIsSimulatedOffline(db.isSimulatedOffline());
      setOfflineQueueCount(db.getOfflineQueueCount());
    };

    const handleDataChange = () => {
      setOfflineQueueCount(db.getOfflineQueueCount());
    };

    window.addEventListener('gkf-role-change', handleRoleChange);
    window.addEventListener('gkf-network-change', handleNetworkChange);
    window.addEventListener('gkf-data-change', handleDataChange);

    return () => {
      window.removeEventListener('gkf-role-change', handleRoleChange);
      window.removeEventListener('gkf-network-change', handleNetworkChange);
      window.removeEventListener('gkf-data-change', handleDataChange);
    };
  }, []);

  const setRole = (newRole: UserRole) => {
    const db = GKFDatabaseEngine.getInstance();
    db.setActiveRole(newRole);
    setRoleState(newRole);
  };

  const toggleOfflineMode = () => {
    const db = GKFDatabaseEngine.getInstance();
    const newStatus = !isSimulatedOffline;
    db.setSimulatedOffline(newStatus);
    setIsSimulatedOffline(newStatus);
  };

  const syncOfflineQueue = (): number => {
    const db = GKFDatabaseEngine.getInstance();
    const res = db.syncOfflineQueue();
    setOfflineQueueCount(0);
    return res.syncedCount;
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        roleInfo: ROLE_DEFINITIONS[role],
        isSimulatedOffline,
        toggleOfflineMode,
        offlineQueueCount,
        syncOfflineQueue,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
