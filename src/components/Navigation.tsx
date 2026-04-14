"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Map,
  BarChart3,
  Globe,
  Clock,
  Newspaper,
  Info,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/", label: "Home", icon: Ship },
  { href: "/live-map", label: "Live Map", icon: Map },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/countries-impact", label: "Countries", icon: Globe },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/about", label: "About", icon: Info },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all group-hover:bg-accent/20">
                <span className="text-lg font-extrabold leading-none">H</span>
                <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-critical animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-bold tracking-tight text-text-primary">
                  HORMUZ
                </span>
                <span className="text-sm font-medium text-accent ml-1">
                  MONITOR
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Status Badge + Mobile Menu */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full status-critical text-xs font-semibold uppercase tracking-wide">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Restricted</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-critical opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-critical" />
                </span>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-bg-tertiary/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-secondary border-l border-border md:hidden"
            >
              <div className="p-4 pt-20">
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                          isActive
                            ? "bg-accent/10 text-accent"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
