import React, { useEffect, useState } from "react";
import TreeNode, { TypeOrderProps } from "./TreeNode";
import Loading from "../../ui/Loading";
import Modal from "../../ui/Modal";
import "./style.css";
import { addHierarchyType, fetchHierarchyType } from "../../../services/api";

export interface Node {
  id?: number;
  name: string;
  type?: string;
  data?: string;
  children?: Node[];
  city?: string;
}

interface TreeProps {
  data: Node[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hierarchyType, setHierarchyType] = useState<TypeOrderProps[]>([]);

  useEffect(() => {
    const getTypeOrder = async () => {
      try {
        const data = await fetchHierarchyType();

        const sortData = data.map(({ type, order }: TypeOrderProps) => ({
          type,
          order,
        }));
        sortData.push({ type: "no parent", order: 0 });

        setHierarchyType(sortData);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    getTypeOrder();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (order: number, type: string) => {
    try {
      await addHierarchyType(order, type);

      console.log("Тип узла успешно добавлен");
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (!data) {
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
        {data.map((city, index) => (
          <TreeNode key={index} node={city} />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Создать новый тип узла"
          dropdownOptions={hierarchyType.map((item) => ({
            value: item.order + 1,
            label: item.type,
          }))}
          dropdownLabel="Выбери родителя"
        />
      )}
    </div>
  );
};

export default Tree;
