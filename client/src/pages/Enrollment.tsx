import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Clock, Users, Award, Zap, Shield } from "lucide-react";
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* Left fixed panel for large screens */}
      <div className="lg:fixed lg:top-0 lg:left-0 lg:w-[45%] xl:w-[40%] lg:h-screen bg-slate-50 lg:border-r border-slate-200 relative overflow-hidden flex flex-col">
        {/* Subtle background decoration */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[50%] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />

        {/* Global Logo Navigation inside Left Panel */}
        <div className="absolute top-0 left-0 w-full p-6 lg:p-8 flex justify-between items-center z-10">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Educators<span className="text-blue-600">Point</span></span>
          </div>
          
          {/* Mobile Back Button (Hidden on Desktop) */}
          <div className="lg:hidden">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-slate-500 font-bold uppercase tracking-widest text-xs gap-1.5 px-2">
              <ChevronLeft size={16} />
              {t('nav.back')}
            </Button>
          </div>
        </div>

        {/* Fixed Content Centered Vertically */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-10 xl:px-16 pt-24 pb-12 overflow-hidden z-10">
          <div className="w-full max-w-md mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-2">
                Enroll in Educators Point
              </h1>
              <p className="text-base text-slate-500 leading-relaxed">
                Start your journey toward becoming a certified modern educator with our 8-week program.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid gap-3"
            >
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="p-4 border border-slate-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <benefit.icon className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900 mb-0.5">{benefit.title}</h3>
                      <p className="text-slate-500 text-xs sm:text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            <div className="bg-slate-900 p-6 rounded-xl text-white shadow-xl mt-2">
              <Shield className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="text-lg font-bold mb-1.5">Placement Support</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We partner with schools to ensure our graduates find high-paying roles immediately after certification.
              </p>
            </div>
          </div>
        </div>
        
        {/* Left Side Footer */}
        <div className="hidden lg:block absolute bottom-6 left-0 w-full text-center z-10 px-6">
          <p className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">
             &copy; 2026 Educators Point.
          </p>
        </div>
      </div>

      {/* Right Scrollable Panel */}
      <div className="w-full lg:w-[55%] xl:w-[60%] lg:ml-auto min-h-screen bg-white flex flex-col relative">
        <div className="hidden lg:flex sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-12 py-4 justify-end items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-blue-600 font-bold uppercase tracking-widest text-xs gap-2"
          >
            <ChevronLeft size={16} />
            {t('nav.back')}
          </Button>
        </div>

        {/* Scrollable Form Container */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 xl:p-16 flex items-center justify-center pb-32">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl bg-white rounded-2xl sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
             <EnrollmentForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
