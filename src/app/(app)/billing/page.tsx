
"use client"

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// This is a placeholder component for a billing page.
export default function BillingPage() {
    const { toast } = useToast();

    const handlePlanChange = () => {
        toast({
            title: "Plan Changed",
            description: "Your subscription plan has been updated.",
        });
    }

    const handleSubscriptionCancel = () => {
        toast({
            title: "Subscription Canceled",
            description: "Your subscription has been canceled and will not renew.",
            variant: "destructive",
        });
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
             <div>
                <h1 className="text-2xl font-bold font-headline">Billing</h1>
                <p className="text-muted-foreground">Manage your subscription and view your payment history.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>You are currently on the Pro plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                            <div>
                                <h3 className="font-semibold">Pro Plan</h3>
                                <p className="text-sm text-muted-foreground">Renews on December 21, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">$29</p>
                                <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Change Plan</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Subscription Plan</DialogTitle>
                                        <DialogDescription>Select a new plan that fits your needs.</DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <RadioGroup defaultValue="pro">
                                            <div className="flex items-center justify-between p-4 border rounded-md">
                                                <div>
                                                    <Label htmlFor="free" className="font-semibold">Free Plan</Label>
                                                    <p className="text-sm text-muted-foreground">$0/month - Basic features</p>
                                                </div>
                                                <RadioGroupItem value="free" id="free" />
                                            </div>
                                             <div className="flex items-center justify-between p-4 border rounded-md border-primary ring-2 ring-primary">
                                                <div>
                                                    <Label htmlFor="pro" className="font-semibold">Pro Plan</Label>
                                                     <p className="text-sm text-muted-foreground">$29/month - Advanced features</p>
                                                </div>
                                                <RadioGroupItem value="pro" id="pro" />
                                            </div>
                                             <div className="flex items-center justify-between p-4 border rounded-md">
                                                <div>
                                                    <Label htmlFor="enterprise" className="font-semibold">Enterprise</Label>
                                                     <p className="text-sm text-muted-foreground">Contact Us - For large teams</p>
                                                </div>
                                                <RadioGroupItem value="enterprise" id="enterprise" />
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handlePlanChange}>Confirm Change</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Cancel Subscription</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Your subscription will be canceled at the end of the current billing period.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSubscriptionCancel} className="bg-destructive hover:bg-destructive/90">Confirm Cancellation</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Your default payment method.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32" className="h-8"><path fill="#3F64E6" d="M35 0H13C5.82 0 0 5.82 0 13v6c0 7.18 5.82 13 13 13h22c7.18 0 13-5.82 13-13v-6C48 5.82 42.18 0 35 0z"></path><path fill="#fff" d="M14 16.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5S22.53 22 19.5 22S14 19.53 14 16.5zm6.5-1.15c.34-.34.34-.89 0-1.23a.87.87 0 00-1.23 0l-1.92 1.92-1.07-1.07a.87.87 0 00-1.23 0 .87.87 0 000 1.23l1.7 1.7a.87.87 0 001.23 0l2.52-2.55zm-8.85 4.35H27a1 1 0 100-2H11.65a1 1 0 100 2z"></path></svg>
                            <div>
                                <p className="font-semibold">Visa ending in 1234</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2028</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Update Payment Method</Button>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>View your recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-muted-foreground">
                                <th className="pb-2 font-normal">Date</th>
                                <th className="pb-2 font-normal">Description</th>
                                <th className="pb-2 font-normal text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">Nov 21, 2024</td>
                                <td className="py-2">Pro Plan - Monthly</td>
                                <td className="py-2 text-right font-medium">$29.00</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Oct 21, 2024</td>
                                <td className="py-2">Pro Plan - Monthly</td>
                                <td className="py-2 text-right font-medium">$29.00</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Sep 21, 2024</td>
                                <td className="py-2">Pro Plan - Monthly</td>
                                <td className="py-2 text-right font-medium">$29.00</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
