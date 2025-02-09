import React from "react";
import TreeNode from "./TreeNode";
import Loading from "../../ui/Loading";

interface Node {
  id?: number;
  name: string;
  type?: string;
  children?: Node[];
  population?: string; // Население города (только для жителей)
  city?: string; // Название города (только для жителей)
}

interface TreeProps {
  data: Node[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  if (!data) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((city, index) => (
        <TreeNode key={index} node={city} />
      ))}
    </div>
  );
};

export default Tree;