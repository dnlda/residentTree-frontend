import React, { useEffect, useState } from 'react';
import Tree from './components/layout/Tree/Tree';
import "./App.css";
import { fetchTreeData } from './services/api';

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    const getTreeData = async () => {
      try {
        const data = await fetchTreeData(); // Используем функцию запроса
        setTreeData(data);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    getTreeData();
  }, []);


  return (
    <>
      
      <Tree data={treeData} />
    </>
  );
};

export default App;