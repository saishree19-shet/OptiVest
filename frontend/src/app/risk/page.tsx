"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search, Bell, User,
  AlertTriangle, ShieldCheck, Shield, Zap, Info, ArrowUpRight,
  Target, BarChart, Activity
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis
} from "recharts";

const riskMetrics = [
  { subject: 'Market Risk', A: 80, fullMark: 100 },
  { subject: 'Liquidity', A: 95, fullMark: 100 },
  { subject: 'Credit Risk', A: 70, fullMark: 100 },
  { subject: 'Volatility', A: 85, fullMark: 100 },
  { subject: 'Concentration', A: 60, fullMark: 100 },
];

const frontierData = [
  { risk: 10, return: 8, z: 200 },
  { risk: 15, return: 12, z: 300 },
  { risk: 20, return: 18, z: 400 },
  { risk: 25, return: 25, z: 500 },
  { risk: 30, return: 30, z: 600 },
];

export default function RiskAnalyticsPage() {
  return (
    <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0E14] flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Landmark className="text-[#9b51e0]" size={24} />
            <span className="text-xl font-bold tracking-tight">OptiVest India</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: BarChart2, label: "Analytics", href: "/analytics" },
            { icon: PieChart, label: "Portfolio", href: "/portfolio" },
            { icon: LineChart, label: "Market Data", href: "/market" },
            { icon: ShieldAlert, label: "Risk Analytics", href: "/risk", active: true },
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
             <h1 className="text-xl font-bold">Institutional Risk Engine</h1>
             <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
               <ShieldCheck size={14} className="text-blue-500" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Model: VaR 99% Stable</span>
             </div>
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
             Stress Test Portfolio
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Risk Score */}
               <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-8">Comprehensive Risk Score</div>
                  <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                       <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 * (1 - 0.24)} className="text-[#9b51e0] transition-all duration-1000" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-black text-white">24</span>
                      <span className="text-[10px] font-black text-[#9b51e0] uppercase mt-1">LOW RISK</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                    Your portfolio is currently 32% more stable than the average Nifty 50 investor.
                  </p>
               </div>

               {/* Risk Spider Chart */}
               <div className="lg:col-span-2 bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Multi-Factor Risk Analysis</h3>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#9b51e0]"></div>
                         <span className="text-[10px] font-bold text-gray-400 uppercase">Current</span>
                       </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskMetrics}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#4b5563', fontSize: 10, fontWeight: 'bold'}} />
                        <PolarRadiusAxis hide />
                        <Radar name="Portfolio" dataKey="A" stroke="#9b51e0" strokeWidth={3} fill="#9b51e0" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* Efficient Frontier Analysis */}
            <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                   <div>
                     <h3 className="text-lg font-black text-white uppercase tracking-tight">Efficient Frontier Deviation</h3>
                     <p className="text-xs text-gray-500 mt-1">Measuring your proximity to the mathematical optimal return path</p>
                   </div>
                   <div className="flex items-center gap-3 bg-[#9b51e0]/10 border border-[#9b51e0]/20 px-4 py-2 rounded-xl">
                      <Zap size={16} className="text-[#9b51e0]" />
                      <span className="text-xs font-black text-[#9b51e0] uppercase tracking-widest">Efficiency: 98.4%</span>
                   </div>
                </div>
                <div className="h-80">
                   <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis type="number" dataKey="risk" name="Risk" unit="%" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} label={{ value: 'Risk (Volatility)', position: 'bottom', fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis type="number" dataKey="return" name="Return" unit="%" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} label={{ value: 'Expected Return', angle: -90, position: 'insideLeft', fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#11151F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                        <Scatter name="Efficient Path" data={frontierData} fill="#9b51e0" line={{stroke: '#9b51e0', strokeWidth: 2, strokeDasharray: '5 5'}} />
                        <Scatter name="Your Portfolio" data={[{risk: 14, return: 11, z: 800}]} fill="#10b981" />
                     </ScatterChart>
                   </ResponsiveContainer>
                </div>
            </div>

            {/* Stress Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
               {[
                 { title: 'Global Recession', impact: '-12.4%', status: 'Manageable', color: 'bg-red-500' },
                 { title: 'Market Correction', impact: '-6.2%', status: 'Safe', color: 'bg-yellow-500' },
                 { title: 'Interest Rate Hike', impact: '-2.1%', status: 'Neutral', color: 'bg-blue-500' },
               ].map((scenario, i) => (
                 <div key={i} className="bg-[#11151F] border border-white/10 rounded-2xl p-6 shadow-xl group hover:border-[#9b51e0]/30 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                       <div className={`w-10 h-10 rounded-xl ${scenario.color}/10 flex items-center justify-center text-white`}>
                          <AlertTriangle size={20} className={scenario.color.replace('bg-', 'text-')} />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-white">{scenario.title}</div>
                         <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{scenario.status}</div>
                       </div>
                    </div>
                    <div className="text-3xl font-black mb-2">{scenario.impact}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Estimated Corpus Impact</div>
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${scenario.color} transition-all duration-1000`} style={{ width: scenario.impact.replace('-', '') }}></div>
                    </div>
                 </div>
               ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
