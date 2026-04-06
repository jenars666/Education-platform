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

export default function AdminCalendar() {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar & Events</h1>
            <p className="text-gray-600">Manage batches, webinars, and training schedules</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewEvent} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
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
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    {editingId ? "Update Event" : "Create Event"}
                  </Button>
                  <Button onClick={() => setIsOpen(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map(event => (
            <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">{event.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.startDate} to {event.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.enrolled}/{event.capacity} Enrolled
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(event)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(event.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
