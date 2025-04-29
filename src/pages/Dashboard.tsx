import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CalendarCheck, Mail, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { 
  companies, 
  prCycles, 
  statusCounts, 
  completionTrend, 
  queryByType, 
  responseTimeDistribution 
} from '../data/mockData';
import { ChartData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Static chart options
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Query Resolution Rate',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Distribution of Queries',
    },
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Response Time Distribution',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard = ({ title, value, description, icon, colorClass }: StatCardProps) => (
  <div className="card hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Chart Card Component
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => (
  <div className="card h-full">
    <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<ChartData>(completionTrend);
  const [doughnutChartData, setDoughnutChartData] = useState<ChartData>(queryByType);
  const [barChartData, setBarChartData] = useState<ChartData>(responseTimeDistribution);
  
  const activeCycle = prCycles.find(cycle => cycle.status === 'active') || prCycles[0];
  const pendingCompanies = companies.filter(company => company.status === 'pending' || company.status === 'in_progress').length;
  const overDueCompanies = companies.filter(company => company.status === 'overdue').length;
  
  // Calculate overall progress
  const overallProgress = activeCycle 
    ? Math.round((activeCycle.queriesResolved / activeCycle.totalQueries) * 100) 
    : 0;

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLineChartData(completionTrend);
      setDoughnutChartData(queryByType);
      setBarChartData(responseTimeDistribution);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your PR Cycle status and metrics</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select 
            className="input max-w-xs"
            defaultValue={activeCycle?.id}
          >
            {prCycles.map(cycle => (
              <option key={cycle.id} value={cycle.id}>
                {cycle.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active PR Cycle Summary */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{activeCycle?.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {activeCycle?.startDate} to {activeCycle?.endDate}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="w-48 mr-4 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium">
              {overallProgress}% Complete
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{activeCycle?.companies}</p>
            <p className="text-sm text-gray-600">Companies</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{activeCycle?.queriesResolved}</p>
            <p className="text-sm text-gray-600">Queries Resolved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {activeCycle?.totalQueries - activeCycle?.queriesResolved}
            </p>
            <p className="text-sm text-gray-600">Queries Pending</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">{activeCycle?.totalQueries}</p>
            <p className="text-sm text-gray-600">Total Queries</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Pending Companies" 
          value={pendingCompanies}
          description="Awaiting responses" 
          icon={<Clock size={24} className="text-blue-500" />} 
          colorClass="bg-blue-100"
        />
        <StatCard 
          title="Overdue Companies" 
          value={overDueCompanies}
          description="Past deadline" 
          icon={<AlertCircle size={24} className="text-red-500" />} 
          colorClass="bg-red-100"
        />
        <StatCard 
          title="Response Rate" 
          value="78%"
          description="Last 7 days" 
          icon={<TrendingUp size={24} className="text-green-500" />} 
          colorClass="bg-green-100"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${overallProgress}%`}
          description="Current cycle" 
          icon={<CheckCircle size={24} className="text-purple-500" />} 
          colorClass="bg-purple-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Query Resolution Trend">
          <Line data={lineChartData} options={lineChartOptions} />
        </ChartCard>
        <ChartCard title="Response Time Distribution">
          <Bar data={barChartData} options={barChartOptions} />
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Query Distribution by Type">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard title="Recent Activity">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Mail size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email sent to Acme Corporation</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Global Dynamics marked as complete</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <CalendarCheck size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">New rule created: "Executive Compensation Check"</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <AlertCircle size={16} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Stark Industries escalated to critical</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;