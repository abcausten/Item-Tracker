import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Room1 from "@/pages/Room1.jsx";
import FurniturePage from "@/pages/FurniturePage.jsx";

export default function App() {
  const [placedItems, setPlacedItems] = useState([]);

  const addFurniture = (item) => {
    setPlacedItems((prev) => [
      ...prev,
      {
        ...item,
        instanceId: Date.now(),
        x: 200,
        y: 200,
      },
    ]);
  };

  const deleteFurniture = (instanceId) => {
    setPlacedItems((prev) =>
      prev.filter((item) => item.instanceId !== instanceId),
    );
  };

  const updateFurniture = (instanceId, updates) => {
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId ? { ...item, ...updates } : item,
      ),
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Room1
            placedItems={placedItems}
            onAddFurniture={addFurniture}
            onDeleteFurniture={deleteFurniture}
            onUpdateFurniture={updateFurniture}
          />
        }
      />
      <Route
        path="/furniture/:instanceId"
        element={
          <FurniturePage
            placedItems={placedItems}
            onUpdateFurniture={updateFurniture}
          />
        }
      />
    </Routes>
  );
}
