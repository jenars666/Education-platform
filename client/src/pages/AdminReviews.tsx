import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, X, Save, Loader2, MessageSquare, Star, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface ReviewForm {
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
  isActive: boolean;
}

const emptyForm: ReviewForm = {
  name: '',
  role: '',
  content: '',
  rating: 5,
  imageUrl: '',
  isActive: true,
};

export default function AdminReviews() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ReviewForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: reviews, isLoading } = trpc.reviews.getAll.useQuery();

  const createMutation = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success('Review added successfully!');
      utils.reviews.getAll.invalidate();
      closeModal();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.reviews.update.useMutation({
    onSuccess: () => {
      toast.success('Review updated successfully!');
      utils.reviews.getAll.invalidate();
      closeModal();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.reviews.delete.useMutation({
    onSuccess: () => {
      toast.success('Review deleted successfully!');
      utils.reviews.getAll.invalidate();
      setDeleteConfirm(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (review: any) => {
    setForm({
      name: review.name,
      role: review.role,
      content: review.content,
      rating: review.rating,
      imageUrl: review.image_url || '',
      isActive: review.is_active ?? true,
    });
    setEditingId(review.id);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.role.trim() || !form.content.trim()) {
      toast.error('Name, Role, and Content are required');
      return;
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Reviews</h1>
            <p className="text-slate-600 text-lg">Manage student reviews — changes sync to the home page in real-time</p>
          </div>
          <Button onClick={openAdd} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-500 font-medium">Loading reviews...</span>
          </div>
        ) : !reviews?.length ? (
          <Card className="p-12 text-center backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">No reviews yet</h3>
            <p className="text-slate-500 mb-6">Add your first review to get started.</p>
            <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Review
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className={`group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl ${!review.is_active ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-lg">{review.name}</h3>
                      {!review.is_active && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Hidden</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{review.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(review)} className="border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 shadow-md rounded-xl">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {deleteConfirm === review.id ? (
                      <div className="flex gap-1.5 items-center">
                        <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate({ id: review.id })} disabled={deleteMutation.isPending}
                          className="border-red-300 bg-red-100 text-red-700 hover:bg-red-200 shadow-md rounded-xl text-xs font-bold">
                          {deleteMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)} className="rounded-xl text-xs">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setDeleteConfirm(review.id)}
                        className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 mb-4 line-clamp-3">"{review.content}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Edit Review' : 'Add New Review'}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeModal} className="rounded-xl">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Name *</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Role *</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Secondary Teacher"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Review Content *</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="What did they say about the program..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`text-3xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="Optional profile photo URL"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-12 h-7 rounded-full transition-colors relative ${form.isActive ? 'bg-blue-600' : 'bg-slate-300'}`}
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  >
                    <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    {form.isActive ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                    {form.isActive ? 'Visible on home page' : 'Hidden from home page'}
                  </span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-3xl">
              <Button variant="outline" onClick={closeModal} className="rounded-xl px-6">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSaving}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/20">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingId ? 'Update Review' : 'Add Review'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
