"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, ExternalLink } from "lucide-react";

const POSITIONS = [
  {
    id: "1",
    pair: "$ALEX/USDC",
    liquidity: "$4,900",
    share: "0.3%",
    apr: "24.5%",
    earnings: "$450",
  },
  {
    id: "2",
    pair: "$SARAH/ETH",
    liquidity: "$2,800",
    share: "0.15%",
    apr: "18.2%",
    earnings: "$180",
  },
];

export function LiquidityPositions() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Positions</h2>
        <Button variant="outline" size="sm">
          View History <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pool</TableHead>
            <TableHead className="text-right">Liquidity</TableHead>
            <TableHead className="text-right">Share</TableHead>
            <TableHead className="text-right">APR</TableHead>
            <TableHead className="text-right">Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {POSITIONS.map((position) => (
            <TableRow key={position.id}>
              <TableCell className="font-medium">{position.pair}</TableCell>
              <TableCell className="text-right">{position.liquidity}</TableCell>
              <TableCell className="text-right">{position.share}</TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary" className="flex items-center gap-1 justify-end">
                  <TrendingUp className="h-3 w-3" />
                  {position.apr}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-green-500">
                {position.earnings}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}