
"use client"

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bug, CircleDot, Loader, CheckCircle } from 'lucide-react';
import { useBugs } from '@/hooks/use-bugs';
import { users } from '@/lib/data';
import { BugStatusBadge } from '@/components/bug-status-badge';
import { BugPriorityIcon } from '@/components/bug-priority-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { bugs } = useBugs();

  const stats = {
    new: bugs.filter((b) => b.status === 'New').length,
    inProgress: bugs.filter((b) => b.status === 'In Progress').length,
    fixed: bugs.filter((b) => b.status === 'Fixed').length,
    total: bugs.length,
  };

  const recentBugs = [...bugs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const getUser = (id?: string) => users.find((u) => u.id === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">An overview of your project's health.</p>
        </div>
        <Button asChild>
            <Link href="/bugs">Create New Bug</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bugs</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All bugs reported</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Bugs</CardTitle>
            <CircleDot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
            <p className="text-xs text-muted-foreground">Awaiting triage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Loader className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Currently being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugs Fixed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fixed}</div>
            <p className="text-xs text-muted-foreground">Ready for verification</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Reported</CardTitle>
          <CardDescription>The latest bugs that need your attention.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Priority</TableHead>
                <TableHead className="hidden md:table-cell">Assignee</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBugs.map((bug) => {
                const assignee = getUser(bug.assigneeId);
                return (
                  <TableRow key={bug.id}>
                    <TableCell>
                      <div className="font-medium">{bug.title}</div>
                      <div className="text-sm text-muted-foreground md:hidden">{bug.priority}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <BugStatusBadge status={bug.status} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <BugPriorityIcon priority={bug.priority} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {assignee ? (
                         <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="outline" size="sm" asChild>
                            <Link href={`/bugs/${bug.id}`}>View</Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
