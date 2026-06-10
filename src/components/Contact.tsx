"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "syed.is1990@gmail.com",
    href: "mailto:syed.is1990@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 333 2455770",
    href: "https://wa.me/923332455770",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "syed-imran-shah",
    href: "https://www.linkedin.com/in/syed-imran-shah-5894882ba",
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    value: "Imranshah19",
    href: "https://github.com/Imranshah19",
  },
  {
    icon: ExternalLink,
    label: "Fiverr",
    value: "syedio",
    href: "https://www.fiverr.com/syedio",
  },
];

type Status = "idle" | "success";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio inquiry from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:syed.is1990@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
  };

  return (
    <section id="contact" className="section-padding bg-background-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mb-10" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
          >
            {status === "success" ? (
              <div className="glass rounded-2xl border-emerald-400/20 p-8 text-center">
                <p className="text-lg font-semibold text-emerald-300 mb-2">
                  Opening your email client…
                </p>
                <p className="text-sm text-emerald-400/80">
                  If it didn&apos;t open, email me directly at{" "}
                  <a href="mailto:syed.is1990@gmail.com" className="underline underline-offset-2">
                    syed.is1990@gmail.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 text-sm text-emerald-400 underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Open to full-time HR-Tech roles in UAE and Germany, freelance
              projects, and collaboration on AI-driven HR systems. Feel free to
              reach out through any channel below.
            </p>
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 p-4 rounded-2xl hover:border-blue-400/40 hover:bg-white/[0.06] transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-blue-500/10 shrink-0">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-blue-400 transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
