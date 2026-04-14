import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the Strait of Hormuz Live Monitor. Please read these terms before using our website.",
};

export default function TermsOfServicePage() {
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
        Terms of Service
      </h1>
      <p className="text-text-muted mb-10">
        Last updated: April 14, 2026
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing and using the Strait of Hormuz Live Monitor
            (&quot;the Service&quot;), accessible at middleeaststraitofhormuz.com,
            you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            2. Description of Service
          </h2>
          <p className="text-text-secondary leading-relaxed">
            The Service provides real-time monitoring information about shipping
            activity, oil prices, and geopolitical developments related to the
            Strait of Hormuz. The Service aggregates data from publicly available
            sources, third-party APIs, and news feeds to present a comprehensive
            monitoring dashboard.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            3. No Financial or Investment Advice
          </h2>
          <div className="p-4 rounded-lg bg-warning/5 border border-warning/20 mb-4">
            <p className="text-text-primary font-medium text-sm">
              ⚠️ IMPORTANT DISCLAIMER
            </p>
          </div>
          <p className="text-text-secondary leading-relaxed">
            The information provided on this website is for{" "}
            <strong>general informational purposes only</strong> and does not
            constitute financial, investment, trading, or any other form of
            professional advice. Oil price data, shipping statistics, and
            economic impact assessments should not be relied upon as the sole
            basis for making investment or business decisions. Always consult
            qualified professionals before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            4. Data Accuracy
          </h2>
          <p className="text-text-secondary leading-relaxed">
            While we strive to provide accurate and up-to-date information, we
            make no guarantees regarding the accuracy, completeness, reliability,
            or timeliness of any data displayed on the Service. Data is sourced
            from third-party providers including Yahoo Finance, Bloomberg RSS,
            MarineTraffic, and government agencies (IEA, EIA). These sources may
            have delays, errors, or limitations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            5. Intellectual Property
          </h2>
          <p className="text-text-secondary leading-relaxed">
            All original content, design, code, and branding of the Service are
            the property of the Strait of Hormuz Live Monitor. Third-party data,
            trademarks, and news content remain the property of their respective
            owners. News articles linked on this site are the copyright of their
            original publishers (Bloomberg, Reuters, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            6. Acceptable Use
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            You agree not to:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
            <li>
              Use the Service for any unlawful purpose
            </li>
            <li>
              Attempt to access restricted areas or circumvent security measures
            </li>
            <li>
              Scrape, crawl, or harvest data from the Service without permission
            </li>
            <li>
              Republish, redistribute, or commercially exploit content without
              authorization
            </li>
            <li>
              Interfere with the proper functioning of the Service
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            7. Third-Party Links
          </h2>
          <p className="text-text-secondary leading-relaxed">
            The Service may contain links to third-party websites, including news
            sources and data providers. We are not responsible for the content,
            privacy practices, or availability of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            8. Limitation of Liability
          </h2>
          <p className="text-text-secondary leading-relaxed">
            TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED
            &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE SHALL NOT BE
            LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING
            BUT NOT LIMITED TO FINANCIAL LOSSES BASED ON DATA DISPLAYED ON THE
            WEBSITE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            9. Indemnification
          </h2>
          <p className="text-text-secondary leading-relaxed">
            You agree to indemnify and hold harmless the Service, its operators,
            and affiliates from any claims, damages, or expenses arising from
            your use of the Service or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            10. Modifications
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Your continued use of the
            Service constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            11. Governing Law
          </h2>
          <p className="text-text-secondary leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            applicable laws. Any disputes arising under these Terms shall be
            subject to the exclusive jurisdiction of the appropriate courts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            12. Contact
          </h2>
          <p className="text-text-secondary leading-relaxed">
            For questions about these Terms, please contact us at{" "}
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
