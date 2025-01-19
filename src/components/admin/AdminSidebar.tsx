import { LayoutDashboard, Home, Image, Tent, Package, FolderOpen, FooterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Home Page",
    icon: Home,
    path: "/dashboard/home",
  },
  {
    title: "Media",
    icon: Image,
    path: "/dashboard/media",
  },
  {
    title: "Projects",
    icon: FolderOpen,
    path: "/dashboard/projects",
  },
  {
    title: "Stretchtents",
    icon: Tent,
    path: "/dashboard/stretchtents",
  },
  {
    title: "Toebehoren",
    icon: Package,
    path: "/dashboard/accessories",
  },
  {
    title: "Footer",
    icon: FooterIcon,
    path: "/dashboard/footer",
  },
];

const SidebarContent = () => (
  <div className="space-y-4">
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                isActive ? "bg-accent" : ""
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
);

export function AdminSidebar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="mb-4 w-full">
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="rounded-lg border bg-card text-card-foreground">
      <SidebarContent />
    </nav>
  );
}
