"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, LineChart, Building2, Landmark, Bell, User, Network, ShieldCheck, Cpu, Users } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 115 },
  { name: 'Apr', value: 140 },
  { name: 'May', value: 135 },
  { name: 'Jun', value: 160 },
  { name: 'Jul', value: 180 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#9b51e0] selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Landmark className="text-[#9b51e0]" size={24} />
          <span className="text-xl font-bold tracking-tight">OptiVest</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          <Link href="#" className="text-white border-b-2 border-[#9b51e0] pb-1">Explore</Link>
          <Link href="#" className="hover:text-white transition-colors">Markets</Link>
          <Link href="#" className="hover:text-white transition-colors">Analytics</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
            <User size={20} />
          </Link>
          <Link href="/login" className="bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(155,81,224,0.3)]">
            Upgrade
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
              <Shield size={14} className="text-[#9b51e0]" />
              <span className="text-xs font-medium text-gray-300 tracking-wider">SEBI REGISTERED RIA</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Optimize Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#d8b4fe]">Investment Portfolio</span><br/>
              with Precision.
            </h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
              Harness the power of Dynamic Programming and Knapsack algorithms to maximize returns. Tailored risk-balanced planning for the modern Indian investor.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/signup" className="bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(155,81,224,0.4)] flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all">
                Explore Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#9b51e0]/20 to-transparent rounded-2xl blur-2xl"></div>
            <div className="relative bg-[#11151F] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-semibold tracking-wider text-gray-400">
                  LIVE: NIFTY 50 • 24,123.45 <span className="text-emerald-400">+1.24%</span>
                </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b51e0" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9b51e0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#11151F', borderColor: '#333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#9b51e0" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-gray-500 font-medium mb-1">Risk Profile</div>
                  <div className="text-lg font-bold text-orange-400 flex items-center justify-between">
                    Balanced
                    <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-gray-500 font-medium mb-1">Growth Rate</div>
                  <div className="text-lg font-bold text-emerald-400">14.8% <span className="text-sm font-normal">p.a.</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Assets Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h2 className="text-2xl font-bold mb-2">Comprehensive Asset Selection</h2>
          <p className="text-gray-400 text-sm mb-8">Diverse financial instruments for the Indian ecosystem.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: LineChart, title: 'NSE Stocks', desc: 'Direct equity investments in top NSE performers with real-time tracking.', stat: 'High Returns', color: 'text-emerald-400' },
              { icon: Building2, title: 'Mutual Funds', desc: 'Curated funds spanning ELSS, Debt, and Large-cap opportunities.', stat: 'Professional Mgmt', color: 'text-orange-400' },
              { icon: BarChart3, title: 'Gold ETF', desc: 'Hedge against inflation with digital gold backed by physical reserves.', stat: 'Safe Haven', color: 'text-red-400' },
              { icon: Landmark, title: 'Govt Bonds', desc: 'Sovereign-backed security for low-risk capital preservation.', stat: 'Guaranteed', color: 'text-blue-400' }
            ].map((asset, i) => (
              <div key={i} className="bg-[#11151F] border border-white/5 hover:border-[#9b51e0]/50 transition-colors p-6 rounded-2xl group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9b51e0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <asset.icon className="text-[#9b51e0] mb-4" size={24} />
                <h3 className="font-bold text-lg mb-2">{asset.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{asset.desc}</p>
                <div className={`text-xs font-semibold ${asset.color}`}>{asset.stat}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advanced Financial Engineering Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Advanced Financial Engineering</h2>
              <p className="text-gray-400 text-sm">Technology built for professional traders, refined for every investor.</p>
            </div>
            <Link href="#" className="text-[#9b51e0] hover:text-[#8a42c8] font-medium text-sm flex items-center gap-1 transition-colors">
              View All Features <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#11151F] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#9b51e0]/10 to-transparent pointer-events-none"></div>
              <Network className="text-[#9b51e0] mb-6" size={28} />
              <h3 className="text-xl font-bold mb-4">Portfolio Optimization Engine</h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Our proprietary algorithm recalculates 500+ variables daily to ensure your asset weightage matches your evolving risk profile.
              </p>
            </div>

            <div className="bg-[#11151F] border-l-4 border-[#9b51e0] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#9b51e0]/5 to-transparent pointer-events-none"></div>
              <ShieldCheck className="text-[#9b51e0] mb-6" size={28} />
              <h3 className="text-xl font-bold mb-4">Dynamic Risk Analysis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time stress testing against global volatility events and black swan scenarios.
              </p>
            </div>

            <div className="bg-[#11151F] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <Cpu className="text-[#9b51e0] mb-6" size={28} />
              <h3 className="text-xl font-bold mb-4">DP Engine</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dynamic Programming paths that break down complex retirement goals into simple daily actions.
              </p>
            </div>

            <div className="lg:col-span-2 bg-[#11151F] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              {/* Background graph hint */}
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
              <div className="flex gap-4 mb-6">
                <LineChart className="text-[#9b51e0]" size={28} />
                <Users className="text-orange-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Growth Simulation & Diversification</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Interactive projections that show exactly how diversified portfolios weather market cycles over 10, 20, or 30-year horizons.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ready to outpace the market CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="bg-gradient-to-b from-[#11151F] to-[#0A0D12] border border-white/5 rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#9b51e0]/50 to-transparent blur-md"></div>
            
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to outpace the market?</h2>
            <p className="text-gray-400 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
              Join 15,000+ enterprise and retail investors using OptiVest to drive data-centric wealth expansion.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/signup" className="bg-[#9b51e0] hover:bg-[#8a42c8] text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.3)]">
                Create Free Account
              </Link>
              <Link href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all">
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#07090C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="text-[#9b51e0]" size={24} />
              <span className="font-bold text-xl">OptiVest</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              © 2024 OptiVest Technologies Inc. High-performance wealth management for the modern digital era. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-16">
            <div>
              <h4 className="text-xs font-bold text-gray-200 tracking-wider mb-4 uppercase">Legal</h4>
              <div className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-200 tracking-wider mb-4 uppercase">Platform</h4>
              <div className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">Security</Link>
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">API Docs</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-200 tracking-wider mb-4 uppercase">Support</h4>
              <div className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">Cookie Settings</Link>
                <Link href="#" className="hover:text-[#9b51e0] transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
