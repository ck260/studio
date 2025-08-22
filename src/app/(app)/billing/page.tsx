
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
import { format } from 'date-fns';

type Plan = {
    id: 'free' | 'pro' | 'enterprise';
    name: string;
    price: number;
    description: string;
    features: string;
};

type PaymentHistoryItem = {
    id: string;
    date: Date;
    description: string;
    amount: number;
};

const plans: Record<Plan['id'], Plan> = {
    free: { id: 'free', name: 'Free Plan', price: 0, description: '$0/month', features: 'Basic features' },
    pro: { id: 'pro', name: 'Pro Plan', price: 29, description: '$29/month', features: 'Advanced features' },
    enterprise: { id: 'enterprise', name: 'Enterprise', price: 0, description: 'Contact Us', features: 'For large teams' },
};

const initialPaymentHistory: PaymentHistoryItem[] = [
    { id: 'tx_3', date: new Date(2024, 8, 21), description: 'Pro Plan - Monthly', amount: 29.00 },
    { id: 'tx_2', date: new Date(2024, 9, 21), description: 'Pro Plan - Monthly', amount: 29.00 },
    { id: 'tx_1', date: new Date(2024, 10, 21), description: 'Pro Plan - Monthly', amount: 29.00 },
];

export default function BillingPage() {
    const { toast } = useToast();
    const [isPlanDialogOpen, setPlanDialogOpen] = React.useState(false);
    const [selectedPlanId, setSelectedPlanId] = React.useState<Plan['id']>('pro');
    const [currentPlan, setCurrentPlan] = React.useState<Plan>(plans.pro);
    const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistoryItem[]>(initialPaymentHistory);
    const [isSubscribed, setIsSubscribed] = React.useState(true);

    const renewalDate = new Date();
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    const handlePlanChange = () => {
        const newPlan = plans[selectedPlanId];
        setCurrentPlan(newPlan);

        if (newPlan.price > 0) {
            const newPayment: PaymentHistoryItem = {
                id: `tx_${paymentHistory.length + 1}`,
                date: new Date(),
                description: `${newPlan.name} - Monthly`,
                amount: newPlan.price,
            }
            setPaymentHistory(prev => [newPayment, ...prev]);
        }
        
        setIsSubscribed(true); // Re-subscribe if they choose a plan
        
        toast({
            title: "Plan Changed",
            description: `Your subscription plan has been updated to ${newPlan.name}.`,
        });
        setPlanDialogOpen(false);
    }

    const handleSubscriptionCancel = () => {
        setIsSubscribed(false);
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
                        <CardDescription>{isSubscribed ? `You are currently on the ${currentPlan.name}.` : "You do not have an active subscription."}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {isSubscribed ? (
                         <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                            <div>
                                <h3 className="font-semibold">{currentPlan.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {currentPlan.price > 0 ? `Renews on ${format(renewalDate, "MMMM dd, yyyy")}`: "Free forever"}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">${currentPlan.price}</p>
                                <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                        </div>
                       ) : (
                           <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 text-center">
                                <h3 className="font-semibold">No Active Plan</h3>
                                <p className="text-sm text-muted-foreground">Choose a plan to get started.</p>
                           </div>
                       )}
                        <div className="flex justify-end gap-2">
                             <Dialog open={isPlanDialogOpen} onOpenChange={setPlanDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Change Plan</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Subscription Plan</DialogTitle>
                                        <DialogDescription>Select a new plan that fits your needs.</DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <RadioGroup value={selectedPlanId} onValueChange={(value: Plan['id']) => setSelectedPlanId(value)}>
                                            {(Object.values(plans) as Plan[]).map(plan => (
                                                <div 
                                                    key={plan.id}
                                                    className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${selectedPlanId === plan.id ? 'border-primary ring-2 ring-primary' : ''}`}
                                                    onClick={() => setSelectedPlanId(plan.id)}
                                                >
                                                    <div>
                                                        <Label htmlFor={plan.id} className="font-semibold cursor-pointer">{plan.name}</Label>
                                                        <p className="text-sm text-muted-foreground">{plan.description} - {plan.features}</p>
                                                    </div>
                                                    <RadioGroupItem value={plan.id} id={plan.id} />
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => setPlanDialogOpen(false)} variant="ghost">Cancel</Button>
                                        <Button onClick={handlePlanChange}>Confirm Change</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={!isSubscribed}>Cancel Subscription</Button>
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
                            {paymentHistory.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-2">{format(item.date, "MMM dd, yyyy")}</td>
                                    <td className="py-2">{item.description}</td>
                                    <td className="py-2 text-right font-medium">${item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {!isSubscribed && paymentHistory.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No payment history to display.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
