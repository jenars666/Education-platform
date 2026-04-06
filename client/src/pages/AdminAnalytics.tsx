import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Eye, MousePointer, FormInput, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function AdminAnalytics() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin panel.</p>
        </Card>
      </div>
    );
  }

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
    { name: "Page Views", value: 8200 },
    { name: "CTA Clicks", value: 1240 },
    { name: "Form Submissions", value: 340 },
    { name: "Enrollments", value: 85 },
  ];

  const sourceData = [
    { name: "Organic", value: 45 },
    { name: "Direct", value: 25 },
    { name: "Referral", value: 20 },
    { name: "Social", value: 10 },
  ];

  const COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#DBEAFE"];

  const metrics = [
    { icon: Eye, label: "Page Views", value: "8,200", change: "+12%" },
    { icon: MousePointer, label: "CTA Clicks", value: "1,240", change: "+8%" },
    { icon: FormInput, label: "Form Submissions", value: "340", change: "+15%" },
    { icon: TrendingUp, label: "Conversion Rate", value: "4.1%", change: "+0.3%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track website performance and user engagement</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
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
            <SelectTrigger className="w-40">
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
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-green-600 text-sm mt-1">{metric.change}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Page Views Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Traffic Source */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Source</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {[
                { event: "Form Submission", time: "2 minutes ago", user: "John Doe" },
                { event: "CTA Click", time: "5 minutes ago", user: "Jane Smith" },
                { event: "Page View", time: "8 minutes ago", user: "Anonymous" },
                { event: "Form Submission", time: "12 minutes ago", user: "Mike Johnson" },
                { event: "CTA Click", time: "15 minutes ago", user: "Sarah Williams" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-500">{item.user}</p>
                  </div>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
