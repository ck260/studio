"use client"

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter, PlusCircle, Search } from 'lucide-react';
import { bugs, users, categories as allCategories } from '@/lib/data';
import type { Bug, BugStatus, BugPriority } from '@/lib/types';
import { BugStatusBadge } from '@/components/bug-status-badge';
import { BugPriorityIcon } from '@/components/bug-priority-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


function CreateBugDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Bug</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Bug Report</DialogTitle>
                    <DialogDescription>
                        Please provide as much detail as possible.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Login button not working" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the bug in detail..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                             <Label htmlFor="priority">Priority</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Submit Report</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function BugsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilters, setStatusFilters] = React.useState<BugStatus[]>([]);
  const [priorityFilters, setPriorityFilters] = React.useState<BugPriority[]>([]);

  const filteredBugs = bugs.filter((bug) => {
    const searchMatch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bug.id.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilters.length === 0 || statusFilters.includes(bug.status);
    const priorityMatch = priorityFilters.length === 0 || priorityFilters.includes(bug.priority);
    return searchMatch && statusMatch && priorityMatch;
  });

  const getUser = (id?: string) => users.find((u) => u.id === id);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
            <div>
                <CardTitle>Bugs</CardTitle>
                <CardDescription>View, manage, and track all reported bugs.</CardDescription>
            </div>
            <CreateBugDialog />
        </div>
        <div className="mt-4 flex items-center gap-2">
            <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by title or ID..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['New', 'In Progress', 'Fixed', 'Closed'] as BugStatus[]).map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilters.includes(status)}
                    onCheckedChange={(checked) => {
                      setStatusFilters(
                        checked ? [...statusFilters, status] : statusFilters.filter((s) => s !== status)
                      );
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
                 <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 {(['Low', 'Medium', 'High', 'Critical'] as BugPriority[]).map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={priorityFilters.includes(priority)}
                    onCheckedChange={(checked) => {
                      setPriorityFilters(
                        checked ? [...priorityFilters, priority] : priorityFilters.filter((p) => p !== priority)
                      );
                    }}
                  >
                    {priority}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Bug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="hidden md:table-cell">Assignee</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredBugs.map((bug) => {
                const assignee = getUser(bug.assigneeId);
                return (
                    <TableRow key={bug.id}>
                    <TableCell>
                        <div className="font-medium hover:underline">
                            <Link href={`/bugs/${bug.id}`}>{bug.title}</Link>
                        </div>
                        <div className="text-sm text-muted-foreground">#{bug.id.split('-')[1]}</div>
                    </TableCell>
                    <TableCell>
                        <BugStatusBadge status={bug.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
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
                            <Link href={`/bugs/${bug.id}`}>View Details</Link>
                        </Button>
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
