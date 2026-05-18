"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search, Bell, User,
  TrendingUp, TrendingDown, ArrowUpRight, Globe, Zap,
  Activity, BarChart, ExternalLink, RefreshCw, ZapOff
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const marketTickers = [
  { name: 'NIFTY 50', value: '22,450.20', change: '+1.24%', trend: 'up' },
  { name: 'SENSEX', value: '73,980.50', change: '+0.98%', trend: 'up' },
  { name: 'NIFTY BANK', value: '47,210.15', change: '-0.15%', trend: 'down' },
  { name: 'GOLD (24K)', value: '65,840.00', change: '+2.10%', trend: 'up' },
];

const hotAssets = [
  { name: 'Reliance Industries', price: '₹2,945', change: '+3.2%', vol: '1.2M', cap: '19.8T' },
  { name: 'HDFC Bank', price: '₹1,450', change: '-1.2%', vol: '4.5M', cap: '11.2T' },
  { name: 'TCS', price: '₹3,980', change: '+0.8%', vol: '0.8M', cap: '14.5T' },
  { name: 'Infosys', price: '₹1,560', change: '+1.5%', vol: '2.1M', cap: '6.4T' },
  { name: 'Adani Ent', price: '₹3,120', change: '+5.4%', vol: '3.2M', cap: '3.5T' },
];

const marketHistory = [
  { time: '09:15', price: 22100 },
  { time: '10:30', price: 22250 },
  { time: '11:45', price: 22180 },
  { time: '13:00', price: 22350 },
  { time: '14:15', price: 22420 },
  { time: '15:30', price: 22450 },
];

export default function MarketDataPage() {
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
            { icon: PieChart, label: "Portfolio", href: "/portfolio" },
            { icon: LineChart, label: "Market Data", href: "/market", active: true },
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
          <div className="flex items-center gap-6">
             <h1 className="text-xl font-bold">Market Intelligence</h1>
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Markets Open</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search stocks, indices..." 
                className="bg-[#11151F] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#9b51e0] transition-all w-64"
              />
            </div>
            <button className="p-2.5 bg-[#11151F] border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Ticker Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketTickers.map((ticker, i) => (
                <div key={i} className="bg-[#11151F] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{ticker.name}</span>
                     {ticker.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-red-500" />}
                   </div>
                   <div className="text-2xl font-black">{ticker.value}</div>
                   <div className={`text-xs font-bold ${ticker.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>{ticker.change}</div>
                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9b51e0]/20 to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Market Chart */}
            <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Globe size={120} />
               </div>
               <div className="flex justify-between items-center mb-10">
                 <div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">NIFTY 50 Intraday</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <span className="text-sm font-bold text-emerald-500">+245.80 (1.24%)</span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">• Real-time Feed</span>
                   </div>
                 </div>
                 <div className="flex gap-2">
                    {['D', 'W', 'M', 'Y'].map(t => (
                      <button key={t} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${t === 'D' ? 'bg-[#9b51e0] text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:text-white'}`}>
                        {t}
                      </button>
                    ))}
                 </div>
               </div>
               <div className="h-96">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={marketHistory}>
                     <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 'bold'}} />
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#11151F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      />
                      <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Market Grid */}
            <div className="grid lg:grid-cols-3 gap-6 pb-8">
               <div className="lg:col-span-2 bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                 <div className="flex justify-between items-center mb-8">
                   <h3 className="font-black uppercase tracking-widest text-sm text-gray-400">Market Movers</h3>
                   <div className="flex gap-4">
                      <button className="text-[10px] font-black text-[#9b51e0] uppercase tracking-widest">GAINERS</button>
                      <button className="text-[10px] font-black text-gray-600 uppercase tracking-widest">LOSERS</button>
                   </div>
                 </div>
                 <div className="space-y-4">
                   {hotAssets.map((asset, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-[#9b51e0]/30 transition-all group">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-[#0B0E14] flex items-center justify-center font-bold text-gray-300">
                           {asset.name.charAt(0)}
                         </div>
                         <div>
                           <div className="text-sm font-bold text-white group-hover:text-[#9b51e0] transition-colors">{asset.name}</div>
                           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">VOL: {asset.vol}</div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="text-sm font-bold text-white">{asset.price}</div>
                         <div className={`text-xs font-bold ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{asset.change}</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="bg-[#11151F] border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <h3 className="font-black uppercase tracking-widest text-sm text-gray-400 mb-6">Market Sentiment</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-48 h-24 mb-6">
                          <div className="absolute inset-0 border-[12px] border-white/5 rounded-t-full"></div>
                          <div className="absolute inset-0 border-[12px] border-emerald-500 rounded-t-full rotate-[120deg]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-white rounded-full origin-bottom rotate-[45deg]"></div>
                       </div>
                       <div className="text-2xl font-black text-emerald-500">GREED</div>
                       <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Index: 72/100</div>
                    </div>
                 </div>

                 <div className="bg-gradient-to-br from-[#9b51e0]/20 to-transparent border border-[#9b51e0]/30 rounded-3xl p-8 shadow-2xl">
                    <div className="w-12 h-12 rounded-xl bg-[#9b51e0]/20 flex items-center justify-center text-[#9b51e0] mb-6">
                      <Zap size={24} />
                    </div>
                    <h4 className="text-lg font-black text-white mb-2">Alpha Signal</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      Institutional accumulation detected in Large-cap IT sector. High probability of breakout in next 48 hours.
                    </p>
                    <button className="w-full py-3 bg-[#9b51e0] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-[#9b51e0]/40 transition-all">
                      Analyze Potential
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
