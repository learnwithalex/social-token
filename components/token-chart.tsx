"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const data = [
  { time: '00:00', price: 2.1 },
  { time: '04:00', price: 2.2 },
  { time: '08:00', price: 2.3 },
  { time: '12:00', price: 2.15 },
  { time: '16:00', price: 2.4 },
  { time: '20:00', price: 2.45 },
];

const timeRanges = ['24H', '7D', '30D', '90D', 'ALL'];

export function TokenChart() {
  const [activeRange, setActiveRange] = useState('24H');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {timeRanges.map((range) => (
          <Button
            key={range}
            variant={activeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={['auto', 'auto']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2">
                      <p className="text-sm font-medium">
                        ${payload[0].value.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payload[0].payload.time}
                      </p>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}