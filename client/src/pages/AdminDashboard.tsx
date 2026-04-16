import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, MessageSquare, TrendingUp, Sparkles, Activity, ShieldCheck, Clock } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

// Types
interface Enrollment {
  id: number;
  name: string;
  email: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'not_reachable';
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  const {
    data: enrollmentData = [],
    isLoading: isEnrollmentsLoading,
  } = trpc.enrollment.getAll.useQuery(undefined, {
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const enrollments = enrollmentData as Enrollment[];

  useEffect(() => {
    const channel = supabase
      .channel('admin-enrollments-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enrollments' },
        async () => {
          await utils.enrollment.getAll.invalidate();
        }
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === 'SUBSCRIBED');
      });

    return () => {
      setIsRealtimeConnected(false);
      void supabase.removeChannel(channel);
    };
  }, [utils]);

  const updateEnrollmentStatus = trpc.enrollment.updateStatus.useMutation({
    onSuccess: () => {
      void utils.enrollment.getAll.invalidate();
    },
  });

  const stats = [
    { label: 'Total Enrollments', value: enrollments.length, icon: Users, color: '#2563EB', lightColor: '#EFF6FF', trend: '+12% this week' },
    { label: 'Confirmed Batches', value: enrollments.filter((e) => e.status === 'confirmed').length, icon: BookOpen, color: '#10B981', lightColor: '#ECFDF5', trend: 'Solid Growth' },
    { label: 'Pending Reviews', value: enrollments.filter((e) => e.status === 'pending').length, icon: Clock, color: '#F59E0B', lightColor: '#FFFBEB', trend: 'Action Required' },
    { label: 'Cancelled', value: enrollments.filter((e) => e.status === 'cancelled').length, icon: MessageSquare, color: '#EF4444', lightColor: '#FEF2F2', trend: 'Track Closely' },
    { label: 'Not Reachable', value: enrollments.filter((e) => e.status === 'not_reachable').length, icon: Activity, color: '#F97316', lightColor: '#FFF7ED', trend: 'Follow Up' },
  ];

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-7xl mx-auto space-y-10 selection:bg-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Elite Header */}
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-slate-950 p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 ring-1 ring-blue-500/20">
                <Sparkles className="w-3 h-3" />
                Control Center
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                Welcome back, Admin.
              </h1>
              <p className="text-slate-400 font-medium text-lg">
                Here's what's happening with your platform today.
              </p>
            </div>
            
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border font-bold text-sm shadow-xl backdrop-blur-md ${
              isRealtimeConnected ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {isRealtimeConnected ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live Sync Active
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group p-6 sm:p-8 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-900/5 transition-all duration-500 rounded-[2rem] overflow-hidden relative cursor-default h-full">
                   <div 
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700 opacity-20"
                    style={{ backgroundColor: stat.lightColor }}
                   />
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500"
                      style={{ backgroundColor: stat.lightColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <p className="text-slate-500 mb-1 font-bold text-sm tracking-tight">{stat.label}</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{stat.value}</p>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: stat.color }}>{stat.trend}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Action Overview Bento */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 sm:p-8 md:p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-lg hover:shadow-xl transition-shadow duration-500 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Platform Health</h2>
                <p className="text-slate-500 font-medium mb-10">Your conversion and engagement overview.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-slate-900 transition-colors duration-500 cursor-default">
                  <TrendingUp className="w-8 h-8 text-blue-600 mb-6 group-hover:text-blue-400 transition-colors" />
                  <p className="text-5xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tighter mb-2">
                    {enrollments.length > 0
                      ? `${Math.round((enrollments.filter((e) => e.status === 'confirmed').length / enrollments.length) * 100)}%`
                      : '0%'}
                  </p>
                  <p className="text-sm font-bold text-slate-500 group-hover:text-slate-400">Conversion Rate</p>
                </div>
                <div className="p-6 sm:p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-600/20 group hover:bg-blue-700 transition-colors duration-500 cursor-default">
                  <ShieldCheck className="w-8 h-8 text-blue-200 mb-6" />
                  <p className="text-5xl font-black text-white tracking-tighter mb-2">Optimal</p>
                  <p className="text-sm font-bold text-blue-200">System Status</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
             <Card className="p-6 sm:p-8 md:p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md ring-1 ring-white/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 relative z-10">Manage Enrollments</h3>
                <p className="text-slate-400 font-medium mb-8 text-sm leading-relaxed relative z-10">
                  Review new applications, confirm batches, and manage student data.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl h-14 relative z-10"
                  onClick={() => setLocation('/admin/enrollments')}
                >
                  View All Registrations
                </Button>
             </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
