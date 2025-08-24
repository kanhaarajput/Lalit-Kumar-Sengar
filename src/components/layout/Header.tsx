'use client';

import Link from 'next/link';
import { Menu, Home, Briefcase, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: Briefcase },
    { href: '#contact', label: 'Contact', icon: Mail },
];

export function Header() {
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="#home" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-xl font-bold">My Portfolio</span>
        </Link>
        
        <nav className="hidden flex-1 items-center justify-end gap-6 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative font-medium transition-colors cursor-pointer",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute inset-x-0 bottom-[-2px] h-0.5 bg-primary transition-transform duration-300 ease-in-out",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex ml-6">
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <div className="grid gap-4 py-6">
                    <a href="#home" className="mb-4 flex items-center space-x-2">
                        <span className="font-headline text-lg font-bold">My Portfolio</span>
                    </a>
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href.replace('#', '');
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-4 rounded-md p-3 text-lg font-medium transition-colors cursor-pointer",
                            isActive 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground hover:bg-muted hover:text-primary"
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </a>
                      );
                    })}
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
