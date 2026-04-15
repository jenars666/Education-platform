import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  seats: number;
  price: number;
  status: 'active' | 'inactive' | 'completed';
}

interface CourseContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
}

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState('modules');
  const [modules, setModules] = useState<Module[]>([
    { id: '1', title: 'Become a Professional Educator', description: 'Develop strong teacher identity', icon: '👨‍🏫', order: 1 },
    { id: '2', title: 'Understand Every Learner', description: 'Apply child psychology', icon: '👶', order: 2 },
    { id: '3', title: 'Teach Across Curricula', description: 'CBSE, Cambridge, IB expertise', icon: '📚', order: 3 },
  ]);

  const [batches, setBatches] = useState<Batch[]>([
    { id: '1', name: 'April 2026', startDate: '2026-04-01', endDate: '2026-05-30', seats: 30, price: 15000, status: 'active' },
    { id: '2', name: 'May 2026', startDate: '2026-05-01', endDate: '2026-06-30', seats: 25, price: 15000, status: 'active' },
    { id: '3', name: 'June 2026', startDate: '2026-06-01', endDate: '2026-07-31', seats: 20, price: 16000, status: 'inactive' },
  ]);

  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showBatchForm, setShowBatchForm] = useState(false);

  const handleSaveModule = () => {
    if (editingModule) {
      setModules(modules.map(m => m.id === editingModule.id ? editingModule : m));
    } else {
      setModules([...modules, { ...editingModule!, id: Date.now().toString() }]);
    }
    setEditingModule(null);
    setShowModuleForm(false);
  };

  const handleSaveBatch = () => {
    if (editingBatch) {
      setBatches(batches.map(b => b.id === editingBatch.id ? editingBatch : b));
    } else {
      setBatches([...batches, { ...editingBatch!, id: Date.now().toString() }]);
    }
    setEditingBatch(null);
    setShowBatchForm(false);
  };

  const handleDeleteModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-[#E0E7FF] p-1 rounded-lg mb-6">
            <TabsTrigger value="modules" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Program Modules</TabsTrigger>
            <TabsTrigger value="batches" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">Batch Management</TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Program Modules</h2>
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white" onClick={() => {
                setEditingModule({ id: '', title: '', description: '', icon: '📚', order: modules.length + 1 });
                setShowModuleForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>

            {/* Module Form */}
            {showModuleForm && editingModule && (
              <Card className="p-6 border border-[#E0E7FF] bg-[#F8FAFC]">
                <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">{editingModule.id ? 'Edit Module' : 'Add New Module'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Module Title</label>
                    <input
                      type="text"
                      value={editingModule.title}
                      onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="e.g., Become a Professional Educator"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Description</label>
                    <textarea
                      value={editingModule.description}
                      onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="Module description"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white" onClick={handleSaveModule}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Module
                    </Button>
                    <Button variant="outline" className="border-[#E0E7FF]" onClick={() => {
                      setShowModuleForm(false);
                      setEditingModule(null);
                    }}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Modules List */}
            <div className="space-y-3">
              {modules.map((module) => (
                <Card key={module.id} className="p-4 border border-[#E0E7FF] hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{module.icon}</span>
                        <div>
                          <h3 className="font-bold text-[#2C2C2C]">{module.title}</h3>
                          <p className="text-sm text-[#7A7A7A]">{module.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#E0E7FF]" onClick={() => {
                        setEditingModule(module);
                        setShowModuleForm(true);
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#E0E7FF] text-red-600 hover:bg-red-50" onClick={() => handleDeleteModule(module.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Batches Tab */}
          <TabsContent value="batches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Batch Management</h2>
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white" onClick={() => {
                setEditingBatch({ id: '', name: '', startDate: '', endDate: '', seats: 30, price: 15000, status: 'active' });
                setShowBatchForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Batch
              </Button>
            </div>

            {/* Batch Form */}
            {showBatchForm && editingBatch && (
              <Card className="p-6 border border-[#E0E7FF] bg-[#F8FAFC]">
                <h3 className="font-bold text-lg text-[#2C2C2C] mb-4">{editingBatch.id ? 'Edit Batch' : 'Add New Batch'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Batch Name</label>
                    <input
                      type="text"
                      value={editingBatch.name}
                      onChange={(e) => setEditingBatch({ ...editingBatch, name: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="e.g., April 2026"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={editingBatch.price}
                      onChange={(e) => setEditingBatch({ ...editingBatch, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Start Date</label>
                    <input
                      type="date"
                      value={editingBatch.startDate}
                      onChange={(e) => setEditingBatch({ ...editingBatch, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">End Date</label>
                    <input
                      type="date"
                      value={editingBatch.endDate}
                      onChange={(e) => setEditingBatch({ ...editingBatch, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Available Seats</label>
                    <input
                      type="number"
                      value={editingBatch.seats}
                      onChange={(e) => setEditingBatch({ ...editingBatch, seats: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Status</label>
                    <select
                      value={editingBatch.status}
                      onChange={(e) => setEditingBatch({ ...editingBatch, status: e.target.value as 'active' | 'inactive' | 'completed' })}
                      className="w-full px-4 py-2 border border-[#E0E7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white" onClick={handleSaveBatch}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Batch
                  </Button>
                  <Button variant="outline" className="border-[#E0E7FF]" onClick={() => {
                    setShowBatchForm(false);
                    setEditingBatch(null);
                  }}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Batches List */}
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <Card key={batch.id} className="p-6 border border-[#E0E7FF] hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#2C2C2C]">{batch.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full inline-block mt-2 ${
                        batch.status === 'active' ? 'bg-[#D1FAE5] text-[#065F46]' : batch.status === 'completed' ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#E0E7FF]" onClick={() => {
                        setEditingBatch(batch);
                        setShowBatchForm(true);
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#E0E7FF] text-red-600 hover:bg-red-50" onClick={() => handleDeleteBatch(batch.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">Duration:</span>
                      <span className="font-semibold text-[#2C2C2C]">{batch.startDate} to {batch.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">Available Seats:</span>
                      <span className="font-semibold text-[#2C2C2C]">{batch.seats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">Price:</span>
                      <span className="font-semibold text-[#2563EB]">₹{batch.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
