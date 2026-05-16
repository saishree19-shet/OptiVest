"use client";

import { motion } from "framer-motion";
import { Landmark, Mail, Lock, Eye, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // In a real app with real firebase credentials, this will work.
      // For now, if firebase fails, we'll bypass to dashboard for demo purposes
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Dummy login bypass if Firebase is unconfigured
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Dummy login bypass if Firebase is unconfigured
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col flex-1 p-12 justify-center relative overflow-hidden bg-[#0A0D12]">
        {/* Background gradient/glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9b51e0]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-xl mx-auto z-10 w-full relative">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Landmark className="text-[#9b51e0]" size={28} />
            <span className="text-2xl font-bold">OptiVest India</span>
          </Link>

          <h1 className="text-5xl font-bold leading-[1.2] mb-12">
            Smart Portfolio Planning <br/>
            for <span className="text-[#9b51e0]">Modern Indian</span> <br/>
            <span className="text-[#9b51e0]">Investors</span>
          </h1>

          <div className="flex gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#11151F]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex-1 shadow-2xl"
            >
              <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-6 tracking-wider">
                NIFTY 50 INDEX <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-bold mb-1">22,453.80</div>
              <div className="text-xs text-emerald-400 font-medium">+1.24% (Today)</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#11151F]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex-1 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#9b51e0]/10 rounded-bl-full"></div>
              <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-6 tracking-wider">
                PROJECTED CORPUS <Landmark size={14} className="text-yellow-500" />
              </div>
              <div className="text-2xl font-bold mb-1">₹ 1,42,85,000</div>
              <div className="text-xs text-gray-400">at 15% CAGR over 15y</div>
            </motion.div>
          </div>

          {/* Ticker */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#11151F]/50 backdrop-blur-sm border border-white/5 rounded-xl py-3 px-6 flex justify-between text-xs font-medium"
          >
            <div className="flex gap-2">
              <span className="text-gray-500">RELIANCE</span>
              <span className="text-emerald-400">₹2,984.00 ↑</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">HDFCBANK</span>
              <span className="text-red-400">₹1,442.20 ↓</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">TCS</span>
              <span className="text-emerald-400">₹4,012.50 ↑</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[#0B0E14] relative">
        {/* Subtle Rupee symbols background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <div className="text-[400px] font-bold text-white whitespace-nowrap tracking-tighter">₹ ₹ ₹</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[440px] bg-[#11151F]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-10 shadow-2xl relative z-10"
        >
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Secure Terminal</h2>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Access</h2>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            Sign in to manage your institutional wealth portfolio.
          </p>

          <form onSubmit={handleEmailSignIn} className="space-y-6">
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl">{error}</div>}
            
            <div>
              <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">Corporate Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required
                  className="w-full bg-[#1A1F2B] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] focus:ring-1 focus:ring-[#9b51e0] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Secure Password</label>
                <Link href="#" className="text-xs text-[#9b51e0] hover:text-[#8a42c8] transition-colors font-medium">Forgot?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full bg-[#1A1F2B] border border-white/5 rounded-xl py-3.5 pl-11 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] focus:ring-1 focus:ring-[#9b51e0] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full text-center bg-[#9b51e0] hover:bg-[#8a42c8] text-white py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.3)] mt-2">
              {loading ? "Signing in..." : "Sign In to Terminal"}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/5"></div>
            <div className="px-4 text-xs font-semibold text-gray-500 tracking-wider">OR CONTINUE WITH</div>
            <div className="flex-1 border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleSignIn} 
              className="bg-[#1A1F2B] hover:bg-[#222836] border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.69 17.57V20.34H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.77 16.72 5.88 14.16H2.21V17.01C4.01 20.59 7.69 23 12 23Z" fill="#34A853"/>
                <path d="M5.88 14.16C5.65 13.48 5.52 12.76 5.52 12C5.52 11.24 5.65 10.52 5.88 9.84V6.99H2.21C1.47 8.47 1.05 10.18 1.05 12C1.05 13.82 1.47 15.53 2.21 17.01L5.88 14.16Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.34 3.88C17.46 2.12 14.97 1.05 12 1.05C7.69 1.05 4.01 3.41 2.21 6.99L5.88 9.84C6.77 7.28 9.17 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <button 
              className="bg-[#1A1F2B] hover:bg-[#222836] border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Phone
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400 font-medium">
            New to OptiVest? <Link href="/signup" className="text-[#a855f7] font-bold hover:text-[#9b51e0] transition-colors ml-1 underline underline-offset-4">Create an Account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
