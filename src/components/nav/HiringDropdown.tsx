import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const HiringDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
          Huren
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/stretchtenten" className="w-full">
            Stretchtenten
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/toebehoren" className="w-full">
            Toebehoren
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/huurvoorwaarden" className="w-full">
            Huurvoorwaarden
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};