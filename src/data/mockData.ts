import { 
  Company, 
  Person,
  EmailThread, 
  EmailMessage, 
  EmailTag,
  EmailThreadStatus,
  Query,
  Rule,
  EmailTemplate,
  StatusCounts,
  PRCycle
} from '../types';
import { format, subDays, addDays } from 'date-fns';

// Helper to generate dates
const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
const formatDateTime = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

// Mock People
export const people: Person[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@acmecorp.com',
    role: 'CFO',
    companyId: '1',
    department: 'Finance',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@technova.io',
    role: 'Head of IR',
    companyId: '2',
    department: 'Investor Relations',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@globaldynamics.com',
    role: 'Director',
    companyId: '3',
    department: 'Corporate Communications',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  }
];

// Companies
export const companies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    domain: 'acmecorp.com',
    email: 'contact@acmecorp.com',
    status: 'in_progress',
    progress: 65,
    lastUpdateDate: formatDate(subDays(today, 2)),
  },
  {
    id: '2',
    name: 'TechNova Inc.',
    domain: 'technova.io',
    email: 'info@technova.io',
    status: 'pending',
    progress: 20,
    lastUpdateDate: formatDate(subDays(today, 5)),
  },
  {
    id: '3',
    name: 'Global Dynamics',
    domain: 'globaldynamics.com',
    email: 'pr@globaldynamics.com',
    status: 'completed',
    progress: 100,
    lastUpdateDate: formatDate(subDays(today, 1)),
  },
  {
    id: '4',
    name: 'Stark Industries',
    domain: 'stark.com',
    email: 'tony@stark.com',
    status: 'overdue',
    progress: 42,
    lastUpdateDate: formatDate(subDays(today, 10)),
  },
  {
    id: '5',
    name: 'Wayne Enterprises',
    domain: 'wayne.com',
    email: 'bruce@wayne.com',
    status: 'in_progress',
    progress: 78,
    lastUpdateDate: formatDate(subDays(today, 3)),
  },
];

// Email Tags
export const emailTags: EmailTag[] = [
  {
    id: '1',
    type: 'company',
    entityId: '1', // Acme Corporation
    threadId: '1',
    createdAt: formatDateTime(subDays(today, 5)),
  },
  {
    id: '2',
    type: 'person',
    entityId: '1', // John Smith
    threadId: '1',
    createdAt: formatDateTime(subDays(today, 5)),
  },
  {
    id: '3',
    type: 'company',
    entityId: '2', // TechNova
    threadId: '2',
    createdAt: formatDateTime(subDays(today, 3)),
  }
];

// Email Thread Statuses
export const threadStatuses: EmailThreadStatus[] = [
  {
    id: '1',
    threadId: '1',
    status: 'in_progress',
    updatedBy: 'pr_team_1',
    updatedAt: formatDateTime(subDays(today, 2)),
    notes: 'Waiting for clarification on Q2 figures',
  },
  {
    id: '2',
    threadId: '2',
    status: 'waiting_response',
    updatedBy: 'pr_team_2',
    updatedAt: formatDateTime(subDays(today, 1)),
    notes: 'Follow-up email sent regarding revenue breakdown',
  }
];

// Updated Email Threads with tags
export const emailThreads: EmailThread[] = [
  {
    id: '1',
    subject: 'Q2 2025 Financial Discrepancy Query',
    status: 'in_progress',
    priority: 'high',
    lastMessageDate: formatDateTime(subDays(today, 1)),
    messages: sampleEmailMessages,
    tags: [emailTags[0], emailTags[1]],
    isTagged: true,
    assignedTo: 'pr_team_1',
    createdAt: formatDateTime(subDays(today, 5)),
    updatedAt: formatDateTime(subDays(today, 1)),
  },
  {
    id: '2',
    subject: 'Revenue Recognition Clarification',
    status: 'waiting_response',
    priority: 'medium',
    lastMessageDate: formatDateTime(subDays(today, 2)),
    messages: [],
    tags: [emailTags[2]],
    isTagged: true,
    assignedTo: 'pr_team_2',
    createdAt: formatDateTime(subDays(today, 3)),
    updatedAt: formatDateTime(subDays(today, 2)),
  },
  {
    id: '3',
    subject: 'RE: Quarterly Submission Guidelines',
    status: 'new',
    priority: 'low',
    lastMessageDate: formatDateTime(subDays(today, 1)),
    messages: [],
    tags: [],
    isTagged: false,
    createdAt: formatDateTime(subDays(today, 1)),
    updatedAt: formatDateTime(subDays(today, 1)),
  }
];

