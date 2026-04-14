import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for the Strait of Hormuz Live Monitor. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
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
        Privacy Policy
      </h1>
      <p className="text-text-muted mb-10">
        Last updated: April 14, 2026
      </p>

      <div className="prose-custom space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            1. Introduction
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Welcome to the Strait of Hormuz Live Monitor (&quot;we,&quot;
            &quot;our,&quot; or &quot;us&quot;), accessible at
            middleeaststraitofhormuz.com. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit
            our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            2. Information We Collect
          </h2>
          <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">
            2.1 Automatically Collected Information
          </h3>
          <p className="text-text-secondary leading-relaxed mb-3">
            When you visit our website, we may automatically collect certain
            information, including:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
            <li>IP address and approximate geographic location</li>
            <li>Browser type, version, and operating system</li>
            <li>Referring website and pages visited</li>
            <li>Date, time, and duration of visits</li>
            <li>Device type and screen resolution</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">
            2.2 Cookies & Tracking Technologies
          </h3>
          <p className="text-text-secondary leading-relaxed">
            We use cookies and similar tracking technologies to enhance your
            experience, analyse site traffic, and understand usage patterns. You
            may control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
            <li>To provide and maintain the website</li>
            <li>To analyse usage and improve the user experience</li>
            <li>To monitor and prevent technical issues</li>
            <li>To display relevant advertising (Google AdSense)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            4. Third-Party Services
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            We may use third-party services that collect information, including:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
            <li>
              <strong>Google Analytics</strong> — for website analytics and
              traffic analysis
            </li>
            <li>
              <strong>Google AdSense</strong> — for displaying advertisements
            </li>
            <li>
              <strong>Vercel</strong> — for hosting and performance analytics
            </li>
            <li>
              <strong>Upstash</strong> — for server-side data caching
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mt-3">
            These services have their own privacy policies governing the use of
            your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            5. Data Retention
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We retain automatically collected data for as long as necessary to
            fulfil the purposes outlined in this policy. Analytics data is
            typically retained in aggregate form for up to 26 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            6. Your Rights
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            7. Children&apos;s Privacy
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Our website is not intended for individuals under the age of 13. We
            do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            8. Changes to This Policy
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. Your continued use
            of the website constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            9. Contact Us
          </h2>
          <p className="text-text-secondary leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:privacy@middleeaststraitofhormuz.com"
              className="text-accent hover:underline"
            >
              privacy@middleeaststraitofhormuz.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
