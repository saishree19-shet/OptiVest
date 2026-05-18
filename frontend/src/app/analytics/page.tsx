"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search,
  TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Filter,
  Target, Zap
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, XAxis, YAxis, 
  Tooltip, Cell, PieChart as RePieChart, Pie,
  AreaChart, Area, CartesianGrid
} from "recharts";

const analyticsData = [
  { month: 'Jan', return: 4000, risk: 2400, benchmark: 2400 },
  { month: 'Feb', return: 3000, risk: 1398, benchmark: 2210 },
  { month: 'Mar', return: 2000, risk: 9800, benchmark: 2290 },
  { month: 'Apr', return: 2780, risk: 3908, benchmark: 2000 },
  { month: 'May', return: 1890, risk: 4800, benchmark: 2181 },
  { month: 'Jun', return: 2390, risk: 3800, benchmark: 2500 },
];

const sectorData = [
  { name: 'Fintech', value: 400, color: '#a855f7' },
  { name: 'Energy', value: 300, color: '#3b82f6' },
  { name: 'Health', value: 300, color: '#10b981' },
  { name: 'Auto', value: 200, color: '#f59e0b' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="flex h-screen bg-[#0B0E14] text-white overflow-hidden font-sans">
      {/* Sidebar - Reusing styles for consistency */}
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
            { icon: BarChart2, label: "Analytics", href: "/analytics", active: true },
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Advanced Analytics</h1>
            <div className="flex bg-[#11151F] rounded-lg p-1 border border-white/5">
              {['1M', '3M', '6M', '1Y', 'ALL'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${timeRange === range ? 'bg-[#9b51e0] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#11151F] border border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#1A1F2B] transition-all">
              <Filter size={16} /> Filter
            </button>
            <button className="bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.4)]">
              Generate Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Real-time Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Alpha vs Nifty 50', value: '+4.2%', sub: 'Outperforming benchmark', icon: Zap, color: 'text-yellow-500' },
                { label: 'Sharpe Ratio', value: '2.14', sub: 'High risk-adjusted return', icon: Activity, color: 'text-emerald-500' },
                { label: 'Max Drawdown', value: '-8.4%', sub: 'Lower than peer average', icon: ArrowDownRight, color: 'text-red-500' },
                { label: 'Volatility (╧â)', value: '14.2%', sub: 'Stable distribution', icon: Target, color: 'text-blue-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#11151F] border border-white/10 rounded-2xl p-6 shadow-xl hover:border-[#9b51e0]/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
                    <stat.icon size={18} className={stat.color} />
                  </div>
                  <div className="text-2xl font-black mb-1">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 font-medium">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">Performance Attribution</h3>
                    <p className="text-xs text-gray-500">Trailing performance vs Market Benchmark</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#9b51e0]"></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Portfolio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Nifty 50</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b51e0" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#9b51e0" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#11151F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="return" stroke="#9b51e0" strokeWidth={4} fillOpacity={1} fill="url(#colorReturn)" />
                      <Area type="monotone" dataKey="benchmark" stroke="#ffffff" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sector Breakdown */}
              <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col">
                <h3 className="text-lg font-black text-white mb-8 uppercase tracking-tight text-center">Sector Allocation</h3>
                <div className="flex-1 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={sectorData}
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Diversification</span>
                    <span className="text-2xl font-black text-white">92%</span>
                  </div>
                </div>
                <div className="space-y-3 mt-8">
                  {sectorData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-bold text-gray-400">{item.name}</span>
                      </div>
                      <span className="text-xs font-black text-white">{((item.value/1200)*100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-sm font-black text-gray-400 mb-6 uppercase tracking-widest">Rolling Correlation vs Assets</h3>
                <div className="space-y-6">
                  {['Reliance Ind.', 'HDFC Bank', 'TCS', 'Infosys'].map((stock, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-300">{stock} Correlation</span>
                        <span className="text-emerald-500">{0.8 - (i * 0.1)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500/50 rounded-full" style={{ width: `${(0.8 - (i * 0.1)) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#9b51e0]/10 to-transparent border border-[#9b51e0]/20 rounded-3xl p-8 shadow-2xl flex items-center gap-8">
                <div className="w-24 h-24 rounded-full border-4 border-[#9b51e0] border-t-transparent animate-spin-slow flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#9b51e0]/20 flex items-center justify-center text-[#9b51e0]">
                    <Activity size={32} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2">AI Optimization Engine</h4>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                    Our neural network is currently re-balancing your portfolio nodes for tomorrow&apos;s market session.
                  </p>
                  <button className="mt-4 text-[#9b51e0] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View Live Kernel <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
