import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Eye, MousePointer, FormInput, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const utils = trpc.useUtils();

  const { data: enrollmentData = [] } = trpc.enrollment.getAll.useQuery(undefined, {
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    const channel = supabase
      .channel("admin-analytics-enrollments-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "enrollments" },
        async () => {
          await utils.enrollment.getAll.invalidate();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void utils.enrollment.getAll.invalidate();
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [utils]);

  const enrollments = enrollmentData as Array<{ status?: string | null; created_at?: string | null }>;
  const totalEnrollments = enrollments.length;
  const confirmedEnrollments = enrollments.filter((e) => e.status === "confirmed").length;
  const pendingEnrollments = enrollments.filter((e) => e.status === "pending").length;
  const completedEnrollments = enrollments.filter((e) => e.status === "completed").length;
  const cancelledEnrollments = enrollments.filter((e) => e.status === "cancelled").length;
  const conversionRate = totalEnrollments > 0
    ? `${((confirmedEnrollments / totalEnrollments) * 100).toFixed(1)}%`
    : "0.0%";

  // Mock data for analytics
  const pageViewsData = [
    { date: "Mon", views: 1200 },
    { date: "Tue", views: 1900 },
    { date: "Wed", views: 1600 },
    { date: "Thu", views: 2100 },
    { date: "Fri", views: 2400 },
    { date: "Sat", views: 2200 },
    { date: "Sun", views: 1800 },
  ];

  const conversionData = [
    { name: "Total", value: totalEnrollments },
    { name: "Confirmed", value: confirmedEnrollments },
    { name: "Pending", value: pendingEnrollments },
    { name: "Completed", value: completedEnrollments },
    { name: "Cancelled", value: cancelledEnrollments },
  ];

  const sourceData = [
    { name: "Organic", value: 45 },
    { name: "Direct", value: 25 },
    { name: "Referral", value: 20 },
    { name: "Social", value: 10 },
  ];

  const COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#DBEAFE"];

  const metrics = [
    { icon: Eye, label: "Total Enrollments", value: totalEnrollments.toString(), change: "Live" },
    { icon: MousePointer, label: "Confirmed", value: confirmedEnrollments.toString(), change: "Live" },
    { icon: FormInput, label: "Pending", value: pendingEnrollments.toString(), change: "Live" },
    { icon: TrendingUp, label: "Conversion Rate", value: conversionRate, change: "Live" },
  ];

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Analytics Dashboard</h1>
            <p className="text-slate-600 text-lg">Track website performance and user engagement</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 backdrop-blur-xl bg-white/70 border-white/40 shadow-lg rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40 backdrop-blur-xl bg-white/70 border-white/40 shadow-lg rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="views">Page Views</SelectItem>
              <SelectItem value="clicks">CTA Clicks</SelectItem>
              <SelectItem value="submissions">Form Submissions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-2">{metric.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">{metric.value}</p>
                      <p className="text-emerald-600 text-sm mt-2 font-semibold">{metric.change}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Page Views Trend */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Page Views Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="views" stroke="url(#colorGradient)" strokeWidth={3} dot={{ fill: '#2563EB', r: 5 }} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          </motion.div>
        </div>

        {/* Traffic Source */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Traffic Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          </motion.div>

          {/* Recent Events */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Recent Events</h3>
            <div className="space-y-3">
              {[
                { event: "Form Submission", time: "2 minutes ago", user: "John Doe" },
                { event: "CTA Click", time: "5 minutes ago", user: "Jane Smith" },
                { event: "Page View", time: "8 minutes ago", user: "Anonymous" },
                { event: "Form Submission", time: "12 minutes ago", user: "Mike Johnson" },
                { event: "CTA Click", time: "15 minutes ago", user: "Sarah Williams" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-800">{item.event}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.user}</p>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{item.time}</p>
                </div>
              ))}
            </div>
          </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
