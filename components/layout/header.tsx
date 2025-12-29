"use client";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  Building2,
  ChevronsUpDown,
  Check,
  Plus,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import { CreateTeamMemberModal } from "@/components/workspaces/create-team-member-modal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const { workspaces, activeWorkspaceId, setActiveWorkspace } =
    useWorkspaceStore();
  const activeWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const [language, setLanguage] = useState("English");
  const languages = ["English", "Spanish", "French", "German"];

  return (
    <header className="flex h-14 items-center gap-3 sm:gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex items-center min-w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-auto max-w-[180px] sm:max-w-[200px] justify-between px-2 md:px-4 min-w-0"
            >
              <div className="flex items-center gap-2 truncate">
                <Building2 className="h-4 w-4 shrink-0" />
                <span className="truncate hidden sm:inline">
                  {activeWorkspace?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px]">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onSelect={() => setActiveWorkspace(workspace.id)}
                className="gap-2"
              >
                <div className="flex h-4 w-4 items-center justify-center">
                  {activeWorkspace?.id === workspace.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onSelect={(e) => {
                e.preventDefault();
                setIsCreateWorkspaceOpen(true);
              }}
            >
              <div className="flex h-4 w-4 items-center justify-center">
                <Plus className="h-4 w-4" />
              </div>
              Create New Workspace
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/settings?tab=workspaces"
                className="w-full cursor-pointer"
              >
                View All
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CreateWorkspaceModal
        open={isCreateWorkspaceOpen}
        onOpenChange={setIsCreateWorkspaceOpen}
      />

      <CreateTeamMemberModal
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
      />

      <div className="ml-2 flex items-center gap-2 sm:gap-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Switch Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang}
                onSelect={() => setLanguage(lang)}
                className="gap-2"
              >
                <div className="flex h-4 w-4 items-center justify-center">
                  {language === lang && <Check className="h-4 w-4" />}
                </div>
                {lang}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
