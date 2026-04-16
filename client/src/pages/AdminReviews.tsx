import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Secondary Teacher', content: 'This program transformed my teaching approach completely!', rating: 5, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Vikram Desai', role: 'Primary Educator', content: 'Best investment in my teaching career. Highly recommended!', rating: 5, image: 'https://via.placeholder.com/100' },
  ]);

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Reviews</h1>
            <p className="text-slate-600 text-lg">Manage student reviews and testimonials</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{review.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{review.role}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 shadow-md rounded-xl">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl" onClick={() => handleDeleteReview(review.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-slate-600 mb-4">"{review.content}"</p>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
