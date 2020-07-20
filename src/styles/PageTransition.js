import React from "react";
import { motion } from "framer-motion";

function PageTransition({ children }) {
  const pageVariant = {
    initial: {
      opacity: 0,
      y: "-100vh",
      scale: 0.5,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 1,
      y: "100vh",
      scale: 0.8,
    },
  };

  const transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariant}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
