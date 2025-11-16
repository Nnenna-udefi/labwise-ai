"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Beaker, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "ChatBot", href: "/chatbot" },
  { label: "FAQ", href: "/faq" },
];
const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky shadow-sm bg-foreColor ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between  items-center">
          <Link
            href="/"
            className="text-primary items-center flex gap-2 uppercase text-xl font-bold"
          >
            <Beaker />
            <span className="">LabWise AI</span>
          </Link>
          <nav className="hidden md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 font-medium text-sm hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-foreground/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex gap-2 text-md">
            <Button variant={"ghost"}>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          <div className="md:hidden block">
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon">
                  {" "}
                  <Menu className="w-6 h-6" />{" "}
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-primary font-bold text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Beaker className="h-6 w-6" />
                  <span className="font-headline">LabWise AI</span>
                </Link>

                <nav className="flex flex-col gap-4 my-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground/80"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    // asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
