import { useEffect, useState } from "react";
import { Node } from "../Tree";
import TreeAnimatedArrow from "../TreeAnimatedArrow";
import Tooltip from "../../../ui/Tooltip";
import "./styles.css";
import Modal from "../../../ui/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { addGroup, fetchHierarchyType } from "../../../../services/api";

interface TreeNodeProps {
  node: Node;
  level?: number;
}

export interface TypeOrderProps {
  _id: string;
  order: number;
  type: string;
  __v?: number;
}

const TreeNode = ({ node, level = 0 }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const [typeOrder, setTypeOrder] = useState<string[]>([]);

  useEffect(() => {
    const getTypeOrder = async () => {
      try {
        const data = await fetchHierarchyType();

        const sortData = data.map((el: TypeOrderProps) => el.type);

        setTypeOrder(sortData);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    getTypeOrder();
  }, []);

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
              <span>{node.name}</span>
            </Tooltip>
          ) : (
            node.name
          )}
        </div>
        {node.type === "citizen" && (
          <MoreVertIcon
            className="tree-node__menu"
            onClick={(e) => {
              e.stopPropagation();
              handleAddNode();
            }}
          />
        )}
      </div>
      {hasChildren && isExpanded && (
        <ul className="tree-node__children">
          {node.children?.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Создать новый узел"
          dropdownOptions={typeOrder.map((type) => ({
            value: type,
            label: type,
          }))}
          dropdownLabel="Выберите тип"
        />
      )}
    </li>
  );
};

export default TreeNode;
