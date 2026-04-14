import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer for the Strait of Hormuz Live Monitor. Important information about data accuracy, limitations, and intended use.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
        Disclaimer
      </h1>
      <p className="text-text-muted mb-10">
        Last updated: April 14, 2026
      </p>

      {/* Critical Warning Box */}
      <div className="p-5 rounded-xl bg-critical/5 border border-critical/20 mb-10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-critical flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-critical mb-2">
              Important Notice — Active Conflict Zone
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              The Strait of Hormuz is currently an{" "}
              <strong>active military conflict zone</strong> (as of April 2026).
              Data shown on this website may be delayed, incomplete, or
              inaccurate due to the ongoing crisis. Do NOT use this website as
              the sole basis for navigational, operational, military, financial,
              or safety-critical decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            1. General Information Only
          </h2>
          <p className="text-text-secondary leading-relaxed">
            The Strait of Hormuz Live Monitor (&quot;the Website&quot;) provides
            information for <strong>general informational and educational
            purposes only</strong>. The content on this website is not intended
            to be a substitute for professional advice, whether financial,
            navigational, legal, or otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            2. No Financial Advice
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Oil prices, economic impact figures, and market data displayed on
            this website are sourced from third-party providers and may be
            delayed or inaccurate. This information does NOT constitute financial
            advice, investment recommendations, or trading signals. Consult a
            qualified financial adviser before making any investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            3. No Navigational Advice
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Ship positions, transit routes, and maritime data shown on this
            website are for informational purposes only and should NOT be used
            for vessel navigation, route planning, or maritime safety decisions.
            Always refer to official maritime authorities, the International
            Maritime Organization (IMO), and relevant naval advisories for
            navigational guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            4. Data Sources & Accuracy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            Data displayed on this website is aggregated from multiple
            third-party sources:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
            <li>
              <strong>Oil Prices:</strong> Yahoo Finance (real-time) with Alpha
              Vantage as fallback. Prices may be delayed up to 15 minutes.
            </li>
            <li>
              <strong>Ship Tracking:</strong> MarineTraffic API or simulated data
              when API is unavailable. AIS data may have gaps in conflict zones.
            </li>
            <li>
              <strong>News:</strong> Bloomberg, Reuters, and other RSS feeds.
              Headlines are aggregated automatically and not editorially curated.
            </li>
            <li>
              <strong>Country Impact Data:</strong> Based on IEA, EIA, and public
              reporting as of April 2026. Estimates may differ from actual
              figures.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            5. Limitation of Liability
          </h2>
          <p className="text-text-secondary leading-relaxed">
            THE WEBSITE AND ALL INFORMATION PROVIDED ARE OFFERED &quot;AS
            IS&quot; WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. WE DISCLAIM ALL
            LIABILITY FOR ANY DAMAGES, LOSSES, OR COSTS ARISING FROM THE USE OF
            OR RELIANCE ON THIS WEBSITE, INCLUDING BUT NOT LIMITED TO DIRECT,
            INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            6. External Links
          </h2>
          <p className="text-text-secondary leading-relaxed">
            This website may contain links to external news sources, data
            providers, and third-party websites. We do not control and are not
            responsible for the content or accuracy of linked sites. Inclusion of
            a link does not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            7. Copyright & Fair Use
          </h2>
          <p className="text-text-secondary leading-relaxed">
            News headlines and excerpts displayed on this website are used under
            fair use principles for informational purposes. Full articles remain
            the copyright of their respective publishers. If you are a copyright
            holder and wish to have content removed, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            8. Contact
          </h2>
          <p className="text-text-secondary leading-relaxed">
            For questions or concerns about this Disclaimer, please contact us
            at{" "}
            <a
              href="mailto:legal@middleeaststraitofhormuz.com"
              className="text-accent hover:underline"
            >
              legal@middleeaststraitofhormuz.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
