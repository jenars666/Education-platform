import { useEffect, useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Users, 
  Bell, 
  Search, 
  Settings, 
  LogOut, User, Moon, Sun, Menu, X, ChevronRight, Home, MessageSquare, Loader2 
} from 'lucide-react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
  userAvatar?: string;
  userName?: string;
  userEmail?: string;
}

export default function AdminLayout({ 
  children,
  userAvatar,
  userName: userNameProp,
  userEmail: userEmailProp,
}: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState<string>('');
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<Array<{
    id: number;
    name: string;
    created_at: string;
  }>>([]);
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const NOTIFICATION_LAST_SEEN_KEY = 'admin_last_seen_enrollment_notification_at';

  const playNotificationSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(900, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(680, context.currentTime + 0.14);

      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.16);
      oscillator.onended = () => {
        void context.close();
      };
    } catch {
      // Ignore autoplay/audio capability restrictions.
    }
  };

  const loadRecentNotifications = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select('id,name,created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentNotifications((data ?? []) as Array<{ id: number; name: string; created_at: string }>);
  };

  const loadUnreadNotificationCount = async (seenAt: string) => {
    const { count } = await supabase
      .from('enrollments')
      .select('id', { count: 'exact', head: true })
      .gt('created_at', seenAt);

    setNotifications(count ?? 0);
  };

  const markNotificationsAsRead = () => {
    const nowIso = new Date().toISOString();
    localStorage.setItem(NOTIFICATION_LAST_SEEN_KEY, nowIso);
    setLastSeenAt(nowIso);
    setNotifications(0);
  };

  useEffect(() => {
    const storedSeenAt = localStorage.getItem(NOTIFICATION_LAST_SEEN_KEY);
    if (storedSeenAt) {
      setLastSeenAt(storedSeenAt);
      void Promise.all([loadRecentNotifications(), loadUnreadNotificationCount(storedSeenAt)]);
      return;
    }

    const initialSeenAt = new Date().toISOString();
    localStorage.setItem(NOTIFICATION_LAST_SEEN_KEY, initialSeenAt);
    setLastSeenAt(initialSeenAt);
    void loadRecentNotifications();
  }, []);

  useEffect(() => {
    if (isNotificationsOpen) {
      markNotificationsAsRead();
    }
  }, [isNotificationsOpen]);

  useEffect(() => {
    if (!lastSeenAt) return;

    const channel = supabase
      .channel('admin-layout-notifications-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'enrollments' }, (payload) => {
        const incoming = payload.new as { id: number; name: string; created_at: string };
        setRecentNotifications((prev) => [incoming, ...prev.filter((p) => p.id !== incoming.id)].slice(0, 5));

        if (isNotificationsOpen) {
          const seenAt = incoming.created_at || new Date().toISOString();
          localStorage.setItem(NOTIFICATION_LAST_SEEN_KEY, seenAt);
          setLastSeenAt(seenAt);
          setNotifications(0);
          return;
        }

        setNotifications((prev) => prev + 1);
        playNotificationSound();
        toast.success('New enrollment received', {
          description: `${incoming.name} just submitted an enrollment form.`,
        });
      })
      .subscribe((status) => {
        setIsRealtimeConnected(status === 'SUBSCRIBED');
      });

    return () => {
      setIsRealtimeConnected(false);
      void supabase.removeChannel(channel);
    };
  }, [isNotificationsOpen, lastSeenAt]);

  useEffect(() => {
    if (!lastSeenAt) return;
    void loadUnreadNotificationCount(lastSeenAt);
  }, [lastSeenAt]);

  useEffect(() => {
    void loadRecentNotifications();
  }, [location]);

  useEffect(() => {
    const syncNotifications = async () => {
      if (!lastSeenAt) return;
      await Promise.all([loadRecentNotifications(), loadUnreadNotificationCount(lastSeenAt)]);
    };

    void syncNotifications();
  }, [lastSeenAt]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && lastSeenAt) {
        void Promise.all([loadRecentNotifications(), loadUnreadNotificationCount(lastSeenAt)]);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [lastSeenAt]);

  useEffect(() => {
    if (!lastSeenAt) return;

    const intervalMs = isRealtimeConnected ? 7000 : 3000;
    const intervalId = window.setInterval(() => {
      void Promise.all([loadRecentNotifications(), loadUnreadNotificationCount(lastSeenAt)]);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRealtimeConnected, lastSeenAt]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === NOTIFICATION_LAST_SEEN_KEY && event.newValue) {
        setLastSeenAt(event.newValue);
      }
    };

    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setLocation('/admin/login');
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setLocation('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [setLocation]);

  const logout = async () => {
    await supabase.auth.signOut();
    setLocation('/admin/login');
  };

  const userName = userNameProp || user?.user_metadata?.full_name || "Admin User";
  const userEmail = userEmailProp || user?.email || "admin@educatorspoint.com";

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', active: location === '/admin' },
    { icon: Users, label: 'Enrollments', path: '/admin/enrollments', active: location === '/admin/enrollments' },
    { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics', active: location === '/admin/analytics' },
    { icon: Calendar, label: 'Calendar', path: '/admin/calendar', active: location === '/admin/calendar' },
    { icon: Users, label: 'Mentors', path: '/admin/mentors', active: location === '/admin/mentors' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews', active: location === '/admin/reviews' },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
    setIsMobileSidebarOpen(false);
  };

  if (loading || !user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 transition-colors duration-500">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-slate-500 dark:text-slate-300 font-medium">Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className="admin-shell flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden transition-colors duration-500">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`hidden lg:flex flex-col backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border-r border-white/20 dark:border-slate-800 shadow-2xl shadow-blue-500/10 dark:shadow-black/30 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">EP</span>
              </div>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1">
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Educators Point
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!isSidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <Input
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border-white/40 dark:border-slate-800 rounded-xl shadow-md text-slate-700 dark:text-slate-100"
              />
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={item.path}
              >
                <Button
                  variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start'} h-12 rounded-xl transition-all duration-300 ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-5 h-5 ${!isSidebarCollapsed && 'mr-3'}`} />
                {!isSidebarCollapsed && <span className="font-medium flex-1 text-left">{item.label}</span>}
                {!isSidebarCollapsed && item.active && (
                  <ChevronRight className="w-4 h-4" />
                )}
                </Button>
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start'} h-14 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md transition-all duration-300`}
              >
                <Avatar className="w-9 h-9 ring-2 ring-white shadow-lg">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold">
                    {userName.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {!isSidebarCollapsed && (
                  <div className="flex-1 text-left ml-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="right"
              align="end" 
              className="w-56 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/95 border-white/40 dark:border-slate-800 shadow-2xl rounded-2xl p-2"
            >
              <DropdownMenuLabel className="text-slate-700 dark:text-slate-200">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                <Settings className="w-4 h-4 mr-2 text-blue-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem 
                onClick={() => logout()}
                className="rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
               >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/95 border-r border-white/20 dark:border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Logo Section */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-xl">EP</span>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Educators Point
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="rounded-xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border-white/40 dark:border-slate-800 rounded-xl shadow-md text-slate-700 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium flex-1 text-left">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-800 shadow-lg shadow-blue-500/5 dark:shadow-black/20 z-30 transition-colors duration-500">
          <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
            {/* Mobile Menu Button & Breadcrumb */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md"
              >
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </Button>

              {/* Collapse Button for Desktop */}
              {isSidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="hidden lg:flex w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md"
                >
                  <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </Button>
              )}

              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {navItems.find(item => item.active)?.label || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleTheme?.()}
                className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </Button>

              {/* Notifications */}
              <DropdownMenu onOpenChange={setIsNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md"
                  >
                    <Bell className={`w-5 h-5 text-slate-600 dark:text-slate-300 ${notifications > 0 ? 'animate-pulse' : ''}`} />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center px-1.5 bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white text-xs">
                        {notifications > 99 ? '99+' : notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border-white/40 dark:border-slate-800 shadow-2xl rounded-2xl p-2"
                >
                  <DropdownMenuLabel className="text-slate-800 dark:text-slate-100">New Enrollments</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  {recentNotifications.length === 0 ? (
                    <DropdownMenuItem disabled className="rounded-xl text-slate-500 dark:text-slate-400">
                      No recent enrollments
                    </DropdownMenuItem>
                  ) : (
                    recentNotifications.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => setLocation('/admin/enrollments')}
                        className="rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[180px]">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  <DropdownMenuItem
                    onClick={() => setLocation('/admin/enrollments')}
                    className="rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 text-blue-700 dark:text-blue-300 font-medium"
                  >
                    View all enrollments
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings - Desktop Only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 shadow-md"
              >
                <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50 dark:from-slate-950/40 dark:via-slate-900/30 dark:to-slate-800/40 transition-colors duration-500">
          <div className="p-4 lg:p-6 lg:px-8 max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
