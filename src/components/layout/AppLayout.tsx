import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Mail, 
  Settings, 
  Menu, 
  X, 
  MessageSquare,
  FileSliders,
  Bell
} from 'lucide-react';
import Logo from '../common/Logo';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
};

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span className="font-medium">{label}</span>
  </Link>
);

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            to="/dashboard"
            isActive={isActivePath('/dashboard')}
          />
          <SidebarItem
            icon={<Home size={20} />}
            label="Home"
            to="/home"
            isActive={isActivePath('/home')}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Email Threads"
            to="/email-thread"
            isActive={isActivePath('/email-thread')}
          />
          <SidebarItem
            icon={<Mail size={20} />}
            label="Bulk Email"
            to="/bulk-email"
            isActive={isActivePath('/bulk-email')}
          />
          <SidebarItem
            icon={<FileSliders size={20} />}
            label="Rule Setup"
            to="/rule-setup"
            isActive={isActivePath('/rule')}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
            isActive={isActivePath('/settings')}
          />
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform transform md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <Logo />
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            to="/dashboard"
            isActive={isActivePath('/dashboard')}
          />
          <SidebarItem
            icon={<Home size={20} />}
            label="Home"
            to="/home"
            isActive={isActivePath('/home')}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Email Threads"
            to="/email-thread"
            isActive={isActivePath('/email-thread')}
          />
          <SidebarItem
            icon={<Mail size={20} />}
            label="Bulk Email"
            to="/bulk-email"
            isActive={isActivePath('/bulk-email')}
          />
          <SidebarItem
            icon={<FileSliders size={20} />}
            label="Rule Setup"
            to="/rule-setup"
            isActive={isActivePath('/rule')}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
            isActive={isActivePath('/settings')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  alt="User"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Sarah Johnson</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;