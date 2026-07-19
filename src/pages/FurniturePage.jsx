import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuItems from "../components/MenuItems";
import ShadedBackground from "@/assets/Shaded_Background.webp";

export default function FurniturePage({ placedItems, onUpdateFurniture }) {
  const { instanceId } = useParams();
  const navigate = useNavigate();

  if (!placedItems) return <p>Loading...</p>;

  const item = placedItems.find((i) => i.instanceId === Number(instanceId));

  if (!item) return <p>Furniture not found</p>;

  const handleAddItem = (newItem) => {
    console.log("FurniturePage received item:", newItem);
    onUpdateFurniture(Number(instanceId), {
      customItems: [...(item.customItems || []), newItem],
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${ShadedBackground})`,
        backgroundRepeat: "repeat",
        backgroundSize: "75%",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#EFE3CD",
      }}
    >
      <MenuItems onAddItem={handleAddItem} />

      {/* show placed custom items */}
      <div
        style={{
          marginLeft: "25vw",
          padding: "2vw",
          display: "flex",
          gap: "1vw",
          flexWrap: "wrap",
        }}
      >
        {(item.customItems || []).map((customItem) => (
          <img
            key={customItem.id}
            src={customItem.src}
            style={{ width: "10vw", height: "auto", borderRadius: "0.5vw" }}
          />
        ))}
      </div>
    </div>
  );
}
