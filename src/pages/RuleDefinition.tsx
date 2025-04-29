import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { rules, companies } from '../data/mockData';
import { ArrowLeft, Check, AlertCircle, Info } from 'lucide-react';

// Test expression component
const TestExpression = () => {
  const [expression, setExpression] = useState('total_revenue != sum(segment_revenues)');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const validateExpression = () => {
    // This is just a mock - in a real app it would actually validate the expression
    setIsValid(true);
    setTestResult('Expression is valid. When applied to sample data, this rule would generate 4 queries.');
  };

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-medium mb-4">Test Rule</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expression
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            className="input flex-grow"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <button 
            className="btn btn-primary whitespace-nowrap"
            onClick={validateExpression}
          >
            Test
          </button>
        </div>
      </div>
      
      {isValid !== null && (
        <div className={`p-3 rounded-lg flex items-start ${
          isValid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
        }`}>
          <div className={`p-1 rounded-full mr-2 ${
            isValid ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isValid ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <AlertCircle size={16} className="text-red-600" />
            )}
          </div>
          <div className="text-sm">
            {testResult}
          </div>
        </div>
      )}
    </div>
  );
};

const RuleDefinition = () => {
  const { ruleId } = useParams<{ ruleId: string }>();
  const navigate = useNavigate();
  const isNewRule = ruleId === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    condition: '',
    queryTemplate: '',
    active: true,
    appliesTo: [] as string[],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!isNewRule) {
      const rule = rules.find(r => r.id === ruleId);
      if (rule) {
        setFormData({
          name: rule.name,
          description: rule.description,
          condition: rule.condition,
          queryTemplate: rule.queryTemplate,
          active: rule.active,
          appliesTo: ['all'], // In a real app, this would come from the rule data
        });
      }
    }
  }, [ruleId, isNewRule]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleCompanySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === 'all') {
      setFormData(prev => ({ ...prev, appliesTo: ['all'] }));
    } else if (value === 'select') {
      setFormData(prev => ({ ...prev, appliesTo: [] }));
    } else {
      setFormData(prev => {
        const newAppliesTo = prev.appliesTo.includes('all') ? [] : [...prev.appliesTo];
        
        if (!newAppliesTo.includes(value)) {
          newAppliesTo.push(value);
        }
        
        return { ...prev, appliesTo: newAppliesTo };
      });
    }
  };

  const removeCompanyFromSelection = (companyId: string) => {
    setFormData(prev => ({
      ...prev,
      appliesTo: prev.appliesTo.filter(id => id !== companyId)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Rule name is required';
    }
    
    if (!formData.condition.trim()) {
      newErrors.condition = 'Condition is required';
    }
    
    if (!formData.queryTemplate.trim()) {
      newErrors.queryTemplate = 'Query template is required';
    }
    
    if (formData.appliesTo.length === 0) {
      newErrors.appliesTo = 'Please select at least one company or "All Companies"';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would save the rule to the backend
      console.log('Saving rule:', formData);
      
      // Show success message and redirect
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/rule-setup');
      }, 1500);
    }
  };

  return (
    <div className="fade-in">
      <div className="flex items-center mb-6">
        <Link 
          to="/rule-setup" 
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNewRule ? 'Create New Rule' : 'Edit Rule'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isNewRule ? 'Configure a new rule to generate queries' : 'Modify an existing rule'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Revenue Discrepancy Check"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="input"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what this rule checks for..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.active}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                  Rule is active
                </label>
              </div>
            </div>

            {/* Condition and Query Template */}
            <div className="card mb-6">
              <h3 className="text-lg font-medium mb-4">Rule Definition</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <button 
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View Examples
                  </button>
                </div>
                <input
                  type="text"
                  name="condition"
                  className={`input font-mono text-sm ${errors.condition ? 'border-red-500' : ''}`}
                  value={formData.condition}
                  onChange={handleChange}
                  placeholder="e.g., total_revenue != sum(segment_revenues)"
                />
                {errors.condition ? (
                  <p className="mt-1 text-xs text-red-600">{errors.condition}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    Use field names as they appear in the database. Operators: ==, !=, &gt;, &lt;, &gt;=, &lt;=
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Query Template
                </label>
                <textarea
                  name="queryTemplate"
                  rows={4}
                  className={`input font-mono text-sm ${errors.queryTemplate ? 'border-red-500' : ''}`}
                  value={formData.queryTemplate}
                  onChange={handleChange}
                  placeholder="e.g., We noticed a discrepancy in your reported revenue of {{total_revenue}}..."
                ></textarea>
                {errors.queryTemplate ? (
                  <p className="mt-1 text-xs text-red-600">{errors.queryTemplate}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    Use {{field_name}} for dynamic values that will be replaced with actual data.
                  </p>
                )}
              </div>
            </div>

            {/* Test Rule */}
            <TestExpression />
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Company Selection */}
            <div className="card mb-6">
              <h3 className="text-lg font-medium mb-4">Apply To</h3>
              
              <div className="mb-4">
                <select
                  className={`input ${errors.appliesTo ? 'border-red-500' : ''}`}
                  value={formData.appliesTo.includes('all') ? 'all' : 'select'}
                  onChange={handleCompanySelectionChange}
                >
                  <option value="all">All Companies</option>
                  <option value="select">Select Companies</option>
                </select>
                {errors.appliesTo && (
                  <p className="mt-1 text-xs text-red-600">{errors.appliesTo}</p>
                )}
              </div>
              
              {!formData.appliesTo.includes('all') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Companies
                  </label>
                  <select
                    className="input mb-3"
                    onChange={handleCompanySelectionChange}
                    value=""
                  >
                    <option value="" disabled>Select a company to add</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  
                  {formData.appliesTo.length > 0 ? (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {formData.appliesTo.map(companyId => {
                        const company = companies.find(c => c.id === companyId);
                        return company ? (
                          <div 
                            key={company.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                          >
                            <span className="text-sm">{company.name}</span>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => removeCompanyFromSelection(company.id)}
                            >
                              &times;
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-gray-50 rounded border border-gray-200">
                      <p className="text-sm text-gray-500">No companies selected</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Help */}
            <div className="card bg-blue-50 border border-blue-100">
              <div className="flex">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Info size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Tips for creating effective rules</h3>
                  <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                    <li>Keep conditions simple and specific</li>
                    <li>Use clear, professional language in query templates</li>
                    <li>Test your rule with sample data before activating</li>
                    <li>Use placeholder variables consistently</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <Link to="/rule-setup" className="btn btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                {isNewRule ? 'Create Rule' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center">
          <Check size={20} className="mr-2" />
          <span>{isNewRule ? 'Rule created successfully!' : 'Rule updated successfully!'}</span>
        </div>
      )}
    </div>
  );
};

export default RuleDefinition;