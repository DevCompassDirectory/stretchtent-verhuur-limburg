import { NavLink } from "./NavLink";
import { UserMenu } from "./UserMenu";

interface MobileNavProps {
  isOpen: boolean;
  session: boolean;
  isAdmin: boolean;
  signOut: () => void;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, session, isAdmin, signOut, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg animate-fade-down">
      <div className="px-4 py-4 space-y-4">
        <NavLink to="/" onClick={onClose}>Home</NavLink>
        <NavLink to="/stretchtenten" onClick={onClose}>Stretchtenten</NavLink>
        <NavLink to="/projects" onClick={onClose}>Projecten</NavLink>
        <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
        {session && isAdmin && (
          <UserMenu signOut={signOut} onClose={onClose} />
        )}
      </div>
    </div>
  );
};