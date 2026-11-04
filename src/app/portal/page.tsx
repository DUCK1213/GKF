'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  School,
  Users,
  Calendar,
  ShieldCheck,
  UserPlus,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Database,
  UserCheck,
  ArrowRight,
  Lock,
  LogOut,
  Sparkles,
  Building,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  Inbox,
  Activity,
  Check,
  ChevronDown,
} from 'lucide-react';

export default function PortalPage() {
  // ── Authentication State ──
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPublicMentorSignup, setShowPublicMentorSignup] = useState(false);

  // ── Portal Tabs ──
  const [activeTab, setActiveTab] = useState<'students' | 'sessions' | 'schools' | 'mentors' | 'inquiries'>('students');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // ── Data States ──
  const [schools, setSchools] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [sundayLogs, setSundayLogs] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // ── Filters ──
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState('all');
  const [schoolCategoryFilter, setSchoolCategoryFilter] = useState('all');
  const [schoolSearch, setSchoolSearch] = useState('');
  const [mentorFilter, setMentorFilter] = useState<'all' | 'active' | 'pending'>('all');

  // ── Form States: Student Registration ──
  const [newStudent, setNewStudent] = useState({
    student_code: '',
    hub_id: '', // database column references school id
    age: 15,
    grade_level: 'Form 2',
    sector_focus: 'Agriculture & Food Systems',
    counselor_referred: false,
    guardian_consent: true,
    baseline_self_efficacy: 55,
    baseline_resilience: 50,
    baseline_goal_clarity: 50,
  });

  // ── Form States: Sunday Session ──
  const [newSession, setNewSession] = useState({
    hub_id: '',
    session_date: '',
    student_code: '',
    mentor_name: '',
    hour1_empowerment_attended: true,
    hour2_self_authoring_completed: true,
    hour3_skills_completed: true,
    hour4_1on1_notes: '',
    safeguarding_flag: false,
    safeguarding_severity: 'low',
    safeguarding_notes: '',
  });

  // ── Form States: Mentor Registration ──
  const [newMentor, setNewMentor] = useState({
    full_name: '',
    email: '',
    phone: '',
    profession: 'Community Leader & Professional',
    assigned_hub_id: '',
    background_check_passed: true,
    safeguarding_cert_date: '',
  });

  // ── Form States: Add New School ──
  const [newSchool, setNewSchool] = useState({
    school_name: '',
    location: '',
    sub_county: 'Kangema',
    constituency: 'Kangema',
    school_category: 'Sub-County',
    coordinator_name: '',
  });
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);

  // ── Check Login Status on Mount ──
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('gkf_portal_auth');
      if (stored === 'authenticated') {
        setIsAuthenticated(true);
      }
    } catch {
      // sessionStorage unavailable
    }
    setAuthChecking(false);
  }, []);

  // ── Handle Login ──
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const validPassword = process.env.NEXT_PUBLIC_PORTAL_PASSWORD || 'GKF@Kangema2025';

    // Allow portal access with configured password or friendly fallbacks
    const trimmed = loginPassword.trim();
    if (
      trimmed === validPassword ||
      trimmed.toLowerCase() === 'gkf2025' ||
      trimmed.toLowerCase() === 'kangema' ||
      trimmed === 'GKF@Kangema2025'
    ) {
      try {
        sessionStorage.setItem('gkf_portal_auth', 'authenticated');
      } catch {}
      setIsAuthenticated(true);
      loadPortalData();
    } else {
      setLoginError('Incorrect password. Please verify with the foundation administration.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('gkf_portal_auth');
    } catch {}
    setIsAuthenticated(false);
  };

  // ── Load All Data ──
  const loadPortalData = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    setNewSession(prev => ({ ...prev, session_date: prev.session_date || today }));
    setNewMentor(prev => ({ ...prev, safeguarding_cert_date: prev.safeguarding_cert_date || today }));

    try {
      const [schoolsRes, stuRes, menRes, logsRes, inqRes] = await Promise.all([
        fetch('/api/hubs').then(r => r.json()).catch(() => ({ hubs: [] })),
        fetch('/api/students').then(r => r.json()).catch(() => ({ students: [] })),
        fetch('/api/mentors').then(r => r.json()).catch(() => ({ mentors: [] })),
        fetch('/api/sunday-logs').then(r => r.json()).catch(() => ({ logs: [] })),
        fetch('/api/pipeline/forms').then(r => r.json()).catch(() => ({ submissions: [] })),
      ]);

      const loadedSchools = schoolsRes.hubs || [];
      const loadedMentors = menRes.mentors || [];
      setSchools(loadedSchools);
      setStudents(stuRes.students || []);
      setMentors(loadedMentors);
      setSundayLogs(logsRes.logs || []);
      setInquiries(inqRes.submissions || []);

      // Filter schools that have active mentors
      const schoolsWithMentors = loadedSchools.filter((s: any) => {
        const hasMentorCount = (s.live_mentor_count || 0) > 0;
        const hasInMentorList = loadedMentors.some((m: any) => m.assigned_hub_id === s.id && m.active !== false);
        return hasMentorCount || hasInMentorList;
      });

      if (schoolsWithMentors.length > 0 && !newStudent.hub_id) {
        setNewStudent(prev => ({ ...prev, hub_id: schoolsWithMentors[0].id }));
      }
      if (loadedSchools.length > 0) {
        setNewSession(prev => ({ ...prev, hub_id: loadedSchools[0].id }));
        setNewMentor(prev => ({ ...prev, assigned_hub_id: loadedSchools[0].id }));
      }
    } catch (err) {
      console.error('Error fetching portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPortalData();
    }
  }, [isAuthenticated]);

  // Schools that have at least one mentor
  const availableSchoolsForStudents = schools.filter(s => {
    const hasMentorCount = (s.live_mentor_count || 0) > 0;
    const hasInMentorList = mentors.some(m => m.assigned_hub_id === s.id && m.active !== false);
    return hasMentorCount || hasInMentorList;
  });

  // ── Handle Student Registration ──
  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!newStudent.hub_id) {
      setFeedback({
        type: 'error',
        message: 'Please choose an available school. Students can only register at schools that currently have assigned mentors.',
      });
      return;
    }

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const data = await res.json();
      if (data.success) {
        const schoolName = schools.find(s => s.id === data.student.hub_id)?.school_name || 'partner school';
        setFeedback({
          type: 'success',
          message: `Student ${data.student.student_code} has been successfully registered at ${schoolName}.`,
        });
        setStudents(prev => [data.student, ...prev]);
        setNewStudent({
          student_code: '',
          hub_id: availableSchoolsForStudents[0]?.id || '',
          age: 15,
          grade_level: 'Form 2',
          sector_focus: 'Agriculture & Food Systems',
          counselor_referred: false,
          guardian_consent: true,
          baseline_self_efficacy: 55,
          baseline_resilience: 50,
          baseline_goal_clarity: 50,
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Could not register student.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // ── Handle Sunday Session Submission ──
  const handleRecordSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
      const res = await fetch('/api/sunday-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: `Sunday mentorship session for ${data.log.student_code || 'student'} has been saved.`,
        });
        setSundayLogs(prev => [data.log, ...prev]);
        setNewSession({
          hub_id: schools[0]?.id || '',
          session_date: new Date().toISOString().split('T')[0],
          student_code: '',
          mentor_name: '',
          hour1_empowerment_attended: true,
          hour2_self_authoring_completed: true,
          hour3_skills_completed: true,
          hour4_1on1_notes: '',
          safeguarding_flag: false,
          safeguarding_severity: 'low',
          safeguarding_notes: '',
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Could not save session notes.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // ── Handle Mentor Onboarding (Admin) ──
  const handleOnboardMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
      const res = await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMentor),
      });
      const data = await res.json();
      if (data.success) {
        const schoolName = schools.find(s => s.id === data.mentor.assigned_hub_id)?.school_name || 'assigned school';
        setFeedback({
          type: 'success',
          message: `Mentor ${data.mentor.full_name} is now approved and assigned to ${schoolName}. This school is now active for student enrollment.`,
        });
        setMentors(prev => [data.mentor, ...prev]);
        // Refresh school list to pick up updated mentor counts
        loadPortalData();
        setNewMentor({
          full_name: '',
          email: '',
          phone: '',
          profession: 'Community Leader & Professional',
          assigned_hub_id: schools[0]?.id || '',
          background_check_passed: true,
          safeguarding_cert_date: new Date().toISOString().split('T')[0],
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Could not approve mentor.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // ── Handle Public Mentor Sign Up ──
  const [publicMentor, setPublicMentor] = useState({
    full_name: '',
    email: '',
    phone: '',
    profession: '',
    assigned_hub_id: '',
  });
  const [publicSignupSuccess, setPublicSignupSuccess] = useState(false);

  const handlePublicMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
      const res = await fetch('/api/mentors/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicMentor),
      });
      const data = await res.json();
      if (data.success) {
        setPublicSignupSuccess(true);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Could not submit your application.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // ── Handle Adding a New School ──
  const handleAddNewSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
      const res = await fetch('/api/hubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchool),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: `${data.school.school_name} has been added to Kangema schools! You can now assign or invite mentors to this school.`,
        });
        setShowAddSchoolModal(false);
        setNewSchool({
          school_name: '',
          location: '',
          sub_county: 'Kangema',
          constituency: 'Kangema',
          school_category: 'Sub-County',
          coordinator_name: '',
        });
        loadPortalData();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Could not add school.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // ── Filtered Students ──
  const filteredStudents = students.filter(s => {
    const matchSearch =
      (s.student_code || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
      (s.sector_focus || '').toLowerCase().includes(studentSearch.toLowerCase());
    const matchSchool = selectedSchoolFilter === 'all' || s.hub_id === selectedSchoolFilter;
    return matchSearch && matchSchool;
  });

  // ── Filtered Schools ──
  const filteredSchools = schools.filter(s => {
    const matchSearch =
      (s.school_name || '').toLowerCase().includes(schoolSearch.toLowerCase()) ||
      (s.location || '').toLowerCase().includes(schoolSearch.toLowerCase());
    const matchCategory = schoolCategoryFilter === 'all' || s.school_category === schoolCategoryFilter;
    return matchSearch && matchCategory;
  });

  // ── Filtered Mentors ──
  const filteredMentors = mentors.filter(m => {
    if (mentorFilter === 'active') return m.active === true;
    if (mentorFilter === 'pending') return m.active === false;
    return true;
  });

  // ─────────────────────────────────────────────────────────────
  // 1. PUBLIC MENTOR SIGNUP MODAL / VIEW
  // ─────────────────────────────────────────────────────────────
  if (showPublicMentorSignup) {
    return (
      <div className="bg-[#FAFBF9] min-h-screen text-[#172B36] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-[#EF9332]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF9332]">
                Volunteer with GKF
              </span>
            </div>
            <button
              onClick={() => {
                setShowPublicMentorSignup(false);
                setPublicSignupSuccess(false);
              }}
              className="text-xs text-slate-500 hover:text-[#172B36] font-medium"
            >
              ← Back to Portal Login
            </button>
          </div>

          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#172B36]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Sign Up as a School Mentor
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Join Geoffrey Karema Foundation to mentor secondary school students in Kangema on Sunday afternoons. Select the school where you would like to serve.
            </p>
          </div>

          {publicSignupSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you for volunteering!</span>
              </div>
              <p className="text-sm leading-relaxed text-emerald-800">
                Your application has been received. Our team will review your details and reach out within 3 to 5 business days for safeguarding orientation and school introduction.
              </p>
              <button
                onClick={() => {
                  setShowPublicMentorSignup(false);
                  setPublicSignupSuccess(false);
                }}
                className="mt-2 inline-block bg-[#172B36] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handlePublicMentorSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Wambui Kariuki"
                  value={publicMentor.full_name}
                  onChange={e => setPublicMentor({ ...publicMentor, full_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="grace@example.com"
                    value={publicMentor.email}
                    onChange={e => setPublicMentor({ ...publicMentor, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Phone Number (M-Pesa / WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 712 345 678"
                    value={publicMentor.phone}
                    onChange={e => setPublicMentor({ ...publicMentor, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Your Profession / Area of Expertise</label>
                <input
                  type="text"
                  placeholder="e.g. Agronomist, Teacher, Entrepreneur, Software Engineer"
                  value={publicMentor.profession}
                  onChange={e => setPublicMentor({ ...publicMentor, profession: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Select School in Kangema Where You Want to Mentor *</label>
                <select
                  required
                  value={publicMentor.assigned_hub_id}
                  onChange={e => setPublicMentor({ ...publicMentor, assigned_hub_id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                >
                  <option value="">-- Choose a school --</option>
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.school_name} {s.school_category ? `(${s.school_category})` : ''} - {s.location || 'Kangema'}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Once your application is approved, this school will be opened for student enrollment!
                </p>
              </div>

              <div className="bg-[#EBF2EE] p-4 rounded-xl text-slate-700 text-xs leading-relaxed space-y-1">
                <div className="font-bold text-[#172B36] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safeguarding Commitment</span>
                </div>
                <p>
                  All GKF mentors commit to our child protection policy, background verification, and Sunday session guidelines.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#172B36] hover:bg-[#114C5A] text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Submit Volunteer Application</span>
                <ArrowRight className="w-4 h-4 text-[#EF9332]" />
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. SECURE LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated && !authChecking) {
    return (
      <div className="bg-[#FAFBF9] min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 space-y-7">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#172B36] text-[#EF9332] shadow-sm mb-1">
              <Lock className="w-7 h-7" />
            </div>
            <span
              className="text-[11px] font-bold tracking-[0.2em] text-[#EF9332] uppercase block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              FOUNDATION PORTAL
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#172B36]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Sign In to Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              Enter your foundation access password to register students, manage partner schools, and log sessions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Access Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={loginPassword}
                onChange={e => {
                  setLoginPassword(e.target.value);
                  setLoginError('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#172B36] hover:bg-[#114C5A] text-white font-bold py-3.5 rounded-xl transition shadow-md text-sm flex items-center justify-center gap-2"
            >
              <span>Access Operations Portal</span>
              <ArrowRight className="w-4 h-4 text-[#EF9332]" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">or</span>
            </div>
          </div>

          {/* Public Mentor Action */}
          <div className="text-center pt-1">
            <p className="text-xs text-slate-600 mb-2">Are you a professional or community member looking to mentor?</p>
            <button
              onClick={() => {
                setShowPublicMentorSignup(true);
                loadPortalData();
              }}
              className="inline-flex items-center gap-2 bg-[#EF9332]/10 hover:bg-[#EF9332]/20 text-[#172B36] font-bold text-xs px-4 py-2.5 rounded-xl transition"
            >
              <HeartHandshake className="w-4 h-4 text-[#EF9332]" />
              <span>Sign Up to Mentor at a School</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 3. MAIN AUTHENTICATED PORTAL
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#FAFBF9] min-h-screen text-[#172B36] pb-24">
      {/* ── PORTAL HEADER ── */}
      <section className="bg-[#172B36] text-white pt-10 pb-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[11px] font-bold tracking-[0.2em] text-[#EF9332] uppercase px-2.5 py-0.5 rounded-full bg-[#EF9332]/10 border border-[#EF9332]/20"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  FOUNDATION PORTAL
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <Database className="w-3 h-3" />
                  <span>Database Connected</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Schools &amp; Mentorship Portal
              </h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
                Register students, support partner secondary schools across Kangema constituency, and keep Sunday mentorship records organized.
              </p>
            </div>

            {/* Quick Metrics Bar & Sign Out */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 text-xs">
                <div className="px-3 border-r border-white/10">
                  <div className="text-slate-400 font-medium">Students</div>
                  <div className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {students.length}
                  </div>
                </div>
                <div className="px-3 border-r border-white/10">
                  <div className="text-slate-400 font-medium">Kangema Schools</div>
                  <div className="text-lg font-black text-[#EF9332]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {schools.length}
                  </div>
                </div>
                <div className="px-3 border-r border-white/10">
                  <div className="text-slate-400 font-medium">Active Mentors</div>
                  <div className="text-lg font-black text-[#FFC801]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {mentors.length}
                  </div>
                </div>
                <div className="px-2">
                  <button
                    onClick={loadPortalData}
                    disabled={loading}
                    title="Refresh Data"
                    className="p-2 hover:bg-white/10 text-white rounded-xl transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-200 px-3.5 py-2.5 rounded-xl transition text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8 border-t border-slate-700/60 pt-4 text-xs font-semibold">
            {[
              { id: 'students', label: 'Students', icon: Users, badge: students.length },
              { id: 'sessions', label: 'Sunday Sessions', icon: Calendar, badge: sundayLogs.length },
              { id: 'schools', label: 'Kangema Schools', icon: School, badge: schools.length },
              { id: 'mentors', label: 'Mentors', icon: UserCheck, badge: mentors.length },
              { id: 'inquiries', label: 'Website Inquiries', icon: Inbox, badge: inquiries.length },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setFeedback(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
                    isActive
                      ? 'bg-[#EF9332] text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK ALERT ── */}
      {feedback && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border shadow-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <div className="flex-1">{feedback.message}</div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md hover:bg-black/5"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT TABS ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* ========================================================= */}
        {/* TAB 1: STUDENTS (REGISTER & DIRECTORY)                     */}
        {/* ========================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Enrollment Form */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-[#EF9332] text-xs font-bold uppercase tracking-wider">
                    <UserPlus className="w-4 h-4" />
                    <span>New Student Registration</span>
                  </div>
                  <h2
                    className="text-xl font-bold text-[#172B36] mt-1"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Register a Student
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Students can only be enrolled at schools that have active mentors assigned.
                  </p>
                </div>

                <form onSubmit={handleEnrollStudent} className="space-y-4 text-xs font-medium">
                  {/* School Selector - ONLY schools with mentors */}
                  <div>
                    <label className="block text-slate-700 mb-1">
                      Partner School * <span className="text-[#EF9332] font-normal">(Schools with active mentors)</span>
                    </label>
                    {availableSchoolsForStudents.length === 0 ? (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                        No schools currently have assigned mentors. Please assign or approve a mentor in the Mentors tab first.
                      </div>
                    ) : (
                      <select
                        value={newStudent.hub_id}
                        onChange={e => setNewStudent({ ...newStudent, hub_id: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      >
                        {availableSchoolsForStudents.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.school_name} ({s.location || 'Kangema'}) — {s.live_mentor_count || 1} mentor(s)
                          </option>
                        ))}
                      </select>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1">
                      {availableSchoolsForStudents.length} of {schools.length} schools are currently ready with mentors.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Student Identifier Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. GKF-MUR-015"
                        value={newStudent.student_code}
                        onChange={e => setNewStudent({ ...newStudent, student_code: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1">Age *</label>
                      <input
                        type="number"
                        min="12"
                        max="24"
                        value={newStudent.age}
                        onChange={e => setNewStudent({ ...newStudent, age: parseInt(e.target.value, 10) || 15 })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Grade Level *</label>
                      <select
                        value={newStudent.grade_level}
                        onChange={e => setNewStudent({ ...newStudent, grade_level: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      >
                        <option value="Form 1">Form 1 (Intake)</option>
                        <option value="Form 2">Form 2</option>
                        <option value="Form 3">Form 3</option>
                        <option value="Form 4">Form 4 (Graduating)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">Focus Pathway *</label>
                      <select
                        value={newStudent.sector_focus}
                        onChange={e => setNewStudent({ ...newStudent, sector_focus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      >
                        <option value="Agriculture & Food Systems">Agriculture &amp; Food Systems</option>
                        <option value="Technology & Coding">Technology &amp; Coding</option>
                        <option value="Healthcare & Nursing">Healthcare &amp; Nursing</option>
                        <option value="Skilled Trades">Skilled Technical Trades</option>
                        <option value="Business & Entrepreneurship">Business &amp; Entrepreneurship</option>
                      </select>
                    </div>
                  </div>

                  {/* Growth Baseline Sliders */}
                  <div className="bg-[#EBF2EE]/60 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#172B36]">
                      <span>Starting Scores (Out of 100)</span>
                      <span className="text-[#EF9332] text-[10px]">Initial Assessment</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Confidence &amp; Self-Belief</span>
                        <span className="font-bold text-[#172B36]">{newStudent.baseline_self_efficacy}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={newStudent.baseline_self_efficacy}
                        onChange={e => setNewStudent({ ...newStudent, baseline_self_efficacy: parseInt(e.target.value, 10) })}
                        className="w-full accent-[#EF9332] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Resilience &amp; Coping</span>
                        <span className="font-bold text-[#172B36]">{newStudent.baseline_resilience}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={newStudent.baseline_resilience}
                        onChange={e => setNewStudent({ ...newStudent, baseline_resilience: parseInt(e.target.value, 10) })}
                        className="w-full accent-[#EF9332] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Goal Clarity</span>
                        <span className="font-bold text-[#172B36]">{newStudent.baseline_goal_clarity}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={newStudent.baseline_goal_clarity}
                        onChange={e => setNewStudent({ ...newStudent, baseline_goal_clarity: parseInt(e.target.value, 10) })}
                        className="w-full accent-[#EF9332] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-2 pt-1 text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStudent.counselor_referred}
                        onChange={e => setNewStudent({ ...newStudent, counselor_referred: e.target.checked })}
                        className="rounded text-[#EF9332] focus:ring-[#EF9332]"
                      />
                      <span>Referred by School Guidance Counselor / Teacher</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStudent.guardian_consent}
                        onChange={e => setNewStudent({ ...newStudent, guardian_consent: e.target.checked })}
                        className="rounded text-[#EF9332] focus:ring-[#EF9332]"
                      />
                      <span>Parental or Guardian consent form signed on file</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={availableSchoolsForStudents.length === 0}
                    className="w-full bg-[#172B36] hover:bg-[#114C5A] disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition shadow-sm mt-3 flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-[#EF9332]" />
                    <span>Complete Student Registration</span>
                  </button>
                </form>
              </div>

              {/* Student Directory Table */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3
                      className="text-xl font-bold text-[#172B36]"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      Enrolled Students ({filteredStudents.length})
                    </h3>
                    <p className="text-xs text-slate-500">Active students in Kangema partner schools.</p>
                  </div>

                  {/* Search and School Selector */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search student code..."
                        value={studentSearch}
                        onChange={e => setStudentSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#172B36] focus:outline-none focus:ring-1 focus:ring-[#EF9332]"
                      />
                    </div>
                    <select
                      value={selectedSchoolFilter}
                      onChange={e => setSelectedSchoolFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#172B36] focus:outline-none"
                    >
                      <option value="all">All Schools</option>
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.school_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="py-2.5 pr-3">Student Code</th>
                        <th className="py-2.5 px-3">School</th>
                        <th className="py-2.5 px-3">Grade &amp; Age</th>
                        <th className="py-2.5 px-3">Focus Area</th>
                        <th className="py-2.5 pl-3 text-right">Referral</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map(s => {
                        const schoolObj = schools.find(sch => sch.id === s.hub_id);
                        return (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 pr-3 font-bold text-[#172B36]">{s.student_code}</td>
                            <td className="py-3 px-3 text-slate-700">
                              {schoolObj?.school_name || 'Partner School'}
                            </td>
                            <td className="py-3 px-3 text-slate-600">
                              {s.grade_level} · {s.age} yrs
                            </td>
                            <td className="py-3 px-3">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                                {s.sector_focus || 'General'}
                              </span>
                            </td>
                            <td className="py-3 pl-3 text-right">
                              {s.counselor_referred ? (
                                <span className="bg-[#EF9332]/10 text-[#EF9332] font-semibold px-2 py-0.5 rounded-full text-[10px]">
                                  Counselor
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[10px]">Direct</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            No students match your filter criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SUNDAY SESSIONS                                    */}
        {/* ========================================================= */}
        {activeTab === 'sessions' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-[#EF9332] text-xs font-bold uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    <span>Weekly Session Notes</span>
                  </div>
                  <h2
                    className="text-xl font-bold text-[#172B36] mt-1"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Log a Sunday Session
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Record attendance, personal roadmaps, and mentor field observations.
                  </p>
                </div>

                <form onSubmit={handleRecordSession} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 mb-1">Partner School *</label>
                    <select
                      value={newSession.hub_id}
                      onChange={e => setNewSession({ ...newSession, hub_id: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    >
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.school_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Session Date *</label>
                      <input
                        type="date"
                        value={newSession.session_date}
                        onChange={e => setNewSession({ ...newSession, session_date: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1">Student Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. GKF-MUR-001"
                        value={newSession.student_code}
                        onChange={e => setNewSession({ ...newSession, student_code: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Mentor Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Samuel Karanja"
                      value={newSession.mentor_name}
                      onChange={e => setNewSession({ ...newSession, mentor_name: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    />
                  </div>

                  {/* 4 Hours Checkbox */}
                  <div className="bg-[#EBF2EE]/70 rounded-2xl p-4 border border-slate-200/60 space-y-2">
                    <span className="block font-bold text-[#172B36] text-[11px] uppercase tracking-wider mb-2">
                      Sunday Rhythm Checklist
                    </span>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={newSession.hour1_empowerment_attended}
                        onChange={e => setNewSession({ ...newSession, hour1_empowerment_attended: e.target.checked })}
                        className="rounded text-[#EF9332] focus:ring-[#EF9332]"
                      />
                      <span>Hour 1: Group Gathering &amp; Wellbeing Check-in</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={newSession.hour2_self_authoring_completed}
                        onChange={e => setNewSession({ ...newSession, hour2_self_authoring_completed: e.target.checked })}
                        className="rounded text-[#EF9332] focus:ring-[#EF9332]"
                      />
                      <span>Hour 2: Personal Goals &amp; Future Planning</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={newSession.hour3_skills_completed}
                        onChange={e => setNewSession({ ...newSession, hour3_skills_completed: e.target.checked })}
                        className="rounded text-[#EF9332] focus:ring-[#EF9332]"
                      />
                      <span>Hour 3: Practical Life Skills &amp; Reading</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Hour 4: One-on-One Conversation Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Discussed exam preparation, family matters, goal progress, future career ideas..."
                      value={newSession.hour4_1on1_notes}
                      onChange={e => setNewSession({ ...newSession, hour4_1on1_notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    />
                  </div>

                  {/* Wellbeing flag */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-amber-900 font-bold">
                      <input
                        type="checkbox"
                        checked={newSession.safeguarding_flag}
                        onChange={e => setNewSession({ ...newSession, safeguarding_flag: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Flag a Student Safety or Wellbeing Concern</span>
                    </label>

                    {newSession.safeguarding_flag && (
                      <div className="space-y-2 pt-2 border-t border-amber-200">
                        <div>
                          <label className="block text-amber-800 text-[11px] mb-1">Priority</label>
                          <select
                            value={newSession.safeguarding_severity}
                            onChange={e => setNewSession({ ...newSession, safeguarding_severity: e.target.value })}
                            className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-amber-900"
                          >
                            <option value="low">Low (Teacher/counselor check-in requested)</option>
                            <option value="medium">Medium (Family stress or attendance risk)</option>
                            <option value="high">High (Needs immediate attention)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-amber-800 text-[11px] mb-1">Confidential Notes</label>
                          <input
                            type="text"
                            placeholder="Details for the foundation team..."
                            value={newSession.safeguarding_notes}
                            onChange={e => setNewSession({ ...newSession, safeguarding_notes: e.target.value })}
                            className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-amber-900"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#172B36] hover:bg-[#114C5A] text-white font-bold py-3 rounded-xl transition shadow-sm mt-3 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#EF9332]" />
                    <span>Save Sunday Session Notes</span>
                  </button>
                </form>
              </div>

              {/* Session Ledger Table */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3
                    className="text-xl font-bold text-[#172B36]"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Sunday Session Records ({sundayLogs.length})
                  </h3>
                  <p className="text-xs text-slate-500">Weekly logs from school mentorship sessions.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="py-2.5 pr-3">Date</th>
                        <th className="py-2.5 px-3">Student</th>
                        <th className="py-2.5 px-3">Mentor</th>
                        <th className="py-2.5 px-3">Hours Completed</th>
                        <th className="py-2.5 pl-3 text-right">Wellbeing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sundayLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 pr-3 font-semibold text-[#172B36]">
                            {log.session_date ? new Date(log.session_date).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-3 font-bold text-[#172B36]">{log.student_code || 'Student'}</td>
                          <td className="py-3 px-3 text-slate-600">{log.mentor_name || 'Assigned Mentor'}</td>
                          <td className="py-3 px-3">
                            <div className="flex gap-1 text-[10px] font-bold">
                              <span className={`px-1.5 py-0.5 rounded ${log.hour1_empowerment_attended ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>H1</span>
                              <span className={`px-1.5 py-0.5 rounded ${log.hour2_self_authoring_completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>H2</span>
                              <span className={`px-1.5 py-0.5 rounded ${log.hour3_skills_completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>H3</span>
                              <span className={`px-1.5 py-0.5 rounded ${log.hour4_1on1_notes ? 'bg-[#EF9332]/20 text-[#EF9332]' : 'bg-slate-100 text-slate-400'}`}>H4</span>
                            </div>
                          </td>
                          <td className="py-3 pl-3 text-right">
                            {log.safeguarding_flag ? (
                              <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                                Alert ({log.safeguarding_severity || 'Low'})
                              </span>
                            ) : (
                              <span className="text-emerald-600 text-[11px] font-medium">Clear</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {sundayLogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            No Sunday session notes recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: KANGEMA SCHOOLS (DIRECTORY & ADD NEW SCHOOL)        */}
        {/* ========================================================= */}
        {activeTab === 'schools' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF9332]">
                      Kangema Constituency Directory
                    </span>
                  </div>
                  <h2
                    className="text-2xl font-bold text-[#172B36] mt-0.5"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Secondary Schools in Kangema ({filteredSchools.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Every secondary school in Kangema constituency. Schools with at least one mentor are marked &quot;Ready for Students&quot;.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowAddSchoolModal(true)}
                    className="flex items-center gap-2 bg-[#172B36] hover:bg-[#114C5A] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4 text-[#EF9332]" />
                    <span>Add New School</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search school name or area..."
                    value={schoolSearch}
                    onChange={e => setSchoolSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#172B36] focus:outline-none focus:ring-1 focus:ring-[#EF9332]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-500 font-medium">Category:</span>
                  <select
                    value={schoolCategoryFilter}
                    onChange={e => setSchoolCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#172B36] focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="National">National</option>
                    <option value="Extra-County">Extra-County</option>
                    <option value="County">County</option>
                    <option value="Sub-County">Sub-County</option>
                  </select>
                </div>
              </div>

              {/* Schools Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 pr-4">School Name</th>
                      <th className="py-3 px-3">Location / Ward</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Mentors</th>
                      <th className="py-3 px-3">Students</th>
                      <th className="py-3 pl-3 text-right">Enrollment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSchools.map(sch => {
                      const mentorCount = sch.live_mentor_count || 0;
                      const hasMentors = mentorCount > 0 || mentors.some(m => m.assigned_hub_id === sch.id && m.active !== false);

                      return (
                        <tr key={sch.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 pr-4 font-bold text-[#172B36] text-sm">
                            {sch.school_name}
                          </td>
                          <td className="py-3.5 px-3 text-slate-600">
                            {sch.location || sch.sub_county || 'Kangema'}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
                              {sch.school_category || 'Sub-County'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`font-bold ${hasMentors ? 'text-emerald-700' : 'text-slate-400'}`}>
                              {mentorCount} mentor{mentorCount === 1 ? '' : 's'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium">
                            {sch.live_student_count || 0}
                          </td>
                          <td className="py-3.5 pl-3 text-right">
                            {hasMentors ? (
                              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>Ready for Students</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 font-semibold px-2.5 py-1 rounded-full text-[10px]">
                                <span>Needs a Mentor</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Add New School */}
            {showAddSchoolModal && (
              <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#EF9332]">
                        New School Entry
                      </span>
                      <h3
                        className="font-extrabold text-xl text-[#172B36] mt-0.5"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        Add a Secondary School
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowAddSchoolModal(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddNewSchool} className="space-y-4 text-xs font-medium">
                    <div>
                      <label className="block text-slate-700 mb-1">Official School Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kanyenyaini Secondary School"
                        value={newSchool.school_name}
                        onChange={e => setNewSchool({ ...newSchool, school_name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 mb-1">Location / Village / Town *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kanyenyaini Center"
                          value={newSchool.location}
                          onChange={e => setNewSchool({ ...newSchool, location: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1">School Category *</label>
                        <select
                          value={newSchool.school_category}
                          onChange={e => setNewSchool({ ...newSchool, school_category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                        >
                          <option value="Sub-County">Sub-County Secondary</option>
                          <option value="County">County Secondary</option>
                          <option value="Extra-County">Extra-County Secondary</option>
                          <option value="National">National Secondary</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">Principal / Coordinator Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Mr. John Mwangi"
                        value={newSchool.coordinator_name}
                        onChange={e => setNewSchool({ ...newSchool, coordinator_name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddSchoolModal(false)}
                        className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#172B36] hover:bg-[#114C5A] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm"
                      >
                        Save School
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MENTORS (ONBOARD & ROSTER)                         */}
        {/* ========================================================= */}
        {activeTab === 'mentors' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-[#EF9332] text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mentor Assignment</span>
                  </div>
                  <h2
                    className="text-xl font-bold text-[#172B36] mt-1"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Assign a Mentor to a School
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assigning an active mentor activates that school so students can be registered.
                  </p>
                </div>

                <form onSubmit={handleOnboardMentor} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Catherine Nduta"
                      value={newMentor.full_name}
                      onChange={e => setNewMentor({ ...newMentor, full_name: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="mentor@example.com"
                        value={newMentor.email}
                        onChange={e => setNewMentor({ ...newMentor, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="+254 7..."
                        value={newMentor.phone}
                        onChange={e => setNewMentor({ ...newMentor, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Profession &amp; Sector</label>
                    <input
                      type="text"
                      placeholder="e.g. Agronomist, Engineer, Teacher"
                      value={newMentor.profession}
                      onChange={e => setNewMentor({ ...newMentor, profession: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Assigned Secondary School *</label>
                    <select
                      value={newMentor.assigned_hub_id}
                      onChange={e => setNewMentor({ ...newMentor, assigned_hub_id: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    >
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.school_name} ({s.location || 'Kangema'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Safeguarding Orientation Date *</label>
                    <input
                      type="date"
                      value={newMentor.safeguarding_cert_date}
                      onChange={e => setNewMentor({ ...newMentor, safeguarding_cert_date: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#172B36] focus:outline-none focus:ring-2 focus:ring-[#EF9332]"
                    />
                  </div>

                  <div className="bg-[#EBF2EE]/60 rounded-2xl p-3.5 border border-slate-200/60">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={newMentor.background_check_passed}
                        onChange={e => setNewMentor({ ...newMentor, background_check_passed: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-semibold text-[#172B36]">
                        Background check / Certificate of Good Conduct on file
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#172B36] hover:bg-[#114C5A] text-white font-bold py-3 rounded-xl transition shadow-sm mt-3 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#EF9332]" />
                    <span>Approve Mentor &amp; Activate School</span>
                  </button>
                </form>
              </div>

              {/* Mentors Table */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3
                      className="text-xl font-bold text-[#172B36]"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      Mentor Roster ({filteredMentors.length})
                    </h3>
                    <p className="text-xs text-slate-500">Volunteers guiding students across Kangema schools.</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => setMentorFilter('all')}
                      className={`px-3 py-1 rounded-full font-medium ${mentorFilter === 'all' ? 'bg-[#172B36] text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setMentorFilter('active')}
                      className={`px-3 py-1 rounded-full font-medium ${mentorFilter === 'active' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setMentorFilter('pending')}
                      className={`px-3 py-1 rounded-full font-medium ${mentorFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Pending
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="py-2.5 pr-3">Mentor Name</th>
                        <th className="py-2.5 px-3">Profession</th>
                        <th className="py-2.5 px-3">Assigned School</th>
                        <th className="py-2.5 pl-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMentors.map(m => {
                        const assignedSchool = schools.find(s => s.id === m.assigned_hub_id);
                        return (
                          <tr key={m.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 pr-3 font-bold text-[#172B36]">
                              {m.full_name}
                              {m.email && <div className="text-[11px] font-normal text-slate-400">{m.email}</div>}
                            </td>
                            <td className="py-3 px-3 text-slate-600">{m.profession || 'Professional'}</td>
                            <td className="py-3 px-3 text-slate-700 font-medium">
                              {assignedSchool?.school_name || m.hub_name || 'General'}
                            </td>
                            <td className="py-3 pl-3 text-right">
                              {m.active !== false ? (
                                <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                                  Active
                                </span>
                              ) : (
                                <button
                                  onClick={async () => {
                                    try {
                                      await fetch('/api/mentors', {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ id: m.id, active: true, background_check_passed: true }),
                                      });
                                      setFeedback({ type: 'success', message: `${m.full_name} is now approved and active!` });
                                      loadPortalData();
                                    } catch (e: any) {
                                      setFeedback({ type: 'error', message: e.message });
                                    }
                                  }}
                                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full text-[10px] transition"
                                >
                                  Approve →
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: INQUIRIES & APPLICATIONS                           */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3
                  className="text-xl font-bold text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Website Messages &amp; Applications ({inquiries.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Messages received from visitors on the GKF website.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 pr-3">Date</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Sender / Organization</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 pl-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 pr-3 text-slate-500">
                        {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-[#EF9332]/10 text-[#EF9332] font-semibold px-2 py-0.5 rounded-full text-[10px]">
                          {inq.form_type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#172B36]">
                        {inq.name || inq.org_name || 'Anonymous'}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {inq.email || inq.contact_email || '—'}
                      </td>
                      <td className="py-3 pl-3 text-slate-600 max-w-xs truncate">
                        {inq.message || inq.motivation || inq.details || '—'}
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No submissions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
