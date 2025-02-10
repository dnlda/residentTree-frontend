import React from "react";
import TreeNode from "./TreeNode";
import Loading from "../../ui/Loading";

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
