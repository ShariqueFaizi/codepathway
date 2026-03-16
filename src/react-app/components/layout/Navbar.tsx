import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  BookOpen,
  Code2,
  Cpu,
  Users,
  FileText,
  Layers,
  Command,
} from "lucide-react";

const navLinks = [
  {
    label: "DSA Sheets",
    href: "/sheets",
    icon: Layers,
    submenu: [
      { label: "A2Z DSA Sheet", href: "/sheets/a2z-dsa" },
      { label: "Blind 75", href: "/sheets/blind-75" },
      { label: "SDE Sheet", href: "/sheets/sde" },
    ],
  },
  {
    label: "Core CS",
    href: "/subjects",
    icon: Cpu,
    submenu: [
      { label: "DBMS", href: "/subjects/dbms" },
      { label: "Operating Systems", href: "/subjects/os" },
      { label: "Computer Networks", href: "/subjects/cn" },
      { label: "OOPs", href: "/subjects/oops" },
    ],
  },
  { label: "System Design", href: "/system-design", icon: Code2 },
  { label: "Interviews", href: "/interviews", icon: Users },
  { label: "Blogs", href: "/blogs", icon: FileText },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <span className="text-lg font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Code<span className="text-primary">Pathway</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.submenu && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>
                
                {link.submenu && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-popover border border-border rounded-xl shadow-xl p-2 min-w-[200px]">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <Command className="w-3 h-3" />K
              </kbd>
            </Button>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="glow-sm">
              <BookOpen className="w-4 h-4 mr-1.5" />
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="ml-8 mt-1 space-y-1">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
              <Button className="w-full justify-center glow-sm">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
