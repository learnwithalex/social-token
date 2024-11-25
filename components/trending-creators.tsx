"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSupabaseQuery } from "@/hooks/use-supabase";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function TrendingCreators() {
  const { data: creators, loading, error } = useSupabaseQuery('creators', {
    orderBy: { column: 'followers_count', ascending: false },
    limit: 3
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Trending Creators</h2>
          <Button variant="outline" asChild>
            <Link href="/explore">View All</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16 mt-2" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-20 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-20 mt-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading creators</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Trending Creators</h2>
        <Button variant="outline" asChild>
          <Link href="/explore">View All</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <Card key={creator.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={creator.avatar_url} alt={creator.name} />
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground">{creator.handle}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Followers</p>
                <p className="text-2xl font-bold">
                  {creator.followers_count.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Token Price</p>
                <p className="text-2xl font-bold">
                  ${creator.token_price.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}