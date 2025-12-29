"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { LucideIcon } from "lucide-react";

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  connected: boolean;
  onToggle: () => void;
}

export function IntegrationCard({
  name,
  description,
  icon: Icon,
  connected,
  onToggle,
}: IntegrationCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onToggle();
    setIsLoading(false);
    toast.success(
      `${name} ${!connected ? "connected" : "disconnected"} successfully`
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-md">
              <Icon className="h-5 w-5" />
            </div>
            {name}
          </div>
        </CardTitle>
        <Switch
          checked={connected}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
      </CardHeader>
      <CardContent>
        <CardDescription className="mt-2">{description}</CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant={connected ? "default" : "secondary"}>
            {connected ? "Active" : "Inactive"}
          </Badge>
          {connected && (
            <Button variant="outline" size="sm">
              Configure
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
