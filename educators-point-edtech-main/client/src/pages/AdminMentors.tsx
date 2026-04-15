import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Mentor {
  id: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  tags: string[];
}

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([
    { id: '1', name: 'Priya Sharma', title: 'Curriculum & Teaching Methods Specialist', experience: '10+ years', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-priya-deKLhh2uDffoEnMdHFMUMr.webp', tags: ['Lesson Planning', 'Engagement'] },
    { id: '2', name: 'Rajesh Kumar', title: 'Classroom Management & Leadership Coach', experience: '12+ years', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-rajesh-FQKhR6cB2nRqdVZ6mPUnw9.webp', tags: ['Management', 'Leadership'] },
  ]);

  const handleDeleteMentor = (id: string) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Mentors</h1>
            <p className="text-slate-600 text-lg">Manage expert mentors and instructors</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Mentor
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl">
              <div className="flex gap-4 mb-4">
                <img src={mentor.image} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-2 ring-white" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">{mentor.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{mentor.title}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2 bg-blue-50 px-3 py-1 rounded-full inline-block">{mentor.experience}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {mentor.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 shadow-md rounded-xl">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl" onClick={() => handleDeleteMentor(mentor.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
