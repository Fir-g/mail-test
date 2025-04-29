import { useState } from 'react';
import { Link } from 'react-router-dom';
import { emailThreads, companies, people } from '../../data/mockData';
import { Mail, Clock, AlertCircle, CheckCircle, Tag, User, Building } from 'lucide-react';
import { EmailThread, EmailTag } from '../../types';

type ThreadStatusProps = {
  status: EmailThread['status'];
};

const ThreadStatus = ({ status }: ThreadStatusProps) => {
  const statusConfig = {
    new: {
      icon: <Mail size={16} className="text-blue-500" />,
      label: 'New',
      className: 'bg-blue-50 text-blue-700',
    },
    in_progress: {
      icon: <Clock size={16} className="text-yellow-500" />,
      label: 'In Progress',
      className: 'bg-yellow-50 text-yellow-700',
    },
    waiting_response: {
      icon: <Clock size={16} className="text-purple-500" />,
      label: 'Waiting Response',
      className: 'bg-purple-50 text-purple-700',
    },
    resolved: {
      icon: <CheckCircle size={16} className="text-green-500" />,
      label: 'Resolved',
      className: 'bg-green-50 text-green-700',
    },
    archived: {
      icon: <Mail size={16} className="text-gray-500" />,
      label: 'Archived',
      className: 'bg-gray-50 text-gray-700',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </span>
  );
};

type ThreadTagsProps = {
  tags: EmailTag[];
};

const ThreadTags = ({ tags }: ThreadTagsProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map(tag => {
        const entity = tag.type === 'company' 
          ? companies.find(c => c.id === tag.entityId)
          : people.find(p => p.id === tag.entityId);

        if (!entity) return null;

        return (
          <span 
            key={tag.id}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
          >
            {tag.type === 'company' ? (
              <Building size={12} className="mr-1" />
            ) : (
              <User size={12} className="mr-1" />
            )}
            {entity.name}
          </span>
        );
      })}
    </div>
  );
};

type EmailThreadListProps = {
  filter?: 'tagged' | 'untagged' | 'all';
};

const EmailThreadList = ({ filter = 'all' }: EmailThreadListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreads = emailThreads.filter(thread => {
    const matchesSearch = thread.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'tagged' && thread.isTagged) || 
      (filter === 'untagged' && !thread.isTagged);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          className="input pl-10"
          placeholder="Search email threads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {filteredThreads.map(thread => (
        <Link
          key={thread.id}
          to={`/email-thread/${thread.id}`}
          className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900">{thread.subject}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {new Date(thread.lastMessageDate).toLocaleDateString()}
              </p>
              <ThreadTags tags={thread.tags} />
            </div>
            <ThreadStatus status={thread.status} />
          </div>
          
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">
                {thread.messages.length} messages
              </span>
              {thread.priority === 'high' && (
                <span className="flex items-center text-red-600">
                  <AlertCircle size={14} className="mr-1" />
                  High Priority
                </span>
              )}
            </div>
            {!thread.isTagged && (
              <span className="flex items-center text-gray-500">
                <Tag size={14} className="mr-1" />
                Untagged
              </span>
            )}
          </div>
        </Link>
      ))}

      {filteredThreads.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Mail size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No threads found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default EmailThreadList;