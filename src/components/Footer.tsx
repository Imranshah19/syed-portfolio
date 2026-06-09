import Link from "next/link";
import { ExternalLink } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Imranshah19" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-imran-shah-5894882ba" },
  { label: "Fiverr", href: "https://www.fiverr.com/syedio" },
  { label: "WhatsApp", href: "https://wa.me/923332455770" },
];

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{ backgroundColor: "var(--color-foreground, #0F172A)" }}
    >
      <div
        className="section-container"
        style={{ color: "rgba(248,250,252,0.85)" }}
      >
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link
              href="/"
              className="text-white font-bold text-lg hover:text-blue-400 transition-colors"
            >
              Syed Imran Shah
            </Link>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(148,163,184,1)" }}>
              AI-Powered HR Professional &amp; HR-Tech Developer
            </p>
            <p className="mt-1 text-xs" style={{ color: "rgba(100,116,139,1)" }}>
              Karachi · Open to UAE &amp; Germany
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(148,163,184,1)" }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(148,163,184,1)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(148,163,184,1)" }}>
              Connect
            </p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(148,163,184,1)" }}
                  >
                    {link.label}
                    <ExternalLink size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(100,116,139,1)" }}
        >
          <p>© 2026 Syed Imran Shah. All rights reserved.</p>
          <p>Built with Next.js · Tailwind CSS · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
