"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Code2, FileText } from "lucide-react";

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
    role: "Founder & HR / Operations Lead — AlSyed Autoparts",
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
  {
    icon: FileText,
    role: "Office Administrator & Document Controller",
    org: "Al-Aren Construction Company — Jeddah, Saudi Arabia",
    period: "2016 – 2018",
    current: false,
    description:
      "Managed office administration and document control for a construction company; gained Gulf experience in a multicultural environment.",
    tags: ["Office Admin", "Document Control", "Gulf Experience"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-background-alt">
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
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mb-10" />
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
                  <div className="hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full border-2 border-blue-400 bg-background-alt items-center justify-center shadow-lg shadow-blue-500/20">
                    <Icon size={16} className="text-blue-400" />
                  </div>

                  <div className="glass card-surface rounded-2xl border-l-4 border-l-blue-400 p-6">
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
                            ? "bg-blue-500/10 text-blue-300"
                            : "bg-white/5 text-muted-foreground border border-white/10"
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
                          className="text-xs px-2 py-0.5 rounded-md border border-blue-400/20 bg-blue-500/10 text-blue-300"
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
