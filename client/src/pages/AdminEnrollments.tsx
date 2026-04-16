import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Download, PhoneOff, RefreshCw, Search, XCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

interface Enrollment {
  id: number;
  name: string;
  email: string;
  mobile_no: string | null;
  gender: string | null;
  date_of_birth: string | null;
  state: string | null;
  district: string | null;
  place: string | null;
  current_status: string | null;
  batch: string;
  batch_start_date: string | null;
  batch_end_date: string | null;
  price: number | null;
  created_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'not_reachable';
}

const ROWS_PER_PAGE = 15;

const TIME_BLOCKS = [
  "12 AM - 2 AM", "2 AM - 4 AM", "4 AM - 6 AM", "6 AM - 8 AM", 
  "8 AM - 10 AM", "10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", 
  "4 PM - 6 PM", "6 PM - 8 PM", "8 PM - 10 PM", "10 PM - 12 AM"
];

function getTwoHourBlock(dateStr: string) {
  const hour = new Date(dateStr).getHours();
  const startHour = hour % 2 === 0 ? hour : hour - 1;
  return TIME_BLOCKS[startHour / 2];
}

export default function AdminEnrollments() {
  const utils = trpc.useUtils();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Enrollment['status']>('all');
  const [batchFilter, setBatchFilter] = useState<'all' | string>('all');
  
  // Table Column Dropdown Filters
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [timingFilter, setTimingFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: enrollmentData = [],
    isLoading: isEnrollmentsLoading,
    refetch: refetchEnrollments,
  } = trpc.enrollment.getAll.useQuery(undefined, {
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  const enrollments = enrollmentData as Enrollment[];

  const availableBatches = useMemo(() => {
    const batches = new Set<string>();
    enrollments.forEach((item) => {
      if (item.batch) batches.add(item.batch);
    });
    return ['all', ...Array.from(batches).sort()];
  }, [enrollments]);

  // Unique values for the 4 column filters
  const availableStates = useMemo(() => {
    const states = enrollments.map(e => e.state).filter(Boolean) as string[];
    return Array.from(new Set(states)).sort();
  }, [enrollments]);

  const availableDistricts = useMemo(() => {
    const districts = enrollments.map(e => e.district).filter(Boolean) as string[];
    return Array.from(new Set(districts)).sort();
  }, [enrollments]);

  const availableDates = useMemo(() => {
    const dates = enrollments.map(e => new Date(e.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }));
    return Array.from(new Set(dates)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [enrollments]);

  const availableTimings = useMemo(() => {
    const usedBlocks = new Set(enrollments.map(e => getTwoHourBlock(e.created_at)));
    return TIME_BLOCKS.filter(block => usedBlocks.has(block));
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return enrollments
      .filter((item) => {
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        if (batchFilter !== 'all' && item.batch !== batchFilter) return false;
        
        if (stateFilter !== 'all' && item.state !== stateFilter) return false;
        if (districtFilter !== 'all' && item.district !== districtFilter) return false;

        const itemDate = new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        if (dateFilter !== 'all' && itemDate !== dateFilter) return false;

        if (timingFilter !== 'all' && getTwoHourBlock(item.created_at) !== timingFilter) return false;

        if (!query) return true;

        const haystack = [
          item.name,
          item.email,
          item.mobile_no ?? '',
          item.state ?? '',
          item.district ?? '',
          item.place ?? '',
          item.batch,
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(query);
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [batchFilter, enrollments, searchTerm, statusFilter, stateFilter, districtFilter, dateFilter, timingFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredEnrollments.length / ROWS_PER_PAGE));
  const paginatedEnrollments = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredEnrollments.slice(start, start + ROWS_PER_PAGE);
  }, [filteredEnrollments, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, batchFilter, stateFilter, districtFilter, dateFilter, timingFilter]);

  const stats = useMemo(() => {
    const total = enrollments.length;
    const confirmed = enrollments.filter((e) => e.status === 'confirmed').length;
    const pending = enrollments.filter((e) => e.status === 'pending').length;
    const cancelled = enrollments.filter((e) => e.status === 'cancelled').length;
    const notReachable = enrollments.filter((e) => e.status === 'not_reachable').length;
    return { total, confirmed, pending, cancelled, notReachable };
  }, [enrollments]);

  useEffect(() => {
    const channel = supabase
      .channel('admin-enrollments-page-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments' }, () => {
        void utils.enrollment.getAll.invalidate();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [utils]);

  const updateEnrollmentStatus = trpc.enrollment.updateStatus.useMutation({
    onMutate: async ({ id, status }) => {
      await utils.enrollment.getAll.cancel();
      const previous = utils.enrollment.getAll.getData();

      utils.enrollment.getAll.setData(undefined, (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === id ? { ...item, status } : item
        );
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        utils.enrollment.getAll.setData(undefined, context.previous);
      }
    },
    onSuccess: () => {
      void utils.enrollment.getAll.invalidate();
    },
    onSettled: () => {
      void refetchEnrollments();
    },
  });

  const handleStatusUpdate = (id: number, status: Enrollment['status']) => {
    updateEnrollmentStatus.mutate({ id, status });
  };

  const handleExport = () => {
    const exportRows = filteredEnrollments.map((item, idx) => ({
      'S.No': idx + 1,
      ID: item.id,
      Name: item.name,
      Email: item.email,
      Mobile: item.mobile_no ?? '',
      Gender: item.gender ?? '',
      'Date of Birth': item.date_of_birth ?? '',
      State: item.state ?? '',
      District: item.district ?? '',
      Place: item.place ?? '',
      'Current Status': item.current_status ?? '',
      Batch: item.batch,
      'Batch Start': item.batch_start_date ?? '',
      'Batch End': item.batch_end_date ?? '',
      Price: item.price ?? '',
      Status: item.status,
      'Enrolled Date': new Date(item.created_at).toLocaleDateString(),
      'Enrolled Time': new Date(item.created_at).toLocaleTimeString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Enrollments');

    const now = new Date();
    const datePart = now.toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `enrollments-export-${datePart}.xlsx`);
  };

  const getStatusBadge = (status: Enrollment['status']) => {
    const map: Record<Enrollment['status'], { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending' },
      confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Confirmed' },
      completed: { bg: 'bg-sky-100', text: 'text-sky-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      not_reachable: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Not Reachable' },
    };
    const s = map[status] || map.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    );
  };

  const getRowBgClass = (status: Enrollment['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50/40';
      case 'cancelled': return 'bg-red-50/40';
      case 'not_reachable': return 'bg-orange-50/40';
      case 'completed': return 'bg-sky-50/40';
      default: return 'bg-white';
    }
  };

  // Helper renderer for column headers with dropdown filters
  const renderColumnFilter = (
    label: string,
    value: string,
    options: string[],
    onChange: (val: string) => void
  ) => (
    <div className="flex flex-col gap-1.5 min-w-[110px]">
      <span className="flex items-center gap-1 leading-none">
        {label}
        {value !== 'all' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-1" />}
      </span>
      <div className="relative font-normal normal-case">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-[11px] px-2 py-1 pr-6 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="all">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Filter className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
      </div>
    </div>
  );

  return (
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              Enrollments
            </h1>
            <p className="text-slate-500 text-sm">Manage student enrollments &amp; applications</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExport}
              disabled={isEnrollmentsLoading || filteredEnrollments.length === 0}
              className="bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 shadow-sm rounded-xl text-sm h-9 px-4"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export Excel
            </Button>

            <Button
              onClick={() => refetchEnrollments()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 rounded-xl text-sm h-9 px-4"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          <Card className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{stats.total}</p>
          </Card>
          <Card className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Confirmed</p>
            <p className="text-2xl font-black text-emerald-700 mt-0.5">{stats.confirmed}</p>
          </Card>
          <Card className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Pending</p>
            <p className="text-2xl font-black text-amber-700 mt-0.5">{stats.pending}</p>
          </Card>
          <Card className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl">
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Cancelled</p>
            <p className="text-2xl font-black text-red-700 mt-0.5">{stats.cancelled}</p>
          </Card>
          <Card className="p-3.5 bg-orange-50/60 border border-orange-200 rounded-xl">
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Not Reachable</p>
            <p className="text-2xl font-black text-orange-700 mt-0.5">{stats.notReachable}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-3 bg-white border border-slate-200 rounded-xl mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, mobile, location..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Enrollment['status'])}
              aria-label="Filter enrollments by status"
              title="Filter enrollments by status"
              className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="not_reachable">Not Reachable</option>
            </select>

            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              aria-label="Filter enrollments by batch"
              title="Filter enrollments by batch"
              className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
            >
              {availableBatches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch === 'all' ? 'All Batches' : batch}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Excel-Style Table */}
        <Card className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm align-top" style={{ minWidth: '1200px' }}>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">S.No</th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Name</th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Email</th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Mobile</th>
                  <th className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700 align-top">
                    {renderColumnFilter('State', stateFilter, availableStates, setStateFilter)}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700 align-top">
                    {renderColumnFilter('District', districtFilter, availableDistricts, setDistrictFilter)}
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Place</th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Batch</th>
                  <th className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700 align-top">
                    {renderColumnFilter('Enrolled', dateFilter, availableDates, setDateFilter)}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700 align-top">
                    {renderColumnFilter('Timing', timingFilter, availableTimings, setTimingFilter)}
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap border-r border-slate-700">Status</th>
                  <th className="px-3 py-3 text-center font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isEnrollmentsLoading && (
                  <tr>
                    <td colSpan={12} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Loading enrollments...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {!isEnrollmentsLoading && filteredEnrollments.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-6 py-12 text-center text-slate-400">
                      No enrollments match the current filters.
                    </td>
                  </tr>
                )}

                {!isEnrollmentsLoading && paginatedEnrollments.map((enrollment, idx) => {
                  const globalIndex = (currentPage - 1) * ROWS_PER_PAGE + idx + 1;
                  return (
                    <tr
                      key={enrollment.id}
                      className={`border-b border-slate-100 hover:bg-blue-50/40 transition-colors duration-150 ${getRowBgClass(enrollment.status)}`}
                    >
                      {/* S.No */}
                      <td className="px-3 py-2.5 text-slate-500 font-mono text-xs border-r border-slate-100 text-center">
                        {globalIndex}
                      </td>

                      {/* Name */}
                      <td className="px-3 py-2.5 border-r border-slate-100">
                        <span className="font-semibold text-slate-800 whitespace-nowrap">{enrollment.name}</span>
                      </td>

                      {/* Email */}
                      <td className="px-3 py-2.5 border-r border-slate-100">
                        <span className="text-slate-600 text-xs">{enrollment.email}</span>
                      </td>

                      {/* Mobile */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-700 font-mono text-xs">{enrollment.mobile_no || '—'}</span>
                      </td>

                      {/* State */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-600 text-xs">{enrollment.state || '—'}</span>
                      </td>

                      {/* District */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-600 text-xs">{enrollment.district || '—'}</span>
                      </td>

                      {/* Place */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-600 text-xs">{enrollment.place || '—'}</span>
                      </td>

                      {/* Batch */}
                      <td className="px-3 py-2.5 border-r border-slate-100">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100 whitespace-nowrap">
                          {enrollment.batch}
                        </span>
                      </td>

                      {/* Enrolled Date */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-500 text-xs">
                          {new Date(enrollment.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* Enrolled Time (Timing) */}
                      <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-slate-500 text-xs">
                          {new Date(enrollment.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-2.5 border-r border-slate-100">
                        {getStatusBadge(enrollment.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Confirm Button */}
                          <Button
                            size="sm"
                            className={`h-7 px-2.5 text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 ${
                              enrollment.status === 'confirmed'
                                ? 'bg-emerald-200 text-emerald-800 cursor-not-allowed opacity-60'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md'
                            }`}
                            onClick={() => handleStatusUpdate(enrollment.id, 'confirmed')}
                            disabled={updateEnrollmentStatus.isPending || enrollment.status === 'confirmed'}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Confirm
                          </Button>

                          {/* Cancel Button */}
                          <Button
                            size="sm"
                            className={`h-7 px-2.5 text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 ${
                              enrollment.status === 'cancelled'
                                ? 'bg-red-200 text-red-800 cursor-not-allowed opacity-60'
                                : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-md'
                            }`}
                            onClick={() => handleStatusUpdate(enrollment.id, 'cancelled')}
                            disabled={updateEnrollmentStatus.isPending || enrollment.status === 'cancelled'}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Cancel
                          </Button>

                          {/* Not Reachable Button */}
                          <Button
                            size="sm"
                            className={`h-7 px-2.5 text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 ${
                              enrollment.status === 'not_reachable'
                                ? 'bg-orange-200 text-orange-800 cursor-not-allowed opacity-60'
                                : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md'
                            }`}
                            onClick={() => handleStatusUpdate(enrollment.id, 'not_reachable')}
                            disabled={updateEnrollmentStatus.isPending || enrollment.status === 'not_reachable'}
                          >
                            <PhoneOff className="w-3.5 h-3.5 mr-1" />
                            Not Reachable
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!isEnrollmentsLoading && filteredEnrollments.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * ROWS_PER_PAGE + 1}</span>
                {' '}–{' '}
                <span className="font-semibold text-slate-700">
                  {Math.min(currentPage * ROWS_PER_PAGE, filteredEnrollments.length)}
                </span>
                {' '}of{' '}
                <span className="font-semibold text-slate-700">{filteredEnrollments.length}</span> enrollments
              </p>

              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 rounded-lg border-slate-200"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, idx, arr) => {
                    const showEllipsisBefore = idx > 0 && page - arr[idx - 1] > 1;
                    return (
                      <span key={page} className="flex items-center">
                        {showEllipsisBefore && (
                          <span className="px-1 text-slate-400 text-xs">…</span>
                        )}
                        <Button
                          size="sm"
                          variant={page === currentPage ? 'default' : 'outline'}
                          className={`h-7 w-7 p-0 rounded-lg text-xs font-semibold ${
                            page === currentPage
                              ? 'bg-slate-900 text-white'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      </span>
                    );
                  })}

                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 rounded-lg border-slate-200"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
