import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="ri-exchange-dollar-line text-white text-2xl"></i>
              <span className="text-xl font-semibold">GlobalRemit</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Fast, secure international money transfers between Ghana, US, and
              Europe.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/send-money">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Money Transfer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/exchange-rates">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Currency Exchange
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/business">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Business Payments
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/mobile-topup">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Mobile Top-up
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/bill-payments">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Bill Payments
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Press
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    FAQs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Customer Support
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/track">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Track Transfer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/security">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Security
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>© {new Date().getFullYear()} GlobalRemit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
