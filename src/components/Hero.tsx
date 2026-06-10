"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Typewriter from "@/components/Typewriter";

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
  return (
    <section className="hero-bg section-padding">
      <div className="section-container relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
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
              className="text-xl sm:text-2xl font-medium text-primary mb-4 min-h-[1.75em]"
            >
              <Typewriter />
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

          <motion.div
            {...fadeUp(0.15)}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 aspect-square">
              <div className="absolute -inset-8 rounded-full bg-blue-400/20 blur-3xl" />
              <div className="relative w-full h-full aspect-square rounded-full overflow-hidden ring-4 ring-blue-100 shadow-xl">
                <Image
                  src="/profile.jpg"
                  alt="Syed Imran Shah"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 18rem, 20rem"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.5)}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl"
        >
          {highlights.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-white/60 backdrop-blur-sm px-4 py-4 text-center sm:text-left"
            >
              <p className="text-xl sm:text-2xl font-bold text-primary">
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
