import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import AdminLayout from '@/components/AdminLayout';

interface Enrollment {
  id: number;
  name: string;
  email: string;
  mobile_no: string | null;
  state: string | null;
  district: string | null;
  place: string | null;
  batch: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export default function AdminEnrollments() {
  const {
    data: enrollmentData = [],
    isLoading: isEnrollmentsLoading,
    refetch: refetchEnrollments,
  } = trpc.enrollment.getAll.useQuery(undefined, {
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  const enrollments = enrollmentData as Enrollment[];

  const updateEnrollmentStatus = trpc.enrollment.updateStatus.useMutation({
    onSuccess: () => {
      refetchEnrollments();
    },
  });

  const handleCancelEnrollment = (id: number) => {
    updateEnrollmentStatus.mutate({
      id,
      status: 'cancelled',
    });
  };

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Enrollments</h1>
            <p className="text-slate-600 text-lg">Manage student enrollments and batches</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Enrollment
          </Button>
        </div>

        <div className="space-y-4">
          {isEnrollmentsLoading && (
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl">
              <p className="text-sm text-slate-500">Loading enrollments...</p>
            </Card>
          )}

          {!isEnrollmentsLoading && enrollments.length === 0 && (
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl">
              <p className="text-sm text-slate-500">No enrollments found yet.</p>
            </Card>
          )}

          {!isEnrollmentsLoading && enrollments.map((enrollment) => (
            <Card key={enrollment.id} className="group p-6 backdrop-blur-xl bg-white/70 border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">{enrollment.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{enrollment.email}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Mobile: {enrollment.mobile_no || '-'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    State: {enrollment.state || '-'} | District: {enrollment.district || '-'} | Place: {enrollment.place || '-'}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Enrolled on {new Date(enrollment.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <span className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-1.5 rounded-full font-medium border border-blue-100">{enrollment.batch}</span>
                    <span className={`text-xs px-4 py-1.5 rounded-full font-medium ${
                      enrollment.status === 'confirmed'
                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-100'
                        : enrollment.status === 'cancelled'
                          ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-100'
                          : 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-100'
                    }`}>
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 shadow-md rounded-xl"
                    onClick={() => updateEnrollmentStatus.mutate({ id: enrollment.id, status: 'confirmed' })}
                    disabled={updateEnrollmentStatus.isPending || enrollment.status === 'confirmed'}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-md rounded-xl"
                    onClick={() => handleCancelEnrollment(enrollment.id)}
                    disabled={updateEnrollmentStatus.isPending || enrollment.status === 'cancelled'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
