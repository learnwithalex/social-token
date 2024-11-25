"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenChart } from "@/components/token-chart";
import { Badge } from "@/components/ui/badge";
import { ContentFeed } from "@/components/content-feed";
import { TokenHolders } from "@/components/token-holders";
import { ExclusiveContent } from "@/components/exclusive-content";
import {
  Users,
  Wallet,
  Share2,
  MessageSquare,
  Star,
  ShieldCheck,
  Trophy,
  Coins,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const CREATOR_DATA = {
  id: "1",
  name: "Alex Rivers",
  handle: "@alexrivers",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  bio: "Tech influencer sharing insights on the latest innovations. Building the future of social tokens.",
  followers: "124K",
  following: "1.2K",
  tokenPrice: "$2.45",
  marketCap: "$2.4M",
  volume24h: "$45.2K",
  categories: ["Tech", "Education", "Crypto"],
  achievements: [
    { icon: <Trophy className="h-4 w-4" />, label: "Top Creator 2024" },
    { icon: <Star className="h-4 w-4" />, label: "Rising Star" },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "Verified" },
  ],
};

export default function CreatorProfile() {
  const params = useParams();
  const creatorId = params.id;

  return (
    <div className="container max-w-7xl py-10 px-4 sm:px-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="p-6 lg:col-span-1 h-fit sticky top-20">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={CREATOR_DATA.avatar} alt={CREATOR_DATA.name} />
              <AvatarFallback>{CREATOR_DATA.name[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{CREATOR_DATA.name}</h1>
            <p className="text-muted-foreground">{CREATOR_DATA.handle}</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {CREATOR_DATA.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm">{CREATOR_DATA.bio}</p>
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{CREATOR_DATA.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{CREATOR_DATA.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6 w-full">
              <Button className="flex-1">
                <Users className="mr-2 h-4 w-4" /> Follow
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-4">Token Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-bold">{CREATOR_DATA.tokenPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-bold">{CREATOR_DATA.marketCap}</p>
                </div>
                <div className="text-center col-span-2">
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="font-bold">{CREATOR_DATA.volume24h}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full" asChild>
                  <Link href={`/trade/${creatorId}`}>
                    Trade Token <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-4">Achievements</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {CREATOR_DATA.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="flex gap-1">
                    {achievement.icon}
                    {achievement.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">${CREATOR_DATA.tokenPrice}</h2>
                <p className="text-sm text-green-500">+12.5% (24h)</p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/trade/${creatorId}?action=buy`}>
                    <Wallet className="mr-2 h-4 w-4" /> Buy
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/trade/${creatorId}`}>
                    <Coins className="mr-2 h-4 w-4" /> Trade
                  </Link>
                </Button>
              </div>
            </div>
            <TokenChart />
          </Card>

          <Tabs defaultValue="content">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
              <TabsTrigger value="exclusive" className="flex-1">Exclusive</TabsTrigger>
              <TabsTrigger value="holders" className="flex-1">Token Holders</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ContentFeed />
            </TabsContent>
            <TabsContent value="exclusive">
              <ExclusiveContent creatorId={creatorId} />
            </TabsContent>
            <TabsContent value="holders">
              <Card className="p-6">
                <TokenHolders />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}