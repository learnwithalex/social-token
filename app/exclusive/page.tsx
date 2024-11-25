"use client";

import { useAccount } from 'wagmi';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";

const EXCLUSIVE_CONTENT = [
  {
    id: 1,
    title: "Private Mentoring Session",
    creator: "Alex Rivers",
    tokenRequired: "$ALEX",
    minAmount: 100,
    description: "1-hour private mentoring session on tech entrepreneurship",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Exclusive Workout Program",
    creator: "Sarah Chen",
    tokenRequired: "$SARAH",
    minAmount: 50,
    description: "4-week personalized fitness program with weekly check-ins",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Limited Edition NFT",
    creator: "Marcus Kim",
    tokenRequired: "$MARCUS",
    minAmount: 200,
    description: "Exclusive access to limited edition digital artwork",
    image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=800&auto=format&fit=crop&q=60",
  },
];

export default function ExclusivePage() {
  const { isConnected } = useAccount();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            Exclusive Content
          </h1>
          <p className="text-muted-foreground">
            Access exclusive perks and content by holding creator tokens
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {EXCLUSIVE_CONTENT.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {content.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium">Required Token</p>
                      <p className="text-primary font-bold">{content.tokenRequired}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Min Amount</p>
                      <p className="font-bold">{content.minAmount}</p>
                    </div>
                  </div>
                  <Button className="w-full" disabled={!isConnected}>
                    {isConnected ? (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Access Content
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Connect Wallet to Access
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}