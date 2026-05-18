"use client";

import React from 'react';
import { 
  Landmark, LayoutDashboard, BarChart2, PieChart, LineChart, 
  ShieldAlert, BoxSelect, ArrowRightLeft, Search,
  Plus, Download, Filter, ArrowUpRight, ArrowDownLeft, Calendar,
  MoreVertical, CreditCard, Wallet, Banknote
} from "lucide-react";
import Link from "next/link";

const transactions = [
  { id: '#TX9842', asset: 'Nifty 50 Index Fund', type: 'Buy', amount: '₹50,000', status: 'Completed', date: '2026-05-15', icon: <ArrowUpRight size={16} /> },
  { id: '#TX9841', asset: 'Gold BeES ETF', type: 'Buy', amount: '₹15,000', status: 'Completed', date: '2026-05-14', icon: <ArrowUpRight size={16} /> },
  { id: '#TX9840', asset: 'HDFC Bank Ltd.', type: 'Sell', amount: '₹28,500', status: 'Completed', date: '2026-05-12', icon: <ArrowDownLeft size={16} /> },
  { id: '#TX9839', asset: 'SBI Fixed Deposit', type: 'Invest', amount: '₹1,00,000', status: 'Processing', date: '2026-05-10', icon: <ArrowUpRight size={16} /> },
  { id: '#TX9838', asset: 'Reliance Ind.', type: 'Buy', amount: '₹42,000', status: 'Completed', date: '2026-05-08', icon: <ArrowUpRight size={16} /> },
];

export default function TransactionsPage() {
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
            { icon: LineChart, label: "Market Data", href: "/market" },
            { icon: ShieldAlert, label: "Risk Analytics", href: "/risk" },
            { icon: BoxSelect, label: "DP Visualization", href: "/dp-visualization" },
            { icon: ArrowRightLeft, label: "Transactions", href: "/transactions", active: true },
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
          <h1 className="text-xl font-bold">Financial Transactions</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#11151F] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#1A1F2B] transition-all">
              <Download size={16} /> Export CSV
            </button>
            <button className="flex items-center gap-2 bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.4)]">
              <Plus size={16} /> Deposit Funds
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#11151F] border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <Wallet size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Available</div>
                    <div className="text-2xl font-black text-white">₹2,45,000</div>
                  </div>
               </div>
               <div className="bg-[#11151F] border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#9b51e0]/10 flex items-center justify-center text-[#9b51e0]">
                     <Banknote size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">In-Transit Assets</div>
                    <div className="text-2xl font-black text-white">₹1,00,000</div>
                  </div>
               </div>
               <div className="bg-[#11151F] border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                     <CreditCard size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Tax Liabilities</div>
                    <div className="text-2xl font-black text-white">₹12,450</div>
                  </div>
               </div>
            </div>

            {/* Transaction List */}
            <div className="bg-[#11151F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
               <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-black uppercase tracking-widest text-sm text-gray-400">Order History Node</h3>
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input 
                          type="text" 
                          placeholder="Ref ID..." 
                          className="bg-[#0B0E14] border border-white/5 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-[#9b51e0] w-40"
                        />
                     </div>
                     <button className="p-1.5 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
                        <Filter size={16} />
                     </button>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                           <th className="px-8 py-6">Reference ID</th>
                           <th className="px-8 py-6">Instrument Node</th>
                           <th className="px-8 py-6">Transaction Type</th>
                           <th className="px-8 py-6">Value (INR)</th>
                           <th className="px-8 py-6">Execution Date</th>
                           <th className="px-8 py-6">Status</th>
                           <th className="px-8 py-6 text-right"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {transactions.map((tx, i) => (
                           <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <td className="px-8 py-6 text-xs font-black text-gray-500">{tx.id}</td>
                              <td className="px-8 py-6">
                                 <div className="text-sm font-bold text-white group-hover:text-[#9b51e0] transition-colors">{tx.asset}</div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className={`flex items-center gap-2 text-xs font-bold ${tx.type === 'Buy' || tx.type === 'Invest' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {tx.icon} {tx.type}
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-sm font-bold text-white">{tx.amount}</td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Calendar size={14} /> {tx.date}
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tx.status === 'Completed' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'}`}>
                                    {tx.status}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <button className="text-gray-500 hover:text-white transition-colors">
                                    <MoreVertical size={18} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-6 bg-white/[0.01] text-center">
                  <button className="text-xs font-black text-gray-500 uppercase tracking-widest hover:text-white transition-all">Load Archive Logs</button>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                     <CreditCard size={40} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white mb-2">Automated SIP Node Active</h4>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                      Next execution scheduled for **01 Jun 2026** into Nifty 50 Index Fund node. Ensure ₹25,000 liquidity in linked bank account.
                    </p>
                  </div>
               </div>
               <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all">
                  Manage Auto-Invest
               </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
