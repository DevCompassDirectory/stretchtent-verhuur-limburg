import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className="text-sm font-medium hover:text-primary transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);