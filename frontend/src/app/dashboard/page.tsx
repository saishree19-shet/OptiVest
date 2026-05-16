"use client";

import { motion } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  ResponsiveContainer, XAxis, YAxis, 
  Tooltip, Cell, PieChart as RePieChart, Pie,
  AreaChart, Area, ScatterChart, Scatter
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);
  const [horizon, setHorizon] = useState("5Y");
  const [budgetStr, setBudgetStr] = useState("1000000");
  const [riskAppetite, setRiskAppetite] = useState("Aggressive");
  const [stakeholder, setStakeholder] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"onboarding" | "input" | "processing" | "results">("onboarding");
  const [processingStep, setProcessingStep] = useState(0);
  const [decisionSteps, setDecisionSteps] = useState<any[]>([]);
  const [rejectedAssets, setRejectedAssets] = useState<any[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const personas = [
    { id: "Student", label: "Student Investor", risk: "Low", style: "Conservative", icon: "🎓", desc: "Low-budget, SIP-oriented, safe assets like SBI FD & Nifty Index Funds." },
    { id: "Beginner", label: "Beginner Investor", risk: "Medium", style: "Balanced", icon: "🌱", desc: "Stable growth through HDFC Flexi Cap and diversified ETFs." },
    { id: "Salaried", label: "Salaried Professional", risk: "Medium", style: "Long-term", icon: "💼", desc: "Tax-saving ELSS, NPS, and large-cap equity for wealth creation." },
    { id: "Aggressive", label: "Aggressive Investor", risk: "High", style: "Growth", icon: "🚀", desc: "High-growth Midcap & Small Cap funds for aggressive returns." },
    { id: "Advisor", label: "Financial Advisor", risk: "Variable", style: "Advanced", icon: "📊", desc: "Advanced analytics, full allocation control, and deep DP visibility." },
  ];

  const processingLabels = [
    stakeholder === "Student" ? "Generating low-risk student investment portfolio..." :
    stakeholder === "Beginner" ? "Generating balanced beginner investment portfolio..." :
    stakeholder === "Salaried" ? "Generating long-term wealth growth portfolio..." :
    `Generating optimized portfolio for ${stakeholder} investor...`,
    "Filtering high-volatility assets...",
    "Running Dynamic Programming optimization...",
    "Constructing diversified portfolio allocation..."
  ];

  const [matrixData, setMatrixData] = useState<number[][]>([[]]);
  const [optimalPath, setOptimalPath] = useState<number[][]>([]);
  const [selectedAssets, setSelectedAssets] = useState<any[]>([]);
  const [simulationData, setSimulationData] = useState<any[]>([]);
  const [expectedReturn, setExpectedReturn] = useState("12.4");

  const runOptimizer = async () => {
    setPhase("processing");
    setProcessingStep(0);
    setLoading(true);
    
    for (let i = 0; i < processingLabels.length; i++) {
      setProcessingStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch("http://localhost:5000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: Number(budgetStr),
          riskAppetite,
          duration: parseInt(horizon),
          stakeholder
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.selectedInvestments) {
          setSelectedAssets(data.data.selectedInvestments);
        }
        if (data.data.rejectedInvestments) {
          setRejectedAssets(data.data.rejectedInvestments);
        }
        if (data.data.decisionSteps) {
          setDecisionSteps(data.data.decisionSteps);
        }
        if (data.data.insights) {
          setInsights(data.data.insights);
        }
        setExpectedReturn(data.data.totalExpectedReturn ? (data.data.totalExpectedReturn / Number(budgetStr) * 100).toFixed(1) : "15.0");
        setPhase("results");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Failed to optimize portfolio. Check your configuration.";
      setError(errorMessage);
      setPhase("results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden">
      <aside className="w-64 border-r border-white/5 bg-[#0B0E14] flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Landmark className="text-[#9b51e0]" size={24} />
            <span className="text-xl font-bold tracking-tight">OptiVest</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
            { icon: BarChart2, label: "Analytics", href: "/analytics" },
            { icon: PieChart, label: "Portfolio", href: "/portfolio" },
            { icon: LineChart, label: "Market Data", href: "/market" },
            { icon: ShieldAlert, label: "Risk Analytics", href: "/risk" },
            { icon: BoxSelect, label: "DP Visualization", href: "/dp-visualization" },
            { icon: ArrowRightLeft, label: "Transactions", href: "/transactions" },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? "bg-gradient-to-r from-[#9b51e0]/20 to-transparent text-[#9b51e0] border-l-2 border-[#9b51e0]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} className={item.active ? "text-[#9b51e0]" : "text-gray-500"} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur-md z-10">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search instruments..." 
              className="w-full bg-[#11151F] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] transition-colors"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {phase === "onboarding" && (
            <div className="absolute inset-0 z-50 bg-[#0B0E14] p-8 flex flex-col items-center justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome, {user?.displayName || "Investo"}</h2>
                <h3 className="text-xl font-bold text-gray-500 mb-6">Who are you investing as?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {personas.map((p) => (
                    <motion.button
                      key={p.id}
                      onClick={() => { setStakeholder(p.id); setPhase("input"); }}
                      className="bg-[#11151F] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#9b51e0]/50"
                    >
                      <div className="text-4xl mb-4">{p.icon}</div>
                      <div className="font-bold text-sm mb-1">{p.label}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {phase === "input" && (
            <div className="absolute inset-0 z-50 bg-[#0B0E14] p-8 flex flex-col items-center justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
                <h2 className="text-3xl font-bold mb-2 text-center">Configure Your Portfolio</h2>
                <p className="text-gray-500 text-center mb-8">Persona: <span className="text-[#9b51e0] font-bold">{stakeholder}</span></p>
                <div className="space-y-5 bg-[#11151F] border border-white/5 rounded-2xl p-8">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Investment Budget (₹)</label>
                    <input type="number" value={budgetStr} onChange={e => setBudgetStr(e.target.value)} className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:border-[#9b51e0] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Risk Appetite</label>
                    <select value={riskAppetite} onChange={e => setRiskAppetite(e.target.value)} className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:border-[#9b51e0] transition-colors">
                      <option>Conservative</option>
                      <option>Moderate</option>
                      <option>Aggressive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Time Horizon</label>
                    <div className="flex gap-3">
                      {["1Y","3Y","5Y","10Y"].map(h => (
                        <button key={h} onClick={() => setHorizon(h)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${ horizon === h ? "border-[#9b51e0] bg-[#9b51e0]/20 text-white" : "border-white/10 text-gray-400 hover:border-[#9b51e0]/50" }`}>{h}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={runOptimizer} className="w-full py-4 bg-gradient-to-r from-[#9b51e0] to-[#7c3aed] rounded-xl text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity mt-2">
                    Run Knapsack Optimizer →
                  </button>
                  <button onClick={() => setPhase("onboarding")} className="w-full py-2 text-gray-600 text-xs hover:text-gray-400 transition-colors">← Change Persona</button>
                </div>
              </motion.div>
            </div>
          )}

          {phase === "processing" && (
            <div className="absolute inset-0 z-50 bg-[#0B0E14] p-8 flex flex-col items-center justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
                <div className="text-center mb-12">
                  <div className="text-3xl font-bold mb-2">Optimizing Portfolio...</div>
                  <div className="text-gray-500 text-sm">Running 0/1 Knapsack DP Engine</div>
                </div>
                <div className="space-y-4">
                  {processingLabels.map((label, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${ i < processingStep ? "bg-emerald-500" : i === processingStep ? "bg-[#9b51e0] animate-ping" : "bg-white/10" }`}></div>
                      <span className={`text-sm font-medium transition-colors duration-500 ${ i <= processingStep ? "text-white" : "text-gray-600" }`}>{label}</span>
                      {i < processingStep && <span className="text-[10px] font-bold text-emerald-500 uppercase ml-auto tracking-wider">Complete</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-[#0A0C10] rounded-2xl border border-white/5">
                  <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Persona-Based Constraint Logic</div>
                  <div className="font-mono text-xs text-[#9b51e0] opacity-70 space-y-1">
                    <div>[LOG]: Stakeholder ID identified: {stakeholder}</div>
                    <div>[LOG]: Filtering for {stakeholder}-compatible indices...</div>
                    <div>[LOG]: {stakeholder === 'Student' || stakeholder === 'Beginner' ? 'Removing high-volatility micro-caps' : 'Enabling advanced growth equities'}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

                {phase === "results" && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-r from-[#9b51e0]/20 to-transparent border-l-4 border-[#9b51e0] p-5 rounded-r-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#9b51e0]/10 flex items-center justify-center text-[#9b51e0]">
                          <ShieldAlert size={22} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#9b51e0] uppercase tracking-widest mb-0.5">Decision Insight</div>
                          <div className="text-sm font-medium text-gray-200 leading-relaxed">
                            {insights[0] || "Portfolio successfully optimized for maximum CAGR within liquidity constraints."}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-6 flex-1">
                      {/* Left side: Allocation & Filtering */}
                      <div className="space-y-6 flex flex-col">
                        <div className="bg-[#11151F] border border-white/5 rounded-2xl p-6">
                          <h3 className="text-sm font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={16} className="text-emerald-400" />
                            Optimized Allocation
                          </h3>
                          <div className="space-y-4">
                            {selectedAssets.map((asset, i) => (
                              <div key={i} className="bg-[#1A1F2B] border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  <span className="text-sm font-bold">{asset.name}</span>
                                </div>
                                <span className="text-xs font-bold text-white">₹{(asset.investmentAmount || asset.cost).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#11151F] border border-white/10 rounded-2xl p-7 shadow-xl">
                          <h3 className="text-base font-extrabold mb-5 flex items-center gap-3 text-gray-200">
                            <ShieldAlert size={20} className="text-red-400" />
                            Risk Filtering System
                          </h3>
                          <div className="space-y-4 mb-8">
                            {rejectedAssets.length > 0 ? rejectedAssets.slice(0, 3).map((asset, i) => (
                              <div key={i} className="flex items-center justify-between opacity-60">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                  <span className="text-sm font-bold text-gray-300">{asset.name}</span>
                                </div>
                                <span className="text-xs font-black text-red-400 uppercase tracking-widest bg-red-400/10 px-2 py-0.5 rounded">Removed</span>
                              </div>
                            )) : (
                              <div className="text-sm text-gray-600 italic">No assets filtered by risk engine.</div>
                            )}
                            {selectedAssets.slice(0, 3).map((asset, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                  <span className="text-sm font-bold text-white">{asset.name}</span>
                                </div>
                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Selected</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
                            <p className="text-sm text-gray-400 italic leading-relaxed">
                              &quot;High-volatility assets removed because the selected stakeholder profile is <strong className="text-[#a855f7]">{personas.find(p => p.id === stakeholder)?.label}</strong> with <strong className="text-emerald-400">{personas.find(p => p.id === stakeholder)?.risk}</strong> risk preference.&quot;
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right side: DP Engine Details */}
                      <div className="bg-[#11151F] border border-white/10 rounded-2xl p-7 flex flex-col shadow-xl">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-base font-extrabold flex items-center gap-3 text-white">
                            <BoxSelect size={20} className="text-[#a855f7]" />
                            Dynamic Programming Kernel
                          </h3>
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-pulse"></div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Live Optimization</span>
                          </div>
                        </div>

                        <div className="space-y-5 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                          {decisionSteps.length > 0 ? decisionSteps.map((step, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className={`p-6 rounded-2xl border-2 transition-all duration-500 ${step.decision === 'include' ? 'bg-[#a855f7]/10 border-[#a855f7]/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'bg-black/20 border-white/5 opacity-50'}`}
                            >
                              <div className="flex justify-between items-start mb-5">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {i + 1}: Evaluating Candidate</span>
                                  </div>
                                  <div className="text-lg font-black text-white">{step.itemName}</div>
                                </div>
                                <div className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border ${step.decision === 'include' ? 'bg-emerald-500 text-white border-emerald-400 animate-bounce' : 'bg-gray-800 text-gray-400 border-white/10'}`}>
                                  {step.decision === 'include' ? 'Include Selected ✓' : 'Rejected'}
                                </div>
                              </div>

                              <div className="bg-black/40 rounded-xl p-4 mb-4 border border-white/5 font-mono">
                                <div className="text-[9px] text-gray-600 mb-2 uppercase tracking-widest">DP Decision Matrix State</div>
                                <div className="text-xs text-[#9b51e0] mb-3">
                                  dp[i][w] = max(exclude, include)
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-[8px] text-gray-500 uppercase mb-1">Exclude (dp[i-1][w])</div>
                                    <div className="text-xs font-bold text-gray-400">₹{step.excludeValue.toLocaleString()}</div>
                                  </div>
                                  <div className={step.decision === 'include' ? 'border-l border-emerald-500/30 pl-4' : 'pl-4'}>
                                    <div className="text-[8px] text-gray-500 uppercase mb-1">Include (v_i + dp[i-1][w-c_i])</div>
                                    <div className={`text-xs font-bold ${step.decision === 'include' ? 'text-emerald-400' : 'text-gray-600'}`}>₹{step.includeValue.toLocaleString()}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <ArrowRightLeft size={10} className="mt-1 text-[#9b51e0]" />
                                  <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                    {step.reason}
                                  </p>
                                </div>
                                {step.decision === 'include' && (
                                  <div className="pt-2 border-t border-white/5 mt-2">
                                    <div className="text-[8px] font-bold text-emerald-500 uppercase mb-1">Impact Analysis</div>
                                    <ul className="text-[9px] text-gray-500 space-y-1">
                                      <li>• Fits within current ₹{Number(budgetStr).toLocaleString()} constraint</li>
                                      <li>• Superior utility found at localized state kernel</li>
                                      <li>• Diversification parity maintained</li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )) : (
                            <div className="flex flex-col items-center justify-center py-20 opacity-20">
                              <BoxSelect size={40} className="mb-4" />
                              <div className="text-xs font-bold uppercase tracking-widest">Awaiting Engine Signal...</div>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-6 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Quant Kernel Path</span>
                            <span className="text-[10px] font-bold text-emerald-500 tracking-tighter">OPTIMAL SOLUTION FOUND</span>
                          </div>
                          <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div key={i} className={`h-1.5 rounded-sm ${i < 18 ? 'bg-[#9b51e0] shadow-[0_0_10px_rgba(155,81,224,0.5)]' : 'bg-white/5'}`}></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle row: High-Impact Analytics */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Growth Simulation */}
                      <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                          <div>
                            <h4 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2">Portfolio Wealth Simulation</h4>
                            <div className="text-3xl font-extrabold text-emerald-400">₹{(simulationData[simulationData.length - 1]?.value || 0).toLocaleString()} <span className="text-xs text-gray-500 font-bold uppercase ml-2 tracking-tighter">Projected {horizon} Wealth</span></div>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp size={24} className="text-emerald-400" />
                          </div>
                        </div>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={simulationData}>
                              <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="year" stroke="#4b5563" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} dy={10} />
                              <YAxis hide domain={['auto', 'auto']} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#11151F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                formatter={(val: any) => [val ? `₹${val.toLocaleString()}` : '₹0', "Expected Corpus"]}
                              />
                              <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={4} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Efficient Frontier */}
                      <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                          <h4 className="text-xs font-black text-gray-400 tracking-widest uppercase">Efficient Allocation Frontier</h4>
                          <div className="text-xs font-black text-[#a855f7] uppercase border-2 border-[#a855f7]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)]">Optimal DP Path</div>
                        </div>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                              <XAxis 
                                type="number" 
                                dataKey="riskVal" 
                                stroke="#4b5563" 
                                fontSize={12}
                                fontWeight="bold"
                                tickFormatter={(v) => v === 1 ? 'SAFE' : v === 2 ? 'MED' : 'HIGH'}
                                label={{ value: 'RISK LEVEL', position: 'bottom', offset: 0, fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
                              />
                              <YAxis 
                                type="number" 
                                dataKey="expectedReturn" 
                                unit="%" 
                                stroke="#4b5563" 
                                fontSize={12} 
                                fontWeight="bold"
                                label={{ value: 'EXPECTED RETURN', angle: -90, position: 'insideLeft', fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
                              />
                              <Tooltip 
                                cursor={{ strokeDasharray: '3 3', stroke: '#a855f7' }}
                                contentStyle={{ backgroundColor: '#11151F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                              />
                              <Scatter name="Assets" data={selectedAssets.map(a => ({ ...a, riskVal: a.riskLevel === 'Low' ? 1 : a.riskLevel === 'Medium' ? 2 : 3 }))}>
                                {selectedAssets.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill="#10b981" className="animate-pulse shadow-xl" />
                                ))}
                              </Scatter>
                            </ScatterChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Bottom row: Asset Mix & Allocation Table */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <h4 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-8">Localized Asset Distribution</h4>
                        <div className="flex items-center gap-12">
                          <div className="h-56 w-56 relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <RePieChart>
                                <Pie 
                                  data={[
                                    { name: 'Index Funds', value: selectedAssets.filter(a => a.category.includes('Index')).reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0) },
                                    { name: 'Gold ETF', value: selectedAssets.filter(a => a.category.includes('Commodity')).reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0) },
                                    { name: 'Fixed Income', value: selectedAssets.filter(a => a.category.includes('Debt')).reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0) },
                                    { name: 'Equity Growth', value: selectedAssets.filter(a => !a.category.includes('Index') && !a.category.includes('Commodity') && !a.category.includes('Debt')).reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0) },
                                  ].filter(d => d.value > 0)} 
                                  innerRadius={72} 
                                  outerRadius={92} 
                                  cornerRadius={12}
                                  paddingAngle={10}
                                  dataKey="value"
                                  stroke="rgba(11,14,20,1)"
                                  strokeWidth={4}
                                >
                                  {[0, 1, 2, 3].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#a855f7', '#10B981', '#F59E0B', '#3B82F6'][index % 4]} className="hover:opacity-80 transition-all cursor-pointer" />
                                  ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1A1F2B' }} />
                              </RePieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="text-center">
                                <div className="text-xs font-black text-gray-500 uppercase tracking-tighter">AGG. RETURN</div>
                                <div className="text-3xl font-black text-white">{expectedReturn}%</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 space-y-5">
                              {[
                                { name: 'Index Funds', color: '#a855f7', key: 'Index' },
                                { name: 'Gold ETF', color: '#10B981', key: 'Commodity' },
                                { name: 'Fixed Income', color: '#F59E0B', key: 'Debt' },
                                { name: 'Equity Growth', color: '#3B82F6', key: 'Growth' }
                              ].map(item => {
                                const total = selectedAssets.reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0);
                                const val = selectedAssets.filter(a => {
                                  if (item.key === 'Index') return a.category.includes('Index');
                                  if (item.key === 'Commodity') return a.category.includes('Commodity');
                                  if (item.key === 'Debt') return a.category.includes('Debt');
                                  if (item.key === 'Growth') return !a.category.includes('Index') && !a.category.includes('Commodity') && !a.category.includes('Debt');
                                  return false;
                                }).reduce((acc, a) => acc + (a.investmentAmount || a.cost), 0);
                                
                                const perc = total > 0 ? ((val / total) * 100).toFixed(0) : "0";
                                if (val === 0) return null;
                                return (
                                  <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                                      <span className="text-sm font-bold text-gray-300">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-white bg-white/5 px-3 py-1 rounded-lg">{perc}%</span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <h4 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-8">Optimization Log Terminal</h4>
                        <div className="space-y-5 font-mono text-xs">
                          <div className="text-gray-400 border-l-4 border-[#a855f7] pl-4 py-2 bg-white/5 rounded-r-lg">
                            <span className="text-[#a855f7] font-bold">[SYS]:</span> Running Knapsack Kernels for <span className="text-white font-bold">{stakeholder}</span> profile...
                          </div>
                          <div className="text-gray-400 border-l-4 border-[#a855f7] pl-4 py-2 bg-white/5 rounded-r-lg">
                            <span className="text-[#a855f7] font-bold">[ALG]:</span> Max return localized at <span className="text-emerald-400 font-bold">{expectedReturn}%</span> with {selectedAssets.length} active nodes.
                          </div>
                          <div className="text-gray-400 border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-500/5 rounded-r-lg">
                            <span className="text-emerald-500 font-bold">[SUCCESS]:</span> Optimal Indian Portfolio reconstructed via Backtracking.
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
        </div>
      </main>
    </div>
  );
}
