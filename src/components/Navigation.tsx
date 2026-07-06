import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const navItems = isHome
    ? [
        { label: "Home", href: "#home" },
        { label: "Courses", href: "#courses" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Contact", href: "#contact" },
      ]
    : [{ label: "Home", href: "/" }];

  const handleNav = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SAINTS INNOVATION HUB
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => handleNav(item.href)} className="text-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            ))}
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity" onClick={() => navigate("/enroll")}>
              Enroll Now
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => handleNav(item.href)} className="block text-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            ))}
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity" onClick={() => { setIsOpen(false); navigate("/enroll"); }}>
              Enroll Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
