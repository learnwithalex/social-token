"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Package,
  Truck,
  Lock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ITEM_DETAILS = {
  event: {
    title: "Private Mentoring Session",
    description: "1-hour private mentoring session on tech entrepreneurship",
    date: "Mar 15, 2024",
    time: "2:00 PM EST",
    location: "Virtual (Zoom)",
    price: "100 $ALEX",
    spots: "5 spots remaining",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&auto=format&fit=crop&q=60",
    details: [
      {
        title: "What to Expect",
        content: "In this exclusive 1-hour session, we'll dive deep into tech entrepreneurship, covering topics like product development, market validation, and fundraising strategies.",
      },
      {
        title: "Requirements",
        content: "Must hold at least 100 $ALEX tokens at the time of the session. Please come prepared with specific questions or topics you'd like to discuss.",
      },
      {
        title: "How It Works",
        content: "After purchase, you'll receive a confirmation email with the Zoom link and calendar invite. The session will be recorded and available for replay for 30 days.",
      },
    ],
  },
  merch: {
    title: "Limited Edition Hoodie",
    description: "Exclusive merch only available for token holders",
    price: "50 $ALEX",
    shipping: "Worldwide shipping available",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
    details: [
      {
        title: "Product Details",
        content: "Premium quality hoodie made from 100% organic cotton. Features exclusive design only available to token holders.",
      },
      {
        title: "Sizing Guide",
        content: "Please refer to the size chart below to find your perfect fit. Measurements are in inches.",
      },
      {
        title: "Shipping Information",
        content: "Orders typically ship within 3-5 business days. International shipping may take 2-3 weeks for delivery.",
      },
    ],
  },
};

export default function ExclusiveItemPage() {
  const params = useParams();
  const item = ITEM_DETAILS.event; // Dynamic lookup based on itemId would go here

  return (
    <div className="container max-w-7xl py-10 px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Required: {item.price}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {item.spots}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {item.date}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {item.time}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                {item.location}
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Purchase Access
              </Button>
              <Button variant="outline" className="flex-1">
                <AlertCircle className="mr-2 h-4 w-4" />
                Ask Question
              </Button>
            </div>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            {item.details.map((detail, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{detail.title}</AccordionTrigger>
                <AccordionContent>{detail.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}