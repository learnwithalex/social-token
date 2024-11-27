"use client";

import { useAccount } from "wagmi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseQuery } from "@/hooks/use-supabase";
import { TokenChart } from "@/components/token-chart";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  History,
  Coins,
} from "lucide-react";
import Link from "next/link";

export default function PortfolioPage() {
  const { address } = useAccount();

  const { data: holdings, loading: holdingsLoading } = useSupabaseQuery(
    "token_holders",
    {
      filter: { column: "holder_address", value: address },
      select: "*, tokens(*)",
    },
  );

  const { data: trades, loading: tradesLoading } = useSupabaseQuery("trades", {
    filter: { column: "trader_address", value: address },
    orderBy: { column: "created_at", ascending: false },
    limit: 5,
  });

  if (!address) {
    return (
      <div className="container py-20 px-5 text-center">
        <Card className="max-w-md mx-auto p-6">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-4">
            Connect your wallet to view your portfolio and trading history
          </p>
          <Button className="w-full">Connect Wallet</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10 px-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">
              Track your social token investments
            </p>
          </div>
          <Button asChild>
            <Link href="/trade/1">
              <Coins className="mr-2 h-4 w-4" /> Trade Tokens
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Portfolio Value</h2>
            {holdingsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold">$12,450.00</p>
                <p className="text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15.2% (24h)
                </p>
              </>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Total Tokens</h2>
            {holdingsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold">{holdings?.length || 0}</p>
                <p className="text-muted-foreground">Unique tokens held</p>
              </>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Trading Volume</h2>
            {tradesLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold">$3,245.00</p>
                <p className="text-muted-foreground">30-day volume</p>
              </>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Portfolio Performance</h2>
            <Button variant="outline" size="sm">
              <History className="mr-2 h-4 w-4" /> View History
            </Button>
          </div>
          <TokenChart />
        </Card>

        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdingsLoading
                    ? [1, 2, 3].map((i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className="h-4 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-16 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-20 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-16 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-8 w-16 ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    : holdings?.map((holding) => (
                        <TableRow key={holding.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{holding.token_id}</p>
                              <p className="text-sm text-muted-foreground">
                                {holding.balance} tokens
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {holding.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(holding.balance * 2.45).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="ml-auto">
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                              12.5%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" asChild>
                              <Link href={`/trade/${holding.token_id}`}>
                                Trade
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="trades">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tradesLoading
                    ? [1, 2, 3].map((i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className="h-4 w-16" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-16 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-16 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-20 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-24 ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    : trades?.map((trade) => (
                        <TableRow key={trade.id}>
                          <TableCell>
                            <Badge
                              variant={
                                trade.type === "buy" ? "default" : "destructive"
                              }
                              className="w-16 justify-center"
                            >
                              {trade.type === "buy" ? (
                                <ArrowUpRight className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="mr-1 h-3 w-3" />
                              )}
                              {trade.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{trade.token_id}</TableCell>
                          <TableCell className="text-right">
                            {trade.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            ${trade.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${trade.total.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {new Date(trade.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
