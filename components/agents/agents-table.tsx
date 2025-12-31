"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const agents = [
  {
    id: "1",
    name: "Support Bot Alpha",
    group: "Customer Support",
    description: "Handles general inquiries and FAQs.",
    updated: "2023-10-27 10:30 UTC",
    language: "English",
    temperature: 0.7,
    locationContent: "Enabled",
  },
  {
    id: "2",
    name: "Sales Assistant",
    group: "Sales",
    description: "Assists with product recommendations.",
    updated: "2023-10-26 14:15 UTC",
    language: "Polylingual",
    temperature: 0.5,
    locationContent: "Disabled",
  },
  {
    id: "3",
    name: "Tech Guru",
    group: "Technical Support",
    description: "Troubleshoots technical issues.",
    updated: "2023-10-25 09:00 UTC",
    language: "English",
    temperature: 0.2,
    locationContent: "Enabled",
  },
];

export function AgentsTable({ searchQuery = "" }: { searchQuery?: string }) {
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Updated (UTC)</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Location Content</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAgents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>{agent.group}</TableCell>
              <TableCell
                className="max-w-[200px] truncate"
                title={agent.description}
              >
                {agent.description}
              </TableCell>
              <TableCell>{agent.updated}</TableCell>
              <TableCell>
                <Badge variant="outline">{agent.language}</Badge>
              </TableCell>
              <TableCell>{agent.temperature}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    agent.locationContent === "Enabled"
                      ? "default"
                      : "secondary"
                  }
                >
                  {agent.locationContent}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
