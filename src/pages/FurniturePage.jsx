import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuItems from "../components/MenuItems";
import ShadedBackground from "@/assets/Shaded_Background.webp";
import Red_X from "@/assets/Popup/Red_X.webp";

export default function FurniturePage({ placedItems, onUpdateFurniture }) {
  const { instanceId } = useParams();
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(null);
  const [selected, setSelected] = useState(null);
  const [mouseDownInfo, setMouseDownInfo] = useState(null);

  if (!placedItems) return <p>Loading...</p>;

  const item = placedItems.find((i) => i.instanceId === Number(instanceId));

  if (!item) return <p>Furniture not found</p>;

  const renameItem = (itemId, newName) => {
    const updatedItems = item.customItems.map((i) =>
      i.id === itemId ? { ...i, name: newName } : i,
    );
    onUpdateFurniture(Number(instanceId), { customItems: updatedItems });
  };

  const handleAddItem = (newItem) => {
    onUpdateFurniture(Number(instanceId), {
      customItems: [
        ...(item.customItems || []),
        {
          ...newItem,
          x: newItem.x ?? 200,
          y: newItem.y ?? 200,
          name: newItem.name ?? "New Item",
        },
      ],
    });
  };

  const onMouseDown = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    const freshItem = placedItems.find(
      (i) => i.instanceId === Number(instanceId),
    );
    const customItem = freshItem?.customItems?.find((i) => i.id === itemId);
    if (!customItem) return;
    setMouseDownInfo({
      itemId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - (customItem.x ?? 200),
      offsetY: e.clientY - (customItem.y ?? 200),
    });
  };

  const onMouseMove = (e) => {
    if (!mouseDownInfo) return;
    const dx = Math.abs(e.clientX - mouseDownInfo.startX);
    const dy = Math.abs(e.clientY - mouseDownInfo.startY);

    if (!dragging && (dx > 5 || dy > 5)) {
      setDragging(mouseDownInfo);
      setSelected(null);
    }

    if (dragging) {
      const freshItem = placedItems.find(
        (i) => i.instanceId === Number(instanceId),
      );
      if (!freshItem?.customItems) return;

      const updatedItems = freshItem.customItems.map((i) =>
        i.id === dragging.itemId
          ? {
              ...i,
              x: e.clientX - dragging.offsetX,
              y: e.clientY - dragging.offsetY,
            }
          : i,
      );
      onUpdateFurniture(Number(instanceId), { customItems: updatedItems });
    }
  };

  if (dragging) {
    console.log("dragging item:", dragging.itemId);
    const freshItem = placedItems.find(
      (i) => i.instanceId === Number(instanceId),
    );
    console.log("freshItem:", freshItem);
    console.log("freshItem customItems:", freshItem?.customItems);
  }

  const onMouseUp = () => {
    if (mouseDownInfo && !dragging) {
      setSelected(mouseDownInfo.itemId);
    }
    setDragging(null);
    setMouseDownInfo(null);
  };

  const deleteItem = (itemId) => {
    const updatedItems = item.customItems.filter((i) => i.id !== itemId);
    onUpdateFurniture(Number(instanceId), { customItems: updatedItems });
    setSelected(null);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
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

      {(item.customItems || []).map((customItem) => (
        <div
          key={customItem.id}
          style={{
            position: "absolute",
            left: customItem.x,
            top: customItem.y,
          }}
        >
          <img
            src={customItem.src}
            onMouseDown={(e) => onMouseDown(e, customItem.id)}
            draggable={false}
            style={{
              width: "10vw",
              height: "auto",
              cursor: dragging?.itemId === customItem.id ? "grabbing" : "grab",
              userSelect: "none",
              outline:
                selected === customItem.id
                  ? "2px dashed rgba(0,0,0,0.5)"
                  : "none",
            }}
          />
          {/* always visible name */}
          <p
            className="caveat"
            style={{
              textAlign: "center",
              fontSize: "1.2vw",
              margin: 0,
              userSelect: "none",
            }}
          >
            {customItem.name}
          </p>
          {selected === customItem.id && (
            <div
              style={{
                position: "absolute",
                top: "-8vh",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255,245,235,0.95)",
                borderRadius: "0.5vw",
                padding: "0.5vw",
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
                zIndex: 10,
              }}
            >
              {/* name input */}
              <input
                className="caveat"
                value={customItem.name}
                onChange={(e) => renameItem(customItem.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: "1vw",
                  border: "1px solid #ccc",
                  borderRadius: "0.3vw",
                  padding: "0.2vw 0.5vw",
                  background: "transparent",
                  textAlign: "center",
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(customItem.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1vw",
                  padding: "0.3vw 0.8vw",
                  color: "red",
                }}
                className="caveat"
              >
                <img src={Red_X} style={{ height: "3vh", width: "auto" }} />
                <p>Delete</p>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
