import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EmailThreadView from '../components/email/EmailThreadView';
import EmailThreadList from '../components/email/EmailThreadList';

const EmailThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [filter, setFilter] = useState<'all' | 'tagged' | 'untagged'>('all');

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Threads</h1>
          <p className="text-gray-500 mt-1">Manage and track email communications</p>
        </div>
        <div className="flex space-x-2">
          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All Threads</option>
            <option value="tagged">Tagged</option>
            <option value="untagged">Untagged</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thread List */}
        <div className="lg:col-span-1">
          <EmailThreadList filter={filter} />
        </div>

        {/* Thread View */}
        <div className="lg:col-span-2">
          {threadId ? (
            <EmailThreadView threadId={threadId} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Mail size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Select a Thread</h3>
              <p className="text-gray-500">Choose an email thread from the list to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailThreadPage;