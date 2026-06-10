"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "NEXA HR",
    subtitle: "Production HRMS",
    flagship: true,
    description:
      "Full-stack enterprise HRMS covering payroll, attendance, recruitment, performance management, asset tracking, shift scheduling, and global search. Includes MCP server integration and cross-run payroll search.",
    metric: "98/98 unit tests · 18/18 integration tests",
    tech: ["FastAPI", "Next.js 14", "PostgreSQL", "Redis", "Docker", "TypeScript"],
    code: "https://github.com/Imranshah19/nexa-hr",
    demo: null,
  },
  {
    title: "NEXA HR Agents",
    subtitle: "10-Skill AI Agent Suite",
    flagship: false,
    description:
      "Suite of 10 specialized HR AI agents — leave, payroll, recruitment, onboarding, offboarding, attendance, performance, compensation, analytics, and helpdesk — built with the Agent Factory pattern.",
    metric: "35/35 evals passing",
    tech: ["Claude API", "OpenAI Agents SDK", "Python", "Agent Factory", "SKILL.md"],
    code: "https://github.com/Imranshah19",
    demo: null,
  },
  {
    title: "Smart School Management System",
    subtitle: "Multi-Tenant SaaS",
    flagship: false,
    description:
      "Complete multi-tenant school management SaaS (4 phases shipped): admin portal, billing, and AIDA AI assistant. Integrates JazzCash and Stripe for payments.",
    metric: "4 phases shipped",
    tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    code: "https://github.com/Imranshah19/smart-school-saas",
    demo: null,
  },
  {
    title: "AI-HRM-UAE AgentFactory",
    subtitle: "UAE Labour Law Compliance",
    flagship: false,
    description:
      "LangGraph-powered agents for UAE labour law compliance: WPS (SIF format), gratuity calculation per Federal Decree-Law 33/2021, and MOHRE compliance checks.",
    metric: "39/39 WPS tests passing",
    tech: ["LangGraph", "Python", "Agent Factory"],
    code: "https://github.com/Imranshah19",
    demo: null,
  },
  {
    title: "LinkedIn AI Profile Audit",
    subtitle: "SaaS Tool",
    flagship: false,
    description:
      "AI-powered SaaS that audits LinkedIn profiles and generates actionable improvement reports. Includes a PDF/DOCX resume builder with JWT authentication and Stripe billing.",
    metric: null,
    tech: ["React/Vite", "FastAPI", "Claude API", "JWT", "Stripe"],
    code: "https://github.com/Imranshah19",
    demo: null,
  },
  {
    title: "AlSyed Autoparts",
    subtitle: "AI Shop Management System",
    flagship: false,
    description:
      "AI-powered shop management system built for a real auto-parts business. Handles inventory, customer service, and daily operations with AI-assisted features.",
    metric: null,
    tech: ["FastAPI", "React/Vite", "Railway", "Vercel"],
    code: "https://github.com/Imranshah19",
    demo: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-background section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: (i % 3) * 0.1,
                ease: "easeOut" as const,
              }}
              className={cn(
                "card-surface rounded-xl border bg-background p-6 flex flex-col gap-4",
                project.flagship
                  ? "border-primary/40 shadow-sm"
                  : "border-border"
              )}
            >
              {/* Header */}
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground text-base leading-snug">
                        {project.title}
                      </h3>
                      {project.flagship && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                          <Star size={10} />
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {project.metric && (
                  <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mt-2">
                    ✓ {project.metric}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-md border border-blue-100 bg-blue-50 text-blue-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-1 border-t border-border">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "gap-1.5"
                  )}
                >
                  <Code2 size={13} />
                  Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                  >
                    <ExternalLink size={13} />
                    Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all repos button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" as const }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/Imranshah19"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-2 px-6"
            )}
          >
            <ExternalLink size={16} />
            View All Repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
