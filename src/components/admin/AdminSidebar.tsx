import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Package, Users } from "lucide-react";

export const AdminSidebar = () => {
  return (
    <nav className="hidden space-y-2 md:block">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive ? "bg-accent" : "hover:bg-muted"
          )
        }
      >
        <Home className="h-4 w-4" />
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive ? "bg-accent" : "hover:bg-muted"
          )
        }
      >
        <Users className="h-4 w-4" />
        Users
      </NavLink>
      <NavLink
        to="/dashboard/products"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive ? "bg-accent" : "hover:bg-muted"
          )
        }
      >
        <Package className="h-4 w-4" />
        Products
      </NavLink>
    </nav>
  );
};
