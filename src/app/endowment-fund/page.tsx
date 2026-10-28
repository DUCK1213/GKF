'use client';

import React, { useState, useEffect } from 'react';
import { GKFDatabaseEngine } from '@/lib/supabaseMock';
import {
  EndowmentAllocation,
  INITIAL_STUDENTS,
  INITIAL_ENDOWMENT_ALLOCATIONS,
} from '@/data/mockData';
import { useRole } from '@/components/RoleContext';
import { formatCurrencyKsh } from '@/lib/utils';
import {
  Coins,
  GraduationCap,
  Building2,
  FileCheck2,
  CheckCircle2,
  Clock,
  Plus,
  Download,
  ShieldCheck,
  Award,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpRight,
} from 'lucide-react';

export default function EndowmentFundPage() {
  const { role } = useRole();
  const [allocations, setAllocations] = useState<EndowmentAllocation[]>(
    INITIAL_ENDOWMENT_ALLOCATIONS
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'disbursed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Form State for New Allocation
  const [studentCode, setStudentCode] = useState('GKF-MRG-003');
  const [institution, setInstitution] = useState('Dedan Kimathi University of Technology (DeKUT)');
  const [degreeProgram, setDegreeProgram] = useState('B.Sc. Sustainable Agriculture & Irrigation Engineering');
  const [grantType, setGrantType] = useState<EndowmentAllocation['grant_type']>('University Tuition');
  const [amount, setAmount] = useState('175000');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const engine = GKFDatabaseEngine.getInstance();
    setAllocations(engine.getEndowments());

    const handleDataChange = () => {
      setAllocations(engine.getEndowments());
    };

    window.addEventListener('gkf-data-change', handleDataChange);
    return () => window.removeEventListener('gkf-data-change', handleDataChange);
  }, []);

  const totalCapitalPool = 42500000; // Ksh 42.5M
  const totalDisbursed = allocations
    .filter((a) => a.disbursement_status === 'disbursed')
    .reduce((acc, curr) => acc + curr.sponsorship_amount, 0);
  const totalApproved = allocations
    .filter((a) => a.disbursement_status === 'approved')
    .reduce((acc, curr) => acc + curr.sponsorship_amount, 0);
  const totalPending = allocations
    .filter((a) => a.disbursement_status === 'pending')
    .reduce((acc, curr) => acc + curr.sponsorship_amount, 0);

  const filteredAllocations = statusFilter === 'all'
    ? allocations
    : allocations.filter((a) => a.disbursement_status === statusFilter);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'disbursed') => {
    const engine = GKFDatabaseEngine.getInstance();
    const approvedBy = role === 'super_admin' ? 'Super Admin - Fiduciary Sign-off' : 'Endowment Governance Committee';
    engine.updateEndowmentStatus(id, newStatus, approvedBy);
    setFeedback(`Allocation status updated to: ${newStatus.toUpperCase()}`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleCreateAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const engine = GKFDatabaseEngine.getInstance();
    engine.addEndowment({
      student_id: `stu-${Date.now()}`,
      student_code: studentCode,
      institution_name: institution,
      degree_program: degreeProgram,
      grant_type: grantType,
      sponsorship_amount: parseFloat(amount) || 150000,
      disbursement_status: 'pending',
      approved_by: 'Pending Fiduciary Review',
    });

    setIsModalOpen(false);
    setFeedback(`New higher education allocation recorded for ${studentCode}`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const generateComplianceReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      setReportGenerated(false);
      // Trigger download of report text
      const reportText = `GEOFFREY KAREMA FOUNDATION (GKF)
HIGHER EDUCATION ENDOWMENT FUND - FIDUCIARY COMPLIANCE AUDIT
Generated: ${new Date().toISOString()}
Governance Standard: Version 6.0 Perpetual Trust

1. CAPITAL POSITION
Total Perpetual Capital Pool: ${formatCurrencyKsh(totalCapitalPool)}
Total Disbursed to Universities & Colleges: ${formatCurrencyKsh(totalDisbursed)}
Committed & Approved for Upcoming Semester: ${formatCurrencyKsh(totalApproved)}
Pending Review: ${formatCurrencyKsh(totalPending)}

2. ALLOCATION BREAKDOWN
${allocations
  .map(
    (a) =>
      `[${a.disbursement_status.toUpperCase()}] ${a.student_code} - ${a.institution_name} - ${a.degree_program} (${formatCurrencyKsh(a.sponsorship_amount)})`
  )
  .join('\n')}

3. FIDUCIARY ATTESTATION
The Board of Trustees attests that 100% of endowment funds are segregated in escrow accounts and allocated strictly based on validated M&E goal performance.
`;
      const element = document.createElement('a');
      const file = new Blob([reportText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `GKF_Endowment_Fiduciary_Report_Q4_2026.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  return (
    <div className="bg-[#F1F6F4] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div
          className="relative bg-cover bg-center rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(23, 43, 54, 0.92), rgba(17, 76, 90, 0.88)), url('/images/bg-sunrise-mountain.jpg')`,
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFC801] text-[#172B36]">
                  Module 4: Sustainable Future
                </span>
                <span className="text-xs text-[#D9E8E2] font-mono">
                  Perpetual Capital Pool · Tertiary Scholarships · Fiduciary Audit
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Higher Education Endowment Fund & Fiduciary Portal
              </h1>
              <p className="text-sm text-[#D9E8E2] max-w-2xl leading-relaxed">
                A perpetual capital trust guaranteeing university tuition, technical vocational training fees, and living stipends for high-performing marginalized youth graduating from Sunday hubs.
              </p>
            </div>

            <div className="bg-[#172B36]/90 border border-[#FF9932]/40 rounded-xl p-4 text-center min-w-[260px]">
              <div className="text-xs text-slate-300">Total Endowment Capital Pool</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FF9932] mt-1">
                {formatCurrencyKsh(totalCapitalPool)}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                Segregated Escrow Account
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-950 p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="underline uppercase">
              Dismiss
            </button>
          </div>
        )}

        {/* Fiduciary KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Disbursed to Universities
            </div>
            <div className="text-2xl font-extrabold text-[#114C5A] mt-2">
              {formatCurrencyKsh(totalDisbursed)}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Tuition Fees Remitted
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Approved (Next Semester)
            </div>
            <div className="text-2xl font-extrabold text-[#FF9932] mt-2">
              {formatCurrencyKsh(totalApproved)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Trustee sign-off complete
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Pending Verification
            </div>
            <div className="text-2xl font-extrabold text-amber-600 mt-2">
              {formatCurrencyKsh(totalPending)}
            </div>
            <div className="text-[11px] text-amber-800 font-semibold mt-1">
              Under final academic audit
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#D9E8E2] shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Scholars Supported
            </div>
            <div className="text-2xl font-extrabold text-[#172B36] mt-2">
              {allocations.length} Youth
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Public Universities & TVETs
            </div>
          </div>
        </div>

        {/* Fiduciary Control & Disbursement Actions */}
        <div className="bg-white rounded-xl p-5 border border-[#D9E8E2] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Status Filter:</span>
            {(['all', 'pending', 'approved', 'disbursed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                  statusFilter === st
                    ? 'bg-[#172B36] text-[#FFC801]'
                    : 'bg-[#F1F6F4] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={generateComplianceReport}
              disabled={reportGenerated}
              className="bg-[#114C5A] hover:bg-[#114C5A]/80 text-[#FFC801] font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{reportGenerated ? 'Compiling Audit...' : 'Download Quarterly Fiduciary Audit'}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF9932] hover:bg-[#FF9932]/90 text-[#172B36] font-extrabold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>New Scholarship Grant</span>
            </button>
          </div>
        </div>

        {/* Higher Education Allocation Ledger */}
        <div className="bg-white rounded-xl border border-[#D9E8E2] shadow-sm overflow-hidden">
          <div className="p-4 bg-[#172B36] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF9932]" />
              <h3 className="font-bold text-sm">Higher Education Allocation Ledger</h3>
            </div>
            <div className="text-xs text-slate-300">
              Showing {filteredAllocations.length} scholarship allocations
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F1F6F4] text-slate-600 font-bold uppercase tracking-wider border-b border-[#D9E8E2]">
                <tr>
                  <th className="py-3 px-4">Student Code</th>
                  <th className="py-3 px-4">Tertiary Institution & Degree</th>
                  <th className="py-3 px-4">Grant Category</th>
                  <th className="py-3 px-4 text-right">Sponsorship Amount</th>
                  <th className="py-3 px-4 text-center">Disbursement Status</th>
                  <th className="py-3 px-4">Fiduciary Approver</th>
                  <th className="py-3 px-4 text-center">Trustee Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E8E2]">
                {filteredAllocations.map((alloc) => (
                  <tr key={alloc.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#172B36]">
                      {alloc.student_code}
                    </td>

                    <td className="py-3 px-4 text-slate-800">
                      <div className="font-bold text-[#172B36]">{alloc.institution_name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{alloc.degree_program}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-[#114C5A]/10 text-[#114C5A] border border-[#114C5A]/20">
                        {alloc.grant_type}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-extrabold text-[#172B36]">
                      {formatCurrencyKsh(alloc.sponsorship_amount)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {alloc.disbursement_status === 'disbursed' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          DISBURSED
                        </span>
                      ) : alloc.disbursement_status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-bold text-[10px] px-2.5 py-1 rounded-full border border-blue-300">
                          <Clock className="w-3 h-3 text-blue-600" />
                          APPROVED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-[10px] px-2.5 py-1 rounded-full border border-amber-300">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          PENDING
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {alloc.approved_by}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {alloc.disbursement_status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(alloc.id, 'approved')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-2.5 py-1 rounded shadow"
                        >
                          Approve
                        </button>
                      )}
                      {alloc.disbursement_status === 'approved' && (
                        <button
                          onClick={() => handleStatusChange(alloc.id, 'disbursed')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded shadow"
                        >
                          Disburse
                        </button>
                      )}
                      {alloc.disbursement_status === 'disbursed' && (
                        <span className="text-slate-400 text-[10px] italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: New Scholarship Grant */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D9E8E2] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E8E2]">
                <div>
                  <h3 className="font-extrabold text-base text-[#172B36]">
                    New Higher Education Allocation
                  </h3>
                  <p className="text-xs text-slate-500">
                    GKF Endowment Fund Fiduciary Disbursement Protocol
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateAllocation} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Student Anonymous Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#172B36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tertiary Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Degree / Vocational Program *
                  </label>
                  <input
                    type="text"
                    required
                    value={degreeProgram}
                    onChange={(e) => setDegreeProgram(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Grant Category *</label>
                    <select
                      value={grantType}
                      onChange={(e) =>
                        setGrantType(e.target.value as EndowmentAllocation['grant_type'])
                      }
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36] font-semibold"
                    >
                      <option value="University Tuition">University Tuition</option>
                      <option value="Vocational Grant">Vocational Grant</option>
                      <option value="Living Stipend">Living Stipend</option>
                      <option value="Agribusiness Venture Grant">Agribusiness Venture Grant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Sponsorship Amount (Ksh) *
                    </label>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#172B36]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#D9E8E2]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FF9932] hover:bg-[#FF9932]/90 text-[#172B36] font-extrabold px-5 py-2 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <Coins className="w-4 h-4" />
                    Submit for Trustee Review
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
