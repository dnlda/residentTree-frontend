import { ReactElement, useState } from "react";
import "./styles.css";

interface TooltipProps {
  value?: string;
  children: ReactElement | string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ value, children, position = "right" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getTooltipPosition = () => {
    switch (position) {
      case "top":
        return { bottom: "120%", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { top: "120%", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { top: "50%", right: "115%", transform: "translateY(-50%)" };
      case "right":
        return { bottom: "-100%", left: "115%", transform: "translateY(-50%)" };
      default:
        return { bottom: "-100%", left: "115%", transform: "translateY(-50%)" };
    }
  };

  return (
    <div className="tooltip">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          style={{
            ...getTooltipPosition(),
          }}
          className="tooltip__content"
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
