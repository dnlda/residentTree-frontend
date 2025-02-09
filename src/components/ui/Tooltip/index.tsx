import { ReactElement, useState } from "react";

interface TooltipProps {
  value: string;
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
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "black",
            opacity: 0.5,
            color: "white",
            padding: "5px",
            borderRadius: "4px",
            fontSize: "14px",
            whiteSpace: "nowrap",
            zIndex: 1000,
            ...getTooltipPosition(),
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Tooltip