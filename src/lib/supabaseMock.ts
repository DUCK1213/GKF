'use client';

import {
  INITIAL_HUBS,
  INITIAL_STUDENTS,
  INITIAL_MENTORS,
  INITIAL_SUNDAY_LOGS,
  INITIAL_ENDOWMENT_ALLOCATIONS,
  INITIAL_EVENTS,
  Hub,
  Student,
  Mentor,
  SundaySessionLog,
  EndowmentAllocation,
  ExperientialEvent,
  UserRole,
} from '@/data/mockData';

const STORAGE_KEYS = {
  HUBS: 'gkf_db_hubs',
  STUDENTS: 'gkf_db_students',
  MENTORS: 'gkf_db_mentors',
  SUNDAY_LOGS: 'gkf_db_sunday_logs',
  ENDOWMENTS: 'gkf_db_endowments',
  EVENTS: 'gkf_db_events',
  OFFLINE_QUEUE: 'gkf_offline_sync_queue',
  SIMULATED_OFFLINE: 'gkf_simulated_offline_mode',
  ACTIVE_ROLE: 'gkf_active_user_role',
};

export class GKFDatabaseEngine {
  private static instance: GKFDatabaseEngine;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initStorage();
    }
  }

  public static getInstance(): GKFDatabaseEngine {
    if (!GKFDatabaseEngine.instance) {
      GKFDatabaseEngine.instance = new GKFDatabaseEngine();
    }
    return GKFDatabaseEngine.instance;
  }

  private initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.HUBS)) {
      localStorage.setItem(STORAGE_KEYS.HUBS, JSON.stringify(INITIAL_HUBS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MENTORS)) {
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(INITIAL_MENTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUNDAY_LOGS)) {
      localStorage.setItem(STORAGE_KEYS.SUNDAY_LOGS, JSON.stringify(INITIAL_SUNDAY_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENDOWMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENDOWMENTS, JSON.stringify(INITIAL_ENDOWMENT_ALLOCATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE)) {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, 'hub_coordinator');
    }
  }

  // Network Simulation
  public isSimulatedOffline(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE) === 'true';
  }

  public setSimulatedOffline(status: boolean) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, status ? 'true' : 'false');
    window.dispatchEvent(new Event('gkf-network-change'));
  }

  public getOfflineQueueCount(): number {
    if (typeof window === 'undefined') return 0;
    try {
      const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
      return queue.length;
    } catch {
      return 0;
    }
  }

  // Role Access Control
  public getActiveRole(): UserRole {
    if (typeof window === 'undefined') return 'hub_coordinator';
    return (localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE) as UserRole) || 'hub_coordinator';
  }

  public setActiveRole(role: UserRole) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, role);
    window.dispatchEvent(new Event('gkf-role-change'));
  }

  // Read Queries with Simulated RLS
  public getHubs(): Hub[] {
    if (typeof window === 'undefined') return INITIAL_HUBS;
    const hubs = JSON.parse(localStorage.getItem(STORAGE_KEYS.HUBS) || '[]');
    return hubs.length ? hubs : INITIAL_HUBS;
  }

  public getStudents(hubId?: string): Student[] {
    if (typeof window === 'undefined') return INITIAL_STUDENTS;
    const students: Student[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]');
    const list = students.length ? students : INITIAL_STUDENTS;
    if (hubId && hubId !== 'all') {
      return list.filter((s) => s.hub_id === hubId);
    }
    return list;
  }

  public getMentors(hubId?: string): Mentor[] {
    if (typeof window === 'undefined') return INITIAL_MENTORS;
    const mentors: Mentor[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MENTORS) || '[]');
    const list = mentors.length ? mentors : INITIAL_MENTORS;
    if (hubId && hubId !== 'all') {
      return list.filter((m) => m.assigned_hub_id === hubId);
    }
    return list;
  }

  public getSundayLogs(): SundaySessionLog[] {
    if (typeof window === 'undefined') return INITIAL_SUNDAY_LOGS;
    const logs: SundaySessionLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUNDAY_LOGS) || '[]');
    return logs.length ? logs : INITIAL_SUNDAY_LOGS;
  }

  public getEndowments(): EndowmentAllocation[] {
    if (typeof window === 'undefined') return INITIAL_ENDOWMENT_ALLOCATIONS;
    const items: EndowmentAllocation[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENDOWMENTS) || '[]');
    return items.length ? items : INITIAL_ENDOWMENT_ALLOCATIONS;
  }

  public getEvents(): ExperientialEvent[] {
    if (typeof window === 'undefined') return INITIAL_EVENTS;
    const evts: ExperientialEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    return evts.length ? evts : INITIAL_EVENTS;
  }

  // Write Action: Sunday Session Log (with Offline Queuing)
  public saveSundayLog(log: Omit<SundaySessionLog, 'id' | 'created_at' | 'synced_to_cloud'>): {
    log: SundaySessionLog;
    isQueuedOffline: boolean;
  } {
    const isOffline = this.isSimulatedOffline();
    const newLog: SundaySessionLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      synced_to_cloud: !isOffline,
      created_at: new Date().toISOString(),
    };

    // Always persist to local session logs for instant optimistic UI
    const existingLogs = this.getSundayLogs();
    const updatedLogs = [newLog, ...existingLogs];
    localStorage.setItem(STORAGE_KEYS.SUNDAY_LOGS, JSON.stringify(updatedLogs));

    if (isOffline) {
      // Append to offline synchronization queue
      const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
      queue.push(newLog);
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
      window.dispatchEvent(new Event('gkf-data-change'));
      return { log: newLog, isQueuedOffline: true };
    } else {
      window.dispatchEvent(new Event('gkf-data-change'));
      return { log: newLog, isQueuedOffline: false };
    }
  }

  // Update existing Sunday Session Log
  public updateSundayLog(id: string, updates: Partial<SundaySessionLog>) {
    const logs = this.getSundayLogs();
    const updated = logs.map((item) => (item.id === id ? { ...item, ...updates } : item));
    localStorage.setItem(STORAGE_KEYS.SUNDAY_LOGS, JSON.stringify(updated));
    window.dispatchEvent(new Event('gkf-data-change'));
  }

  // Reconcile and Sync Offline Queue
  public syncOfflineQueue(): { syncedCount: number } {
    if (typeof window === 'undefined') return { syncedCount: 0 };
    const queue: SundaySessionLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
    if (queue.length === 0) return { syncedCount: 0 };

    const logs = this.getSundayLogs();
    const queueIds = new Set(queue.map((q) => q.id));

    // Mark matching logs as synced to cloud
    const updatedLogs = logs.map((log) => {
      if (queueIds.has(log.id)) {
        return { ...log, synced_to_cloud: true };
      }
      return log;
    });

    localStorage.setItem(STORAGE_KEYS.SUNDAY_LOGS, JSON.stringify(updatedLogs));
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    window.dispatchEvent(new Event('gkf-data-change'));
    window.dispatchEvent(new Event('gkf-network-change'));

    return { syncedCount: queue.length };
  }

  // Update Endowment Allocation Status
  public updateEndowmentStatus(id: string, status: 'pending' | 'approved' | 'disbursed', approvedBy: string) {
    const endowments = this.getEndowments();
    const updated = endowments.map((e) =>
      e.id === id ? { ...e, disbursement_status: status, approved_by: approvedBy } : e
    );
    localStorage.setItem(STORAGE_KEYS.ENDOWMENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('gkf-data-change'));
  }

  // Add new endowment allocation
  public addEndowment(allocation: Omit<EndowmentAllocation, 'id' | 'created_at'>) {
    const endowments = this.getEndowments();
    const newAllocation: EndowmentAllocation = {
      ...allocation,
      id: `endow-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEYS.ENDOWMENTS, JSON.stringify([newAllocation, ...endowments]));
    window.dispatchEvent(new Event('gkf-data-change'));
    return newAllocation;
  }

  // Register for Event
  public registerForEvent(eventId: string, count = 1) {
    const events = this.getEvents();
    const updated = events.map((evt) => {
      if (evt.id === eventId) {
        return {
          ...evt,
          registered_count: Math.min(evt.capacity, evt.registered_count + count),
          consent_collected: Math.min(evt.capacity, evt.consent_collected + count),
        };
      }
      return evt;
    });
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('gkf-data-change'));
  }

  // Reset to default seed data
  public resetToDefaults() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HUBS, JSON.stringify(INITIAL_HUBS));
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(INITIAL_MENTORS));
    localStorage.setItem(STORAGE_KEYS.SUNDAY_LOGS, JSON.stringify(INITIAL_SUNDAY_LOGS));
    localStorage.setItem(STORAGE_KEYS.ENDOWMENTS, JSON.stringify(INITIAL_ENDOWMENT_ALLOCATIONS));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, 'false');
    window.dispatchEvent(new Event('gkf-data-change'));
    window.dispatchEvent(new Event('gkf-network-change'));
  }
}
