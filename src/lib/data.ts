import type { User, Bug, Comment } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-2',
    role: 'user',
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-3',
    role: 'user',
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-4',
    role: 'user',
  },
];

export const bugs: Bug[] = [
  {
    id: 'bug-101',
    title: 'Login button unresponsive on mobile',
    description: 'The main login button on the homepage does not respond to clicks on mobile devices (tested on iOS Safari and Android Chrome).',
    status: 'New',
    priority: 'High',
    category: 'Authentication',
    reporterId: 'user-2',
    assigneeId: 'user-1',
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-21T11:30:00Z',
  },
  {
    id: 'bug-102',
    title: 'User profile picture not updating',
    description: 'When a user uploads a new profile picture, the old one remains visible until a hard refresh is performed.',
    status: 'In Progress',
    priority: 'Medium',
    category: 'User Profile',
    reporterId: 'user-3',
    assigneeId: 'user-1',
    createdAt: '2024-05-19T14:20:00Z',
    updatedAt: '2024-05-22T09:00:00Z',
  },
  {
    id: 'bug-103',
    title: 'API rate limit error not handled gracefully',
    description: 'Exceeding the API rate limit results in a generic server error instead of a user-friendly message.',
    status: 'In Progress',
    priority: 'High',
    category: 'API',
    reporterId: 'user-2',
    assigneeId: 'user-4',
    createdAt: '2024-05-18T09:00:00Z',
    updatedAt: '2024-05-20T16:45:00Z',
  },
  {
    id: 'bug-104',
    title: 'Incorrect calculation in monthly report',
    description: 'The total revenue in the generated monthly report for April is off by 3%. Seems to be a rounding issue.',
    status: 'Fixed',
    priority: 'Critical',
    category: 'Reporting',
    reporterId: 'user-1',
    assigneeId: 'user-2',
    createdAt: '2024-05-15T11:00:00Z',
    updatedAt: '2024-05-18T18:00:00Z',
  },
  {
    id: 'bug-105',
    title: 'Text overflows in navigation menu on smaller screens',
    description: 'Menu items with long text get cut off or wrap incorrectly on screen widths below 360px.',
    status: 'Closed',
    priority: 'Low',
    category: 'UI/UX',
    reporterId: 'user-4',
    assigneeId: 'user-3',
    createdAt: '2024-05-12T15:00:00Z',
    updatedAt: '2024-05-14T12:00:00Z',
  },
  {
    id: 'bug-106',
    title: 'Email notifications are not being sent',
    description: 'No email notifications are being sent for new bug assignments or comments.',
    status: 'New',
    priority: 'Critical',
    category: 'Notifications',
    reporterId: 'user-3',
    createdAt: '2024-05-23T10:00:00Z',
    updatedAt: '2024-05-23T10:00:00Z',
  },
];

export const comments: Comment[] = [
    {
        id: 'comment-1',
        bugId: 'bug-101',
        authorId: 'user-1',
        content: "I've reproduced this on my end. Starting to investigate the event listeners.",
        createdAt: '2024-05-21T11:35:00Z'
    },
    {
        id: 'comment-2',
        bugId: 'bug-101',
        authorId: 'user-2',
        content: "Thanks for picking this up so quickly!",
        createdAt: '2024-05-21T11:40:00Z'
    },
    {
        id: 'comment-3',
        bugId: 'bug-102',
        authorId: 'user-1',
        content: "Looks like a caching issue on the client side. I'll try invalidating the cache after upload.",
        createdAt: '2024-05-22T09:05:00Z'
    },
];

export const categories: string[] = [
    'Authentication',
    'User Profile',
    'API',
    'Reporting',
    'UI/UX',
    'Notifications',
    'Database',
    'Performance'
];
