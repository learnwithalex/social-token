"use client";

import { useState } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Minus,
  Info,
  Coins,
  ArrowRightLeft,
  TrendingUp,
} from "lucide-react";
import { LiquidityPositions } from "@/components/liquidity-positions";

export default function LiquidityPage() {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  return (
    <div className="container max-w-7xl py-10 px-4 sm:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Liquidity Pool</h1>
          <p className="text-muted-foreground">
            Add liquidity to earn fees from trades
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="add">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="add">Add Liquidity</TabsTrigger>
                  <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
                </TabsList>

                <TabsContent value="add" className="space-y-6">
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Token Amount</label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter the amount of tokens to add to the pool</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex gap-4">
                        <Select>
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
                          value={amount1}
                          onChange={(e) => setAmount1(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Paired With</label>
                      <div className="flex gap-4">
                        <Select>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="usdc">USDC</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount2}
                          onChange={(e) => setAmount2(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pool Share</span>
                        <span className="font-medium">0.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Annual APR</span>
                        <span className="font-medium text-green-500">24.5%</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Liquidity
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="remove" className="space-y-6">
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5" />
                          <span className="font-medium">Your Position</span>
                        </div>
                        <Badge variant="secondary">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          24.5% APR
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>$ALEX</span>
                          <span className="font-medium">1,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>USDC</span>
                          <span className="font-medium">2,450</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pool Share</span>
                          <span className="font-medium">0.3%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount to Remove</label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>You'll Receive</span>
                        <div className="text-right">
                          <div>500 $ALEX</div>
                          <div>1,225 USDC</div>
                        </div>
                      </div>
                    </div>

                    <Button variant="destructive" className="w-full">
                      <Minus className="mr-2 h-4 w-4" /> Remove Liquidity
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <LiquidityPositions />
          </div>

          <Card className="p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">About Liquidity Pools</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coins className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Earn Trading Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn a share of trading fees by providing liquidity to the pool
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Support Creators</h3>
                  <p className="text-sm text-muted-foreground">
                    Help creators by providing liquidity for their tokens
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Competitive APR</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn competitive returns on your provided liquidity
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}