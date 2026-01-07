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
  LogOut,
  User,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import { CreateTeamMemberModal } from "@/components/workspaces/create-team-member-modal";
import AuthService from "@/services/Auth";
import { useUserStore } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import { toast } from "react-hot-toast";
// import Image from "next/image";
import LanguageSelector from "../language-selector";

export function Header() {
  const { user: storedUser, clearUser } = useUserStore();
  const router = useRouter();

  const user = storedUser
    ? {
        name: `${storedUser.first_name} ${storedUser.last_name}`,
        email: storedUser.email,
        avatar: "",
        isAdmin: storedUser.role === "Administrator",
      }
    : {
        name: "Admin User",
        email: "support@localmator.com",
        avatar: "https://github.com/shadcn.png",
        isAdmin: true,
      };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      deleteCookie("authToken");
      clearUser();
      router.push("/login");
      toast.success("Logged out successfully");
    }
  };

  const [open, setOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const { workspaces, activeWorkspaceId, setActiveWorkspace, isLoading } =
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
            {!isLoading &&
              workspaces.map((workspace) => (
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
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={workspace.logo || ""}
                      alt={workspace.name}
                    />
                    <AvatarFallback>
                      {workspace.name &&
                        workspace.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {workspace.name}
                </DropdownMenuItem>
              ))}
            {isLoading && (
              <DropdownMenuItem className="justify-center">
                <span>Loading...</span>
              </DropdownMenuItem>
            )}
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
        <LanguageSelector />
        {/* <DropdownMenu>
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
        </DropdownMenu> */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/settings?tab=profile"
                className="cursor-pointer w-full flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            {user.isAdmin && (
              <DropdownMenuItem asChild>
                <Link
                  href="/admin"
                  className="cursor-pointer w-full flex items-center"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onSelect={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
