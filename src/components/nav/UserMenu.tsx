import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  signOut: () => void;
  onClose?: () => void;
}

export const UserMenu = ({ signOut, onClose }: UserMenuProps) => (
  <div className="flex flex-col space-y-4">
    <Link
      to="/dashboard"
      className="text-sm font-medium hover:text-primary transition-colors"
      onClick={onClose}
    >
      Dashboard
    </Link>
    <Button 
      variant="default"
      className="w-full"
      onClick={() => {
        signOut();
        onClose?.();
      }}
    >
      Sign Out
    </Button>
  </div>
);