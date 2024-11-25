"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Trade {
  id: string;
  type: "buy" | "sell";
  amount: string;
  price: string;
  total: string;
  time: string;
}

const RECENT_TRADES: Trade[] = [
  {
    id: "1",
    type: "buy",
    amount: "500",
    price: "$2.45",
    total: "$1,225",
    time: "2 mins ago",
  },
  {
    id: "2",
    type: "sell",
    amount: "200",
    price: "$2.43",
    total: "$486",
    time: "5 mins ago",
  },
  {
    id: "3",
    type: "buy",
    amount: "1,000",
    price: "$2.42",
    total: "$2,420",
    time: "10 mins ago",
  },
];

export function TradeHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {RECENT_TRADES.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>
              <Badge
                variant={trade.type === "buy" ? "default" : "destructive"}
                className="flex w-16 items-center justify-center"
              >
                {trade.type === "buy" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {trade.type}
              </Badge>
            </TableCell>
            <TableCell>{trade.amount} $ALEX</TableCell>
            <TableCell>{trade.price}</TableCell>
            <TableCell>{trade.total}</TableCell>
            <TableCell className="text-right text-muted-foreground">
              {trade.time}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}