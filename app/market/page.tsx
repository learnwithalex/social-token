"use client";

import { Card } from "@/components/ui/card";
import { TokenChart } from "@/components/token-chart";
import { TokenTable } from "@/components/token-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";

export default function MarketPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Token Market</h1>
            <p className="text-muted-foreground">Trade and track social tokens</p>
          </div>
          <Button asChild>
            <a href="/create">Launch Token</a>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">$ALEX</h2>
                <p className="text-sm text-muted-foreground">Alex Rivers Token</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$2.45</p>
                <p className="text-sm text-green-500 flex items-center justify-end">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </p>
              </div>
            </div>
            <TokenChart />
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tokens..." className="flex-1" />
            </div>
            <Tabs defaultValue="trending">
              <TabsList className="w-full">
                <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
                <TabsTrigger value="gainers" className="flex-1">Top Gainers</TabsTrigger>
                <TabsTrigger value="new" className="flex-1">New</TabsTrigger>
              </TabsList>
              <TabsContent value="trending">
                <TokenTable type="trending" />
              </TabsContent>
              <TabsContent value="gainers">
                <TokenTable type="gainers" />
              </TabsContent>
              <TabsContent value="new">
                <TokenTable type="new" />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">All Tokens</h2>
          <TokenTable type="all" />
        </Card>
      </div>
    </div>
  );
}