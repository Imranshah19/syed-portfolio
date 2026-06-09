"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

export default function Hero() {
  return (
    <section className="bg-background section-padding">
      <div className="section-container">
        <div className="max-w-3xl">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground mb-6"
          >
            <MapPin size={12} className="text-primary" />
            Open to UAE &amp; Germany opportunities
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-4"
          >
            Syed Imran Shah
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-xl sm:text-2xl font-medium text-primary mb-4"
          >
            AI-Powered HR Professional — HR-Tech / HRMS Developer
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl"
          >
            I combine 10+ years of real HR expertise with full-stack AI
            development to build HR systems that actually ship.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 px-6 text-sm gap-2"
              )}
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-6 text-sm gap-2"
              )}
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
