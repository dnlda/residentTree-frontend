import { useState } from "react";

import TreeAnimatedArrow from "../TreeAnimatedArrow";
import Tooltip from "../../../ui/Tooltip";
import "./styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { addGroup } from "../../../../services/api";
import { NodeProps } from "../../../../types";
import AddGroupNodeModal from "../../../ui/Modal/AddGroupNodeModal";
import { useData } from "../../../../providers/DataProvider";

interface TreeNodeProps {
  node: NodeProps;
  level?: number;
}

const TreeNode = ({ node, level = 0 }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const { hierarchy, reloadData } = useData();

  const mappedHierarchy = hierarchy.map((el) => el.type);

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAddNode = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (type: string, name: string) => {
    try {
      await addGroup(node.id?.toString() || "", { type, name });

      console.log("Узел успешно добавлен");
      reloadData();
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <li className="tree-node">
      <div
        onClick={handleToggle}
        className={`tree-node__content ${
          hasChildren ? "tree-node__content_state_with-children" : ""
        }`}
      >
        {hasChildren && <TreeAnimatedArrow isExpanded={isExpanded} />}
        <div className="tree-node__name">
          {node.type === "citizen" ? (
            <Tooltip value={`${node.city} ${node.data} жителей`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{node.name}</span>
                <MoreVertIcon
                  className="tree-node__menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNode();
                  }}
                />
              </div>
            </Tooltip>
          ) : (
            node.name
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
      {isModalOpen && (
        <AddGroupNodeModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          dropdownOptions={mappedHierarchy}
        />
      )}
    </li>
  );
};

export default TreeNode;
