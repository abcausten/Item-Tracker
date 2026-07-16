import Wallpaper from "@/assets/wallpaper.jpg";
import Menu from "@/components/Menu.jsx";

export default function Room1() {
  return (
    <div
      style={{
        backgroundImage: `url(${Wallpaper})`,
        backgroundRepeat: "repeat",
        backgroundSize: "25%",
        minHeight: "100vh",
      }}
    >
      <Menu></Menu>
    </div>
  );
}
