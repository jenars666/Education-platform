import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  LogOut, 
  User, 
  Moon, 
  Sun,
  Menu,
  X,
  ChevronRight,
  Home,
  MessageSquare
} from 'lucide-react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export default function AdminLayout({ 
  children,
  userName = "Admin User", 
  userEmail = "admin@educatorspoint.com",
  userAvatar 
}: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications] = useState(3);

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

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`hidden lg:flex flex-col backdrop-blur-2xl bg-white/80 border-r border-white/20 shadow-2xl shadow-blue-500/10 transition-all duration-300 ${
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
                <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!isSidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full backdrop-blur-xl bg-white/60 border-white/40 rounded-xl shadow-md"
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
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
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
                className={`w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start'} h-14 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md transition-all duration-300`}
              >
                <Avatar className="w-9 h-9 ring-2 ring-white shadow-lg">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {!isSidebarCollapsed && (
                  <div className="flex-1 text-left ml-3">
                    <p className="text-sm font-semibold text-slate-800">{userName}</p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="right"
              align="end" 
              className="w-56 backdrop-blur-2xl bg-white/90 border-white/40 shadow-2xl rounded-2xl p-2"
            >
              <DropdownMenuLabel className="text-slate-700">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-slate-500 font-normal">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                <Settings className="w-4 h-4 mr-2 text-blue-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-red-50 text-red-600 transition-colors">
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
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 backdrop-blur-2xl bg-white/90 border-r border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ${
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
              <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full backdrop-blur-xl bg-white/60 border-white/40 rounded-xl shadow-md"
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
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
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
        <header className="backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5 z-30">
          <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
            {/* Mobile Menu Button & Breadcrumb */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </Button>

              {/* Collapse Button for Desktop */}
              {isSidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="hidden lg:flex w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </Button>
              )}

              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-slate-400" />
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">
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
                onClick={() => setIsDark(!isDark)}
                className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Settings - Desktop Only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
              >
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50">
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
