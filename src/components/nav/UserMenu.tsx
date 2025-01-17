import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  signOut: () => void;
  onClose?: () => void;
}

export const UserMenu = ({ signOut, onClose }: UserMenuProps) => (
  <>
    <Link
      to="/dashboard"
      className="block hover:text-primary/80 transition-colors"
      onClick={onClose}
    >
      Dashboard
    </Link>
    <Button 
      className="w-full"
      onClick={() => {
        signOut();
        onClose?.();
      }}
    >
      Sign Out
    </Button>
  </>
);