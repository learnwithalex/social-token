"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Lock } from "lucide-react";

interface Post {
  id: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isExclusive: boolean;
}

interface ContentFeedProps {
  posts?: Post[];
  creatorId: string;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    content: "Just launched a new tech tutorial series! Early access for token holders 🚀",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    timestamp: "2h ago",
    likes: 128,
    comments: 32,
    isExclusive: true,
  },
  {
    id: "2",
    content: "Sharing my thoughts on the future of social tokens and creator economy. What are your views?",
    timestamp: "5h ago",
    likes: 256,
    comments: 45,
    isExclusive: false,
  },
];

export function ContentFeed({ posts = SAMPLE_POSTS }: ContentFeedProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-6">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Alex Rivers</p>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
                {post.isExclusive && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Exclusive
                  </Badge>
                )}
              </div>
              <p className="mt-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="mt-4 rounded-lg w-full object-cover max-h-96"
                />
              )}
              <div className="flex items-center gap-4 mt-4">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}