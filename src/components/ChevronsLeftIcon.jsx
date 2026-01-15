import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export const ChevronsLeftIcon = forwardRef((props, ref) => {
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
      if (!isControlled.current) {
        controls.start('normal');
      } else if (onMouseLeave) {
        onMouseLeave(e);
      }
    },
    [controls, onMouseLeave]
  );

  const leadingArrow = {
    normal: { x: 0, opacity: 1 },
    animate: {
      x: [0, -4, 0],
      opacity: [1, 0.6, 1],
      transition: {
        duration: 0.8 * duration,
        repeat: 0,
      },
    },
  };

  const trailingArrow = {
    normal: { x: 0, opacity: 0.5 },
    animate: {
      x: [0, -6, 0],
      opacity: [0.5, 0.2, 0.5],
      transition: {
        duration: 0.8 * duration,
        repeat: 0,
        delay: 0.2,
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
        <motion.path
          d="m18 17-5-5 5-5"
          variants={trailingArrow}
          stroke="currentColor"
        />
        <motion.path
          d="m11 17-5-5 5-5"
          variants={leadingArrow}
          stroke="currentColor"
        />
      </motion.svg>
    </motion.div>
  );
});

ChevronsLeftIcon.displayName = 'ChevronsLeftIcon';
