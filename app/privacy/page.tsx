"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col">
      <div className="container mx-auto max-w-4xl px-4 pt-32 pb-16 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to OpenForge. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Collect</h2>
            <p className="leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Identity Data:</strong> Name, username, and authentication credentials</li>
              <li><strong>Contact Data:</strong> Email address and other contact information</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and usage data</li>
              <li><strong>Profile Data:</strong> Your user profile, preferences, and project information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <p className="leading-relaxed mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To authenticate users and provide secure access</li>
              <li>To manage user accounts and profiles</li>
              <li>To communicate with users about service updates</li>
              <li>To analyze usage patterns and improve our service</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to employees who need to know that information in order to process it for us, and they are subject to strict confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <p className="leading-relaxed">
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Legal Rights</h2>
            <p className="leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Services</h2>
            <p className="leading-relaxed">
              Our service uses third-party authentication providers (Google, GitHub) for user sign-up. These providers have their own privacy policies and we are not responsible for their practices. Please review their privacy policies before using their services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date at the bottom of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@openforge.dev.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>Last updated: February 1, 2026</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            href="/auth/sign-up" 
            className="px-6 py-3 bg-white text-black hover:bg-neutral-200 font-medium rounded-lg transition-all flex items-center gap-2 text-sm"
          >
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
