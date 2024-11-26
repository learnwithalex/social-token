"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseQuery } from "@/hooks/use-supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenChart } from "@/components/token-chart";
import { ExclusiveContent } from "@/components/exclusive-content";
import { TokenHolders } from "@/components/token-holders";
import { ContentFeed } from "@/components/content-feed";
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
  Settings,
  Globe,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const { address: userAddress } = useAccount();
  const isOwnProfile = userAddress === params.address;

  const { data: profile, loading } = useSupabaseQuery("creators", {
    filter: { column: "wallet_address", value: params.address },
    select: "*",
  });

  const { data: token } = useSupabaseQuery("tokens", {
    filter: { column: "creator_id", value: params.address },
    select: "*",
  });

  if (loading) {
    return (
      <div className="container max-w-7xl py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-1 h-fit">
            <div className="flex flex-col items-center text-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </div>
          </Card>
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Skeleton className="h-[300px] w-full" />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-20 text-center">
        <Card className="max-w-md mx-auto p-6">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-4">
            This creator profile does not exist
          </p>
          <Button asChild>
            <Link href="/explore">Explore Creators</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1 h-fit sticky top-20">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profile.avatar_url} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.handle}</p>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {profile.categories?.map((category: string) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <p className="mt-4 text-sm">{profile.bio}</p>

            {profile.website || profile.twitter || profile.instagram ? (
              <div className="flex gap-4 mt-4">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {profile.twitter && (
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            ) : null}

            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{profile.followers_count}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profile.following_count}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 w-full">
              {isOwnProfile ? (
                <Button className="flex-1" asChild>
                  <Link href="/profile/edit">
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </Link>
                </Button>
              ) : (
                <Button className="flex-1">
                  <Users className="mr-2 h-4 w-4" /> Follow
                </Button>
              )}
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>

            {token && (
              <div className="w-full mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-4">Token Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold">${token.price}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-bold">${token.market_cap}</p>
                  </div>
                  <div className="text-center col-span-2">
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="font-bold">${token.volume_24h}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full" asChild>
                    <Link href={`/trade/${token.id}`}>
                      Trade Token <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="w-full mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-4">Achievements</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="flex gap-1">
                  <Trophy className="h-4 w-4" />
                  Top Creator 2024
                </Badge>
                <Badge variant="outline" className="flex gap-1">
                  <Star className="h-4 w-4" />
                  Rising Star
                </Badge>
                <Badge variant="outline" className="flex gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {token && (
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">${token.price}</h2>
                  <p className="text-sm text-green-500">+12.5% (24h)</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={`/trade/${token.id}?action=buy`}>
                      <Wallet className="mr-2 h-4 w-4" /> Buy
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/trade/${token.id}`}>
                      <Coins className="mr-2 h-4 w-4" /> Trade
                    </Link>
                  </Button>
                </div>
              </div>
              <TokenChart />
            </Card>
          )}

          <Tabs defaultValue="content">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">
                Content
              </TabsTrigger>
              <TabsTrigger value="exclusive" className="flex-1">
                Exclusive
              </TabsTrigger>
              <TabsTrigger value="holders" className="flex-1">
                Token Holders
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ContentFeed creatorId={params.address as string} />
            </TabsContent>
            <TabsContent value="exclusive">
              <ExclusiveContent creatorId={params.address as string} />
            </TabsContent>
            <TabsContent value="holders">
              <Card className="p-6">
                <TokenHolders tokenId={token?.id} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
