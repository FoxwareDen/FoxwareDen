export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="mb-16">
          <div className="border-4 border-black dark:border-white p-8 rotate-1 bg-white dark:bg-black">
            <h1 className="font-mono text-5xl md:text-7xl font-bold mb-4">
              PRIVACY
              <br />
              POLICY
            </h1>
            <p className="font-mono text-lg">Last Updated: 11/18/2025</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              1. INTRODUCTION
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              FoxWareDen ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>
            <p className="font-mono leading-relaxed">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site or use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              2. INFORMATION WE COLLECT
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The
              information we may collect includes:
            </p>

            <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              Personal Data
            </h3>
            <p className="font-mono leading-relaxed mb-4">
              Personally identifiable information, such as your name, email
              address, and contact information, that you voluntarily give to us
              when you pay for our services or when you choose to participate in
              various activities related to the site.
            </p>

            {/* <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              Derivative Data
            </h3>
            <p className="font-mono leading-relaxed mb-4">
              Information our servers automatically collect when you access the
              site, such as your IP address, browser type, operating system,
              access times, and the pages you have viewed directly before and
              after accessing the site.
            </p> */}

            <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              Financial Data
            </h3>
            <p className="font-mono leading-relaxed">
              Financial information, such as data related to your payment method
              (e.g., valid credit card number, card brand, expiration date) that
              we may collect when you purchase, order, or request information
              about our services.
            </p>
          </section>

          {/* Section 3 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              3. USE OF YOUR INFORMATION
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the site to:
            </p>
            <ul className="list-none space-y-2 font-mono ml-4">
              <li className="before:content-['▪'] before:mr-2">
                Create and manage your account
              </li>
              <li className="before:content-['▪'] before:mr-2">
                Process your transactions and send you related information
              </li>
              <li className="before:content-['▪'] before:mr-2">
                Email you regarding your account or orders
              </li>
              <li className="before:content-['▪'] before:mr-2">
                Fulfill and manage purchases, orders, payments, and other
                transactions
              </li>
              <li className="before:content-['▪'] before:mr-2">
                Improve our website and services
              </li>
              {/* <li className="before:content-['▪'] before:mr-2">
                Send you marketing and promotional communications
              </li> */}
              <li className="before:content-['▪'] before:mr-2">
                Respond to product and customer service requests
              </li>
              <li className="before:content-['▪'] before:mr-2">
                Protect against fraudulent or illegal activity
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              4. DISCLOSURE OF YOUR INFORMATION
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows:
            </p>

            <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              By Law or to Protect Rights
            </h3>
            <p className="font-mono leading-relaxed mb-4">
              If we believe the release of information about you is necessary to
              respond to legal process, to investigate or remedy potential
              violations of our policies, or to protect the rights, property,
              and safety of others.
            </p>

            <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              Third-Party Service Providers
            </h3>
            <p className="font-mono leading-relaxed mb-4">
              We may share your information with third parties that perform
              services for us or on our behalf, including payment processing,
              data analysis, email delivery, hosting services, customer service,
              and marketing assistance.
            </p>

            <h3 className="font-mono text-xl font-bold mb-3 mt-6">
              Business Transfers
            </h3>
            <p className="font-mono leading-relaxed">
              We may share or transfer your information in connection with, or
              during negotiations of, any merger, sale of company assets,
              financing, or acquisition of all or a portion of our business to
              another company.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              5. SECURITY OF YOUR INFORMATION
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable.
            </p>
          </section>

          {/* Section 6 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              6. COOKIES AND TRACKING
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              We may use cookies, web beacons, tracking pixels, and other
              tracking technologies on the site to help customize the site and
              improve your experience. When you access the site, your personal
              information is not collected through the use of tracking
              technology.
            </p>
            <p className="font-mono leading-relaxed">
              Most browsers are set to accept cookies by default. You can remove
              or reject cookies, but be aware that such action could affect the
              availability and functionality of the site.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              7. THIRD-PARTY WEBSITES
            </h2>
            <p className="font-mono leading-relaxed">
              The site may contain links to third-party websites and
              applications of interest. Once you have used these links to leave
              the site, any information you provide to these third parties is
              not covered by this Privacy Policy. We cannot guarantee the safety
              and privacy of your information.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              8. YOUR DATA RIGHTS
            </h2>
            <p className="font-mono leading-relaxed mb-4">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-none space-y-2 font-mono ml-4">
              <li className="before:content-['▪'] before:mr-2">
                The right to access – You have the right to request copies of
                your personal data
              </li>
              <li className="before:content-['▪'] before:mr-2">
                The right to rectification – You have the right to request
                correction of inaccurate data
              </li>
              <li className="before:content-['▪'] before:mr-2">
                The right to erasure – You have the right to request deletion of
                your data
              </li>
              <li className="before:content-['▪'] before:mr-2">
                The right to restrict processing – You have the right to request
                restriction of processing
              </li>
              <li className="before:content-['▪'] before:mr-2">
                The right to data portability – You have the right to request
                transfer of your data
              </li>
              <li className="before:content-['▪'] before:mr-2">
                The right to object – You have the right to object to our
                processing of your data
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              9. CHILDREN'S PRIVACY
            </h2>
            <p className="font-mono leading-relaxed">
              We do not knowingly collect data from or market to children under
              the age of 13. If we learn that we have collected personal
              information from a child under age 13 without verification of
              parental consent, we will delete that information as quickly as
              possible.
            </p>
          </section>

          {/* Section 10 */}
          <section className="border-l-4 border-black dark:border-white pl-6">
            <h2 className="font-mono text-2xl font-bold mb-4">
              10. CHANGES TO THIS POLICY
            </h2>
            <p className="font-mono leading-relaxed">
              We may update this Privacy Policy from time to time. The updated
              version will be indicated by an updated "Last Updated" date and
              the updated version will be effective as soon as it is accessible.
              We encourage you to review this Privacy Policy frequently to stay
              informed.
            </p>
          </section>

          {/* Contact */}
          <section className="border-4 border-black dark:border-white p-6 bg-blue-400 dark:bg-blue-600 text-black">
            <h2 className="font-mono text-2xl font-bold mb-4">CONTACT US</h2>
            <p className="font-mono leading-relaxed">
              If you have questions or comments about this Privacy Policy,
              please contact us at:
              <br />
              <strong>foxwareden@gmail.com</strong>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
