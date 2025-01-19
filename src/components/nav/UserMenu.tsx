import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  signOut: () => void;
  onClose?: () => void;
}

export const UserMenu = ({ signOut, onClose }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <UserAvatar />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link
          to="/dashboard"
          className="cursor-pointer"
          onClick={onClose}
        >
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          signOut();
          onClose?.();
        }}
      >
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);