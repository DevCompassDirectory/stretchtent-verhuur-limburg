import { NavLink } from "./NavLink";
import { UserMenu } from "./UserMenu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MobileNavProps {
  isOpen: boolean;
  session: boolean;
  isAdmin: boolean;
  signOut: () => void;
  onClose: () => void;
  categories?: Category[];
}

export const MobileNav = ({ 
  isOpen, 
  session, 
  isAdmin, 
  signOut, 
  onClose,
  categories 
}: MobileNavProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg animate-fade-down">
      <div className="px-4 py-4 space-y-4">
        <NavLink to="/" onClick={onClose}>Home</NavLink>
        
        {/* Categories Dropdown */}
        <div className="space-y-2">
          <button
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary"
          >
            Huren
            <ChevronDown className={`h-4 w-4 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isSubMenuOpen && (
            <div className="pl-4 space-y-2">
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/stretchtenten/${category.slug}`}
                  className="block text-sm text-muted-foreground hover:text-primary"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/stretchtenten"
                className="block text-sm font-medium hover:text-primary"
                onClick={onClose}
              >
                Alle Stretchtenten
              </Link>
            </div>
          )}
        </div>

        <NavLink to="/projects" onClick={onClose}>Projecten</NavLink>
        <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
        {session && isAdmin && (
          <UserMenu signOut={signOut} onClose={onClose} />
        )}
      </div>
    </div>
  );
};