import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="p-2 bg-blue-100 rounded-lg">
        <FileText size={24} className="text-blue-600" />
      </div>
      <div className="ml-3">
        <h1 className="text-xl font-semibold text-gray-900">PRCycle</h1>
        <p className="text-xs text-gray-500">Automation Suite</p>
      </div>
    </div>
  );
};

export default Logo;