import Home from "@/assets/Menu/Home.webp";
import MenuPng from "@/assets/Menu/Menu.webp";
import Appearance from "@/assets/Menu/Appearance.webp";
import Layout from "@/assets/Menu/Layout.webp";

export default function Menu() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        height: "100vh",
        width: "22vw",
        padding: "2vw",
        backgroundColor: "rgba(132, 132, 132, 0.6)",
        borderRadius: "1vw",
      }}
    >
      {/*buttons*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3vw",
          alignItems: "center",
          marginBottom: "8vh",
        }}
      >
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src={Home} style={{ width: "7vw", height: "auto" }} />
        </button>

        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src={MenuPng} style={{ width: "7vw", height: "auto" }} />
        </button>
      </div>

      <div>
        <button
          style={{
            background: "transparent",
            border: "none",
            position: "absolute",
            top: "32vh",
            left: "2vw",
            height: "16vh",
            width: "6vw",
            cursor: "pointer",
            pointerEvents: "all",
            zIndex,
          }}
        ></button>

        <button
          style={{
            background: "transparent",
            border: "none",
            position: "absolute",
            top: "32vh",
            left: "9vw",
            height: "16vh",
            width: "6vw",
            cursor: "pointer",
          }}
        ></button>

        <button
          style={{
            background: "transparent",
            border: "none",
            position: "absolute",
            top: "32vh",
            right: "2vw",
            height: "16vh",
            width: "6vw",
            cursor: "pointer",
          }}
        ></button>
      </div>

      <div style={{ transform: "translateX(-1vw) translateY(2vh)" }}>
        <h1
          className="caveat"
          style={{
            textAlign: "center",
            fontSize: "3vw",
            marginBottom: "-1vh",
          }}
        >
          Appearence
        </h1>
        <img src={Appearance} style={{ width: "25vw", height: "auto" }} />
        <div
          style={{
            fontSize: "1.5vw",
            display: "flex",
            gap: "3.4vw",
            alignItems: "center",
            marginLeft: "1.2vw",
          }}
        >
          <p style={{ margin: "0.2vw" }}>Furniture</p>
          <p style={{ margin: "0.2vw" }}>Items</p>
          <p style={{ margin: "0.2vw" }}>Wallpaper</p>
        </div>

        <h1
          className="caveat"
          style={{
            textAlign: "center",
            fontSize: "3vw",
            marginBottom: "-1vh",
          }}
        >
          Layout
        </h1>

        <img
          src={Layout}
          style={{ width: "20vw", height: "auto", marginLeft: "2vw" }}
        />
        <div
          style={{
            fontSize: "1.5vw",
            display: "flex",
            gap: "8.2vw",
            alignItems: "center",
            marginLeft: "4.7vw",
          }}
        >
          <p style={{ margin: "0.2vw" }}>Setup</p>
          <p style={{ margin: "0.2vw" }}>List</p>
        </div>
      </div>
    </div>
  );
}
