"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Reviews",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: Layers,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center border-b px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={onNavigate}
        >
          <span className="text-xl font-bold text-primary">CharitySEO</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link href="/login">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </Link>
      </div>
    </div>
  );
}
