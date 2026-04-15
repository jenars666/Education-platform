import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Plus, Edit2, Trash2, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCalendar() {
  interface Event {
    id: number;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    location: string;
    capacity: number;
    enrolled: number;
  }

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Batch 1 - April 2026",
      type: "batch",
      startDate: "2026-04-15",
      endDate: "2026-06-15",
      location: "Online",
      capacity: 50,
      enrolled: 32,
    },
    {
      id: 2,
      title: "Introduction Webinar",
      type: "webinar",
      startDate: "2026-04-10",
      endDate: "2026-04-10",
      location: "Zoom",
      capacity: 100,
      enrolled: 87,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  interface FormData {
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    location: string;
    capacity: number;
    description: string;
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "batch",
    startDate: "",
    endDate: "",
    location: "",
    capacity: 0,
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.startDate) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editingId) {
      const updatedEvent: Event = { id: editingId, ...formData, enrolled: events.find(e => e.id === editingId)?.enrolled || 0 };
      setEvents(events.map(e => e.id === editingId ? updatedEvent : e));
      toast.success("Event updated successfully!");
    } else {
      const newEvent: Event = { id: Date.now(), ...formData, enrolled: 0 };
      setEvents([...events, newEvent]);
      toast.success("Event created successfully!");
    }

    setFormData({ title: "", type: "batch", startDate: "", endDate: "", location: "", capacity: 0, description: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      capacity: event.capacity,
      description: "",
    });
    setEditingId(event.id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success("Event deleted successfully!");
  };

  const handleNewEvent = () => {
    setFormData({ title: "", type: "batch", startDate: "", endDate: "", location: "", capacity: 0, description: "" });
    setEditingId(null);
    setIsOpen(true);
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-8 flex justify-between items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Calendar & Events</h1>
            <p className="text-slate-600 text-lg">Manage batches, webinars, and training schedules</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleNewEvent} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Event" : "Create New Event"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Batch 1 - April 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="batch">Batch</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="session">Session</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <Input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Online, Zoom, Delhi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                  <Input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                    placeholder="e.g., 50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Event details and description"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-xl">
                    {editingId ? "Update Event" : "Create Event"}
                  </Button>
                  <Button onClick={() => setIsOpen(false)} variant="outline" className="rounded-xl">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Events List */}
        <div className="space-y-4">
          <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: index * 0.1 }}
            >
            <Card className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-2xl shadow-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{event.title}</h3>
                      <p className="text-sm text-slate-500 capitalize mt-1 bg-slate-100 px-3 py-1 rounded-full inline-block">{event.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center text-slate-600 bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-2 rounded-xl">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">
                        {event.startDate} to {event.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600 bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-2 rounded-xl">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="text-sm text-slate-600 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl font-semibold">
                      {event.enrolled}/{event.capacity} Enrolled
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(event)}
                    variant="outline"
                    size="sm"
                    className="border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 shadow-md rounded-xl"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(event.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
