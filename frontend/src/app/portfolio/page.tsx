"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search, Bell, User,
  Briefcase, Wallet, DollarSign, ArrowUpRight, TrendingUp,
  Download, Plus, Filter, MoreHorizontal, CheckCircle2, Clock
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip
} from "recharts";

const portfolioAssets = [
  { id: 1, name: 'Reliance Industries', category: 'Equity | Large Cap', amount: '₹1,25,000', change: '+2.4%', status: 'Stable', profit: '₹12,400', color: '#3b82f6' },
  { id: 2, name: 'HDFC Flexi Cap Fund', category: 'Equity | Flexi', amount: '₹85,000', change: '+1.8%', status: 'Growth', profit: '₹8,200', color: '#a855f7' },
  { id: 3, name: 'Nifty 50 Index Fund', category: 'Equity | Index', amount: '₹2,50,000', change: '+0.5%', status: 'Safe', profit: '₹1,250', color: '#10b981' },
  { id: 4, name: 'Gold BeES ETF', category: 'Commodity', amount: '₹45,000', change: '-0.2%', status: 'Hedge', profit: '-₹90', color: '#f59e0b' },
  { id: 5, name: 'SBI Fixed Deposit', category: 'Debt | Fixed', amount: '₹1,00,000', change: '+0.0%', status: 'Safe', profit: '₹7,100', color: '#ef4444' },
];

const allocationData = [
  { name: 'Equity', value: 65, color: '#9b51e0' },
  { name: 'Debt', value: 20, color: '#3b82f6' },
  { name: 'Commodity', value: 10, color: '#f59e0b' },
  { name: 'Cash', value: 5, color: '#10b981' },
];

export default function PortfolioPage() {
  return (
    <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden font-sans">
      {/* Sidebar */}
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
            { icon: PieChart, label: "Portfolio", href: "/portfolio", active: true },
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur-md z-10">
          <h1 className="text-xl font-bold">My Portfolio</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#11151F] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#1A1F2B] transition-all">
              <Download size={16} /> Statement
            </button>
            <button className="flex items-center gap-2 bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.4)]">
              <Plus size={16} /> Add Asset
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Portfolio Summary Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Briefcase size={120} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Net Worth Value</div>
                    <div className="text-5xl font-black text-white mb-2">₹12,48,500</div>
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                      <TrendingUp size={16} /> +₹1,12,000 (9.4%) all time
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Invested</div>
                      <div className="text-xl font-bold text-gray-200">₹11,36,500</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Returns</div>
                      <div className="text-xl font-bold text-emerald-500">+₹1,12,000</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Asset Allocation</div>
                <div className="h-40 relative flex items-center justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={allocationData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Health</span>
                    <span className="text-lg font-black text-emerald-500">94%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assets Table */}
            <div className="bg-[#11151F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-black uppercase tracking-widest text-sm text-gray-400">Localized Assets Nodes</h3>
                <div className="flex gap-4">
                   <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">ALL</button>
                   <button className="text-xs font-bold text-[#9b51e0]">EQUITY</button>
                   <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">DEBT</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-8 py-6">Instrument</th>
                      <th className="px-8 py-6">Category</th>
                      <th className="px-8 py-6">Value</th>
                      <th className="px-8 py-6">P&L</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioAssets.map((asset) => (
                      <tr key={asset.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                               {asset.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-[#9b51e0] transition-colors">{asset.name}</div>
                              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">NSE: {asset.name.split(' ')[0].toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs font-bold text-gray-400">{asset.category}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-white">{asset.amount}</div>
                          <div className={`text-[10px] font-bold ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{asset.change} Today</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`text-sm font-bold ${asset.profit.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{asset.profit}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${asset.status === 'Safe' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-[#9b51e0]/30 text-[#9b51e0] bg-[#9b51e0]/5'}`}>
                            {asset.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-gray-500 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Goals / Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
               <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black uppercase tracking-widest text-sm text-gray-400">Investment Goals</h3>
                    <button className="text-xs font-bold text-[#9b51e0]">+ New Goal</button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { name: 'Retirement 2045', progress: 45, target: '₹5,00,00,000', color: 'bg-[#9b51e0]' },
                      { name: 'Dream Home', progress: 12, target: '₹1,50,00,000', color: 'bg-emerald-500' },
                    ].map((goal, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-white">{goal.name}</span>
                          <span className="text-gray-500">{goal.progress}% reached</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                        </div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase">Target: {goal.target}</div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-8 shadow-2xl flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-1">Portfolio Verified</h4>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                      Your current allocation is 98% aligned with your risk profile. No rebalancing needed this week.
                    </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
