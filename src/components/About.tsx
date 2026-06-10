"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, MapPin, Code2 } from "lucide-react";

const highlights = [
  { icon: Briefcase, label: "10+ Years", sub: "HR Management" },
  { icon: GraduationCap, label: "MHRM", sub: "University of Karachi" },
  { icon: Code2, label: "Full-Stack", sub: "AI Developer" },
  { icon: MapPin, label: "Karachi, PK", sub: "Open to UAE & Germany" },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function About() {
  return (
    <section id="about" className="bg-background section-padding">
      <div className="section-container">
        <motion.div {...inView()}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mb-10" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div {...inView(0.1)} className="space-y-5">
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              I am an HR professional with over 10 years of hands-on experience
              managing the full employee lifecycle — from recruitment and
              onboarding to payroll, performance management, and compliance.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Holding a{" "}
              <strong className="text-foreground font-semibold">
                Master of Human Resources Management (MHRM)
              </strong>{" "}
              from the University of Karachi, I have channeled that domain
              depth into building production-grade HR technology: enterprise
              HRMS platforms, AI agent suites, and UAE labour law compliance
              systems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Most HR software is built by engineers who have never run a
              payroll cycle. I bridge that gap — I have lived the problems I am
              solving, which means the systems I build are grounded in real
              operational constraints, not just technical elegance.
            </p>
          </motion.div>

          <motion.div
            {...inView(0.2)}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="glass card-surface rounded-2xl p-5"
              >
                <Icon size={22} className="text-blue-400 mb-3" />
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  {label}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
