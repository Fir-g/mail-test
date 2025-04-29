import { useState } from 'react';
import { User, Mail, Building, Users, Bell, Shield, Database, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'email', label: 'Email', icon: <Mail size={20} /> },
    { id: 'companies', label: 'Companies', icon: <Building size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'data', label: 'Data Management', icon: <Database size={20} /> },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <img
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-gray-500 mb-2">Update your profile picture</p>
                    <div className="flex space-x-2">
                      <button className="btn btn-outline text-sm py-1">Upload</button>
                      <button className="btn text-sm py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Remove</button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Sarah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Johnson"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    defaultValue="sarah.johnson@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select className="input">
                    <option>PR Manager</option>
                    <option>Admin</option>
                    <option>Analyst</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    className="input"
                    rows={4}
                    defaultValue="PR Manager with 5+ years of experience in financial services. Specializing in investor relations and regulatory compliance."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary flex items-center">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'email' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Email Settings</h2>
                <p className="text-gray-500 mb-6">Configure your email preferences and templates</p>
                
                {/* Email content would go here */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Email Signature</h3>
                    <textarea
                      className="input mb-2"
                      rows={4}
                      defaultValue="Sarah Johnson
PR Manager
Example Corp
+1 (555) 123-4567"
                    ></textarea>
                    <div className="flex justify-end">
                      <button className="btn btn-outline text-sm">Update Signature</button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Default Send Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="cc-self"
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="cc-self" className="ml-2 text-sm text-gray-700">
                          Always CC myself on outgoing emails
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="read-receipts"
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="read-receipts" className="ml-2 text-sm text-gray-700">
                          Request read receipts
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="priority"
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="priority" className="ml-2 text-sm text-gray-700">
                          Mark all emails as high priority
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other tabs would have similar content structure */}
            {activeTab !== 'profile' && activeTab !== 'email' && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  {tabs.find(tab => tab.id === activeTab)?.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This section is under development
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;