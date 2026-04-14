import type { Metadata } from "next";
import Link from "next/link";
import { Home, Map, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Large 404 */}
        <div className="relative mb-6">
          <span className="text-[10rem] md:text-[14rem] font-extrabold leading-none text-bg-tertiary/30 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
              <Search className="h-10 w-10 text-accent" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Lost at Sea
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Like a ship off course in the Strait, let&apos;s navigate you back.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/live-map"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bg-tertiary/50 text-text-primary font-medium text-sm hover:bg-bg-tertiary transition-colors border border-border"
          >
            <Map className="h-4 w-4" />
            View Live Map
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs text-text-muted mb-3">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/dashboard" className="text-accent hover:underline">Dashboard</Link>
            <Link href="/countries-impact" className="text-accent hover:underline">Countries</Link>
            <Link href="/timeline" className="text-accent hover:underline">Timeline</Link>
            <Link href="/news" className="text-accent hover:underline">News</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
