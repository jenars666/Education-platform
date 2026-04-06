import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Target, Phone, Mail, Trash2, Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

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
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CRM Lead Dashboard</h1>
          <p className="text-gray-600">Manage and track potential students</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-green-600 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
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
        <Card className="overflow-hidden">
          {leadsLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{lead.firstName} {lead.lastName || ""}</p>
                            <p className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="w-4 h-4 mr-2" />
                                {lead.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700 capitalize">{lead.source}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Select 
                            value={lead.status} 
                            onValueChange={(newStatus) => handleStatusChange(lead.id, newStatus)}
                          >
                            <SelectTrigger className={`w-32 ${getStatusColor(lead.status)}`}>
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
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${lead.leadScore}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900">{lead.leadScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(lead.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
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
      </div>
    </div>
  );
}
