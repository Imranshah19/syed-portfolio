"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Server, Monitor, Container } from "lucide-react";

const skillGroups = [
  {
    icon: BrainCircuit,
    title: "HR Domain",
    desc: "Core people-ops expertise",
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
    desc: "Systems + AI agents",
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
    desc: "Modern web interfaces",
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
    desc: "Ship & deploy",
    skills: ["Docker", "Vercel", "Railway", "GitHub", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-slate-100">
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
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map(({ icon: Icon, title, desc, skills }, i) => (
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
              className="card-surface h-full flex flex-col overflow-hidden rounded-xl border border-border border-t-2 border-t-blue-600 bg-background"
            >
              <div className="bg-gradient-to-b from-blue-50 to-white px-6 pt-5 pb-4 border-b border-blue-100">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-xs text-muted-foreground ml-[calc(2rem+0.75rem)]">
                  {desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 content-start p-6 pt-4 flex-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700"
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
