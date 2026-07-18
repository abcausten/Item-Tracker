import { useParams, useNavigate } from "react-router-dom";
import MenuItems from "../components/MenuItems";

export default function FurniturePage({ placedItems, onUpdateFurniture }) {
  console.log("placedItems:", placedItems);
  const { instanceId } = useParams();
  const navigate = useNavigate();

  if (!placedItems) return <p>Loading...</p>; // ← add this before .find()

  const item = placedItems.find((i) => i.instanceId === Number(instanceId));

  if (!item) return <p>Furniture not found</p>;

  return (
    <div>
      <MenuItems></MenuItems>
    </div>
  );
}
