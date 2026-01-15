import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export const MenuIcon = forwardRef((props, ref) => {
  const {
    onMouseEnter,
    onMouseLeave,
    className = '',
    size = 24,
    duration = 1,
    isAnimated = true,
    ...otherProps
  } = props;

  const controls = useAnimation();
  const reduced = useReducedMotion();
  const isControlled = useRef(false);

  useImperativeHandle(ref, () => {
    isControlled.current = true;
    return {
      startAnimation: () =>
        reduced ? controls.start('normal') : controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleEnter = useCallback(
    (e) => {
      if (!isAnimated || reduced) return;
      if (!isControlled.current) controls.start('animate');
      else if (onMouseEnter) onMouseEnter(e);
    },
    [controls, reduced, isAnimated, onMouseEnter]
  );

  const handleLeave = useCallback(
    (e) => {
      if (!isControlled.current) controls.start('normal');
      else if (onMouseLeave) onMouseLeave(e);
    },
    [controls, onMouseLeave]
  );

  const topVariants = {
    normal: { y: 0, x: 0 },
    animate: {
      y: -1.5,
      x: 1.5,
      transition: {
        duration: 0.25 * duration,
        ease: 'easeOut',
      },
    },
  };

  const midVariants = {
    normal: { scaleX: 1, opacity: 1 },
    animate: {
      scaleX: 0.7,
      opacity: 0.7,
      transition: {
        duration: 0.2 * duration,
        ease: 'easeInOut',
      },
    },
  };

  const bottomVariants = {
    normal: { y: 0, x: 0 },
    animate: {
      y: 1.5,
      x: -1.5,
      transition: {
        duration: 0.25 * duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...otherProps}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
        initial="normal"
      >
        <motion.path d="M4 6h16" variants={topVariants} />
        <motion.path d="M4 12h16" variants={midVariants} />
        <motion.path d="M4 18h16" variants={bottomVariants} />
      </motion.svg>
    </motion.div>
  );
});

MenuIcon.displayName = 'MenuIcon';
