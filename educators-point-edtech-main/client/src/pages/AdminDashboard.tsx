import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, BookOpen, MessageSquare, Plus, Edit, Trash2, FileText, TrendingUp, Calendar } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface Enrollment {
  id: number;
  name: string;
  email: string;
  mobile_no: string | null;
  gender: string | null;
  date_of_birth: string | null;
  current_status: string | null;
  state: string | null;
  district: string | null;
  place: string | null;
  profile_data: {
    recommendation?: {
      teachingConfidence?: string | null;
      jobAlerts?: string | null;
      preferredSalaryRange?: string | null;
    };
    careerGoals?: {
      preferredTeachingSubject?: string | null;
      preferredJobLocation?: string | null;
      joiningReason?: string | null;
      learningMode?: string | null;
    };
    skills?: {
      languagesKnown?: string | null;
    };
  } | null;
  batch: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  tags: string[];
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
        if (status === 'SUBSCRIBED') {
          void utils.enrollment.getAll.invalidate();
        }
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

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Secondary Teacher', content: 'This program transformed my teaching approach completely!', rating: 5, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Vikram Desai', role: 'Primary Educator', content: 'Best investment in my teaching career. Highly recommended!', rating: 5, image: 'https://via.placeholder.com/100' },
  ]);

  const [mentors, setMentors] = useState<Mentor[]>([
    { id: '1', name: 'Priya Sharma', title: 'Curriculum & Teaching Methods Specialist', experience: '10+ years', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-priya-deKLhh2uDffoEnMdHFMUMr.webp', tags: ['Lesson Planning', 'Engagement'] },
    { id: '2', name: 'Rajesh Kumar', title: 'Classroom Management & Leadership Coach', experience: '12+ years', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-rajesh-FQKhR6cB2nRqdVZ6mPUnw9.webp', tags: ['Management', 'Leadership'] },
  ]);

  const stats = [
    { label: 'Total Enrollments', value: enrollments.length, icon: Users, color: '#2563EB' },
    { label: 'Confirmed Batches', value: enrollments.filter((e) => e.status === 'confirmed').length, icon: BookOpen, color: '#10B981' },
    { label: 'Testimonials', value: testimonials.length, icon: MessageSquare, color: '#F59E0B' },
    { label: 'Expert Mentors', value: mentors.length, icon: Users, color: '#8B5CF6' },
  ];

  const handleCancelEnrollment = (id: number) => {
    updateEnrollmentStatus.mutate({
      id,
      status: 'cancelled',
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleDeleteMentor = (id: string) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >


        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-2 font-medium">{stat.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">{stat.value}</p>
                    </div>
                    <div className="p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${stat.color}15` }}>
                      <Icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Overview Section */}
        <div className="space-y-6">


            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Dashboard Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-blue-700 text-lg">Recent Enrollments</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      isRealtimeConnected
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {isRealtimeConnected ? 'Live' : 'Syncing'}
                    </span>
                  </div>
                  <p className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">{enrollments.length}</p>
                  <p className="text-sm text-slate-600 mt-3 font-medium">New enrollments this month</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100">
                  <h3 className="font-bold text-emerald-700 mb-3 text-lg">Conversion Rate</h3>
                  <p className="text-5xl font-bold bg-gradient-to-br from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {enrollments.length > 0
                      ? `${Math.round((enrollments.filter((e) => e.status === 'confirmed').length / enrollments.length) * 100)}%`
                      : '0%'}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 font-medium">Enrollment confirmation rate</p>
                </div>
                </div>
              </Card>
            </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
