import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Send Money", href: "/send-money" },
    { name: "Receive Money", href: "/receive-money" },
    { name: "Exchange Rates", href: "/exchange-rates" },
    { name: "Help", href: "/help" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <i className="ri-exchange-dollar-line text-primary text-3xl"></i>
              <span className="text-xl font-semibold text-primary">GlobalRemit</span>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`font-medium cursor-pointer ${
                  location === link.href
                    ? "text-primary"
                    : "text-neutral-800 hover:text-primary"
                } transition-colors`}
              >
                {link.name}
              </div>
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <div className="font-medium text-neutral-800 hover:text-primary transition-colors cursor-pointer">
              Login
            </div>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`font-medium text-lg py-2 cursor-pointer ${
                      location === link.href
                        ? "text-primary"
                        : "text-neutral-800 hover:text-primary"
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 mt-4">
                <Link href="/login">
                  <div 
                    className="font-medium text-lg py-2 block text-neutral-800 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </div>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
