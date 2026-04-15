import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Target, Phone, Mail, Trash2, Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  source: string;
  status: string;
  leadScore: number;
  createdAt: Date;
}

export default function AdminCRMDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch all leads
  const { data: leads = [], isLoading: leadsLoading, refetch: refetchLeads } = trpc.crm.getAll.useQuery({});

  // Fetch CRM statistics
  const { data: stats } = trpc.crm.getStats.useQuery();

  // Delete lead mutation
  const deleteLead = trpc.crm.delete.useMutation({
    onSuccess: () => {
      toast.success("Lead deleted successfully!");
      refetchLeads();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete lead");
    },
  });

  // Update lead status mutation
  const updateLeadStatus = trpc.crm.update.useMutation({
    onSuccess: () => {
      toast.success("Lead status updated!");
      refetchLeads();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update lead");
    },
  });

  const statCards = [
    { icon: Users, label: "Total Leads", value: stats?.totalLeads || 0, change: "+5 this week" },
    { icon: Target, label: "Qualified Leads", value: stats?.qualifiedLeads || 0, change: "+2 this week" },
    { icon: TrendingUp, label: "Avg Lead Score", value: stats?.avgLeadScore || 0, change: "+8 points" },
  ];

  const filteredLeads = (leads as Lead[]).filter(lead => {
    const matchesSearch = lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: number, newStatus: string) => {
    updateLeadStatus.mutate({
      id: leadId,
      status: newStatus as any,
    });
  };

  const handleDelete = (leadId: number) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      deleteLead.mutate({ id: leadId });
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "new": return "bg-gray-100 text-gray-800";
      case "contacted": return "bg-blue-100 text-blue-800";
      case "interested": return "bg-yellow-100 text-yellow-800";
      case "qualified": return "bg-green-100 text-green-800";
      case "enrolled": return "bg-purple-100 text-purple-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">CRM Lead Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage and track potential students</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-2">{stat.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">{stat.value}</p>
                      <p className="text-emerald-600 text-sm mt-2 font-semibold">{stat.change}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 backdrop-blur-xl bg-white/70 border-white/40 shadow-lg rounded-xl"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 backdrop-blur-xl bg-white/70 border-white/40 shadow-lg rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
          {leadsLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => (
                      <tr key={lead.id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-800">{lead.firstName} {lead.lastName || ""}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{new Date(lead.createdAt).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-600">
                              <Mail className="w-4 h-4 mr-2 text-blue-500" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center text-sm text-slate-600">
                                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                                {lead.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700 capitalize bg-slate-100 px-3 py-1 rounded-full">{lead.source}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Select 
                            value={lead.status} 
                            onValueChange={(newStatus) => handleStatusChange(lead.id, newStatus)}
                          >
                            <SelectTrigger className={`w-32 rounded-xl shadow-md ${getStatusColor(lead.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="interested">Interested</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="enrolled">Enrolled</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${lead.leadScore}%` }}
                              />
                            </div>
                            <span className="ml-3 text-sm font-bold text-slate-800">{lead.leadScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled className="rounded-xl shadow-md">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(lead.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 border-red-200 bg-red-50 hover:bg-red-100 rounded-xl shadow-md"
                              disabled={deleteLead.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}
