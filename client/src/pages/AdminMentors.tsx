import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, X, Save, Loader2, Users, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface MentorForm {
  name: string;
  title: string;
  description: string;
  experience: string;
  focus: string;
  imageUrl: string;
  tag1: string;
  tag2: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm: MentorForm = {
  name: '',
  title: '',
  description: '',
  experience: '',
  focus: '',
  imageUrl: '',
  tag1: '',
  tag2: '',
  sortOrder: 0,
  isActive: true,
};

export default function AdminMentors() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MentorForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: mentors, isLoading } = trpc.mentors.getAll.useQuery();

  const createMutation = trpc.mentors.create.useMutation({
    onSuccess: () => {
      toast.success('Mentor added successfully!');
      utils.mentors.getAll.invalidate();
      closeModal();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.mentors.update.useMutation({
    onSuccess: () => {
      toast.success('Mentor updated successfully!');
      utils.mentors.getAll.invalidate();
      closeModal();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.mentors.delete.useMutation({
    onSuccess: () => {
      toast.success('Mentor deleted successfully!');
      utils.mentors.getAll.invalidate();
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
    setForm({ ...emptyForm, sortOrder: (mentors?.length ?? 0) + 1 });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (mentor: any) => {
    setForm({
      name: mentor.name,
      title: mentor.title,
      description: mentor.description || '',
      experience: mentor.experience || '',
      focus: mentor.focus || '',
      imageUrl: mentor.image_url || '',
      tag1: mentor.tag1 || '',
      tag2: mentor.tag2 || '',
      sortOrder: mentor.sort_order ?? 0,
      isActive: mentor.is_active ?? true,
    });
    setEditingId(mentor.id);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.title.trim()) {
      toast.error('Name and Title are required');
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
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Mentors</h1>
            <p className="text-slate-600 text-lg">Manage expert mentors — changes sync to the home page in real-time</p>
          </div>
          <Button onClick={openAdd} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Mentor
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-500 font-medium">Loading mentors...</span>
          </div>
        ) : !mentors?.length ? (
          <Card className="p-12 text-center backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">No mentors yet</h3>
            <p className="text-slate-500 mb-6">Add your first mentor to get started.</p>
            <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Mentor
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className={`group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl ${!mentor.is_active ? 'opacity-60' : ''}`}>
                <div className="flex gap-4 mb-4">
                  <img
                    src={mentor.image_url || '/expert_profile_1_1776280727429.png'}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-2 ring-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-lg truncate">{mentor.name}</h3>
                      {!mentor.is_active && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full shrink-0">Hidden</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{mentor.title}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-2 bg-blue-50 px-3 py-1 rounded-full inline-block">{mentor.experience}</p>
                  </div>
                </div>
                {mentor.description && (
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{mentor.description}</p>
                )}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {mentor.tag1 && (
                    <span className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">{mentor.tag1}</span>
                  )}
                  {mentor.tag2 && (
                    <span className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium border border-indigo-100">{mentor.tag2}</span>
                  )}
                  {mentor.focus && (
                    <span className="text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full font-medium border border-slate-100">{mentor.focus}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(mentor)} className="border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 shadow-md rounded-xl">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {deleteConfirm === mentor.id ? (
                    <div className="flex gap-1.5 items-center">
                      <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate({ id: mentor.id })} disabled={deleteMutation.isPending}
                        className="border-red-300 bg-red-100 text-red-700 hover:bg-red-200 shadow-md rounded-xl text-xs font-bold">
                        {deleteMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)} className="rounded-xl text-xs">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setDeleteConfirm(mentor.id)}
                      className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Edit Mentor' : 'Add New Mentor'}
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
                    placeholder="e.g. Priya Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Title *</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Curriculum Specialist"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="A brief bio about this mentor..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Experience</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 10+ Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Focus Area</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.focus}
                    onChange={(e) => setForm({ ...form, focus: e.target.value })}
                    placeholder="e.g. Curriculum Design"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/expert_profile_1.png or https://..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Tag 1</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.tag1}
                    onChange={(e) => setForm({ ...form, tag1: e.target.value })}
                    placeholder="e.g. Lesson Planning"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Tag 2</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.tag2}
                    onChange={(e) => setForm({ ...form, tag2: e.target.value })}
                    placeholder="e.g. Engagement"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Sort Order</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-end pb-1">
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
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-3xl">
              <Button variant="outline" onClick={closeModal} className="rounded-xl px-6">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSaving}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/20">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingId ? 'Update Mentor' : 'Add Mentor'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
