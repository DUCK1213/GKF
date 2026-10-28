'use client';

import React, { useState, useEffect } from 'react';
import { GKFDatabaseEngine } from '@/lib/supabaseMock';
import {
  SundaySessionLog,
  Student,
  Mentor,
  Hub,
  INITIAL_HUBS,
  INITIAL_STUDENTS,
  INITIAL_MENTORS,
  INITIAL_SUNDAY_LOGS,
} from '@/data/mockData';
import { useRole } from '@/components/RoleContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  WifiOff,
  Wifi,
  Search,
  Filter,
  UserCheck,
  Plus,
  Save,
  Check,
  ShieldAlert,
  ChevronRight,
  BookOpen,
  Sparkles,
  Users,
} from 'lucide-react';

export default function SundayLedgerPage() {
  const { role, isSimulatedOffline, offlineQueueCount, syncOfflineQueue } = useRole();
  const [db, setDb] = useState<GKFDatabaseEngine | null>(null);

  const [hubs, setHubs] = useState<Hub[]>(INITIAL_HUBS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [logs, setLogs] = useState<SundaySessionLog[]>(INITIAL_SUNDAY_LOGS);

  const [selectedHub, setSelectedHub] = useState<string>('hub-01');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-25');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSafeguardingOnly, setFilterSafeguardingOnly] = useState<boolean>(false);

  // New Log Entry Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedMentorId, setSelectedMentorId] = useState<string>('');
  const [hour1, setHour1] = useState<boolean>(true);
  const [hour2, setHour2] = useState<boolean>(true);
  const [hour3, setHour3] = useState<boolean>(true);
  const [hour4Notes, setHour4Notes] = useState<string>('');
  const [safeguardingFlag, setSafeguardingFlag] = useState<boolean>(false);
  const [safeguardingSeverity, setSafeguardingSeverity] = useState<'low' | 'medium' | 'critical'>('low');
  const [safeguardingNotes, setSafeguardingNotes] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'warn' } | null>(null);

  useEffect(() => {
    const engine = GKFDatabaseEngine.getInstance();
    setDb(engine);
    refreshData(engine);

    const handleDataChange = () => {
      refreshData(engine);
    };

    window.addEventListener('gkf-data-change', handleDataChange);
    return () => window.removeEventListener('gkf-data-change', handleDataChange);
  }, []);

  const refreshData = (engine: GKFDatabaseEngine) => {
    setHubs(engine.getHubs());
    setStudents(engine.getStudents());
    setMentors(engine.getMentors());
    setLogs(engine.getSundayLogs());
  };

  const currentHub = hubs.find((h) => h.id === selectedHub) || hubs[0] || INITIAL_HUBS[0];
  const hubStudents = students.filter((s) => s.hub_id === selectedHub);
  const hubMentors = mentors.filter((m) => m.assigned_hub_id === selectedHub && m.active);

  // Filter logs based on active criteria
  const filteredLogs = logs.filter((log) => {
    const matchesHub = log.hub_id === selectedHub;
    const matchesSearch =
      log.student_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.mentor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hour4_1on1_notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSafeguarding = filterSafeguardingOnly ? log.safeguarding_flag : true;
    return matchesHub && matchesSearch && matchesSafeguarding;
  });

  // Calculate Hub Metrics for Current Sunday
  const totalRoster = hubStudents.length;
  const attendedCount = filteredLogs.filter((l) => l.hour1_empowerment_attended).length;
  const hour2CompletedCount = filteredLogs.filter((l) => l.hour2_self_authoring_completed).length;
  const hour3CompletedCount = filteredLogs.filter((l) => l.hour3_skills_completed).length;
  const hour4CompletedCount = filteredLogs.filter((l) => l.hour4_1on1_notes.trim().length > 0).length;
  const safeguardingAlertCount = filteredLogs.filter((l) => l.safeguarding_flag).length;

  const handleToggleStep = (logId: string, step: 'hour1' | 'hour2' | 'hour3') => {
    if (!db) return;
    const log = logs.find((l) => l.id === logId);
    if (!log) return;

    if (step === 'hour1') {
      db.updateSundayLog(logId, { hour1_empowerment_attended: !log.hour1_empowerment_attended });
    } else if (step === 'hour2') {
      db.updateSundayLog(logId, { hour2_self_authoring_completed: !log.hour2_self_authoring_completed });
    } else if (step === 'hour3') {
      db.updateSundayLog(logId, { hour3_skills_completed: !log.hour3_skills_completed });
    }
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !selectedStudentId || !selectedMentorId) return;

    const student = students.find((s) => s.id === selectedStudentId);
    const mentor = mentors.find((m) => m.id === selectedMentorId);
    if (!student || !mentor) return;

    const res = db.saveSundayLog({
      hub_id: selectedHub,
      session_date: selectedDate,
      student_id: student.id,
      student_code: student.student_code,
      mentor_id: mentor.id,
      mentor_name: mentor.full_name,
      hour1_empowerment_attended: hour1,
      hour2_self_authoring_completed: hour2,
      hour3_skills_completed: hour3,
      hour4_1on1_notes: hour4Notes,
      safeguarding_flag: safeguardingFlag,
      safeguarding_severity: safeguardingFlag ? safeguardingSeverity : undefined,
      safeguarding_notes: safeguardingFlag ? safeguardingNotes : undefined,
    });

    setIsModalOpen(false);
    // Reset form
    setSelectedStudentId('');
    setSelectedMentorId('');
    setHour4Notes('');
    setSafeguardingFlag(false);
    setSafeguardingNotes('');

    if (res.isQueuedOffline) {
      setFeedbackMsg({
        text: `Log recorded locally in Offline Resilient Ledger. (${res.log.student_code}) will sync once reconnected.`,
        type: 'warn',
      });
    } else {
      setFeedbackMsg({
        text: `Log recorded and securely synchronized with Supabase Postgres. (${res.log.student_code})`,
        type: 'success',
      });
    }

    setTimeout(() => setFeedbackMsg(null), 5000);
  };

  return (
    <div className="bg-[#F1F6F4] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Module Header */}
        <div
          className="relative bg-cover bg-center rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(23, 43, 54, 0.92), rgba(17, 76, 90, 0.88)), url('/images/bg-highway-lights.jpg')`,
          }}
        >
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#FF9932]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF9932] text-[#172B36]">
                  Module 1: Field Operations
                </span>
                <span className="text-xs text-[#D9E8E2] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#FFC801]" />
                  4-Hour Weekly Sunday Rhythm
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Sunday Session Manager & Offline Ledger
              </h1>
              <p className="text-sm text-[#D9E8E2] max-w-2xl leading-relaxed">
                Mobile-first high-contrast digital ledger for hub coordinators and vetted adult mentors. Supports offline session tracking, step-by-step 4-hour rhythm validation, and mandatory safeguarding escalation.
              </p>
            </div>

            {/* Offline Resilience Card */}
            <div className="bg-[#172B36]/80 border border-[#FF9932]/30 rounded-xl p-4 flex flex-col gap-2 min-w-[260px]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Offline Resilience Engine:</span>
                {isSimulatedOffline ? (
                  <span className="text-[#FFC801] font-bold flex items-center gap-1">
                    <WifiOff className="w-3.5 h-3.5" />
                    Offline Active
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5" />
                    Supabase Connected
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300">
                Queued Records: <strong className="text-[#FF9932]">{offlineQueueCount}</strong>
              </div>
              {offlineQueueCount > 0 && (
                <button
                  onClick={() => syncOfflineQueue()}
                  className="mt-1 w-full bg-[#FF9932] hover:bg-[#FF9932]/90 text-[#172B36] font-bold text-xs py-1.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  Reconcile & Sync to Cloud
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow ${
              feedbackMsg.type === 'warn'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            <span>{feedbackMsg.text}</span>
            <button onClick={() => setFeedbackMsg(null)} className="text-xs uppercase underline">
              Dismiss
            </button>
          </div>
        )}

        {/* 4-Hour Rhythm Architecture Bar */}
        <div className="bg-white rounded-xl p-4 border border-[#D9E8E2] shadow-sm">
          <div className="text-xs font-bold text-[#172B36] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF9932]" />
            Standard Sunday 4-Hour Curricular Rhythm
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#F1F6F4] p-3 rounded-lg border-l-4 border-[#FF9932]">
              <div className="text-[11px] font-bold text-[#FF9932] uppercase">Hour 1 (09:00 - 10:00)</div>
              <div className="text-sm font-bold text-[#172B36]">Group Empowerment & CBT</div>
              <p className="text-xs text-slate-600 mt-1">
                General assembly, peer discussions, domestic stress check-in, cognitive reframing.
              </p>
              <div className="mt-2 text-xs font-semibold text-[#114C5A]">
                Completed: {attendedCount} / {filteredLogs.length || 1}
              </div>
            </div>

            <div className="bg-[#F1F6F4] p-3 rounded-lg border-l-4 border-[#FFC801]">
              <div className="text-[11px] font-bold text-[#FF9932] uppercase">Hour 2 (10:00 - 11:00)</div>
              <div className="text-sm font-bold text-[#172B36]">Self-Authoring (Logotherapy)</div>
              <p className="text-xs text-slate-600 mt-1">
                Viktor Frankl logotherapy exercises, life purpose definition, academic goal roadmaps.
              </p>
              <div className="mt-2 text-xs font-semibold text-[#114C5A]">
                Completed: {hour2CompletedCount} / {filteredLogs.length || 1}
              </div>
            </div>

            <div className="bg-[#F1F6F4] p-3 rounded-lg border-l-4 border-[#114C5A]">
              <div className="text-[11px] font-bold text-[#FF9932] uppercase">Hour 3 (11:00 - 12:00)</div>
              <div className="text-sm font-bold text-[#172B36]">Skills & Critical Thinking</div>
              <p className="text-xs text-slate-600 mt-1">
                Financial literacy, agro-value chains, substance abuse awareness, problem solving.
              </p>
              <div className="mt-2 text-xs font-semibold text-[#114C5A]">
                Completed: {hour3CompletedCount} / {filteredLogs.length || 1}
              </div>
            </div>

            <div className="bg-[#F1F6F4] p-3 rounded-lg border-l-4 border-red-500">
              <div className="text-[11px] font-bold text-red-600 uppercase">Hour 4 (12:00 - 13:00)</div>
              <div className="text-sm font-bold text-[#172B36]">1-on-1 Mentoring & Safeguarding</div>
              <p className="text-xs text-slate-600 mt-1">
                Private coaching, individual accountability, and mandatory child protection escalation flag.
              </p>
              <div className="mt-2 text-xs font-semibold text-red-700">
                Safeguarding Flags: {safeguardingAlertCount}
              </div>
            </div>
          </div>
        </div>

        {/* Hub Selection & Ledger Controls */}
        <div className="bg-white rounded-xl p-5 border border-[#D9E8E2] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Select Partner Hub
              </label>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="bg-[#F1F6F4] border border-[#D9E8E2] text-xs font-semibold text-[#172B36] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9932] outline-none"
              >
                {hubs.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.school_name} ({h.location})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Session Date
              </label>
              <div className="flex items-center gap-1.5 bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF9932]" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#172B36] outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Search Roster
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Student code, mentor, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#F1F6F4] border border-[#D9E8E2] text-xs pl-8 pr-3 py-2 rounded-lg text-[#172B36] placeholder-slate-400 focus:ring-2 focus:ring-[#FF9932] outline-none w-56"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setFilterSafeguardingOnly(!filterSafeguardingOnly)}
              className={`text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 border transition ${
                filterSafeguardingOnly
                  ? 'bg-red-500 text-white border-red-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Safeguarding Flags Only</span>
              {safeguardingAlertCount > 0 && (
                <span className="bg-white text-red-600 rounded-full px-1.5 text-[10px] font-extrabold">
                  {safeguardingAlertCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF9932] hover:bg-[#FF9932]/90 text-[#172B36] font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Log Student Session</span>
            </button>
          </div>
        </div>

        {/* Attendance Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Enrolled Hub Roster</div>
            <div className="text-2xl font-extrabold text-[#172B36] mt-1">{totalRoster} Students</div>
            <div className="text-[11px] text-[#114C5A] font-semibold mt-0.5">
              Hub: {currentHub.school_name.split(' ')[0]}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Sunday Attendance Rate</div>
            <div className="text-2xl font-extrabold text-[#FF9932] mt-1">
              {totalRoster > 0 ? Math.round((attendedCount / totalRoster) * 100) : 0}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Target: 94% retention</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Vetted Mentors on Duty</div>
            <div className="text-2xl font-extrabold text-[#114C5A] mt-1">{hubMentors.length} Active</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">100% Background Checked</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Safeguarding Alerts</div>
            <div className="text-2xl font-extrabold text-red-600 mt-1">{safeguardingAlertCount} Logged</div>
            <div className="text-[11px] text-red-700 font-semibold mt-0.5">Counselor SLA: &lt; 24h</div>
          </div>
        </div>

        {/* High-Contrast Interactive Session Ledger Table */}
        <div className="bg-white rounded-xl border border-[#D9E8E2] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#D9E8E2] bg-[#172B36] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-tight">Active Sunday Ledger</h3>
              <span className="text-xs bg-[#114C5A] text-[#FFC801] px-2 py-0.5 rounded font-mono">
                {currentHub.school_name}
              </span>
            </div>
            <div className="text-xs text-slate-300">
              Showing {filteredLogs.length} session entries
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <Users className="w-12 h-12 mx-auto text-slate-400 stroke-1" />
              <div className="font-semibold text-slate-700">No session logs found for this filter criteria.</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click &ldquo;Log Student Session&rdquo; above to check in a student or change your hub / search filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F1F6F4] text-slate-600 font-bold uppercase tracking-wider border-b border-[#D9E8E2]">
                  <tr>
                    <th className="py-3 px-4">Anonymous Student Code</th>
                    <th className="py-3 px-4">Vetted Mentor</th>
                    <th className="py-3 px-4 text-center">Hour 1: Empowerment</th>
                    <th className="py-3 px-4 text-center">Hour 2: Self-Authoring</th>
                    <th className="py-3 px-4 text-center">Hour 3: Skills</th>
                    <th className="py-3 px-4">Hour 4: 1-on-1 Notes & Goals</th>
                    <th className="py-3 px-4 text-center">Safeguarding Flag</th>
                    <th className="py-3 px-4 text-center">Cloud Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E8E2]">
                  {filteredLogs.map((log) => {
                    const studentObj = students.find((s) => s.id === log.student_id);
                    return (
                      <tr key={log.id} className="hover:bg-amber-50/40 transition">
                        {/* Student Code */}
                        <td className="py-3 px-4 font-mono font-bold text-[#172B36]">
                          <div className="flex items-center gap-1.5">
                            <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-xs">
                              {log.student_code}
                            </span>
                            {studentObj?.counselor_referred && (
                              <span
                                className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded font-semibold"
                                title="Referred by School Counselor"
                              >
                                Referred
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-sans">
                            {studentObj?.grade_level || 'Form 3'} · {studentObj?.sector_focus || 'Agriculture'}
                          </div>
                        </td>

                        {/* Mentor */}
                        <td className="py-3 px-4 text-slate-700">
                          <div className="font-semibold text-[#172B36]">{log.mentor_name}</div>
                          <div className="text-[10px] text-emerald-700 flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Vetted Mentor
                          </div>
                        </td>

                        {/* Hour 1 Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStep(log.id, 'hour1')}
                            className={`p-1.5 rounded-full transition ${
                              log.hour1_empowerment_attended
                                ? 'bg-[#FF9932] text-[#172B36] hover:bg-[#FF9932]/80'
                                : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                            }`}
                            title="Hour 1: Group Empowerment & CBT Check-in"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>

                        {/* Hour 2 Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStep(log.id, 'hour2')}
                            className={`p-1.5 rounded-full transition ${
                              log.hour2_self_authoring_completed
                                ? 'bg-[#FFC801] text-[#172B36] hover:bg-amber-400'
                                : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                            }`}
                            title="Hour 2: Self-Authoring (Viktor Frankl Logotherapy Progress Sync)"
                          >
                            <BookOpen className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </td>

                        {/* Hour 3 Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStep(log.id, 'hour3')}
                            className={`p-1.5 rounded-full transition ${
                              log.hour3_skills_completed
                                ? 'bg-[#114C5A] text-white hover:bg-[#114C5A]/80'
                                : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                            }`}
                            title="Hour 3: Skills Workshop & Financial Literacy Module"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>

                        {/* Hour 4 1-on-1 Notes */}
                        <td className="py-3 px-4 max-w-xs text-slate-800">
                          <div className="line-clamp-2 text-xs leading-relaxed font-sans">
                            {log.hour4_1on1_notes || (
                              <span className="text-slate-400 italic">No notes logged yet</span>
                            )}
                          </div>
                          {log.safeguarding_notes && (
                            <div className="mt-1 text-[11px] font-medium text-red-700 bg-red-50 p-1 rounded border border-red-200">
                              <strong>Alert Notes:</strong> {log.safeguarding_notes}
                            </div>
                          )}
                        </td>

                        {/* Safeguarding Flag */}
                        <td className="py-3 px-4 text-center">
                          {log.safeguarding_flag ? (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded-full font-bold text-[10px] animate-pulse">
                              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                              {log.safeguarding_severity?.toUpperCase() || 'FLAGGED'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Clear
                            </span>
                          )}
                        </td>

                        {/* Cloud Sync Status */}
                        <td className="py-3 px-4 text-center">
                          {log.synced_to_cloud ? (
                            <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-center gap-1">
                              <Wifi className="w-3 h-3 text-emerald-600" />
                              Synced
                            </span>
                          ) : (
                            <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold text-[10px] inline-flex items-center gap-1">
                              <WifiOff className="w-3 h-3 text-amber-700" />
                              Local Queue
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: Log New Student Session */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#172B36]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#D9E8E2] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E8E2]">
                <div>
                  <h3 className="font-extrabold text-lg text-[#172B36]">
                    Sunday 4-Hour Session Entry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Recording progress for {currentHub.school_name} ({selectedDate})
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateLog} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Student (Protected Code) *
                    </label>
                    <select
                      required
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36] font-semibold"
                    >
                      <option value="">Select student code...</option>
                      {hubStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.student_code} ({s.grade_level} - {s.sector_focus})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Assigned Mentor *
                    </label>
                    <select
                      required
                      value={selectedMentorId}
                      onChange={(e) => setSelectedMentorId(e.target.value)}
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36] font-semibold"
                    >
                      <option value="">Select mentor...</option>
                      {hubMentors.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.full_name} ({m.profession})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4-Hour Modular Steps */}
                <div className="space-y-2 bg-[#F1F6F4] p-3 rounded-xl border border-[#D9E8E2]">
                  <div className="font-bold text-[#172B36] uppercase tracking-wider text-[11px]">
                    4-Hour Rhythm Progress Checklist:
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hour1}
                      onChange={(e) => setHour1(e.target.checked)}
                      className="rounded text-[#FF9932] focus:ring-[#FF9932] w-4 h-4"
                    />
                    <span className="font-semibold text-slate-800">
                      Hour 1 (Empowerment): Attendance & CBT domestic stress check-in completed
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hour2}
                      onChange={(e) => setHour2(e.target.checked)}
                      className="rounded text-[#FFC801] focus:ring-[#FFC801] w-4 h-4"
                    />
                    <span className="font-semibold text-slate-800">
                      Hour 2 (Self-Authoring): Logotherapy purpose & goal worksheet updated
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hour3}
                      onChange={(e) => setHour3(e.target.checked)}
                      className="rounded text-[#114C5A] focus:ring-[#114C5A] w-4 h-4"
                    />
                    <span className="font-semibold text-slate-800">
                      Hour 3 (Skills): Financial literacy / Value Chain / substance awareness module completed
                    </span>
                  </label>
                </div>

                {/* Hour 4 1-on-1 Notes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hour 4 (1-on-1 Coaching Notes & Goal Milestones) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter private coaching notes, student reflections, and accountability commitments for the upcoming week..."
                    value={hour4Notes}
                    onChange={(e) => setHour4Notes(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg p-2.5 text-xs text-[#172B36] outline-none focus:ring-2 focus:ring-[#FF9932]"
                  />
                </div>

                {/* Safeguarding Escalation Section */}
                <div className="border border-red-200 bg-red-50/60 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-red-900">
                      <input
                        type="checkbox"
                        checked={safeguardingFlag}
                        onChange={(e) => setSafeguardingFlag(e.target.checked)}
                        className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                      />
                      <span>Mandatory Safeguarding Escalation Flag</span>
                    </label>
                    <span className="text-[10px] text-red-700 font-semibold uppercase tracking-wider">
                      Child Welfare Protocol
                    </span>
                  </div>

                  {safeguardingFlag && (
                    <div className="space-y-2 pt-2 border-t border-red-200">
                      <div>
                        <label className="block font-bold text-red-900 mb-1">Severity Level</label>
                        <select
                          value={safeguardingSeverity}
                          onChange={(e) =>
                            setSafeguardingSeverity(e.target.value as 'low' | 'medium' | 'critical')
                          }
                          className="w-full bg-white border border-red-300 rounded-lg px-3 py-1.5 text-xs text-red-950 font-semibold"
                        >
                          <option value="low">Low: Emotional distress or mild attendance irregularity</option>
                          <option value="medium">Medium: Domestic conflict or male alcohol abuse at home</option>
                          <option value="critical">Critical: Immediate child safety, neglect, or physical harm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-red-900 mb-1">
                          Confidential Safeguarding Notes (Directly Dispatched to Counselor)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Provide factual details observed without violating minor confidentiality..."
                          value={safeguardingNotes}
                          onChange={(e) => setSafeguardingNotes(e.target.value)}
                          className="w-full bg-white border border-red-300 rounded-lg p-2 text-xs text-red-950 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D9E8E2]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#172B36] hover:bg-[#114C5A] text-white font-bold px-5 py-2 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-4 h-4 text-[#FF9932]" />
                    {isSimulatedOffline ? 'Save to Offline Ledger' : 'Save & Sync to Supabase'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
