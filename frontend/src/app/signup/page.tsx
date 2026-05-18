"use client";

import { motion } from "framer-motion";
import { Landmark, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Check your configuration.");
      // Bypassing for demo if credentials are still placeholders
      if (err.code === "auth/invalid-api-key") {
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex justify-center items-center p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#9b51e0]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[460px] bg-[#11151F]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-10 shadow-2xl relative z-10"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Landmark className="text-[#9b51e0]" size={24} />
          <span className="text-xl font-bold">OptiVest</span>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-sm mb-10 text-center">
          Join the next generation of Indian portfolio planning.
        </p>

        <form onSubmit={handleSignUp} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-xl">
              {error.includes("api-key") ? "Firebase configuration missing. Please update .env.local" : error}
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma" 
                required
                className="w-full bg-[#1A1F2B] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] focus:ring-1 focus:ring-[#9b51e0] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com" 
                required
                className="w-full bg-[#1A1F2B] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] focus:ring-1 focus:ring-[#9b51e0] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full bg-[#1A1F2B] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9b51e0] focus:ring-1 focus:ring-[#9b51e0] transition-all"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#9b51e0] hover:bg-[#8a42c8] text-white py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(155,81,224,0.3)] flex justify-center items-center gap-2">
            {loading ? "Initializing..." : <>Get Started <ArrowRight size={18}/></>}
          </button>
        </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/5"></div>
            <div className="px-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">Quick Access</div>
            <div className="flex-1 border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              type="button"
              className="bg-[#1A1F2B] hover:bg-[#222836] border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
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
              type="button"
              className="bg-[#1A1F2B] hover:bg-[#222836] border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Phone
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 font-medium">
            Already have an account? <Link href="/login" className="text-[#a855f7] font-bold hover:text-[#9b51e0] transition-colors ml-1 underline underline-offset-4">Sign In</Link>
          </div>
      </motion.div>
    </div>
  );
}
