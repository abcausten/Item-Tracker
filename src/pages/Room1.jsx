import { useState } from "react";
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

  const onMouseMove = (e) => {
    if (!mouseDownInfo) return;
    const dx = Math.abs(e.clientX - mouseDownInfo.startX);
    const dy = Math.abs(e.clientY - mouseDownInfo.startY);
    if (!dragging && (dx > 5 || dy > 5)) {
      setDragging(mouseDownInfo);
      setSelected(null);
    }
    if (dragging) {
      onUpdateFurniture(dragging.instanceId, {
        x: e.clientX - dragging.offsetX,
        y: e.clientY - dragging.offsetY,
      });
    }
  };

  const onMouseUp = () => {
    if (mouseDownInfo && !dragging) {
      setSelected(mouseDownInfo.instanceId);
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
      <Menu onAddFurniture={onAddFurniture} />

      {placedItems.map((item) => (
        <div
          key={item.instanceId}
          style={{ position: "absolute", left: item.x, top: item.y }}
        >
          <img
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

          {/* popup menu when selected */}
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
