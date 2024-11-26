"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Database } from "@/lib/database.types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAccount } from "wagmi";

type Creator = Database["public"]["Tables"]["creators"]["Row"];

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const { address } = useAccount();
  const { toast } = useToast();

  const handleFollow = async () => {
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to follow creators",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("followers").insert({
        follower_id: address,
        following_id: creator.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `You are now following ${creator.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to follow creator. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={creator.profile_pic} alt={creator.name} />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{creator.name}</h3>
            <p className="text-sm text-muted-foreground">
              {creator.name.toLowerCase()}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleFollow}>
          Follow
        </Button>
      </div>

      <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
        Am a Chill Guy
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge key={`tech`} variant="secondary">
          Tech
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm font-medium">Followers</p>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div>
          <p className="text-sm font-medium">Token Price</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Button asChild>
          <Link href={`/profile/${creator.id}`}>View Profile</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/trade/${creator.id}`}>
            Buy Token
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
