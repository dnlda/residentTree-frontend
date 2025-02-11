import "./styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface TreeAnimatedArrowProps {
  isExpanded: boolean;
}

const TreeAnimatedArrow = ({ isExpanded }: TreeAnimatedArrowProps) => {
  return (
    <div
      className={`tree-animated-arrow__container ${
        isExpanded ? "tree-animated-arrow__container_state_expanded" : ""
      }`}
    >
      <KeyboardArrowDownIcon />
    </div>
  );
};

export default TreeAnimatedArrow;
