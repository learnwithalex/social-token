"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectWallet } from "@/components/connect-wallet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coins,
  ChevronDown,
  Compass,
  BarChart3,
  Crown,
  PlusCircle,
  Droplets,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 justify-between px-5">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Coins className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            TokenSphere
          </span>
        </Link>

        <NavigationMenu className="mx-6 hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/explore" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={isActive("/explore")}
                >
                  <Compass className="mr-2 h-4 w-4" />
                  Explore
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="-ml-4">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Trade
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/market">Market Overview</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/liquidity">Liquidity Pools</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/exclusive" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={isActive("/exclusive")}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Exclusive
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/create">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Token
            </Link>
          </Button>
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/liquidity">
              <Droplets className="mr-2 h-4 w-4" /> Add Liquidity
            </Link>
          </Button>
          <ThemeToggle />
          <ConnectWallet />
        </div>
      </div>
    </motion.header>
  );
}
