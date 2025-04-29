import { useState } from 'react';
import { emailThreads, companies, people } from '../../data/mockData';
import { 
  Mail, 
  Paperclip, 
  Download, 
  Tag, 
  User, 
  Building,
  Plus,
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { EmailThread, EmailMessage, EmailTag, Company, Person } from '../../types';

type EmailMessageProps = {
  message: EmailMessage;
  company?: Company;
  person?: Person;
};

const EmailMessageView = ({ message, company, person }: EmailMessageProps) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {person?.avatar ? (
              <img 
                src={person.avatar} 
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium">{person?.name || message.from}</p>
            <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
          </div>
        </div>
        {message.attachments.length > 0 && (
          <div className="flex items-center">
            <Paperclip size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{message.attachments.length}</span>
          </div>
        )}
      </div>

      <div className="text-gray-800 whitespace-pre-line mb-4">
        {message.content}
      </div>

      {message.attachments.length > 0 && (
        <div className="border-t border-gray-200 pt-3 space-y-2">
          {message.attachments.map(attachment => (
            <div 
              key={attachment.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center">
                <Paperclip size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">{attachment.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Download size={16} className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type TagSelectorProps = {
  onTagAdd: (tag: EmailTag) => void;
  existingTags: EmailTag[];
};

const TagSelector = ({ onTagAdd, existingTags }: TagSelectorProps) => {
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTagAdd = (type: 'company' | 'person', entityId: string) => {
    const newTag: EmailTag = {
      id: Math.random().toString(),
      type,
      entityId,
      threadId: '1', // This would come from the thread context
      createdAt: new Date().toISOString(),
    };
    onTagAdd(newTag);
    setShowSelector(false);
    setSearchTerm('');
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !existingTags.some(tag => tag.type === 'company' && tag.entityId === company.id)
  );

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !existingTags.some(tag => tag.type === 'person' && tag.entityId === person.id)
  );

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="btn btn-outline flex items-center text-sm"
      >
        <Plus size={16} className="mr-1" />
        Add Tag
      </button>

      {showSelector && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
          <input
            type="text"
            className="input mb-2 text-sm"
            placeholder="Search companies or people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredCompanies.length > 0 && (
            <div className="mb-2">
              <h4 className="text-xs font-medium text-gray-500 mb-1">Companies</h4>
              {filteredCompanies.map(company => (
                <button
                  key={company.id}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm flex items-center"
                  onClick={() => handleTagAdd('company', company.id)}
                >
                  <Building size={14} className="mr-2 text-gray-400" />
                  {company.name}
                </button>
              ))}
            </div>
          )}

          {filteredPeople.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-1">People</h4>
              {filteredPeople.map(person => (
                <button
                  key={person.id}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm flex items-center"
                  onClick={() => handleTagAdd('person', person.id)}
                >
                  <User size={14} className="mr-2 text-gray-400" />
                  {person.name}
                </button>
              ))}
            </div>
          )}

          {filteredCompanies.length === 0 && filteredPeople.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

type EmailThreadViewProps = {
  threadId: string;
};

const EmailThreadView = ({ threadId }: EmailThreadViewProps) => {
  const [replyContent, setReplyContent] = useState('');
  const thread = emailThreads.find(t => t.id === threadId);

  if (!thread) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <AlertCircle size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Thread not found</h3>
        <p className="text-gray-500">The email thread you're looking for doesn't exist</p>
      </div>
    );
  }

  const handleSendReply = () => {
    // In a real app, this would send the reply
    console.log('Sending reply:', replyContent);
    setReplyContent('');
  };

  const handleAddTag = (tag: EmailTag) => {
    // In a real app, this would update the thread tags
    console.log('Adding tag:', tag);
  };

  return (
    <div className="space-y-4">
      {/* Thread Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{thread.subject}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Started {new Date(thread.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {thread.priority === 'high' && (
              <span className="badge badge-red flex items-center">
                <AlertCircle size={14} className="mr-1" />
                High Priority
              </span>
            )}
            <span className={`badge ${
              thread.status === 'resolved' ? 'badge-green' :
              thread.status === 'in_progress' ? 'badge-blue' :
              thread.status === 'waiting_response' ? 'badge-yellow' :
              'badge-gray'
            } flex items-center`}>
              {thread.status === 'resolved' ? <CheckCircle size={14} className="mr-1" /> :
               thread.status === 'waiting_response' ? <Clock size={14} className="mr-1" /> :
               <Mail size={14} className="mr-1" />}
              {thread.status.replace('_', ' ').charAt(0).toUpperCase() + thread.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TagSelector onTagAdd={handleAddTag} existingTags={thread.tags} />
            {thread.tags.map(tag => {
              const entity = tag.type === 'company'
                ? companies.find(c => c.id === tag.entityId)
                : people.find(p => p.id === tag.entityId);

              if (!entity) return null;

              return (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-sm"
                >
                  {tag.type === 'company' ? (
                    <Building size={14} className="mr-1 text-gray-500" />
                  ) : (
                    <User size={14} className="mr-1 text-gray-500" />
                  )}
                  {entity.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {thread.messages.map(message => (
          <EmailMessageView
            key={message.id}
            message={message}
            company={companies.find(c => 
              thread.tags.some(tag => 
                tag.type === 'company' && tag.entityId === c.id
              )
            )}
            person={people.find(p => 
              thread.tags.some(tag => 
                tag.type === 'person' && tag.entityId === p.id
              )
            )}
          />
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <textarea
          className="input mb-4"
          rows={4}
          placeholder="Type your reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center">
          <button className="btn btn-outline">
            <Paperclip size={16} className="mr-2" />
            Attach Files
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSendReply}
            disabled={!replyContent.trim()}
          >
            <Send size={16} className="mr-2" />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailThreadView;