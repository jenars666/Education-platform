import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download, Eye, MousePointer, FormInput, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";

type DateRangeKey = "7days" | "30days" | "90days" | "1year";
type MetricKey = "all" | "confirmed" | "pending" | "cancelled" | "not_reachable";

type Enrollment = {
  id: number;
  name: string;
  email?: string | null;
  batch?: string | null;
  state?: string | null;
  status?: "pending" | "confirmed" | "completed" | "cancelled" | "not_reachable" | null;
  created_at?: string | null;
};

const RANGE_DAYS: Record<DateRangeKey, number> = {
  "7days": 7,
  "30days": 30,
  "90days": 90,
  "1year": 365,
};

const COLORS = ["#2563EB", "#60A5FA", "#14B8A6", "#A5B4FC", "#F59E0B", "#EF4444"];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatBucketLabel(date: Date, days: number) {
  if (days <= 7) {
    return date.toLocaleDateString("en-IN", { weekday: "short" });
  }
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function getRelativeTime(input?: string | null) {
  if (!input) return "just now";
  const ts = new Date(input).getTime();
  if (Number.isNaN(ts)) return "just now";
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRangeKey>("7days");
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("all");
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
      .on("postgres_changes", { event: "*", schema: "public", table: "enrollments" }, async () => {
        await utils.enrollment.getAll.invalidate();
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void utils.enrollment.getAll.invalidate();
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [utils]);

  const allEnrollments = enrollmentData as Enrollment[];
  const rangeDays = RANGE_DAYS[dateRange];

  const startDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - rangeDays + 1);
    return d;
  }, [rangeDays]);

  const isInRange = (value?: string | null) => {
    if (!value) return false;
    const t = new Date(value).getTime();
    return !Number.isNaN(t) && t >= startDate.getTime();
  };

  const enrollments = useMemo(
    () => allEnrollments.filter((e) => isInRange(e.created_at)),
    [allEnrollments, startDate],
  );

  const totalEnrollments = enrollments.length;
  const confirmedEnrollments = enrollments.filter((e) => e.status === "confirmed").length;
  const pendingEnrollments = enrollments.filter((e) => e.status === "pending").length;
  const completedEnrollments = enrollments.filter((e) => e.status === "completed").length;
  const cancelledEnrollments = enrollments.filter((e) => e.status === "cancelled").length;
  const notReachableEnrollments = enrollments.filter((e) => e.status === "not_reachable").length;
  const conversionRate = totalEnrollments > 0
    ? `${((confirmedEnrollments / totalEnrollments) * 100).toFixed(1)}%`
    : "0.0%";

  const dateBuckets = useMemo(() => {
    const buckets: Array<{ key: string; label: string }> = [];
    for (let i = 0; i < rangeDays; i += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      buckets.push({ key: toDateKey(date), label: formatBucketLabel(date, rangeDays) });
    }
    return buckets;
  }, [rangeDays, startDate]);

  const trendData = useMemo(() => {
    const byDate = new Map<string, { total: number; confirmed: number; pending: number; cancelled: number; not_reachable: number }>();
    dateBuckets.forEach((bucket) => {
      byDate.set(bucket.key, { total: 0, confirmed: 0, pending: 0, cancelled: 0, not_reachable: 0 });
    });

    enrollments.forEach((item) => {
      if (!item.created_at) return;
      const key = toDateKey(new Date(item.created_at));
      const row = byDate.get(key);
      if (!row) return;
      row.total += 1;
      if (item.status === "confirmed") row.confirmed += 1;
      if (item.status === "pending") row.pending += 1;
      if (item.status === "cancelled") row.cancelled += 1;
      if (item.status === "not_reachable") row.not_reachable += 1;
    });

    return dateBuckets.map((bucket) => ({
      date: bucket.label,
      ...byDate.get(bucket.key),
    }));
  }, [dateBuckets, enrollments]);

  const conversionData = [
    { name: "Total", value: totalEnrollments },
    { name: "Confirmed", value: confirmedEnrollments },
    { name: "Pending", value: pendingEnrollments },
    { name: "Completed", value: completedEnrollments },
    { name: "Cancelled", value: cancelledEnrollments },
    { name: "Not Reachable", value: notReachableEnrollments },
  ];

  const sourceData = useMemo(() => {
    const batchCounts = new Map<string, number>();
    enrollments.forEach((item) => {
      const key = item.batch?.trim() || "Unknown";
      batchCounts.set(key, (batchCounts.get(key) ?? 0) + 1);
    });

    const rows = Array.from(batchCounts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return rows.length > 0 ? rows : [{ name: "No Data", value: 1 }];
  }, [enrollments]);

  const sourceTotal = sourceData.reduce((sum, item) => sum + item.value, 0);

  const recentEvents = useMemo(
    () =>
      [...enrollments]
        .sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime())
        .slice(0, 8),
    [enrollments],
  );

  const metrics = [
    { icon: Eye, label: "Total Enrollments", value: totalEnrollments.toString(), change: "Live" },
    { icon: MousePointer, label: "Confirmed", value: confirmedEnrollments.toString(), change: "Live" },
    { icon: FormInput, label: "Pending", value: pendingEnrollments.toString(), change: "Live" },
    { icon: TrendingUp, label: "Conversion Rate", value: conversionRate, change: "Live" },
  ];

  const trendKey =
    selectedMetric === "confirmed"
      ? "confirmed"
      : selectedMetric === "pending"
        ? "pending"
        : selectedMetric === "cancelled"
          ? "cancelled"
          : selectedMetric === "not_reachable"
            ? "not_reachable"
            : "total";

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Live enrollment analytics (no mock data)
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </motion.div>
        </div>

        <div className="mb-6 flex gap-4">
          <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRangeKey)}>
            <SelectTrigger className="w-40 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-slate-700 shadow-lg rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={(v) => setSelectedMetric(v as MetricKey)}>
            <SelectTrigger className="w-56 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-slate-700 shadow-lg rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Enrollments</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="not_reachable">Not Reachable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="group p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{metric.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">{metric.value}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2 font-semibold">{metric.change}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Enrollment Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
                  <Line type="monotone" dataKey={trendKey} stroke="#2563EB" strokeWidth={3} dot={{ fill: "#2563EB", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Status Funnel
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Batch Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${Math.round(((value || 0) / (sourceTotal || 1)) * 100)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Recent Live Enrollments
              </h3>
              <div className="space-y-3">
                {recentEvents.length === 0 ? (
                  <div className="py-8 px-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm text-center">
                    No enrollments found in selected range.
                  </div>
                ) : (
                  recentEvents.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-200 border border-slate-100 dark:border-slate-700"
                    >
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">Enrollment Submitted</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.name}</p>
                      </div>
                      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{getRelativeTime(item.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
