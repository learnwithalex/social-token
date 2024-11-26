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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupabaseMutation } from "@/hooks/use-supabase";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  type: z.enum(["event", "merch", "nft", "membership"]),
  price: z.number().min(0),
  tokenRequirement: z.number().min(0),
  imageUrl: z.string().url(),
  details: z.record(z.string()),
});

export default function CreateExclusiveContent() {
  const { address } = useAccount();
  const { toast } = useToast();
  const { insert, loading } = useSupabaseMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "event",
      price: 0,
      tokenRequirement: 0,
      imageUrl: "",
      details: {},
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to create exclusive content",
        variant: "destructive",
      });
      return;
    }

    try {
      await insert("exclusive_content", {
        creator_id: address,
        title: values.title,
        description: values.description,
        type: values.type,
        price: values.price,
        token_requirement: values.tokenRequirement,
        image_url: values.imageUrl,
        details: values.details,
      });

      toast({
        title: "Success",
        description: "Exclusive content created successfully",
      });

      form.reset();
      setImagePreview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create exclusive content",
        variant: "destructive",
      });
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to your storage solution
    // For now, we'll just create a local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      form.setValue("imageUrl", "https://example.com/placeholder.jpg"); // Replace with actual upload URL
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-3xl font-bold">Create Exclusive Content</h1>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your exclusive content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="merch">Merchandise</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="membership">Membership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tokenRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Tokens</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum tokens required to access
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <div className="relative w-full max-w-md mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview(null);
                        form.setValue("imageUrl", "");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop or click to upload content image
                    </p>
                  </>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Choose File
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Content"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
