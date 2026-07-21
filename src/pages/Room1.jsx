import { useState, useRef } from "react";
import Wallpaper from "@/assets/wallpaper.jpg";
import Menu from "@/components/Menu.jsx";
import { useNavigate } from "react-router-dom";
import Wrench from "@/assets/Popup/Wrench.webp";
import Red_X from "@/assets/Popup/Red_X.webp";

export default function Room1({
  placedItems,
  onAddFurniture,
  onDeleteFurniture,
  onUpdateFurniture,
}) {
  const [dragging, setDragging] = useState(null);
  const [selected, setSelected] = useState(null);
  const [mouseDownInfo, setMouseDownInfo] = useState(null);
  const navigate = useNavigate();
  const furnitureRefs = useRef({});

  const selectedFurniture = placedItems.find((i) => i.instanceId === selected);

  const onPlaceItem = (furniture, customItem) => {
    const furnitureEl = furnitureRefs.current[furniture.instanceId];
    const furnitureWidth = furnitureEl?.offsetWidth || 100;
    const furnitureHeight = furnitureEl?.offsetHeight || 100;

    onUpdateFurniture(furniture.instanceId, {
      placedOnRoom: [
        ...(furniture.placedOnRoom || []),
        {
          ...customItem,
          id: Date.now(),
          x: furnitureWidth / 2, // ← center of furniture
          y: furnitureHeight / 2,
        },
      ],
    });
  };

  const onAddItem = (newItem) => {
    if (!selectedFurniture) return;
    onUpdateFurniture(selectedFurniture.instanceId, {
      customItems: [
        ...(selectedFurniture.customItems || []),
        {
          ...newItem,
          x: 20,
          y: 20,
        },
      ],
    });
  };

  const onMouseDown = (e, instanceId) => {
    e.preventDefault();
    e.stopPropagation();
    setMouseDownInfo({
      instanceId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX:
        e.clientX - placedItems.find((i) => i.instanceId === instanceId).x,
      offsetY:
        e.clientY - placedItems.find((i) => i.instanceId === instanceId).y,
    });
  };

  const onCustomItemMouseDown = (e, furnitureInstanceId, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    const furniture = placedItems.find(
      (i) => i.instanceId === furnitureInstanceId,
    );
    const customItem = furniture?.placedOnRoom?.find((i) => i.id === itemId);
    console.log("customItem x/y:", customItem?.x, customItem?.y);
    if (!customItem) return;

    // customItem.x/y is relative to furniture, so add furniture's position
    setMouseDownInfo({
      itemId,
      furnitureInstanceId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - (furniture.x + customItem.x), // ← add furniture position
      offsetY: e.clientY - (furniture.y + customItem.y),
      isCustomItem: true,
    });
  };

  const onMouseMove = (e) => {
    if (!mouseDownInfo) return;
    console.log("onMouseMove, mouseDownInfo:", mouseDownInfo);
    console.log("dragging:", dragging);

    const dx = Math.abs(e.clientX - mouseDownInfo.startX);
    const dy = Math.abs(e.clientY - mouseDownInfo.startY);

    if (!dragging && (dx > 5 || dy > 5)) {
      setDragging(mouseDownInfo);
      setSelected(null);
    }

    if (dragging) {
      if (dragging.isCustomItem) {
        const furniture = placedItems.find(
          (i) => i.instanceId === dragging.furnitureInstanceId,
        );
        if (!furniture) return;
        const furnitureEl = furnitureRefs.current[furniture.instanceId];
        const furnitureWidth = furnitureEl?.offsetWidth || 100;
        const furnitureHeight = furnitureEl?.offsetHeight || 100;

        // position relative to furniture
        const newX = Math.min(
          Math.max(e.clientX - dragging.offsetX - furniture.x, 0),
          furnitureWidth,
        );
        const newY = Math.min(
          Math.max(e.clientY - dragging.offsetY - furniture.y, 0),
          furnitureHeight,
        );

        const updatedItems = furniture.placedOnRoom.map((i) =>
          i.id === dragging.itemId ? { ...i, x: newX, y: newY } : i,
        );
        onUpdateFurniture(furniture.instanceId, { placedOnRoom: updatedItems });
      } else {
        // drag furniture
        onUpdateFurniture(dragging.instanceId, {
          x: e.clientX - dragging.offsetX,
          y: e.clientY - dragging.offsetY,
        });
      }
    }
  };

  const onMouseUp = () => {
    if (mouseDownInfo && !dragging) {
      if (mouseDownInfo.isCustomItem) {
        setSelected(`custom-${mouseDownInfo.itemId}`);
      } else {
        setSelected(mouseDownInfo.instanceId);
      }
    }
    setDragging(null);
    setMouseDownInfo(null);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
      style={{
        backgroundImage: `url(${Wallpaper})`,
        backgroundRepeat: "repeat",
        backgroundSize: "25%",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Menu
        onAddFurniture={onAddFurniture}
        selectedFurniture={selectedFurniture}
        onAddItem={onAddItem}
        placedItems={placedItems}
        onPlaceItem={onPlaceItem}
      />

      {placedItems.map((item) => (
        <div
          key={item.instanceId}
          style={{ position: "absolute", left: item.x, top: item.y }}
        >
          <img
            ref={(el) => (furnitureRefs.current[item.instanceId] = el)}
            src={item.src}
            onMouseDown={(e) => onMouseDown(e, item.instanceId)}
            draggable={false}
            style={{
              width: "10vw",
              height: "auto",
              cursor:
                dragging?.instanceId === item.instanceId ? "grabbing" : "grab",
              userSelect: "none",
              outline:
                selected === item.instanceId
                  ? "2px dashed rgba(0,0,0,0.5)"
                  : "none",
            }}
          />

          {/* custom items on top of furniture */}
          {(item.placedOnRoom || []).map((customItem) => (
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
                onMouseDown={(e) =>
                  onCustomItemMouseDown(e, item.instanceId, customItem.id)
                }
                draggable={false}
                style={{
                  width: "3vw",
                  height: "auto",
                  cursor:
                    dragging?.itemId === customItem.id ? "grabbing" : "grab",
                  userSelect: "none",
                  outline:
                    selected === `custom-${customItem.id}`
                      ? "2px dashed rgba(0,0,0,0.5)"
                      : "none",
                }}
              />
              <p
                className="caveat"
                style={{
                  textAlign: "center",
                  fontSize: "0.8vw",
                  margin: 0,
                  userSelect: "none",
                }}
              >
                {customItem.name || "Item"}
              </p>

              {/* delete popup for custom item */}
              {selected === `custom-${customItem.id}` && (
                <div
                  style={{
                    position: "absolute",
                    top: "-4vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(255,245,235,0.95)",
                    borderRadius: "0.5vw",
                    padding: "0.5vw",
                    display: "flex",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedItems = item.placedOnRoom.filter(
                        (i) => i.id !== customItem.id,
                      );
                      onUpdateFurniture(item.instanceId, {
                        customItems: updatedItems,
                      });
                      setSelected(null);
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
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* popup menu when furniture selected */}
          {selected === item.instanceId && (
            <div
              style={{
                position: "absolute",
                top: "-5vh",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255,245,235,0.95)",
                borderRadius: "0.5vw",
                padding: "0.5vw",
                display: "flex",
                gap: "0.5vw",
                zIndex: 10,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/furniture/${item.instanceId}`);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1vw",
                  padding: "0.3vw 0.8vw",
                  color: "#143D9E",
                }}
                className="caveat"
              >
                <img src={Wrench} style={{ height: "3vh", width: "auto" }} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFurniture(item.instanceId);
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
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
