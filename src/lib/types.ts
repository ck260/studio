export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'user';
};

export type BugStatus = 'New' | 'In Progress' | 'Fixed' | 'Closed';
export type BugPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type Bug = {
  id: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: BugPriority;
  category: string;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  bugId: string;
  createdAt: string;
};
