"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Server, Monitor, Container } from "lucide-react";

const skillGroups = [
  {
    icon: BrainCircuit,
    title: "HR Domain",
    skills: [
      "HRMS Design",
      "Payroll",
      "Recruitment",
      "Performance Management",
      "UAE Labour Law",
      "WPS / SIF Format",
      "Gratuity (Decree-Law 33/2021)",
      "MOHRE Compliance",
      "HR Analytics",
      "10+ yrs HR Management",
    ],
  },
  {
    icon: Server,
    title: "Backend & AI",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "LangGraph",
      "OpenAI Agents SDK",
      "Claude API",
      "MCP Servers",
      "RAG",
      "Agent Factory",
    ],
  },
  {
    icon: Monitor,
    title: "Frontend",
    skills: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    icon: Container,
    title: "DevOps",
    skills: ["Docker", "Vercel", "Railway", "GitHub", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
            Skills &amp; Tech Stack
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map(({ icon: Icon, title, skills }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: "easeOut" as const,
              }}
              className="rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
