"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Package,
  Ticket,
  Crown,
  Lock,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface ExclusiveContentProps {
  creatorId: string;
}

const EXCLUSIVE_ITEMS = [
  {
    id: "1",
    type: "event",
    title: "Private Mentoring Session",
    description: "1-hour private mentoring session on tech entrepreneurship",
    date: "Mar 15, 2024",
    price: "100 $ALEX",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&auto=format&fit=crop&q=60",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: "2",
    type: "merch",
    title: "Limited Edition Hoodie",
    description: "Exclusive merch only available for token holders",
    price: "50 $ALEX",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "3",
    type: "nft",
    title: "Genesis NFT Collection",
    description: "Limited edition digital artwork collection",
    price: "200 $ALEX",
    image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=800&auto=format&fit=crop&q=60",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    id: "4",
    type: "membership",
    title: "VIP Membership",
    description: "Exclusive access to premium content and early releases",
    price: "500 $ALEX / year",
    image: "https://images.unsplash.com/photo-1550305080-4e029753abcf?w=800&auto=format&fit=crop&q=60",
    icon: <Crown className="h-5 w-5" />,
  },
];

export function ExclusiveContent({ creatorId }: ExclusiveContentProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {EXCLUSIVE_ITEMS.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-48">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 flex items-center gap-1"
            >
              {item.icon}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
            {item.date && (
              <p className="text-sm mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {item.date}
              </p>
            )}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                {item.price}
              </Badge>
              <Button asChild>
                <Link href={`/exclusive/${creatorId}/${item.id}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}