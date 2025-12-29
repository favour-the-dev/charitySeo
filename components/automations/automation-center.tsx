"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, Zap, ArrowRight } from "lucide-react";
import { Automation } from "@/lib/automations-store";

interface AutomationCenterProps {
  automations: Automation[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateClick: () => void;
}

export function AutomationCenter({
  automations,
  onToggle,
  onDelete,
  onCreateClick,
}: AutomationCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAutomations = automations.filter(
    (auto) =>
      auto.triggerSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search automations..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={onCreateClick} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Automation
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredAutomations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Zap className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">No automations found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first automation to get started.
              </p>
              <Button onClick={onCreateClick}>Create Automation</Button>
            </CardContent>
          </Card>
        ) : (
          filteredAutomations.map((auto) => (
            <Card key={auto.id}>
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="font-normal text-xs sm:text-sm"
                    >
                      When {auto.triggerSource} is {auto.event}
                    </Badge>
                    {auto.condition && (
                      <>
                        <ArrowRight className="h-3 w-3 text-muted-foreground hidden sm:block" />
                        <Badge
                          variant="outline"
                          className="font-normal text-xs sm:text-sm"
                        >
                          {auto.condition}
                        </Badge>
                      </>
                    )}
                    <ArrowRight className="h-3 w-3 text-muted-foreground hidden sm:block" />
                    <Badge
                      variant="secondary"
                      className="font-medium text-xs sm:text-sm"
                    >
                      {auto.action}: {auto.target}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Assigned to:{" "}
                    <span className="font-medium text-foreground">
                      {auto.target}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {auto.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={auto.isActive}
                      onCheckedChange={() => onToggle(auto.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => onDelete(auto.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
