"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Coins, ImagePlus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  symbol: z.string().min(1).max(10),
  description: z.string().min(10).max(500),
  initialSupply: z.string().min(1),
  price: z.string().min(1),
});

export default function CreateToken() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      initialSupply: "",
      price: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle token creation
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center space-x-2 mb-6">
        <Coins className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Create Your Social Token</h1>
      </div>
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Community Token" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a memorable name for your token
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="MCT" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short identifier for your token (e.g., BTC, ETH)
                  </FormDescription>
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
                      placeholder="Tell your community about your token and its benefits..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="initialSupply"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Supply</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Total number of tokens to create
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Price (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0.01" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set the initial price per token
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop or click to upload token image
                </p>
                <Input type="file" className="hidden" />
                <Button type="button" variant="outline">
                  Choose File
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Token
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}