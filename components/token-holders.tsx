"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TokenHolder {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  tokens: number;
  percentage: number;
  since: string;
}

const TOKEN_HOLDERS: TokenHolder[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    handle: "@sarahchen",
    tokens: 25000,
    percentage: 5.2,
    since: "3 months ago",
  },
  {
    id: "2",
    name: "Marcus Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    handle: "@marcuskim",
    tokens: 15000,
    percentage: 3.1,
    since: "2 months ago",
  },
];

export function TokenHolders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Holder</TableHead>
          <TableHead className="text-right">Tokens</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
          <TableHead className="text-right">Holding Since</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TOKEN_HOLDERS.map((holder) => (
          <TableRow key={holder.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={holder.avatar} alt={holder.name} />
                  <AvatarFallback>{holder.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{holder.name}</p>
                  <p className="text-sm text-muted-foreground">{holder.handle}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">
              {holder.tokens.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">{holder.percentage}%</Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {holder.since}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}