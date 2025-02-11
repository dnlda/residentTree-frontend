import { useState } from "react";
import TreeNode from "./TreeNode";
import Loading from "../../ui/Loading";

import "./style.css";
import { addHierarchyType } from "../../../services/api";
import { useData } from "../../../providers/DataProvider";
import { TypeOrderProps } from "../../../types";

import AddHierarchyTypeModal from "../../ui/Modal/AddHierarchyModal";

const Tree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tree, hierarchy, reloadData } = useData();

  const sortHierarchy = hierarchy.map(({ type, order }: TypeOrderProps) => ({
    type,
    order,
  }));
  sortHierarchy.push({ type: "no parent", order: 0 });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (type: string, order: number) => {
    try {
      await addHierarchyType(order, type);

      console.log("Тип узла успешно добавлен");
      reloadData();
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (!tree) {
    return <Loading />;
  }

  const handleAddNode = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="tree">
      <div className="tree__header">
        <h1 className="tree__header-title">Дерево жителей</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddNode();
          }}
          className="tree__button"
        >
          Создать новый тип узла
        </button>
      </div>
      <div className="tree__nodes">
        {tree.map((city, index) => (
          <TreeNode key={index} node={city} />
        ))}
      </div>
      {isModalOpen && (
        <AddHierarchyTypeModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          dropdownOptions={sortHierarchy}
        />
      )}
    </div>
  );
};

export default Tree;
