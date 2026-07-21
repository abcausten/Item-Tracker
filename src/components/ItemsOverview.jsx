export default function ItemsOverview({ placedItems, onClose, onPlaceItem }) {
  return (
    <>
      {/* overlay */}
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
          width: "70vw",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2
          className="caveat-bold"
          style={{ fontSize: "3vw", marginBottom: "1vw" }}
        >
          Items
        </h2>

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

        {/* each furniture row */}
        {placedItems.map((furniture) => (
          <div
            key={furniture.instanceId}
            style={{
              backgroundColor: "rgba(200,200,200,0.3)",
              borderRadius: "0.5vw",
              padding: "1vw",
              marginBottom: "1vw",
              display: "flex",
              alignItems: "center",
              gap: "1vw",
            }}
          >
            {/* furniture image and label */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "8vw",
              }}
            >
              <img
                src={furniture.src}
                style={{ width: "6vw", height: "auto" }}
              />
              <p
                className="caveat"
                style={{
                  fontSize: "1.2vw",
                  margin: "0.3vw 0 0 0",
                  textAlign: "center",
                }}
              >
                {furniture.label}
              </p>
            </div>

            {/* divider */}
            <div
              style={{
                width: "1px",
                alignSelf: "stretch",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            />

            {/* items inside this furniture */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1vw",
                flex: 1,
              }}
            >
              {(furniture.customItems || []).length === 0 ? (
                <p
                  className="caveat"
                  style={{ fontSize: "1.2vw", color: "rgba(0,0,0,0.4)" }}
                >
                  No items yet
                </p>
              ) : (
                (furniture.customItems || []).map((customItem) => (
                  <button
                    key={customItem.id}
                    onClick={() => {
                      onPlaceItem(furniture, customItem);
                      onClose();
                    }}
                    style={{
                      background: "none",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "0.5vw",
                      cursor: "pointer",
                      padding: "0.5vw",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3vw",
                    }}
                  >
                    <img
                      src={customItem.src}
                      style={{ width: "5vw", height: "auto" }}
                    />
                    <span className="caveat" style={{ fontSize: "1vw" }}>
                      {customItem.name || "Item"}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
