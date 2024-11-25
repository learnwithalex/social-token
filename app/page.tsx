import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingCreators } from '@/components/trending-creators';
import { FeaturedTokens } from '@/components/featured-tokens';
import Link from 'next/link';
import { ArrowRight, Coins, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Connect with Creators Through
              <span className="text-primary block">Social Tokens</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Issue, trade, and collect social tokens from your favorite creators. Unlock exclusive content and join thriving communities.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/explore">
                  Explore Creators <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/create">Become a Creator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Issue Tokens</h3>
              <p className="text-muted-foreground">
                Create and manage your own social tokens with customizable features and utility.
              </p>
            </Card>
            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Build Community</h3>
              <p className="text-muted-foreground">
                Connect with fans through token-gated content and exclusive experiences.
              </p>
            </Card>
            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Trade & Earn</h3>
              <p className="text-muted-foreground">
                Buy, sell, and trade social tokens in a secure and user-friendly marketplace.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <TrendingCreators />
          <FeaturedTokens />
        </div>
      </section>
    </div>
  );
}