// PR Cycles
export const prCycles: PRCycle[] = [
  {
    id: '1',
    name: 'Q2 2025 PR Cycle',
    startDate: formatDate(subDays(today, 30)),
    endDate: formatDate(addDays(today, 15)),
    status: 'active',
    companies: 12,
    queriesResolved: 45,
    totalQueries: 78,
  },
  {
    id: '2',
    name: 'Q1 2025 PR Cycle',
    startDate: formatDate(subDays(today, 120)),
    endDate: formatDate(subDays(today, 31)),
    status: 'completed',
    companies: 10,
    queriesResolved: 62,
    totalQueries: 62,
  },
  {
    id: '3',
    name: 'Q3 2025 PR Cycle',
    startDate: formatDate(addDays(today, 30)),
    endDate: formatDate(addDays(today, 120)),
    status: 'upcoming',
    companies: 14,
    queriesResolved: 0,
    totalQueries: 0,
  },
];

// Queries
export const queries: Query[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Q2 Revenue Discrepancy',
    description: 'There is a discrepancy between the reported Q2 revenue and the revenue breakdown by product line. Please provide a reconciliation of these figures.',
    status: 'in_progress',
    createdAt: formatDateTime(subDays(today, 5)),
    updatedAt: formatDateTime(subDays(today, 2)),
  },
  {
    id: '2',
    companyId: '1',
    title: 'Marketing Expense Allocation',
    description: 'Please provide a breakdown of the marketing expenses by campaign and explain the 15% increase from previous quarter.',
    status: 'pending',
    createdAt: formatDateTime(subDays(today, 5)),
    updatedAt: formatDateTime(subDays(today, 5)),
  },
  {
    id: '3',
    companyId: '2',
    title: 'Executive Compensation Details',
    description: 'The executive compensation disclosures are missing details on stock options. Please provide the grant date fair value and vesting schedule.',
    status: 'pending',
    createdAt: formatDateTime(subDays(today, 7)),
    updatedAt: formatDateTime(subDays(today, 7)),
  },
  {
    id: '4',
    companyId: '3',
    title: 'Subsidiary Performance',
    description: 'Please provide detailed performance metrics for the European subsidiary including revenue growth, profit margins, and key operational KPIs.',
    status: 'resolved',
    createdAt: formatDateTime(subDays(today, 10)),
    updatedAt: formatDateTime(subDays(today, 1)),
  },
  {
    id: '5',
    companyId: '4',
    title: 'Litigation Disclosure',
    description: 'The disclosure on the patent infringement lawsuit appears incomplete. Please provide an update on the status and potential financial impact.',
    status: 'escalated',
    createdAt: formatDateTime(subDays(today, 15)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
  {
    id: '6',
    companyId: '5',
    title: 'Debt Covenant Compliance',
    description: 'Please confirm compliance with all debt covenants as of the end of the reporting period and provide calculations.',
    status: 'in_progress',
    createdAt: formatDateTime(subDays(today, 6)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
];

// Email Messages
const sampleEmailMessages: EmailMessage[] = [
  {
    id: '1',
    threadId: '1',
    from: 'pr@globaldynamics.com',
    to: ['investor.relations@example.com'],
    content: 'Thank you for your inquiry about our European subsidiary performance. We have prepared the detailed metrics as requested and attached them to this email. Please let me know if you need any additional information.',
    attachments: [
      {
        id: '1',
        name: 'European_Subsidiary_Performance_Q2_2025.pdf',
        type: 'application/pdf',
        size: 2458000,
        url: '#',
      }
    ],
    timestamp: formatDateTime(subDays(today, 3)),
    isRead: true,
  },
  {
    id: '2',
    threadId: '1',
    from: 'investor.relations@example.com',
    to: ['pr@globaldynamics.com'],
    content: 'Thank you for providing the European subsidiary performance data. I have a follow-up question regarding the profit margin calculation. Could you please clarify how the one-time restructuring charges were treated in this calculation?',
    attachments: [],
    timestamp: formatDateTime(subDays(today, 2)),
    isRead: true,
  },
  {
    id: '3',
    threadId: '1',
    from: 'pr@globaldynamics.com',
    to: ['investor.relations@example.com'],
    content: 'Regarding your question about profit margin calculation, the one-time restructuring charges of €2.3M were excluded from the operating income used in the margin calculation, as we consider these non-recurring. This is consistent with our reporting methodology in previous quarters and is disclosed in footnote 7 on page 12 of the attached document.',
    attachments: [],
    timestamp: formatDateTime(subDays(today, 1)),
    isRead: false,
  },
];

// Rules
export const rules: Rule[] = [
  {
    id: '1',
    name: 'Revenue Discrepancy Check',
    description: 'Checks if there is a discrepancy between total revenue and sum of segment revenues',
    condition: 'total_revenue != sum(segment_revenues)',
    queryTemplate: 'We noticed that your reported total revenue of {{total_revenue}} does not match the sum of your segment revenues ({{segment_revenues_sum}}). Please provide a reconciliation of these figures.',
    active: true,
    createdAt: formatDateTime(subDays(today, 30)),
  },
  {
    id: '2',
    name: 'Expense Increase Threshold',
    description: 'Flags when expenses increase by more than 10% compared to previous period',
    condition: '(current_expenses - previous_expenses) / previous_expenses > 0.1',
    queryTemplate: 'Your {{expense_category}} expenses have increased by {{increase_percentage}}% compared to the previous period. Please provide an explanation for this significant increase.',
    active: true,
    createdAt: formatDateTime(subDays(today, 25)),
  },
  {
    id: '3',
    name: 'Missing Executive Compensation',
    description: 'Checks if executive compensation disclosures are complete',
    condition: 'executive_comp_disclosed == false OR stock_options_disclosed == false',
    queryTemplate: 'Your executive compensation disclosures appear to be incomplete. Please provide {{missing_items}}.',
    active: false,
    createdAt: formatDateTime(subDays(today, 20)),
  },
];

// Email Templates
export const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Initial Query Template',
    subject: 'Important: Queries Regarding Your Recent Submission',
    content: `Dear {{company_name}} Team,

We hope this email finds you well. We have reviewed your recent submission and have a few queries that require your attention.

{{queries_list}}

Please provide your responses by {{due_date}}. If you need any clarifications or additional time, please let us know.

Thank you for your cooperation.

Best regards,
The PR Team`,
    createdAt: formatDateTime(subDays(today, 60)),
    updatedAt: formatDateTime(subDays(today, 30)),
    tags: ['initial', 'standard'],
  },
  {
    id: '2',
    name: 'Follow-up Template',
    subject: 'Follow-up: Outstanding Queries on Your Submission',
    content: `Dear {{company_name}} Team,

We hope this email finds you well. We wanted to follow up on our previous email dated {{previous_email_date}} regarding queries on your submission.

We notice that the following queries are still outstanding:

{{outstanding_queries}}

Your prompt attention to these matters would be greatly appreciated. Please provide your responses by {{due_date}}.

Thank you for your cooperation.

Best regards,
The PR Team`,
    createdAt: formatDateTime(subDays(today, 45)),
    updatedAt: formatDateTime(subDays(today, 15)),
    tags: ['follow-up', 'reminder'],
  },
  {
    id: '3',
    name: 'Escalation Template',
    subject: 'URGENT: Escalation of Outstanding Queries',
    content: `Dear {{company_name}} Team,

Despite our previous communications on {{previous_email_dates}}, we have not received complete responses to the following critical queries:

{{critical_queries}}

Due to the importance of this information and the approaching deadline, this matter has been escalated. Please be advised that failure to respond by {{final_deadline}} may result in {{consequences}}.

If you are experiencing difficulties in providing the required information, please contact us immediately to discuss.

Thank you for your immediate attention to this matter.

Best regards,
The PR Team`,
    createdAt: formatDateTime(subDays(today, 30)),
    updatedAt: formatDateTime(subDays(today, 10)),
    tags: ['escalation', 'urgent'],
  },
];

// Dashboard Statistics
export const statusCounts: StatusCounts = {
  pending: 10,
  inProgress: 25,
  completed: 42,
  overdue: 8,
};

export const completionTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Query Resolution Rate',
      data: [65, 72, 68, 75, 82, 88],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
    },
  ],
};

export const queryByType = {
  labels: ['Revenue', 'Expenses', 'Compliance', 'Disclosures', 'Other'],
  datasets: [
    {
      label: 'Distribution of Queries',
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(249, 115, 22, 0.7)',
      ],
    },
  ],
};

export const responseTimeDistribution = {
  labels: ['<24h', '1-2 days', '3-5 days', '6-10 days', '>10 days'],
  datasets: [
    {
      label: 'Response Time',
      data: [15, 30, 25, 20, 10],
      backgroundColor: 'rgba(139, 92, 246, 0.7)',
      borderColor: 'rgba(139, 92, 246, 1)',
      borderWidth: 2,
    },
  ],
};