"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Automation } from "@/lib/automations-store";

interface RuleBuilderProps {
  onSave: (
    automation: Omit<Automation, "id" | "createdAt" | "isActive">
  ) => void;
  onCancel: () => void;
}

export function RuleBuilder({ onSave, onCancel }: RuleBuilderProps) {
  const [triggerSource, setTriggerSource] = useState("");
  const [event, setEvent] = useState("");
  const [hasCondition, setHasCondition] = useState(false);
  const [condition, setCondition] = useState("");
  const [action, setAction] = useState("");
  const [target, setTarget] = useState("");

  const handleSave = () => {
    if (!triggerSource || !event || !action || !target) return;
    if (hasCondition && !condition) return;

    onSave({
      triggerSource,
      event,
      condition: hasCondition ? condition : undefined,
      action,
      target,
    });
  };

  const isValid =
    triggerSource && event && action && target && (!hasCondition || condition);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rule Builder</CardTitle>
        <CardDescription>
          Construct a sentence to define your automation rule.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-4 sm:p-6 bg-muted/30 rounded-lg border border-dashed">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 text-base sm:text-lg leading-relaxed">
            <span className="py-2">When a</span>

            <Select value={triggerSource} onValueChange={setTriggerSource}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-primary/20 focus:ring-primary/20">
                <SelectValue placeholder="Trigger Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Google Q&A">Google Q&A</SelectItem>
                <SelectItem value="Trustpilot">Trustpilot</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Apple Store">Apple Store</SelectItem>
              </SelectContent>
            </Select>

            <span className="py-2">is</span>

            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background border-primary/20 focus:ring-primary/20">
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="Updated">Updated</SelectItem>
                <SelectItem value="Deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>

            {!hasCondition ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary w-full sm:w-auto justify-start sm:justify-center"
                onClick={() => setHasCondition(true)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Condition
              </Button>
            ) : (
              <>
                <span className="py-2">and</span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="w-full sm:w-[220px] bg-background border-primary/20 focus:ring-primary/20">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contains updated answer">
                        Contains updated answer
                      </SelectItem>
                      <SelectItem value="Contains negative sentiment">
                        Contains negative sentiment
                      </SelectItem>
                      <SelectItem value="Rating ≤ 3 stars">
                        Rating ≤ 3 stars
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 sm:h-6 sm:w-6 rounded-full shrink-0"
                    onClick={() => {
                      setHasCondition(false);
                      setCondition("");
                    }}
                  >
                    <Trash2 className="h-4 w-4 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </>
            )}

            <div className="w-full sm:w-auto" />
            {/* Break on small screens if needed */}

            <span className="py-2">then</span>

            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-primary/20 focus:ring-primary/20">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assign a Status">Assign a Status</SelectItem>
                <SelectItem value="Notify">Notify</SelectItem>
                <SelectItem value="Assign to user">Assign to user</SelectItem>
              </SelectContent>
            </Select>

            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background border-primary/20 focus:ring-primary/20">
                <SelectValue placeholder="Target / Value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Needs Assistance">
                  Needs Assistance
                </SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Netsach Ike">Netsach Ike</SelectItem>
                <SelectItem value="Support Team">Support Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full sm:w-auto"
          >
            Create Automation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
