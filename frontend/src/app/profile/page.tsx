"use client";

import { motion } from "framer-motion";
import { Landmark, Mail, User, ShieldCheck, LogOut, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#9b51e0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#11151F] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9b51e0] to-[#7b31c0] flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-2xl">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  user?.displayName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.displayName || "Guest User"}</h2>
              <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">Institutional Investor</p>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all font-bold text-sm"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>

            <div className="bg-[#11151F] border border-white/5 rounded-3xl p-6">
              <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Security Status</div>
              <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={20} className="text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-white">Identity Verified</div>
                  <div className="text-[10px] text-emerald-500/80">Tier 3 Security Cleared</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#11151F] border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-8">Account Configuration</h3>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                    <User size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</div>
                    <div className="text-sm font-medium">{user?.displayName || "Not set"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Registered Email</div>
                    <div className="text-sm font-medium">{user?.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Account Created</div>
                    <div className="text-sm font-medium">{user?.metadata?.creationTime || "Recently"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#11151F] border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Linked Assets</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Primary Broker</div>
                  <div className="text-sm font-bold">Zerodha Pro</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Tax Residency</div>
                  <div className="text-sm font-bold">India (Resident)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
