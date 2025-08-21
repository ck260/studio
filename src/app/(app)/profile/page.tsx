
"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { users } from '@/lib/data';

// This is a placeholder component.
// In a real app, you'd fetch user data from an auth context.
export default function ProfilePage() {
    const user = users[0]; // Using the first user as the current user for this example.

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
             <div>
                <h1 className="text-2xl font-bold font-headline">My Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and personal information.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                         <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                             <Button>Change Photo</Button>
                             <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
