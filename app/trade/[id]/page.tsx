"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenChart } from "@/components/token-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Info,
  History,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { TradeHistory } from "@/components/trade-history";

export default function TradePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState("");
  const defaultTab = searchParams.get("action") || "buy";

  const handleTrade = () => {
    // Handle trade logic
    console.log("Trading:", amount);
  };

  return (
    <div className="container max-w-7xl py-10 px-4 sm:px-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">$ALEX</h1>
                <p className="text-sm text-muted-foreground">Alex Rivers Token</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$2.45</p>
                <p className="text-sm text-green-500 flex items-center justify-end">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +12.5%
                </p>
              </div>
            </div>
            <TokenChart />
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Trade History</h2>
              <Button variant="outline" size="sm">
                <History className="mr-2 h-4 w-4" /> View All
              </Button>
            </div>
            <TradeHistory />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="swap">Swap</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Amount (USD)</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the amount in USD you want to spend</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    You will receive: {amount ? (Number(amount) / 2.45).toFixed(2) : "0"} $ALEX
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exchange Rate</span>
                    <span>1 $ALEX = $2.45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee</span>
                    <span>$0.50</span>
                  </div>
                </div>

                <Button className="w-full" onClick={handleTrade}>
                  <Wallet className="mr-2 h-4 w-4" /> Buy Tokens
                </Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount ($ALEX)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    You will receive: ${amount ? (Number(amount) * 2.45).toFixed(2) : "0"}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exchange Rate</span>
                    <span>1 $ALEX = $2.45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee</span>
                    <span>$0.50</span>
                  </div>
                </div>

                <Button className="w-full" variant="destructive" onClick={handleTrade}>
                  <ArrowDownRight className="mr-2 h-4 w-4" /> Sell Tokens
                </Button>
              </TabsContent>

              <TabsContent value="swap" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex gap-4">
                      <Select defaultValue="alex">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alex">$ALEX</SelectItem>
                          <SelectItem value="sarah">$SARAH</SelectItem>
                          <SelectItem value="marcus">$MARCUS</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="ghost" size="icon">
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <div className="flex gap-4">
                      <Select defaultValue="sarah">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">$SARAH</SelectItem>
                          <SelectItem value="marcus">$MARCUS</SelectItem>
                          <SelectItem value="alex">$ALEX</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exchange Rate</span>
                    <span>1 $ALEX = 1.3 $SARAH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee</span>
                    <span>$0.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price Impact</span>
                    <Badge variant="secondary">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      0.05%
                    </Badge>
                  </div>
                </div>

                <Button className="w-full" onClick={handleTrade}>
                  <ArrowLeftRight className="mr-2 h-4 w-4" /> Swap Tokens
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Market Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">$2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Volume</span>
                <span className="font-medium">$45.2K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holders</span>
                <span className="font-medium">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Circulating Supply</span>
                <span className="font-medium">980,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}