import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            <Link to="/dashboard" className="hover:text-primary/80 transition-colors">
              Dashboard
            </Link>
            <Link to="/" className="hover:text-primary/80 transition-colors">
              Home
            </Link>
            <Link to="/stretchtenten" className="hover:text-primary/80 transition-colors">
              Stretchtenten
            </Link>
            <Link to="/projects" className="hover:text-primary/80 transition-colors">
              Projecten
            </Link>
            <Link to="/contact" className="hover:text-primary/80 transition-colors">
              Contact
            </Link>
            <Button>Offerte Aanvragen</Button>
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
              <Link
                to="/dashboard"
                className="block hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="block hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/stretchtenten"
                className="block hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Stretchtenten
              </Link>
              <Link
                to="/projects"
                className="block hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Projecten
              </Link>
              <Link
                to="/contact"
                className="block hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button className="w-full">Offerte Aanvragen</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};