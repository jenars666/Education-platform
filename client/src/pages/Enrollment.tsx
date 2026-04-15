import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, Clock, Users, Award, Zap, Shield, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import EnrollmentForm from "@/components/EnrollmentForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Enrollment() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  const benefits = [
    { icon: Clock, title: "8-Week Program", desc: "Intensive, structured training with daily live sessions", color: "blue" },
    { icon: Users, title: "Expert Mentors", desc: "Learn from 5-12+ years experienced educators", color: "indigo" },
    { icon: Award, title: "100% Placement", desc: "Placement assistance with school partnerships", color: "violet" },
    { icon: Zap, title: "Early Bird Offer", desc: "Special discount for first 20 enrollments", color: "cyan" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 italic font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3">
              <span className="text-white font-black text-xl italic leading-none">E</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">Educators<span className="text-blue-600 font-medium">Point.</span></span>
          </motion.div>
          
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-blue-600 font-bold uppercase tracking-widest text-xs gap-2"
          >
            <ChevronLeft size={16} />
            {t('nav.back')}
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* Left Content - Trust & Benefits */}
            <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-6 ring-1 ring-blue-100">
                  <Sparkles className="w-3 h-3" />
                  Apply For Excellence
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter italic">
                  Join the <span className="text-blue-600 block">Elite Tier.</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  Start your journey toward becoming a certified modern educator with our premium 8-week program.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid gap-6"
              >
                {benefits.map((benefit, idx) => (
                  <Card key={idx} className="p-8 border border-slate-100 bg-white hover:bg-slate-900 group transition-all duration-500 rounded-[2rem] shadow-sm">
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                        <benefit.icon className="text-blue-600 w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white mb-1 transition-colors tracking-tight italic">{benefit.title}</h3>
                        <p className="text-slate-500 group-hover:text-slate-400 font-medium text-sm leading-relaxed transition-colors">{benefit.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-slate-950 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
                <Shield className="w-12 h-12 text-blue-500 mb-6" />
                <h4 className="text-2xl font-black mb-4 tracking-tighter">Placement Guaranteed.</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed opacity-80">
                  We partner with top global schools to ensure our graduates find high-paying roles immediately after certification.
                </p>
              </motion.div>
            </div>

            {/* Right Content - Enrollment Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 py-10 sm:p-12 lg:p-20 shadow-2xl shadow-slate-900/5 border border-slate-100 relative">
                   <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-600 opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
                   <EnrollmentForm />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer Section */}
      <footer className="bg-white border-t border-slate-100 py-20 mt-40">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">
             &copy; 2026 Educators Point Institute. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
