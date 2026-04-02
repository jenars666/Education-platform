import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Calendar, Users } from 'lucide-react';

export default function Analytics() {
  // Sample data for charts
  const enrollmentTrend = [
    { month: 'Jan', enrollments: 12, confirmed: 8 },
    { month: 'Feb', enrollments: 19, confirmed: 14 },
    { month: 'Mar', enrollments: 28, confirmed: 22 },
    { month: 'Apr', enrollments: 35, confirmed: 28 },
  ];

  const batchDistribution = [
    { name: 'April 2026', value: 28, fill: '#2563EB' },
    { name: 'May 2026', value: 22, fill: '#3B82F6' },
    { name: 'June 2026', value: 15, fill: '#60A5FA' },
  ];

  const conversionMetrics = [
    { metric: 'Page Views', value: 2543, change: '+12%' },
    { metric: 'Enrollment Forms Started', value: 342, change: '+8%' },
    { metric: 'Forms Completed', value: 65, change: '+15%' },
    { metric: 'Conversion Rate', value: '19%', change: '+3%' },
  ];

  const sourceMetrics = [
    { source: 'Direct', enrollments: 18, percentage: 28 },
    { source: 'Google Search', enrollments: 22, percentage: 34 },
    { source: 'Social Media', enrollments: 15, percentage: 23 },
    { source: 'Referral', enrollments: 10, percentage: 15 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0E7FF] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#2C2C2C]">Analytics & Reports</h1>
              <p className="text-xs text-[#7A7A7A]">Enrollment metrics and insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#E0E7FF] gap-2">
              <Calendar className="w-4 h-4" />
              This Month
            </Button>
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {conversionMetrics.map((metric, idx) => (
            <Card key={idx} className="p-6 border border-[#E0E7FF] hover:shadow-lg transition-all duration-300">
              <p className="text-sm text-[#7A7A7A] mb-2">{metric.metric}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#2C2C2C]">{metric.value}</p>
                <span className="text-sm text-[#10B981] font-semibold">{metric.change}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Trend */}
          <Card className="p-6 border border-[#E0E7FF]">
            <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">Enrollment Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                <XAxis dataKey="month" stroke="#7A7A7A" />
                <YAxis stroke="#7A7A7A" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E7FF', borderRadius: '8px' }}
                  labelStyle={{ color: '#2C2C2C' }}
                />
                <Legend />
                <Line type="monotone" dataKey="enrollments" stroke="#2563EB" strokeWidth={2} name="Total Enrollments" />
                <Line type="monotone" dataKey="confirmed" stroke="#10B981" strokeWidth={2} name="Confirmed" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Batch Distribution */}
          <Card className="p-6 border border-[#E0E7FF]">
            <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">Enrollments by Batch</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={batchDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {batchDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Source Analysis */}
        <Card className="p-6 border border-[#E0E7FF] mb-8">
          <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">Enrollment Source Analysis</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {sourceMetrics.map((source, idx) => (
              <div key={idx} className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E0E7FF]">
                <p className="text-sm text-[#7A7A7A] mb-2">{source.source}</p>
                <p className="text-2xl font-bold text-[#2C2C2C]">{source.enrollments}</p>
                <p className="text-xs text-[#2563EB] font-semibold mt-2">{source.percentage}% of total</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Revenue */}
        <Card className="p-6 border border-[#E0E7FF]">
          <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">Monthly Revenue Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: 'Jan', revenue: 180000, target: 200000 },
              { month: 'Feb', revenue: 285000, target: 300000 },
              { month: 'Mar', revenue: 420000, target: 400000 },
              { month: 'Apr', revenue: 525000, target: 500000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis dataKey="month" stroke="#7A7A7A" />
              <YAxis stroke="#7A7A7A" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E7FF', borderRadius: '8px' }}
                labelStyle={{ color: '#2C2C2C' }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#2563EB" name="Actual Revenue" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#E0E7FF" name="Target Revenue" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  );
}
