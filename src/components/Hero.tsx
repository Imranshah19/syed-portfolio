"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Typewriter from "@/components/Typewriter";
import Terminal from "@/components/Terminal";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const highlights = [
  { value: "10+", label: "Years HR Experience" },
  { value: "6+", label: "Production Projects Shipped" },
  { value: "MHRM", label: "University of Karachi" },
  { value: "AI Agents", label: "Built for HR (Pakistan + UAE)" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero-bg section-padding">
      <div className="section-container relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center lg:items-start">
          <div className="order-2 lg:order-1">
            <motion.div
              {...fadeUp(0)}
              className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-slate-300 mb-6"
            >
              <MapPin size={12} className="text-blue-400" />
              Open to UAE &amp; Germany opportunities
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >
              Syed Imran Shah
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-xl sm:text-2xl font-medium text-blue-400 mb-4 min-h-[1.75em]"
            >
              <Typewriter />
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl"
            >
              I combine 10+ years of real HR expertise with full-stack AI
              development to build HR systems that actually ship.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="mb-8 max-w-xl">
              <Terminal />
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
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
                  "glass h-11 px-6 text-sm gap-2 hover:border-blue-400/40 hover:bg-white/[0.06]"
                )}
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.15)}
            className="order-1 lg:order-2 flex justify-center lg:justify-end lg:mt-12"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 aspect-square max-h-80">
              <div className="absolute -inset-8 rounded-full bg-blue-400/20 blur-3xl" />
              <motion.div
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full aspect-square rounded-full p-[3px] bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl shadow-blue-500/20"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/profile.jpg"
                    alt="Syed Imran Shah"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 18rem, 20rem"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl"
        >
          {highlights.map(({ value, label }) => (
            <div
              key={label}
              className="glass rounded-xl px-4 py-4 text-center sm:text-left transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <p className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
