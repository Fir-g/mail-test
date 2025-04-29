export type Company = {
  id: string;
  name: string;
  domain: string;
  email: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  progress: number;
  lastUpdateDate: string;
};

export type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
  department?: string;
  avatar?: string;
};

export type EmailTag = {
  id: string;
  type: 'company' | 'person';
  entityId: string; // References either companyId or personId
  threadId: string;
  createdAt: string;
};

export type EmailThread = {
  id: string;
  subject: string;
  status: 'new' | 'in_progress' | 'waiting_response' | 'resolved' | 'archived';
  priority: 'low' | 'medium' | 'high';
  lastMessageDate: string;
  messages: EmailMessage[];
  tags: EmailTag[];
  isTagged: boolean;
  assignedTo?: string; // userId of PR team member
  createdAt: string;
  updatedAt: string;
};

export type EmailMessage = {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  attachments: Attachment[];
  timestamp: string;
  isRead: boolean;
  tags: EmailTag[];
};

export type Attachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

export type EmailThreadStatus = {
  id: string;
  threadId: string;
  status: EmailThread['status'];
  updatedBy: string;
  updatedAt: string;
  notes?: string;
};

export type PRCycle = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  companies: number;
  queriesResolved: number;
  totalQueries: number;
};

export type Query = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'escalated';
  createdAt: string;
  updatedAt: string;
};

export type Rule = {
  id: string;
  name: string;
  description: string;
  condition: string;
  queryTemplate: string;
  active: boolean;
  createdAt: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};

export type StatusCounts = {
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
};