import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rules } from '../data/mockData';
import { Search, Plus, Edit, Trash, ToggleLeft as Toggle, FileText, AlertCircle } from 'lucide-react';

const RuleSetup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState<string | null>(null);

  // Filter rules based on search
  const filteredRules = rules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle rule toggle
  const handleRuleToggle = (ruleId: string, currentStatus: boolean) => {
    // In a real app, this would update the rule status
    console.log(`Toggling rule ${ruleId} to ${!currentStatus}`);
  };

  // Handle rule delete
  const confirmDelete = (ruleId: string) => {
    setRuleToDelete(ruleId);
    setShowDeleteModal(true);
  };

  const deleteRule = () => {
    // In a real app, this would delete the rule
    console.log(`Deleting rule ${ruleToDelete}`);
    setShowDeleteModal(false);
    setRuleToDelete(null);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rule Setup</h1>
          <p className="text-gray-500 mt-1">Configure rules to generate queries</p>
        </div>
        <Link to="/rule-definition/new" className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          New Rule
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.map(rule => (
          <div 
            key={rule.id}
            className="card card-hover"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg text-gray-900">{rule.name}</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={rule.active}
                  onChange={() => handleRuleToggle(rule.id, rule.active)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <p className="text-sm text-gray-600 mt-2 mb-4">{rule.description}</p>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
              <p className="text-xs font-medium text-gray-700 mb-1">Condition:</p>
              <code className="text-xs bg-gray-100 p-1 rounded">{rule.condition}</code>
              
              <p className="text-xs font-medium text-gray-700 mt-3 mb-1">Query Template:</p>
              <div className="text-xs text-gray-600 line-clamp-2">{rule.queryTemplate}</div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <span className="text-xs text-gray-500">
                Created: {new Date(rule.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <Link 
                  to={`/rule-definition/${rule.id}`}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit size={16} />
                </Link>
                <button 
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => confirmDelete(rule.id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRules.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No rules found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {searchTerm 
              ? `No rules matching "${searchTerm}". Try a different search term.` 
              : "You haven't created any rules yet. Create a rule to start generating queries."}
          </p>
          <Link to="/rule-definition/new" className="btn btn-primary">
            Create Your First Rule
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setShowDeleteModal(false)}
            ></div>
            
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Delete Rule</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this rule? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                  onClick={deleteRule}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleSetup;