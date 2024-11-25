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
import { CreatorCard } from "@/components/creator-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";

type Creator = Database["public"]["Tables"]["creators"]["Row"];

async function getCreators(): Promise<Creator[]> {
  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .order("followers_count", { ascending: false });

  if (error) {
    console.error("Error fetching creators:", error);
    return [];
  }

  return data;
}

export default async function ExplorePage() {
  const creators = await getCreators();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Explore Creators</h1>
          <Button asChild>
            <a href="/create">Become a Creator</a>
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search creators..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="art">Art & Design</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
}