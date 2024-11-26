"use client";

import { useAccount } from "wagmi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSupabaseQuery } from "@/hooks/use-supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function TradeHistoryPage() {
  const { address } = useAccount();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: trades, loading } = useSupabaseQuery("trades", {
    filter: { column: "trader_address", value: address },
    orderBy: { column: "created_at", ascending: false },
  });

  const filteredTrades = trades
    ?.filter((trade) => {
      if (filter === "all") return true;
      return trade.type === filter;
    })
    .filter((trade) => {
      if (!searchQuery) return true;
      return trade.token_id.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trade History</h1>
            <p className="text-muted-foreground">
              View and analyze your trading activity
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by token..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trades</SelectItem>
                  <SelectItem value="buy">Buy Orders</SelectItem>
                  <SelectItem value="sell">Sell Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? [1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
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
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredTrades?.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          {new Date(trade.created_at).toLocaleDateString()}
                        </TableCell>
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
                        <TableCell className="text-right">
                          <Badge variant="secondary">Completed</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
