"use client";

import { useRef, useState } from "react";

type HelpBubblePlacement = "top" | "bottom" | "left" | "right";

type Props = {
  id: string;
  content: string;
  placement?: HelpBubblePlacement;
  className?: string;
};

const tooltipPos: Record<HelpBubblePlacement, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

// Which two border sides to show so the arrow tip points toward the button
const arrowPos: Record<HelpBubblePlacement, string> = {
  top:    "bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b",
  bottom: "top-[-4px]    left-1/2 -translate-x-1/2 border-l border-t",
  left:   "right-[-4px]  top-1/2  -translate-y-1/2 border-r border-t",
  right:  "left-[-4px]   top-1/2  -translate-y-1/2 border-l border-b",
};

const HelpBubble = ({
  id,
  content,
  placement = "top",
  className = "",
}: Props) => {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
  };

  // Small delay so the mouse can travel from button to tooltip without closing
  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  };

  return (
    <div className="relative inline-flex shrink-0">
      <button
        type="button"
        aria-label={`Help: ${content.slice(0, 80)}`}
        aria-describedby={`help-${id}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={() => setVisible((v) => !v)}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full
                   border border-neutral-400 text-neutral-500 dark:text-white/60
                   hover:bg-custom-green hover:text-custom-dark hover:border-custom-green
                   transition-colors text-xs font-bold ${className}`}
      >
        ?
      </button>

      {visible && (
        <div
          role="tooltip"
          id={`help-${id}`}
          onMouseEnter={show}
          onMouseLeave={hide}
          className={`absolute z-50 w-56 px-3 py-2 text-xs leading-relaxed
                      rounded-xl shadow-md
                      bg-white text-neutral-700 border border-neutral-200
                      dark:bg-neutral-800 dark:text-white/80 dark:border-white/10
                      ${tooltipPos[placement]}`}
        >
          {content}
          <span
            className={`absolute w-2 h-2 rotate-45
                        bg-white border-neutral-200
                        dark:bg-neutral-800 dark:border-white/10
                        ${arrowPos[placement]}`}
          />
        </div>
      )}
    </div>
  );
};

export default HelpBubble;
