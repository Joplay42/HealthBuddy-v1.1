"use client";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

type HelpBubblePlacement = "top" | "bottom" | "left" | "right";

type Props = {
  id: string;
  content: string;
  placement?: HelpBubblePlacement;
  className?: string;
};

const HelpBubble = ({
  id,
  content,
  placement = "top",
  className = "",
}: Props) => (
  <OverlayTrigger
    placement={placement}
    trigger={["hover", "focus", "click"]}
    rootClose
    overlay={
      <Tooltip id={`help-${id}`} className="hb-help-tooltip">
        {content}
      </Tooltip>
    }
  >
    <button
      type="button"
      aria-label={`Help: ${content.slice(0, 80)}`}
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full
                 border border-neutral-400 text-neutral-500 dark:text-white/60
                 hover:bg-custom-green hover:text-custom-dark hover:border-custom-green
                 transition-colors text-xs font-bold align-middle shrink-0 ${className}`}
    >
      ?
    </button>
  </OverlayTrigger>
);

export default HelpBubble;
