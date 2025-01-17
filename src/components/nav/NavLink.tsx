import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className="hover:text-primary/80 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);