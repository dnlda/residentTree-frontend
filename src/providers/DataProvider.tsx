import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchTreeData, fetchHierarchyType } from "../services/api";
import { NodeProps, TypeOrderProps } from "../types";

interface DataContextType {
  tree: NodeProps[];
  hierarchy: TypeOrderProps[];
  reloadData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [tree, setTree] = useState<NodeProps[]>([]);
  const [hierarchy, setHierarchy] = useState<TypeOrderProps[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [treeData, hierarchyData] = await Promise.all([
        fetchTreeData(),
        fetchHierarchyType(),
      ]);
      setTree(treeData);
      setHierarchy(hierarchyData);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DataContext.Provider value={{ tree, hierarchy, reloadData: loadData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
