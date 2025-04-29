import { useState } from 'react';
import { companies, emailTemplates } from '../data/mockData';
import { 
  Mail, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Copy, 
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { EmailTemplate } from '../types';

const BulkEmail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Filter templates based on search
  const filteredTemplates = emailTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle company selection
  const toggleCompanySelection = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter(id => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  // Select all companies
  const selectAllCompanies = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map(company => company.id));
    }
  };

  // Send emails
  const sendEmails = () => {
    setShowPreviewModal(false);
    // In a real app, this would send the emails
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Email</h1>
          <p className="text-gray-500 mt-1">Create and send emails to multiple companies</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Templates */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Email Templates</h2>
            <span className="badge badge-blue">{emailTemplates.length}</span>
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
            {filteredTemplates.map(template => (
              <div 
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedTemplate?.id === template.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality would go here
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Copy functionality would go here
                      }}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1 mb-2 line-clamp-1">{template.subject}</p>
                <div className="flex flex-wrap gap-1">
                  {template.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Preview and Edit */}
        <div>
          {selectedTemplate ? (
            <div className="card h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">{selectedTemplate.name}</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="input"
                  value={selectedTemplate.subject}
                  readOnly
                />
              </div>
              
              <div className="flex-grow mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-line">
                  {selectedTemplate.content}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(selectedTemplate.updatedAt).toLocaleDateString()}
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={selectedCompanies.length === 0}
                >
                  Preview & Send
                </button>
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center py-12">
              <Mail size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Template Selected</h3>
              <p className="text-gray-500 text-center max-w-xs">
                Select a template from the list to preview and edit its content
              </p>
            </div>
          )}
        </div>

        {/* Company Selection */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recipients</h2>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={selectAllCompanies}
            >
              {selectedCompanies.length === companies.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search companies..."
            />
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
            {companies.map(company => (
              <div 
                key={company.id}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
              >
                <input
                  type="checkbox"
                  id={`company-${company.id}`}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => toggleCompanySelection(company.id)}
                />
                <label 
                  htmlFor={`company-${company.id}`}
                  className="ml-2 flex-grow cursor-pointer"
                >
                  <div className="font-medium text-sm">{company.name}</div>
                  <div className="text-xs text-gray-500">{company.email}</div>
                </label>
                <div className={`w-2 h-2 rounded-full ${
                  company.status === 'completed' ? 'bg-green-500' :
                  company.status === 'in_progress' ? 'bg-blue-500' :
                  company.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedCompanies.length} of {companies.length} selected
              </span>
              <button 
                className="btn btn-primary flex items-center"
                disabled={selectedCompanies.length === 0 || !selectedTemplate}
                onClick={() => setShowPreviewModal(true)}
              >
                <Send size={16} className="mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowPreviewModal(false)}></div>
            
            <div className="relative bg-white rounded-lg p-6 w-full max-w-3xl mx-auto shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">Email Preview</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPreviewModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Recipients: {selectedCompanies.length} companies</p>
                <p className="text-sm font-medium">Subject: {selectedTemplate?.subject}</p>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4 mb-4 max-h-[300px] overflow-y-auto bg-gray-50">
                <div className="whitespace-pre-line">
                  {selectedTemplate?.content}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowPreviewModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary flex items-center"
                  onClick={sendEmails}
                >
                  <Send size={16} className="mr-2" />
                  Send to {selectedCompanies.length} Companies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Emails Sent Successfully</h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedCompanies.length} emails have been queued and will be sent shortly.
              </p>
              
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedCompanies([]);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkEmail;