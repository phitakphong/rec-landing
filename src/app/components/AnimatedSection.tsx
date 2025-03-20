import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { ReactNode } from "react";

const AnimatedSection = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.2, // Triggers when 20% of section is visible
  });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 300 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="">
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
