import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Red_X from "@/assets/Popup/Red_X.webp";

export default function ItemPicker({ onClose, onAddItem }) {
  const [preview, setPreview] = useState(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const canvasRef = useRef(null);

  const handleAddToRoom = async () => {
    console.log("handleAddToRoom called");
    console.log("preview:", preview);

    if (preview) {
      onAddItem({
        id: Date.now(),
        src: preview,
        label: "Custom Item",
        x: 1000,
        y: 200,
      });
    } else {
      const dataUrl = await canvasRef.current.exportImage("png");
      onAddItem({
        id: Date.now(),
        src: dataUrl,
        label: "Custom Item",
        x: 1000,
        y: 200,
      });
    }
    onClose();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
    },
  });

  const clearCanvas = () => canvasRef.current?.clearCanvas();
  const undoCanvas = () => canvasRef.current?.undo();

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      />

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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          className="caveat-bold"
          style={{ textAlign: "left", fontSize: "4vw", marginBottom: "1vw" }}
        >
          Draw your item
        </h2>
        <button
          onClick={handleAddToRoom}
          className="caveat"
          style={{
            marginTop: "1vw",
            width: "100%",
            padding: "0.5vw",
            fontSize: "2vw",
            cursor: "pointer",
            backgroundColor: "rgba(132, 132, 132, 0.4)",
            border: "none",
            borderRadius: "0.5vw",
            marginBottom: "1vw",
          }}
        >
          Add to Room
        </button>

        {/* toolbar */}
        <div
          style={{
            display: "flex",
            gap: "1vw",
            marginBottom: "0.5vw",
            alignItems: "center",
          }}
        >
          <label className="caveat" style={{ fontSize: "1.5vw" }}>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ marginLeft: "0.3vw", cursor: "pointer" }}
            />
          </label>

          <label className="caveat" style={{ fontSize: "1.5vw" }}>
            Size:
            <input
              type="range"
              min={1}
              max={20}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ marginLeft: "0.3vw" }}
            />
          </label>

          <button
            onClick={undoCanvas}
            className="caveat"
            style={{
              background: "none",
              border: "1px solid #ccc",
              borderRadius: "0.3vw",
              cursor: "pointer",
              fontSize: "1.5vw",
              padding: "0.2vw 0.8vw",
            }}
          >
            Undo
          </button>

          <button
            onClick={clearCanvas}
            className="caveat"
            style={{
              background: "none",
              border: "1px solid #ccc",
              borderRadius: "0.3vw",
              cursor: "pointer",
              fontSize: "1.5vw",
              padding: "0.2vw 0.8vw",
            }}
          >
            Clear
          </button>
        </div>

        {/* canvas */}
        <div
          onClick={(e) => e.stopPropagation()} // prevents closing popup when drawing
          style={{
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "0.5vw",
            overflow: "hidden",
          }}
        >
          <ReactSketchCanvas
            ref={canvasRef}
            width="100%"
            height="30vw"
            strokeColor={color}
            strokeWidth={brushSize}
            canvasColor="transparent"
          />
        </div>

        {/* dropzone */}
        <div
          className="caveat"
          style={{
            textAlign: "left",
            fontSize: "2vw",
            marginTop: "1vw",
            marginBottom: "1vw",
          }}
        >
          Or import it here
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed rgba(0,0,0,0.3)",
              borderRadius: "0.5vw",
              padding: "1vw",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragActive
                ? "rgba(0,0,0,0.05)"
                : "transparent",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop it here...</p>
            ) : (
              <p>Drag and drop an image, or click to select</p>
            )}
          </div>
        </div>

        {preview && (
          <div style={{ marginTop: "1vw", textAlign: "center" }}>
            <img
              src={preview}
              style={{ width: "10vw", height: "auto", borderRadius: "0.5vw" }}
            />
            <p
              className="caveat"
              style={{ fontSize: "1.5vw", marginTop: "0.5vw" }}
            >
              Your item
            </p>
          </div>
        )}

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
          <img
            src={Red_X}
            style={{
              width: "4vw",
              height: "auto",
            }}
          ></img>
        </button>
      </div>
    </>
  );
}
