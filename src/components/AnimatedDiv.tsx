"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedDiv({ children, className, delay = 0 }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
