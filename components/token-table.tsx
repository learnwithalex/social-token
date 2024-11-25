"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useSupabaseQuery } from "@/hooks/use-supabase";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface TokenTableProps {
  type: "trending" | "gainers" | "new" | "all";
}

export function TokenTable({ type }: TokenTableProps) {
  const options = {
    orderBy: type === "new" 
      ? { column: 'created_at', ascending: false }
      : type === "gainers"
      ? { column: 'price', ascending: false }
      : { column: 'volume_24h', ascending: false },
    limit: type === "all" ? undefined : 5
  };

  const { data: tokens, loading, error } = useSupabaseQuery('tokens', options);

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell>
                <div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-16 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (error) {
    return <div>Error loading tokens</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">24h Change</TableHead>
          <TableHead className="text-right">Volume</TableHead>
          <TableHead className="text-right">Market Cap</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => {
          const priceChange = ((token.price - token.price) / token.price) * 100;
          
          return (
            <TableRow key={token.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${token.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className={`flex items-center justify-end ${
                  priceChange > 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {priceChange > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(priceChange).toFixed(1)}%
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${token.volume_24h.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${token.market_cap.toLocaleString()}
              </TableCell>
              <TableCell>
                <Button size="sm" asChild>
                  <Link href={`/trade/${token.id}`}>Trade</Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}