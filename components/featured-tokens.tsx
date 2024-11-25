"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

const FEATURED_TOKENS = [
  {
    id: 1,
    name: "$ALEX",
    creator: "Alex Rivers",
    price: 2.45,
    change: 12.5,
    volume: "45.2K",
    marketCap: "2.4M",
  },
  {
    id: 2,
    name: "$SARAH",
    creator: "Sarah Chen",
    price: 1.87,
    change: -5.2,
    volume: "32.1K",
    marketCap: "1.8M",
  },
  {
    id: 3,
    name: "$MARCUS",
    creator: "Marcus Kim",
    price: 3.21,
    change: 8.7,
    volume: "67.8K",
    marketCap: "3.2M",
  },
];

export function FeaturedTokens() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Featured Tokens</h2>
        <Button variant="outline" asChild>
          <Link href="/market">View Market</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED_TOKENS.map((token) => (
          <Card key={token.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{token.name}</h3>
                <p className="text-sm text-muted-foreground">{token.creator}</p>
              </div>
              <div className={`flex items-center ${token.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {token.change > 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="font-medium">{Math.abs(token.change)}%</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-bold">${token.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-lg font-bold">${token.volume}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-bold">${token.marketCap}</p>
              </div>
            </div>
            <Button className="w-full mt-4">Trade</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}