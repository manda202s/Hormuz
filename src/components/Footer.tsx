import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <span className="text-sm font-extrabold">H</span>
              </div>
              <div>
                <span className="text-sm font-bold text-text-primary">HORMUZ</span>
                <span className="text-sm font-medium text-accent ml-1">MONITOR</span>
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Real-time monitoring of the Strait of Hormuz crisis with live
              ship tracking, oil prices, and global impact analysis.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/live-map", label: "Live Map" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/countries-impact", label: "Countries Impact" },
                { href: "/timeline", label: "Timeline" },
                { href: "/news", label: "News" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Data Sources
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Yahoo Finance (Oil Prices)</li>
              <li>MarineTraffic API</li>
              <li>Bloomberg / Reuters RSS</li>
              <li>IEA / EIA Statistics</li>
              <li>Lloyd&apos;s List</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com/HormuzMonitor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-tertiary/50 text-text-secondary hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-tertiary/50 text-text-secondary hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Strait of Hormuz Monitor. For
            informational purposes only. Not financial advice.
          </p>
          <p className="text-xs text-text-muted">
            Last updated:{" "}
            <span className="text-text-secondary font-mono">
              {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
