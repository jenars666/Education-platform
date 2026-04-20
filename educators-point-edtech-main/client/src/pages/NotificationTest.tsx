import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { trpc } from '@/lib/trpc';

export default function NotificationTest() {
  const [logs, setLogs] = useState<string[]>([]);
  const [realtimeStatus, setRealtimeStatus] = useState('Not connected');

  const { data: count, refetch: refetchCount } = trpc.enrollment.getUnreadCount.useQuery();
  const { data: recent, refetch: refetchRecent } = trpc.enrollment.getRecent.useQuery({ limit: 5 });

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  useEffect(() => {
    if (!supabase) {
      addLog('❌ Supabase client not available');
      return;
    }

    addLog('🔌 Connecting to Supabase Realtime...');

    const channel = supabase
      .channel('test-enrollments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments'
        },
        (payload) => {
          addLog(`🔔 Realtime event: ${payload.eventType}`);
          addLog(`📧 Data: ${JSON.stringify(payload.new || payload.old).substring(0, 100)}`);
          refetchCount();
          refetchRecent();
        }
      )
      .subscribe((status) => {
        setRealtimeStatus(status);
        if (status === 'SUBSCRIBED') {
          addLog('✅ Successfully subscribed to realtime');
        } else if (status === 'CHANNEL_ERROR') {
          addLog('❌ Error subscribing to realtime');
        } else {
          addLog(`📡 Status: ${status}`);
        }
      });

    return () => {
      addLog('🔌 Disconnecting...');
      supabase.removeChannel(channel);
    };
  }, [refetchCount, refetchRecent]);

  const checkDatabase = async () => {
    addLog('🔍 Checking database...');
    try {
      const { data, error, count: totalCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact' });

      if (error) {
        addLog(`❌ Error: ${error.message}`);
        return;
      }

      addLog(`📊 Total enrollments: ${totalCount}`);
      const pending = data?.filter(e => e.status === 'pending');
      addLog(`⏳ Pending enrollments: ${pending?.length || 0}`);
      
      if (pending && pending.length > 0) {
        addLog(`📋 Sample: ${pending[0].name} (${pending[0].email})`);
      }
    } catch (err) {
      addLog(`❌ Exception: ${err}`);
    }
  };

  const insertTestEnrollment = async () => {
    addLog('➕ Inserting test enrollment...');
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          name: `Test User ${Date.now()}`,
          email: `test${Date.now()}@example.com`,
          mobile_no: '1234567890',
          batch: 'Test Batch',
          batch_start_date: '2024-01-01',
          batch_end_date: '2024-03-01',
          price: 5000,
          status: 'pending',
          email_sent: 0,
          date_of_birth: '1990-01-01',
          state: 'Test State',
          district: 'Test District',
          place: 'Test Place',
          current_status: 'Student'
        })
        .select();

      if (error) {
        addLog(`❌ Error: ${error.message}`);
      } else {
        addLog(`✅ Inserted: ${data[0].name}`);
        addLog(`🔔 Watch for realtime notification!`);
      }
    } catch (err) {
      addLog(`❌ Exception: ${err}`);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Notification System Test</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <p><strong>Realtime:</strong> <span className={realtimeStatus === 'SUBSCRIBED' ? 'text-green-600' : 'text-orange-600'}>{realtimeStatus}</span></p>
            <p><strong>Pending Count:</strong> {count ?? 'Loading...'}</p>
            <p><strong>Recent Enrollments:</strong> {recent?.length ?? 0}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-2">
            <Button onClick={checkDatabase} className="w-full">
              Check Database
            </Button>
            <Button onClick={insertTestEnrollment} className="w-full bg-green-600 hover:bg-green-700">
              Insert Test Enrollment
            </Button>
            <Button onClick={() => { refetchCount(); refetchRecent(); addLog('🔄 Manually refreshed'); }} className="w-full bg-blue-600 hover:bg-blue-700">
              Refresh Data
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
        {recent && recent.length > 0 ? (
          <div className="space-y-2">
            {recent.map((enrollment: any) => (
              <div key={enrollment.id} className="p-3 bg-gray-50 rounded border">
                <p className="font-semibold">{enrollment.name}</p>
                <p className="text-sm text-gray-600">{enrollment.email}</p>
                <p className="text-xs text-gray-500">{enrollment.batch} - {new Date(enrollment.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No pending enrollments</p>
        )}
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Console Logs</h2>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p>No logs yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))
          )}
        </div>
        <Button onClick={() => setLogs([])} className="mt-2" variant="outline">
          Clear Logs
        </Button>
      </Card>
    </div>
  );
}
