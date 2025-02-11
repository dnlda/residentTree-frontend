import React, { useEffect, useState } from "react";
import Tree from "./components/layout/Tree/Tree";
import "./App.css";
import { fetchTreeData } from "./services/api";
import { DataProvider } from "./providers/DataProvider";

const App: React.FC = () => {
 
  return (
    <DataProvider>
      <Tree  />
    </DataProvider>
  );
};

export default App;
