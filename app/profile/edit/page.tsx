"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseMutation, useSupabaseQuery } from "@/hooks/use-supabase";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "node:crypto";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  handle: z.string().min(2).max(30),
  bio: z.string().max(500),
  profile_pic: z.string().url().optional(),
  categories: z.array(z.string()),
});

// Extend the existing type to include updated_at
type ProfileUpdate = z.infer<typeof formSchema> & { updated_at: string };

export default function EditProfilePage() {
  const { address } = useAccount();
  const { toast } = useToast();
  const { update, loading } = useSupabaseMutation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: profile, loading: profileLoading } = useSupabaseQuery(
    "creators",
    {
      filter: { column: "wallet_address", value: address },
      select: "*",
    },
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile[0]?.name || "",
      handle: profile[0]?.name.toLowerCase() || "",
      bio: profile[0]?.bio || "",
      profile_pic: profile[0]?.profile_pic || "",
      categories: profile[0]?.categories || [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to update profile",
        variant: "destructive",
      });
      return;
    }

    try {
      await update("creators", address, {
        ...values,
        updated_at: new Date().toISOString(),
      } as ProfileUpdate);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to your storage solution
    const reader = new FileReader();
    reader.onloadend = async () => {
      setAvatarPreview(reader.result as string);
      const { data: uploadData, error: uploadError } = await supabase.storage
      .from("contents") // Replace with your Supabase bucket name
      .upload(`contents/${randomUUID()}-${Date.now()}`, file);

    if (uploadError) throw uploadError;

    const tokenIconUrl = supabase.storage
      .from("contents")
      .getPublicUrl(uploadData.path).data?.publicUrl;
      form.setValue("profile_pic", "https://example.com/placeholder.jpg"); // Replace with actual upload URL
    };
    reader.readAsDataURL(file);
  };

  if (profileLoading) {
    return (
      <div className="container max-w-2xl py-10">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatarPreview || profile[0]?.profile_pic}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {profile[0]?.name?.[0] || address?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                >
                  <ImagePlus className="h-4 w-4" />
                </Button>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your unique username on the platform
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
