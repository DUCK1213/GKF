'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Sprout,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Brain,
  ShieldCheck,
  Download,
  Printer,
  DollarSign,
  TrendingUp,
  Layers,
  Clock,
  Compass,
} from 'lucide-react';

export default function ProjectVisionPage() {
  const [selectedTrack, setSelectedTrack] = useState<'agriculture' | 'education' | 'entrepreneurship'>(
    'agriculture'
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State for Interactive Self-Authoring
  const [participantCode, setParticipantCode] = useState<string>('GKF-MRG-042');
  const [countyRegion, setCountyRegion] = useState<string>('Murang\'a County (Kigumo)');
  const [primaryAspiration, setPrimaryAspiration] = useState<string>(
    'Establish a commercial avocado & macadamia nursery with solar drip irrigation'
  );

  // Step 1: Empathize & CBT Restructuring
  const [limitingBelief, setLimitingBelief] = useState<string>(
    'Farming is for those who failed in school, and brokers always steal the profits.'
  );
  const [cognitiveReframe, setCognitiveReframe] = useState<string>(
    'Modern agribusiness is a science and high-margin enterprise. By managing inputs and cold storage directly, I control the value chain.'
  );

  // Step 2: Define & Logotherapy Purpose (Viktor Frankl)
  const [logotherapyMeaning, setLogotherapyMeaning] = useState<string>(
    'Provide economic independence for my younger siblings and prove that rural youth can create wealth through sustainable agriculture.'
  );

  // Step 3: Value Chain / Strategy Component Selection
  const [selectedInputs, setSelectedInputs] = useState<string[]>([
    'Certified Hass Avocado Scions (KEPHIS approved)',
    'Solar-Powered Micro-Drip Irrigation Kit',
    'Organic Compost & Bio-Fertilizers',
  ]);
  const [productionPractice, setProductionPractice] = useState<string>(
    'Intercropping with legumes for nitrogen fixation & mulching to conserve moisture'
  );
  const [storageSolution, setStorageSolution] = useState<string>(
    'Shared charcoal-cooler evaporative storage to prevent rapid ripening before aggregation'
  );
  const [marketChannel, setMarketChannel] = useState<string>(
    'Direct supply contract with Kakuzi Outgrower Scheme & local women’s cooperative'
  );
  const [budgetPlan, setBudgetPlan] = useState<string>(
    'Phase 1: Ksh 65,000 funded via GKF Vocational Grant & personal savings from poultry'
  );

  // Plan Generated State
  const [planGenerated, setPlanGenerated] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setPlanGenerated(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F1F6F4] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div
          className="relative bg-cover bg-center rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(23, 43, 54, 0.92), rgba(17, 76, 90, 0.88)), url('/images/bg-misty-lamp-path.jpg')`,
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF9932] text-[#172B36]">
                  Concept Paper: Project Vision
                </span>
                <span className="text-xs text-[#D9E8E2] font-mono">
                  Frankl Logotherapy · CBT Restructuring · Value Chain Management
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Project Vision: Self-Authoring & Value Chain Engine
              </h1>
              <p className="text-sm text-[#D9E8E2] max-w-2xl leading-relaxed">
                Empowering at-risk youth to confront past traumas, break generational fatalism, and author a concrete economic future through Viktor Frankl&apos;s logotherapy and actionable value chain optimization.
              </p>
            </div>

            <div className="bg-[#172B36]/90 border border-[#FF9932]/40 rounded-xl p-4 text-center min-w-[240px]">
              <div className="text-xs text-slate-300">Murang&apos;a Pilot Target</div>
              <div className="text-3xl font-extrabold text-[#FFC801] mt-1">1,200 Youth</div>
              <div className="text-xs text-slate-300 mt-0.5">Year 1 Proof of Concept</div>
            </div>
          </div>

          {/* Track Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-4 border-t border-[#114C5A]">
            <button
              onClick={() => {
                setSelectedTrack('agriculture');
                setPrimaryAspiration('Commercial avocado & macadamia nursery with solar drip irrigation');
              }}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedTrack === 'agriculture'
                  ? 'bg-[#FF9932] text-[#172B36] border-[#FF9932] font-bold shadow-lg'
                  : 'bg-[#114C5A]/60 text-slate-200 border-[#114C5A] hover:bg-[#114C5A]'
              }`}
            >
              <Sprout className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider">Track 01</div>
                <div className="text-sm font-bold">Agricultural Value Chain</div>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedTrack('education');
                setPrimaryAspiration('B.Sc. Mechanical Engineering at DeKUT via GKF Endowment');
              }}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedTrack === 'education'
                  ? 'bg-[#FF9932] text-[#172B36] border-[#FF9932] font-bold shadow-lg'
                  : 'bg-[#114C5A]/60 text-slate-200 border-[#114C5A] hover:bg-[#114C5A]'
              }`}
            >
              <GraduationCap className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider">Track 02</div>
                <div className="text-sm font-bold">Youth in Higher Education</div>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedTrack('entrepreneurship');
                setPrimaryAspiration('Tech-enabled farm input distribution & mobile solar charging service');
              }}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedTrack === 'entrepreneurship'
                  ? 'bg-[#FF9932] text-[#172B36] border-[#FF9932] font-bold shadow-lg'
                  : 'bg-[#114C5A]/60 text-slate-200 border-[#114C5A] hover:bg-[#114C5A]'
              }`}
            >
              <Briefcase className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider">Track 03</div>
                <div className="text-sm font-bold">Aspiring Micro-Enterprise</div>
              </div>
            </button>
          </div>
        </div>

        {/* 5-Step Design Thinking Progress Bar */}
        <div className="bg-white rounded-xl p-4 border border-[#D9E8E2] shadow-sm">
          <div className="text-xs font-bold text-[#172B36] uppercase tracking-wider mb-2 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#FF9932]" />
            5-Stage Design Thinking & CBT Self-Authoring Workflow
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              { num: 1, name: '1. Empathize & CBT', desc: 'Identify traumas & limiting beliefs' },
              { num: 2, name: '2. Define Purpose', desc: 'Viktor Frankl logotherapy core' },
              { num: 3, name: '3. Ideate Strategy', desc: 'Value chain & resources' },
              { num: 4, name: '4. Prototype Plan', desc: 'Action roadmap & budget' },
              { num: 5, name: '5. Test & M&E', desc: 'Metrics & self-efficacy check' },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`p-2.5 rounded-lg cursor-pointer transition border ${
                  currentStep === s.num
                    ? 'bg-[#172B36] text-white border-[#172B36] font-bold shadow'
                    : currentStep > s.num
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-[11px]">{s.name}</div>
                <div className="text-[10px] hidden sm:block opacity-80 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Self-Authoring Wizard Form */}
        <div className="bg-white rounded-2xl border border-[#D9E8E2] p-6 sm:p-8 shadow-sm space-y-6">
          {/* STEP 1: EMPATHIZE & CBT COGNITIVE RESTRUCTURING */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#D9E8E2] pb-3">
                <span className="text-xs font-bold text-[#FF9932] uppercase tracking-wider">
                  Phase 1 · Cognitive Behavioral Therapy (CBT) Integration
                </span>
                <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                  Empathize: Confronting Traumas & Cognitive Restructuring
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Identify limiting beliefs influenced by domestic hardship, male alcoholism, and regional economic disillusionment. Transform them into constructive alternatives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Code Identifier
                  </label>
                  <input
                    type="text"
                    value={participantCode}
                    onChange={(e) => setParticipantCode(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg p-2.5 text-xs font-mono font-bold text-[#172B36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pilot Sub-County / School Hub
                  </label>
                  <input
                    type="text"
                    value={countyRegion}
                    onChange={(e) => setCountyRegion(e.target.value)}
                    className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg p-2.5 text-xs font-semibold text-[#172B36]"
                  />
                </div>
              </div>

              {/* CBT Resilience Visual Anchor Card */}
              <div
                className="relative rounded-2xl overflow-hidden p-6 text-white bg-cover bg-center shadow-sm"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(23, 43, 54, 0.90), rgba(17, 76, 90, 0.80)), url('/images/bg-care-portrait.jpg')`,
                }}
              >
                <div className="max-w-lg space-y-1.5 relative z-10">
                  <span className="text-[11px] font-bold text-[#FFC600] uppercase tracking-wider">
                    Psychological Resilience &amp; Self-Compassion
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Breaking generational cycles starts from within
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Adolescents navigating domestic stress and alcoholism at home are guided to reframe trauma into resilience. The path to self-authoring begins by caring for one&apos;s mental wellbeing.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase">
                  <Brain className="w-4 h-4 text-red-600" />
                  Identified Limiting Belief / Negative Automatic Thought:
                </div>
                <textarea
                  rows={2}
                  value={limitingBelief}
                  onChange={(e) => setLimitingBelief(e.target.value)}
                  className="w-full bg-white border border-red-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none"
                  placeholder="What negative thought patterns hold you back?"
                />
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  CBT Cognitive Restructuring (Constructive Replacement Belief):
                </div>
                <textarea
                  rows={2}
                  value={cognitiveReframe}
                  onChange={(e) => setCognitiveReframe(e.target.value)}
                  className="w-full bg-white border border-emerald-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none"
                  placeholder="How do you reframe this obstacle into an empowered action?"
                />
              </div>
            </div>
          )}

          {/* STEP 2: DEFINE PURPOSE (VIKTOR FRANKL LOGOTHERAPY) */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#D9E8E2] pb-3">
                <span className="text-xs font-bold text-[#FF9932] uppercase tracking-wider">
                  Phase 2 · Viktor Frankl&apos;s Logotherapy
                </span>
                <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                  Define: Establishing Life Purpose & Meaning
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  &ldquo;Those who have a &apos;why&apos; to live, can bear with almost any &apos;how&apos;.&rdquo; Rooting long-term goals in deeper family, community, and personal meaning.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Life Aspiration / Concrete Horizon:
                </label>
                <input
                  type="text"
                  value={primaryAspiration}
                  onChange={(e) => setPrimaryAspiration(e.target.value)}
                  className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg p-3 text-xs font-bold text-[#172B36]"
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
                <label className="block text-xs font-bold text-amber-950 uppercase">
                  Logotherapy &apos;Why&apos; (Your Anchor in Adversity):
                </label>
                <textarea
                  rows={3}
                  value={logotherapyMeaning}
                  onChange={(e) => setLogotherapyMeaning(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none leading-relaxed"
                  placeholder="Why does this goal matter to you, your family, and your community?"
                />
              </div>
            </div>
          )}

          {/* STEP 3: VALUE CHAIN MANAGEMENT (SECTION 12 OF DOCUMENT) */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#D9E8E2] pb-3">
                <span className="text-xs font-bold text-[#FF9932] uppercase tracking-wider">
                  Phase 3 · Operational Value Chain Management
                </span>
                <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                  Ideate: 5-Component Value Chain Architecture
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Bridging the gap between aspiration and market reality by optimizing each link in the value chain from procurement to off-taking.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* 1. Input Management */}
                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2]">
                  <div className="font-bold text-[#172B36] uppercase text-[11px] mb-1">
                    1. Input Management (Quality Seeds, Nursery & Irrigation)
                  </div>
                  <div className="text-slate-600 mb-2">
                    Select verified high-yield agricultural inputs:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Certified Hass Avocado Scions (KEPHIS approved)',
                      'Solar-Powered Micro-Drip Irrigation Kit',
                      'Organic Compost & Bio-Fertilizers',
                      'Macadamia Grafted Seedlings',
                    ].map((inp) => (
                      <label key={inp} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedInputs.includes(inp)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInputs([...selectedInputs, inp]);
                            } else {
                              setSelectedInputs(selectedInputs.filter((i) => i !== inp));
                            }
                          }}
                          className="rounded text-[#FF9932]"
                        />
                        <span className="text-slate-800 font-medium">{inp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Production Optimization */}
                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2]">
                  <div className="font-bold text-[#172B36] uppercase text-[11px] mb-1">
                    2. Production Optimization & Crop Management
                  </div>
                  <input
                    type="text"
                    value={productionPractice}
                    onChange={(e) => setProductionPractice(e.target.value)}
                    className="w-full bg-white border border-[#D9E8E2] rounded-lg p-2 text-xs text-[#172B36]"
                  />
                </div>

                {/* 3. Processing & Storage */}
                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2]">
                  <div className="font-bold text-[#172B36] uppercase text-[11px] mb-1">
                    3. Processing, Post-Harvest Cold Storage & Value Addition
                  </div>
                  <input
                    type="text"
                    value={storageSolution}
                    onChange={(e) => setStorageSolution(e.target.value)}
                    className="w-full bg-white border border-[#D9E8E2] rounded-lg p-2 text-xs text-[#172B36]"
                  />
                </div>

                {/* 4. Marketing & Distribution */}
                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2]">
                  <div className="font-bold text-[#172B36] uppercase text-[11px] mb-1">
                    4. Marketing, Off-Taker Contracts & Fair Pricing
                  </div>
                  <input
                    type="text"
                    value={marketChannel}
                    onChange={(e) => setMarketChannel(e.target.value)}
                    className="w-full bg-white border border-[#D9E8E2] rounded-lg p-2 text-xs text-[#172B36]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PROTOTYPE PLAN & FINANCIAL BUDGET */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#D9E8E2] pb-3">
                <span className="text-xs font-bold text-[#FF9932] uppercase tracking-wider">
                  Phase 4 · Practical Prototype
                </span>
                <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                  Prototype: Action Roadmap & Financial Allocation
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Formulate an actionable month-by-month and hour-by-hour action plan with tangible capital requirements.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Seed Capital & Financial Risk Mitigation Plan:
                </label>
                <textarea
                  rows={2}
                  value={budgetPlan}
                  onChange={(e) => setBudgetPlan(e.target.value)}
                  className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg p-2.5 text-xs text-[#172B36] outline-none"
                />
              </div>

              <div className="bg-[#172B36] text-white p-4 rounded-xl space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FFC801]">
                  Weekly Sunday Hub Rhythm Integration:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#114C5A] p-2 rounded">
                    <span className="text-[#FF9932] font-bold block">Hour 1</span>
                    Peer CBT Review
                  </div>
                  <div className="bg-[#114C5A] p-2 rounded">
                    <span className="text-[#FFC801] font-bold block">Hour 2</span>
                    Progress Sync
                  </div>
                  <div className="bg-[#114C5A] p-2 rounded">
                    <span className="text-emerald-400 font-bold block">Hour 3</span>
                    Agro Skills Lab
                  </div>
                  <div className="bg-[#114C5A] p-2 rounded">
                    <span className="text-white font-bold block">Hour 4</span>
                    1-on-1 Mentor Check
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: TEST, EVALUATE & GENERATE PLAN */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#D9E8E2] pb-3">
                <span className="text-xs font-bold text-[#FF9932] uppercase tracking-wider">
                  Phase 5 · M&E Verification
                </span>
                <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                  Test: Psychometric Baseline & Readiness Check
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Verify readiness against the 3 validated psychometric instruments before locking the action plan into the Sunday Ledger.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2] text-center">
                  <div className="text-xs text-slate-500 font-bold uppercase">General Self-Efficacy</div>
                  <div className="text-2xl font-extrabold text-[#172B36] mt-1">82%</div>
                  <span className="text-[11px] text-emerald-600 font-bold">+24% vs. Baseline</span>
                </div>

                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2] text-center">
                  <div className="text-xs text-slate-500 font-bold uppercase">Brief Resilience</div>
                  <div className="text-2xl font-extrabold text-[#114C5A] mt-1">80%</div>
                  <span className="text-[11px] text-emerald-600 font-bold">+26% vs. Baseline</span>
                </div>

                <div className="p-3 bg-[#F1F6F4] rounded-xl border border-[#D9E8E2] text-center">
                  <div className="text-xs text-slate-500 font-bold uppercase">Goal Clarity Index</div>
                  <div className="text-2xl font-extrabold text-[#FF9932] mt-1">89%</div>
                  <span className="text-[11px] text-emerald-600 font-bold">+40% vs. Baseline</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div className="text-xs text-emerald-950">
                  <strong>Validation Criteria Passed:</strong> All logotherapy self-authoring steps and CBT cognitive restructuring worksheets satisfy GKF Version 6.0 criteria.
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-[#D9E8E2] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </button>

            <div className="text-xs font-semibold text-slate-500">
              Step {currentStep} of 5
            </div>

            <button
              onClick={handleNext}
              className="bg-[#172B36] hover:bg-[#114C5A] text-white font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow"
            >
              <span>{currentStep === 5 ? 'Generate Action Plan' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4 text-[#FF9932]" />
            </button>
          </div>
        </div>

        {/* Generated Action Plan Card */}
        {planGenerated && (
          <div className="bg-white rounded-2xl border-2 border-[#FF9932] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E8E2]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF9932] text-[#172B36] font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase">
                    Official GKF Roadmap
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Participant: {participantCode}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#172B36] mt-2">
                  {primaryAspiration}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Region: {countyRegion} · Track: {selectedTrack.toUpperCase()} · Certified v6.0
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-[#114C5A] hover:bg-[#114C5A]/80 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5 text-[#FFC801]" />
                  Print Action Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3 bg-[#F1F6F4] p-4 rounded-xl border border-[#D9E8E2]">
                <h4 className="font-bold text-sm text-[#172B36] flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#FF9932]" />
                  Psychological & Logotherapy Foundations
                </h4>
                <div>
                  <strong className="text-slate-700">Limiting Belief Reframed:</strong>
                  <p className="text-slate-600 mt-0.5 italic">{cognitiveReframe}</p>
                </div>
                <div>
                  <strong className="text-slate-700">Viktor Frankl Purpose:</strong>
                  <p className="text-slate-600 mt-0.5">{logotherapyMeaning}</p>
                </div>
              </div>

              <div className="space-y-3 bg-[#F1F6F4] p-4 rounded-xl border border-[#D9E8E2]">
                <h4 className="font-bold text-sm text-[#172B36] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#114C5A]" />
                  Value Chain Execution Links
                </h4>
                <div>
                  <strong className="text-slate-700">Selected Certified Inputs:</strong>
                  <ul className="list-disc list-inside text-slate-600 mt-0.5">
                    {selectedInputs.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-slate-700">Storage & Market Off-Taker:</strong>
                  <p className="text-slate-600 mt-0.5">{marketChannel}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
              <div>
                <strong>Financial Budget:</strong> {budgetPlan}
              </div>
              <span className="font-bold bg-[#FF9932] text-[#172B36] px-2 py-1 rounded text-[11px]">
                Eligible for GKF Endowment Grant
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
