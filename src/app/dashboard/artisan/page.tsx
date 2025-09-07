
'use client';

import { useState }from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, CreditCard, Activity, Download } from "lucide-react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';

const earningsData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4500 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 7000 },
  { name: 'Jul', earnings: 8000 },
];

const transactions = [
    { id: 'txn1', date: '2024-07-28', description: 'Payment from Femi Adebayo', amount: 15000, status: 'Completed' },
    { id: 'txn2', date: '2024-07-27', description: 'Withdrawal to GTBank', amount: -25000, status: 'Completed' },
    { id: 'txn3', date: '2024-07-25', description: 'Payment from Ngozi Okafor', amount: 8500, status: 'Completed' },
    { id: 'txn4', date: '2024-07-22', description: 'Payment from Chioma Nwosu', amount: 12000, status: 'Pending' },
    { id: 'txn5', date: '2024-07-20', description: 'Withdrawal to Kuda Bank', amount: -50000, status: 'Failed' },
]

const nigerianBanks = [
    "Access Bank", "Citibank", "Ecobank Nigeria", "Fidelity Bank", "First Bank of Nigeria", "First City Monument Bank", "Globus Bank", "Guaranty Trust Bank", "Heritage Bank", "Jaiz Bank", "Keystone Bank", "Kuda Bank", "Parallex Bank", "Polaris Bank", "Providus Bank", "Stanbic IBTC Bank", "Standard Chartered", "Sterling Bank", "SunTrust Bank", "TAJBank", "Titan Trust Bank", "Union Bank of Nigeria", "United Bank for Africa", "Unity Bank", "Wema Bank", "Zenith Bank"
];


export default function ArtisanDashboard() {
  const { toast } = useToast();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Withdrawal Initiated",
      description: `Your withdrawal of ₦${withdrawalAmount} is being processed.`,
    });
    setWithdrawalAmount('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₦45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+23</div>
                    <p className="text-xs text-muted-foreground">+10 since last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₦12,750.00</div>
                    <p className="text-xs text-muted-foreground">Pending clearance: ₦3,400.00</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4.8 / 5</div>
                    <p className="text-xs text-muted-foreground">Based on 125 reviews</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your earnings over the last 7 months.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={earningsData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))'
                              }}
                            />
                            <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEarnings)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Withdraw Funds</CardTitle>
                    <CardDescription>Transfer your earnings to your bank account.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={handleWithdraw} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bank">Bank</Label>
                            <Select>
                                <SelectTrigger id="bank">
                                    <SelectValue placeholder="Select your bank" />
                                </SelectTrigger>
                                <SelectContent>
                                    {nigerianBanks.map(bank => (
                                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" type="text" placeholder="0123456789" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="amount">Amount (₦)</Label>
                            <Input 
                              id="amount" 
                              type="number" 
                              placeholder="e.g. 5000" 
                              value={withdrawalAmount}
                              onChange={(e) => setWithdrawalAmount(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">Withdraw</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex-row justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A list of your recent payments and withdrawals.</CardDescription>
            </div>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download Statement</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                   <TableRow key={txn.id}>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell className={`text-right font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={txn.status === 'Completed' ? 'default' : txn.status === 'Pending' ? 'secondary' : 'destructive'}>
                        {txn.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
