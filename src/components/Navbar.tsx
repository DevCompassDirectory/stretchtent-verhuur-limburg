import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={to}
    className="hover:text-primary/80 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserAvatar = () => (
  <Avatar className="h-8 w-8">
    <AvatarFallback>
      <User className="h-4 w-4" />
    </AvatarFallback>
  </Avatar>
);

const UserMenu = ({ signOut, onClose }: { signOut: () => void; onClose?: () => void }) => (
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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold">
            StretchTent Verhuur Limburg
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/stretchtenten">Stretchtenten</NavLink>
            <NavLink to="/projects">Projecten</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg animate-fade-down">
            <div className="px-4 py-4 space-y-4">
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/stretchtenten" onClick={() => setIsOpen(false)}>Stretchtenten</NavLink>
              <NavLink to="/projects" onClick={() => setIsOpen(false)}>Projecten</NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
              {session && (
                <UserMenu signOut={signOut} onClose={() => setIsOpen(false)} />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};