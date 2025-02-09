import React, { useEffect, useState } from 'react';
import Tree from './components/layout/Tree/Tree';
import "./App.css";

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/citizen')
      .then((response) => response.json())
      .then((data) => setTreeData(data))
      .catch((error) => console.error('Error fetching tree data:', error));
  }, []);

  return (
    <>
      <h1>Дерево жителей</h1>
      <Tree data={treeData} />
    </>
  );
};

export default App;