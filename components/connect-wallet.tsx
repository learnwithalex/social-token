"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function ConnectWallet() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      checkAddressInDatabase();
    }
  }, [isConnected, address]);

  const checkAddressInDatabase = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("wallet_address", address)
        .single();

      if (error && error.code !== "PGRST116") {
        // Handle unexpected errors
        throw error;
      }

      if (!data) {
        // Address not found in the database; show the modal
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error checking wallet address:", error);
      toast({
        title: "Error",
        description: "Failed to check wallet address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!creatorName || !profilePic) {
      toast({
        title: "Error",
        description: "Please provide a name and upload a profile picture.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Upload profile picture to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile-pictures") // Replace with your Supabase bucket name
        .upload(`creators/${address}-${Date.now()}`, profilePic);

      if (uploadError) throw uploadError;

      const profilePicUrl = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(uploadData.path).data?.publicUrl;

      // Insert creator data into database
      const { error: insertError } = await supabase.from("creators").insert([
        {
          wallet_address: address,
          name: creatorName,
          profile_pic: profilePicUrl,
        },
      ]);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Creator profile created successfully!",
      });
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error creating creator profile:", error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isConnected ? (
        <Button
          onClick={() => open()}
          className="bg-gradient-to-r from-primary to-orange-500"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-primary">
              <Wallet className="mr-2 h-4 w-4" />
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={`/profile/user/${address}`}>Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/portfolio">Portfolio</a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => disconnect()}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Creator Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter your name"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
            />
            <Input
              type="file"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
