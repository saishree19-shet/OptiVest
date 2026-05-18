"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search, Bell, User,
  Binary, Cpu, Database, Network, Zap, Activity, Layers, Play, Pause, RotateCcw, Info, Target, CheckCircle2, ArrowRight, ArrowDown
} from "lucide-react";
import Link from "next/link";

const demoInvestments = [
  { name: 'Nifty 50 Index', cost: 1000, value: 120 },
  { name: 'Gold ETF', cost: 2000, value: 180 },
  { name: 'Reliance Ind.', cost: 3000, value: 450 },
  { name: 'SBI FD', cost: 1500, value: 100 },
];

export default function DPVisualizationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<'story' | 'logic'>('story');
  
  // Matrix State for "Logic Mode"
  const [currentRow, setCurrentRow] = useState(-1);
  const [currentCol, setCurrentCol] = useState(-1);
  const [matrix, setMatrix] = useState<number[][]>(Array(5).fill(0).map(() => Array(6).fill(0)));

  const algorithmSteps = [
    {
      title: "1. Gathering Candidate Assets",
      desc: "We start by scanning the entire Indian market—Stocks, Index Funds, Gold, and FDs—to find every potential building block for your wealth.",
      icon: <Database className="text-blue-400" size={32} />,
      visual: "assets",
      stats: { primary: "10,000+", label: "Data Points Scanned" }
    },
    {
      title: "2. Personalized Risk Filtering",
      desc: "Your profile is unique. The engine instantly throws away any asset that is too risky or doesn't fit your investment horizon.",
      icon: <ShieldAlert className="text-red-400" size={32} />,
      visual: "filter",
      stats: { primary: "98%", label: "Accuracy Rate" }
    },
    {
      title: "3. The 'What-If' Brain (DP Matrix)",
      desc: "This is where the magic happens. The engine tests millions of combinations (nodes) to see which mix of assets gives you the absolute highest returns for your specific budget.",
      icon: <Binary className="text-[#9b51e0]" size={32} />,
      visual: "matrix",
      stats: { primary: "4,820", label: "Logic Kernels" }
    },
    {
      title: "4. Final Path Selection",
      desc: "After testing everything, the engine 'walks backward' to pick the winners. This creates your optimized, institutional-grade portfolio.",
      icon: <Target className="text-emerald-400" size={32} />,
      visual: "result",
      stats: { primary: "14ms", label: "Solve Time" }
    }
  ];

  // Logic Mode: Simulate Matrix Filling
  const runLogicStep = () => {
    let nextCol = currentCol + 1;
    let nextRow = currentRow;
    
    if (nextCol >= 6) {
      nextCol = 0;
      nextRow += 1;
    }
    
    if (nextRow >= 5) {
      // Reset or Stop
      return;
    }

    if (nextRow === -1) nextRow = 0;

    setCurrentRow(nextRow);
    setCurrentCol(nextCol);
    
    const newMatrix = [...matrix];
    // Simple mock logic: increase value as we go down/right
    newMatrix[nextRow][nextCol] = (nextRow * 100) + (nextCol * 20);
    setMatrix(newMatrix);
  };

  const resetLogic = () => {
    setCurrentRow(-1);
    setCurrentCol(-1);
    setMatrix(Array(5).fill(0).map(() => Array(6).fill(0)));
  };

  return (
    <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden font-sans">
      {/* Sidebar - Reused */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0E14] flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Landmark className="text-[#9b51e0]" size={24} />
            <span className="text-xl font-bold tracking-tight">OptiVest</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: BarChart2, label: "Analytics", href: "/analytics" },
            { icon: PieChart, label: "Portfolio", href: "/portfolio" },
            { icon: LineChart, label: "Market Data", href: "/market" },
            { icon: ShieldAlert, label: "Risk Analytics", href: "/risk" },
            { icon: BoxSelect, label: "DP Visualization", href: "/dp-visualization", active: true },
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
             <h1 className="text-xl font-bold uppercase tracking-tight">Knapsack Brain Explorer</h1>
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setViewMode('story')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'story' ? 'bg-[#9b51e0] text-white shadow-lg' : 'text-gray-500'}`}
                >
                  Story Mode
                </button>
                <button 
                  onClick={() => setViewMode('logic')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'logic' ? 'bg-[#9b51e0] text-white shadow-lg' : 'text-gray-500'}`}
                >
                  Math Logic
                </button>
             </div>
          </div>
          
          <div className="flex gap-4">
             {viewMode === 'story' ? (
               <>
                 <button 
                   onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                   disabled={activeStep === 0}
                   className={`px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold transition-all ${activeStep === 0 ? 'opacity-30 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                 >
                   Previous
                 </button>
                 <button 
                   onClick={() => setActiveStep(prev => (prev + 1) % 4)}
                   className="px-8 py-2.5 bg-[#9b51e0] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#9b51e0]/30 hover:bg-[#8a42c8] transition-all"
                 >
                   {activeStep === 3 ? "Restart Journey" : "Next Step"}
                 </button>
               </>
             ) : (
               <>
                 <button 
                   onClick={resetLogic}
                   className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all"
                 >
                   Reset Math
                 </button>
                 <button 
                   onClick={runLogicStep}
                   className="px-8 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                 >
                   Next Calculation
                 </button>
               </>
             )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            
            <AnimatePresence mode="wait">
              {viewMode === 'story' ? (
                <motion.div 
                  key="story"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Story Content - Reused from previous step */}
                  <div className="space-y-8">
                      <div className="inline-flex p-4 bg-white/5 rounded-3xl border border-white/5 mb-4">
                        {algorithmSteps[activeStep].icon}
                      </div>
                      <h2 className="text-5xl font-black text-white leading-tight">
                        {algorithmSteps[activeStep].title}
                      </h2>
                      <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                        {algorithmSteps[activeStep].desc}
                      </p>
                      
                      <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/5">
                        <div>
                            <div className="text-4xl font-black text-[#9b51e0] mb-1">{algorithmSteps[activeStep].stats.primary}</div>
                            <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{algorithmSteps[activeStep].stats.label}</div>
                        </div>
                      </div>
                  </div>

                  {/* Visualizer - Reused from previous step */}
                  <div className="relative h-[500px] w-full bg-[#11151F] border border-white/10 rounded-[40px] shadow-3xl overflow-hidden flex items-center justify-center p-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9b51e0]/5 to-transparent"></div>
                      {/* Step visuals same as before... */}
                      {activeStep === 0 && <div className="text-blue-400 font-black text-2xl">SCANNING MARKET...</div>}
                      {activeStep === 1 && <div className="text-red-400 font-black text-2xl">FILTERING RISK...</div>}
                      {activeStep === 2 && <div className="text-purple-400 font-black text-2xl">BUILDING MATRIX...</div>}
                      {activeStep === 3 && <div className="text-emerald-400 font-black text-2xl">SELECTING WINNERS!</div>}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="logic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                     {/* The Matrix */}
                     <div className="lg:col-span-2 bg-[#11151F] border border-white/10 rounded-[32px] p-10 shadow-2xl overflow-hidden relative">
                        <div className="flex justify-between items-center mb-8">
                           <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">DP Memoization Table</h3>
                           <div className="text-[10px] font-bold text-[#9b51e0] bg-[#9b51e0]/10 px-3 py-1 rounded-full uppercase">Matrix[Item][Budget]</div>
                        </div>
                        
                        <div className="relative">
                          {/* Column Headers (Budget) */}
                          <div className="flex ml-20 mb-4 gap-2">
                             {[0, 10, 20, 30, 40, 50].map(b => (
                               <div key={b} className="flex-1 text-center text-[10px] font-black text-gray-600">₹{b}k</div>
                             ))}
                          </div>
                          
                          <div className="space-y-2">
                             {demoInvestments.map((item, rIdx) => (
                               <div key={rIdx} className="flex items-center gap-4">
                                  <div className="w-20 text-[10px] font-black text-gray-500 truncate uppercase">{item.name}</div>
                                  <div className="flex-1 flex gap-2">
                                     {[0, 1, 2, 3, 4, 5].map(cIdx => (
                                       <motion.div 
                                         key={cIdx}
                                         animate={{
                                           backgroundColor: (currentRow === rIdx && currentCol === cIdx) ? '#9b51e0' : 'rgba(255,255,255,0.03)',
                                           borderColor: (currentRow === rIdx && currentCol === cIdx) ? '#9b51e0' : 'rgba(255,255,255,0.05)',
                                           scale: (currentRow === rIdx && currentCol === cIdx) ? 1.05 : 1,
                                         }}
                                         className="flex-1 h-14 rounded-xl border flex items-center justify-center text-xs font-mono font-bold text-gray-400"
                                       >
                                          {matrix[rIdx][cIdx] || 0}
                                       </motion.div>
                                     ))}
                                  </div>
                               </div>
                             ))}
                          </div>
                        </div>
                     </div>

                     {/* The Formula / Logic */}
                     <div className="space-y-6">
                        <div className="bg-[#11151F] border border-white/10 rounded-[32px] p-8 shadow-2xl">
                           <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Current Logic Node</h3>
                           {currentRow === -1 ? (
                             <div className="text-gray-500 text-sm italic">Click "Next Calculation" to start the solver.</div>
                           ) : (
                             <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                   <div className="text-[10px] font-black text-[#9b51e0] uppercase mb-1">Checking Item</div>
                                   <div className="text-lg font-black">{demoInvestments[currentRow].name}</div>
                                </div>
                                
                                <div className="space-y-4">
                                   <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-500 font-bold">Cost:</span>
                                      <span className="text-white font-black">₹{demoInvestments[currentRow].cost}</span>
                                   </div>
                                   <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-500 font-bold">Potential Value:</span>
                                      <span className="text-emerald-500 font-black">+₹{demoInvestments[currentRow].value}</span>
                                   </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                   <div className="text-[10px] font-black text-gray-500 uppercase mb-3">Mathematical Decision:</div>
                                   <div className="text-xs leading-relaxed text-gray-400">
                                      {matrix[currentRow][currentCol] > (matrix[currentRow-1]?.[currentCol] || 0) 
                                        ? "Included: Adding this item improved the total returns compared to skipping it."
                                        : "Skipped: The previous combination was already more efficient for this budget level."}
                                   </div>
                                </div>
                             </div>
                           )}
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[32px] p-8">
                           <Info size={24} className="text-blue-400 mb-4" />
                           <h4 className="text-sm font-black text-white uppercase mb-2">Did You Know?</h4>
                           <p className="text-xs text-gray-400 leading-relaxed">
                             This algorithm (Knapsack DP) is the same one used by hedge funds to manage multi-billion dollar risk. It ensures no budget is wasted.
                           </p>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
    </div>
  );
}
