"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // ← add lucide-react or heroicons
import ThemeToggle from "./ThemeToggle";
import Container from "@/components/Container";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/performance", label: "Performance" },
    // add more: Agents, Matches, Leaderboard, etc.
  ];

  return (
    <nav
      className={`
        sticky top-0 z-[var(--z-sticky,999)] w-full
        transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-[var(--valo-bg-deep)]/80 backdrop-blur-xl border-b border-[var(--valo-border)]/70 shadow-[0_4px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-[var(--valo-bg-deep)]/60 backdrop-blur-lg border-b border-transparent"
        }
      `}
    >
      <Container>
        <div className="h-16 md:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 transition-all duration-400 hover:scale-[1.02] active:scale-95"
          >
            <h1
              className={`
              font-display text-2xl md:text-3xl font-extrabold tracking-[-0.04em]
              bg-gradient-to-r from-[var(--valo-text-primary)] to-[var(--valo-primary)] bg-clip-text text-transparent
              transition-all duration-500 group-hover:from-[var(--valo-primary)] group-hover:to-rose-500
            `}
            >
              <span className="hidden sm:inline">Valo</span>
              <span className="text-[var(--valo-primary)]">Coach</span>
              <span className="sm:hidden text-[var(--valo-primary)]">VC</span>
            </h1>
            {/* Optional subtle underline glow on hover */}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--valo-primary)] to-rose-500/60 rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(var(--valo-primary-rgb),0.5)]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative text-sm font-bold uppercase tracking-[0.18em] 
                    ${
                      isActive
                        ? "text-[var(--valo-primary)]"
                        : "text-[var(--valo-text-tertiary)] hover:text-[var(--valo-primary)]"
                    }
                    transition-all duration-400
                    after:absolute after:left-0 after:bottom-[-6px] after:h-0.5 
                    after:bg-[var(--valo-primary)] after:transition-all after:duration-400
                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--valo-primary)]/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-[var(--valo-text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--valo-text-primary)]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`
            absolute top-0 right-0 bottom-0 w-4/5 max-w-xs bg-[var(--valo-bg-deep)]/95 backdrop-blur-xl border-l border-[var(--valo-border)]
            transform transition-transform duration-500 ease-out
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col gap-8 mt-16">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-lg font-semibold tracking-wide
                    ${
                      isActive
                        ? "text-[var(--valo-primary)]"
                        : "text-[var(--valo-text-tertiary)] hover:text-[var(--valo-primary)]"
                    }
                    transition-colors duration-300
                  `}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
