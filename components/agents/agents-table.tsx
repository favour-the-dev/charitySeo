"use client";
import { useState } from "react";
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
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

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
          {currentAgents.map((agent) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
