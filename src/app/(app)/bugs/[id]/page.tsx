
"use client"

import * as React from 'react';
import { useBugs, getBugs, useBugMutations } from '@/hooks/use-bugs';
import { useComments, useCommentMutations } from '@/hooks/use-comments';
import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { BugStatusBadge } from '@/components/bug-status-badge';
import { BugPriorityIcon } from '@/components/bug-priority-icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Bug, BugStatus, BugPriority, Comment } from '@/lib/types';


// This page can be rendered statically, as we can get the bug data at build time.
// However, to see updates from other pages, we need to use the client-side hook.
// A better solution would involve server-side data fetching and revalidation.
export default function BugDetailsPage({ params }: { params: { id: string } }) {
    const { id } = React.use(params); // ✅ Future-safe

  const { bugs } = useBugs();
  const bug = bugs.find((b) => b.id === id);

  if (!bug) {
    // Fallback for initial load or if bug not found in client state
    const staticBugs = getBugs();
    const staticBug = staticBugs.find((b) => b.id === id);
    if (!staticBug) {
      notFound();
    }
    // This is not ideal, but it makes the page work on direct navigation.
    // In a real app, you would fetch this from a server.
    return <BugDetailsContent bug={staticBug} />;
  }

  return <BugDetailsContent bug={bug} />;
}

function BugDetailsContent({ bug }: { bug: Bug }) {
    const { updateBug } = useBugMutations();
    const { comments } = useComments();
    const { addComment } = useCommentMutations();
    const [newComment, setNewComment] = React.useState('');

    const reporter = users.find((u) => u.id === bug.reporterId);
    const assignee = users.find((u) => u.id === bug.assigneeId);
    const bugComments = comments.filter((c) => c.bugId === bug.id);

    const handleStatusChange = (newStatus: BugStatus) => {
        updateBug(bug.id, { status: newStatus });
    }

    const handlePriorityChange = (newPriority: BugPriority) => {
        updateBug(bug.id, { priority: newPriority });
    }

    const handleAssigneeChange = (newAssigneeId: string) => {
        updateBug(bug.id, { assigneeId: newAssigneeId });
    }

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;

        const newCommentObject: Comment = {
            id: `comment-${Date.now()}`,
            bugId: bug.id,
            authorId: users[0].id, // Assume current user
            content: newComment,
            createdAt: new Date().toISOString(),
        };

        addComment(newCommentObject);
        setNewComment('');
    }

    return (
    <div className="space-y-6">
       <div>
         <Button variant="ghost" asChild className="mb-4">
             <Link href="/bugs"><ArrowLeft className="mr-2 h-4 w-4" />Back to all bugs</Link>
         </Button>
        <h1 className="text-3xl font-bold font-headline">{bug.title}</h1>
        <p className="text-muted-foreground">Bug #{bug.id.split('-')[1]} opened on {new Date(bug.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/90 whitespace-pre-wrap">{bug.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {bugComments.map(comment => {
                        const author = users.find(u => u.id === comment.authorId);
                        return (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar>
                                    <AvatarImage src={author?.avatarUrl} />
                                    <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{author?.name}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="mt-1 p-3 rounded-md bg-secondary/50 text-secondary-foreground">{comment.content}</div>
                                </div>
                            </div>
                        )
                    })}
                     <Separator />
                    <div className="flex gap-3">
                         <Avatar>
                            <AvatarImage src={users[0]?.avatarUrl} />
                            <AvatarFallback>{users[0]?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                         <div className="flex-1 space-y-2">
                             <Textarea 
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                             />
                             <Button onClick={handleCommentSubmit}>Submit</Button>
                         </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={bug.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue>
                                    <BugStatusBadge status={bug.status} />
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {(['New', 'In Progress', 'Fixed', 'Closed'] as BugStatus[]).map(status => (
                                    <SelectItem key={status} value={status}>
                                        <BugStatusBadge status={status} />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={bug.priority} onValueChange={handlePriorityChange}>
                            <SelectTrigger>
                                <SelectValue>
                                    <BugPriorityIcon priority={bug.priority} showLabel />
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {(['Low', 'Medium', 'High', 'Critical'] as BugPriority[]).map(priority => (
                                    <SelectItem key={priority} value={priority}>
                                        <BugPriorityIcon priority={priority} showLabel />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{bug.category}</span>
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <Label>Assignee</Label>
                        <Select value={assignee?.id} onValueChange={handleAssigneeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Unassigned" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Reporter</Label>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={reporter?.avatarUrl} />
                                <AvatarFallback>{reporter?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{reporter?.name}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
