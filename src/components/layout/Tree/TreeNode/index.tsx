import { useState } from "react";
import TreeAnimatedArrow from "../TreeAnimatedArrow";
import "./styles.css";
import Tooltip from "../../../ui/Tooltip";

interface Node {
  id?: number;
  name: string;
  type?: string;
  children?: Node[];
  population?: string;
  city?: string;
}

interface TreeNodeProps {
  node: Node;
  level?: number;
}

const TreeNode = ({ node, level = 0 }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Проверяем, есть ли у узла дети
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className="tree-node">
      <div
        onClick={handleToggle}
        className={`tree-node__content ${
          hasChildren ? "tree-node__content--with-children" : ""
        }`}
      >
        {hasChildren && <TreeAnimatedArrow isExpanded={isExpanded} />}
        <div className="tree-node__name">
          {node.name}
          {node.population && (
            <span className="tree-node__population"> ({node.population})</span>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <ul className="tree-node__children">
          {node.children?.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
      {/* {node.type === "street" && isExpanded && (
        <ul className="tree-node__children">
          {node.children?.map((citizen, index) => (
            <li className="tree-node__citizen-name" key={index}>
              <Tooltip value={`${citizen.city}, ${citizen.population} жителей`}>
                {citizen.name}
              </Tooltip>
            </li>
          ))}
        </ul>
      )} */}
    </li>
  );
};

export default TreeNode;