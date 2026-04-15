import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
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
  ChevronDown
} from 'lucide-react';
import { useLocation } from 'wouter';

interface AdminNavbarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export default function AdminNavbar({ 
  userName = "Admin User", 
  userEmail = "admin@educatorspoint.com",
  userAvatar 
}: AdminNavbarProps) {
  const [location, setLocation] = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', active: location === '/admin' },
    { icon: FileText, label: 'Content', path: '/admin/content', active: location === '/admin/content' },
    { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics', active: location === '/admin/analytics' },
    { icon: Calendar, label: 'Calendar', path: '/admin/calendar', active: location === '/admin/calendar' },
    { icon: Users, label: 'CRM', path: '/admin/crm', active: location === '/admin/crm' },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-lg lg:text-xl">EP</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Educators Point
                </h1>
                <p className="text-xs lg:text-sm text-slate-500 font-medium">Admin Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-xl px-2 py-2 rounded-2xl border border-white/40 shadow-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => handleNavigation(item.path)}
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="font-medium">{item.label}</span>
                    {item.active && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search Bar - Hidden on mobile */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-48 lg:w-64 backdrop-blur-xl bg-white/60 border-white/40 rounded-xl shadow-md focus:w-72 transition-all duration-300"
                />
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="relative w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
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

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md transition-all duration-300"
                  >
                    <Avatar className="w-8 h-8 lg:w-9 lg:h-9 ring-2 ring-white shadow-lg">
                      <AvatarImage src={userAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-slate-800">{userName}</p>
                      <p className="text-xs text-slate-500">Administrator</p>
                    </div>
                    <ChevronDown className="hidden lg:block w-4 h-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
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

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl backdrop-blur-xl bg-white/60 border border-white/40 hover:bg-white/80 shadow-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 backdrop-blur-2xl bg-white/90 shadow-2xl">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full backdrop-blur-xl bg-white/60 border-white/40 rounded-xl shadow-md"
                />
              </div>

              {/* Mobile Nav Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
