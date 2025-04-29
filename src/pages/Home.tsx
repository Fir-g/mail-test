import { useState } from 'react';
import { Link } from 'react-router-dom';
import { companies, prCycles, queries } from '../data/mockData';
import { Search, Filter, Plus, MoreHorizontal, ExternalLink, Mail } from 'lucide-react';
import { Company } from '../types';

// Status Badge Component
type StatusBadgeProps = {
  status: Company['status'];
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusMap = {
    pending: {
      color: 'badge-yellow',
      label: 'Pending',
      dot: 'status-dot-yellow',
    },
    in_progress: {
      color: 'badge-blue',
      label: 'In Progress',
      dot: 'status-dot-blue',
    },
    completed: {
      color: 'badge-green',
      label: 'Completed',
      dot: 'status-dot-green',
    },
    overdue: {
      color: 'badge-red',
      label: 'Overdue',
      dot: 'status-dot-red',
    },
  };

  const { color, label, dot } = statusMap[status];

  return (
    <span className={`badge ${color}`}>
      <span className={`status-dot ${dot}`}></span>
      {label}
    </span>
  );
};

// Progress Bar Component
type ProgressBarProps = {
  value: number;
  status: Company['status'];
};

const ProgressBar = ({ value, status }: ProgressBarProps) => {
  const getColorClass = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${getColorClass()} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

// Company Card Component
type CompanyCardProps = {
  company: Company;
};

const CompanyCard = ({ company }: CompanyCardProps) => {
  // Count queries for this company
  const companyQueries = queries.filter(query => query.companyId === company.id);
  const resolvedQueries = companyQueries.filter(query => query.status === 'resolved').length;
  const totalQueries = companyQueries.length;

  return (
    <div className="card card-hover">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg text-gray-900">{company.name}</h3>
          <p className="text-sm text-gray-500">{company.email}</p>
        </div>
        <StatusBadge status={company.status} />
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{company.progress}%</span>
        </div>
        <ProgressBar value={company.progress} status={company.status} />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Queries: </span>
          <span className="font-medium">{resolvedQueries}/{totalQueries}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Last Update: </span>
          <span className="font-medium">{company.lastUpdateDate}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <Link 
          to={`/email-thread/${company.id}`}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Mail size={16} className="mr-1" />
          View Thread
        </Link>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

// Home Page Component
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentCycle, setCurrentCycle] = useState(prCycles[0].id);
  
  // Filter companies based on search and status
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-500 mt-1">Manage company communications and queries</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <select 
            className="input"
            value={currentCycle}
            onChange={(e) => setCurrentCycle(e.target.value)}
          >
            {prCycles.map(cycle => (
              <option key={cycle.id} value={cycle.id}>
                {cycle.name}
              </option>
            ))}
          </select>
          <button className="btn btn-primary">
            <Plus size={16} className="mr-2" />
            Add Company
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <select
            className="input w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Company Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No companies found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Home;