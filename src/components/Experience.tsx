"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Code2 } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    role: "HR Professional",
    org: "10+ Years of HR Management",
    period: "Present",
    current: true,
    description:
      "Managed the full employee lifecycle across recruitment, onboarding, payroll, performance management, and compliance. Holds a Master of Human Resources Management (MHRM) from the University of Karachi. Deep hands-on expertise in HR operations that now directly informs every system I build.",
    tags: ["Payroll", "Recruitment", "Performance Mgmt", "MHRM", "Compliance"],
  },
  {
    icon: Building2,
    role: "Owner — AlSyed Autoparts",
    org: "Auto-Parts Business",
    period: "Current",
    current: true,
    description:
      "Running a real auto-parts business end-to-end while simultaneously building its technology stack. Designed and shipped an AI-powered shop management system with inventory control, customer service automation, and operational AI features — deployed on Railway and Vercel.",
    tags: ["FastAPI", "React/Vite", "Railway", "Vercel", "AI Features"],
  },
  {
    icon: Code2,
    role: "HR-Tech Product Developer",
    org: "Independent — Building in Public",
    period: "2024 – Present",
    current: true,
    description:
      "Building a suite of production-grade HR technology products: NEXA HR (enterprise HRMS), NEXA HR Agents (10-skill AI agent suite), UAE AgentFactory (labour law compliance), and Smart School Management System (multi-tenant SaaS). All systems are tested, documented, and shipped.",
    tags: ["NEXA HR", "AI Agents", "UAE Labour Law", "FastAPI", "Next.js 14", "LangGraph"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding"
      style={{ backgroundColor: "var(--background-alt)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Experience
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {experiences.map(
              ({ icon: Icon, role, org, period, current, description, tags }, i) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: "easeOut" as const,
                  }}
                  className="sm:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full border-2 border-primary bg-background items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>

                  <div className="card-surface rounded-xl border border-border bg-background p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-base sm:text-lg">
                          {role}
                        </h3>
                        <p className="text-sm text-muted-foreground">{org}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                          current
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md border border-border bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
