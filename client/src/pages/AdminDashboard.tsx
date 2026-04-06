import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, BookOpen, MessageSquare, Settings, LogOut, Plus, Edit, Trash2, Eye, EyeOff, Calendar, TrendingUp, FileText } from 'lucide-react';
import { useLocation } from 'wouter';

interface Enrollment {
  id: string;
  name: string;
  email: string;
  batch: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    { id: '1', name: 'Rajesh Singh', email: 'rajesh@email.com', batch: 'April 2026', date: '2026-03-28', status: 'confirmed' },
    { id: '2', name: 'Priya Patel', email: 'priya@email.com', batch: 'May 2026', date: '2026-03-29', status: 'pending' },
    { id: '3', name: 'Amit Kumar', email: 'amit@email.com', batch: 'June 2026', date: '2026-03-30', status: 'confirmed' },
  ]);

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
    { label: 'Confirmed Batches', value: 3, icon: BookOpen, color: '#10B981' },
    { label: 'Testimonials', value: testimonials.length, icon: MessageSquare, color: '#F59E0B' },
    { label: 'Expert Mentors', value: mentors.length, icon: Users, color: '#8B5CF6' },
  ];

  const handleDeleteEnrollment = (id: string) => {
    setEnrollments(enrollments.filter(e => e.id !== id));
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleDeleteMentor = (id: string) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0E7FF] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EP</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#2C2C2C]">Educators Point</h1>
              <p className="text-xs text-[#7A7A7A]">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/admin/content')} className="text-[#7A7A7A] hover:text-[#2563EB]">
              <FileText className="w-4 h-4 mr-1" />
              Content
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/admin/analytics')} className="text-[#7A7A7A] hover:text-[#2563EB]">
              <TrendingUp className="w-4 h-4 mr-1" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/admin/calendar')} className="text-[#7A7A7A] hover:text-[#2563EB]">
              <Calendar className="w-4 h-4 mr-1" />
              Calendar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/admin/crm')} className="text-[#7A7A7A] hover:text-[#2563EB]">
              <Users className="w-4 h-4 mr-1" />
              CRM
            </Button>
            <Button variant="outline" className="text-[#2563EB] border-[#2563EB] hover:bg-[#EFF6FF]">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Admin Module Navigation */}
        <div className="mb-8 p-4 bg-white border border-[#E0E7FF] rounded-lg">
          <p className="text-sm text-[#7A7A7A] mb-3 font-semibold">Quick Access to Admin Modules</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button variant="outline" onClick={() => setLocation('/admin')} className="border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => setLocation('/admin/content')} className="border-[#7A7A7A] hover:bg-gray-50">
              <FileText className="w-4 h-4 mr-2" />
              Content
            </Button>
            <Button variant="outline" onClick={() => setLocation('/admin/analytics')} className="border-[#7A7A7A] hover:bg-gray-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" onClick={() => setLocation('/admin/calendar')} className="border-[#7A7A7A] hover:bg-gray-50">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button variant="outline" onClick={() => setLocation('/admin/crm')} className="border-[#7A7A7A] hover:bg-gray-50">
              <Users className="w-4 h-4 mr-2" />
              CRM
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 border border-[#E0E7FF]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#7A7A7A] mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#2C2C2C]">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#E0E7FF] p-1 rounded-lg mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="enrollments" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Enrollments</TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Testimonials</TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Mentors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8 border border-[#E0E7FF]">
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4">Dashboard Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-lg">
                  <h3 className="font-bold text-[#2563EB] mb-2">Recent Enrollments</h3>
                  <p className="text-3xl font-bold text-[#2C2C2C]">{enrollments.length}</p>
                  <p className="text-sm text-[#7A7A7A] mt-2">New enrollments this month</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#F0FDF4] to-[#F0FDF4] rounded-lg">
                  <h3 className="font-bold text-[#10B981] mb-2">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-[#2C2C2C]">85%</p>
                  <p className="text-sm text-[#7A7A7A] mt-2">Enrollment confirmation rate</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Manage Enrollments</h2>
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Enrollment
              </Button>
            </div>
            <div className="space-y-3">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="p-4 border border-[#E0E7FF] hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2C2C2C]">{enrollment.name}</h3>
                      <p className="text-sm text-[#7A7A7A]">{enrollment.email}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full">{enrollment.batch}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          enrollment.status === 'confirmed' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#E0E7FF]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#E0E7FF] text-red-600 hover:bg-red-50" onClick={() => handleDeleteEnrollment(enrollment.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Manage Testimonials</h2>
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 border border-[#E0E7FF] hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-[#2C2C2C]">{testimonial.name}</h3>
                      <p className="text-sm text-[#7A7A7A]">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#E0E7FF]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#E0E7FF] text-red-600 hover:bg-red-50" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#7A7A7A] mb-4">"{testimonial.content}"</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#F59E0B]">★</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Manage Mentors</h2>
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Mentor
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="p-6 border border-[#E0E7FF] hover:shadow-md transition-all duration-300">
                  <div className="flex gap-4 mb-4">
                    <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2C2C2C]">{mentor.name}</h3>
                      <p className="text-sm text-[#7A7A7A]">{mentor.title}</p>
                      <p className="text-xs text-[#2563EB] font-semibold mt-1">{mentor.experience}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {mentor.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-[#E0E7FF]">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#E0E7FF] text-red-600 hover:bg-red-50" onClick={() => handleDeleteMentor(mentor.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
