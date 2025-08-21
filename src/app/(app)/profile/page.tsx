
"use client"

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { users } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { User } from '@/lib/types';


const profileFormSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


// This is a placeholder component.
// In a real app, you'd fetch user data from an auth context.
export default function ProfilePage() {
    // In a real app, this would come from a context or API call.
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const { toast } = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        // Use localStorage to persist user data client-side for this demo
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        } else {
            setCurrentUser(users[0]);
        }
    }, []);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        values: { // use `values` to keep form in sync with state
            name: currentUser?.name || '',
            email: currentUser?.email || '',
        },
    });
    
    // Reset form when currentUser changes
     React.useEffect(() => {
        if (currentUser) {
            form.reset({
                name: currentUser.name,
                email: currentUser.email,
            });
        }
    }, [currentUser, form]);

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    const onSubmit = (data: ProfileFormValues) => {
        const updatedUser = {
            ...(currentUser as User),
            name: data.name,
            email: data.email,
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage')); // Notify other components

        toast({
          title: "Profile Updated",
          description: "Your changes have been saved successfully.",
        });
    }

    const handlePhotoChangeClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newAvatarUrl = reader.result as string;
                const updatedUser = {
                    ...(currentUser as User),
                    avatarUrl: newAvatarUrl,
                }
                setCurrentUser(updatedUser);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                 window.dispatchEvent(new Event('storage')); // Notify other components

                toast({
                  title: "Photo Updated",
                  description: "Your new profile photo has been set.",
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    if (!currentUser) {
        return <div>Loading profile...</div>;
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/gif"
                                        onChange={handleFileChange}
                                    />
                                    <Button type="button" onClick={handlePhotoChangeClick}>Change Photo</Button>
                                    <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
