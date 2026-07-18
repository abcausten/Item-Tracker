import Drawer from "@/assets/Furniture/Drawer.webp";
import Desk from "@/assets/Furniture/Desk.webp";
import Shelf from "@/assets/Furniture/Shelf.webp";
import Bookshelf from "@/assets/Furniture/Bookshelf.webp";

const FURNITURE = [
  { id: "drawer", label: "Drawer", src: Drawer },
  { id: "desk", label: "Desk", src: Desk },
  { id: "shelf", label: "Shelf", src: Shelf },
  { id: "bookshelf", label: "Bookshelf", src: Bookshelf },
];

export default function FurniturePicker({ onSelect, onClose }) {
  return (
    <>
      {/* dark overlay, click to close */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      />

      {/* popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255,245,235,0.95)",
          borderRadius: "1vw",
          padding: "2vw",
          zIndex: 11,
          width: "60vw",
        }}
      >
        <h2
          className="caveat"
          style={{ textAlign: "center", fontSize: "3vw", marginBottom: "1vw" }}
        >
          Furniture
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2vw",
          }}
        >
          {FURNITURE.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5vw",
              }}
            >
              <img src={item.src} style={{ width: "10vw", height: "auto" }} />
              <span className="caveat" style={{ fontSize: "1.5vw" }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1vw",
            right: "1vw",
            background: "none",
            border: "none",
            fontSize: "1.5vw",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
}
